import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';
import { database, storage } from '../firebase';
import { getStorage, deleteObject, ref, getDownloadURL } from 'firebase/storage';
import { deleteDoc } from 'firebase/firestore';
import { saveAs } from 'file-saver';

const File = ({ childFile }) => {
  const [showActions, setShowActions] = useState(true);

  const storageRef = getStorage();

  const deleteFile = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const fileRef = ref(storageRef, childFile.path);

    deleteObject(fileRef)
      .then(() => {
        deleteDoc(database.getFile(childFile.id))
          .then(() => {
            console.log("Deleted");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const downloadFile = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const fileRef = ref(storageRef, childFile.path);

    try {
      const downloadUrl = await getDownloadURL(fileRef);

      fetch(downloadUrl, { mode: 'no-cors' })
        .then((response) => response.blob())
        .then((blob) => {
          saveAs(blob, childFile.name);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <a
        href={childFile.url}
        target="_blank"
        className='btn btn-outline-dark d-inline-flex align-items-center'
        rel='noreferrer'
      >
        {childFile.type === 'file' && <FontAwesomeIcon icon={faFile} className="me-1" />}
        {childFile.type === 'music' && <FontAwesomeIcon icon={faFile} className="me-1" />}
        {childFile.type === 'video' && <FontAwesomeIcon icon={faFile} className="me-1" />}
        {childFile.name}
      </a>

      {showActions && (
        <div className="d-inline-flex">
          <FontAwesomeIcon onClick={deleteFile} className='ms-1' style={{ color: 'red' }} icon={faTrash} />
          <FontAwesomeIcon onClick={downloadFile} className='ms-1' icon={faDownload} />
        </div>
      )}
    </div>
  );
};

export default File;
