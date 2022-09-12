import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Form, Modal } from 'react-bootstrap';
import { database } from '../firebase';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { ROOT_FOLDER } from '../constants';

const AddFolder = ({ currentFolder }) => {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const createFolder = (e) => {
    e.preventDefault();

    if (currentFolder === null) return;

    const path = [...currentFolder.path];
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id});
    }

    addDoc(database.folders, {
      name: name,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      path,
      createdAt: serverTimestamp()
    }).then(data => {
      setIsOpen(false);
      setName('');
    }).catch(err => {
      console.log(err);
      setIsOpen(false);
      setName('');
    });
  }

  return (
    <>
    <Button size='sm' variant='outline-success' onClick={openModal}>
      <FontAwesomeIcon icon={faFolderPlus} />
    </Button>
    <Modal show={isOpen} onHide={closeModal}>
      <Form onSubmit={createFolder}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Folder Name</Form.Label>
            <Form.Control
              type='text'
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeModal}>Close</Button>
          <Button variant='success' type='submit'>Add Folder</Button>
        </Modal.Footer>
      </Form>
    </Modal>
    </>
  );
}

export default AddFolder;