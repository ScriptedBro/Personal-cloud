import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faTrash } from '@fortawesome/free-solid-svg-icons';
import { database, storage } from '../firebase';
import { getStorage, deleteObject, ref } from 'firebase/storage';
import { deleteDoc } from 'firebase/firestore';

const File = ({ childFile }) => {  
  const [showDelete, setShowDelete] = useState(false);
  
  // const deleteFile = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   const storageRef = ref(storage, childFile.path);
  //   const fileRef = child(storageRef, childFile.name);
    
  //   deleteObject(ref(storage, storageRef)).then((data) => {
  //     deleteDoc(database.getFile(childFile.id)).then(() => {
  //       console.log("Deleted");
  //     }).catch(error => {
  //       console.log(error);
  //     });
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }

  const storage = getStorage();
  
  const deleteFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
  
    const fileRef = ref(storage, childFile.path);
  
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
  

  return (
    <a onMouseEnter={() => setShowDelete(true)} onMouseLeave={() => setShowDelete(false)} href={childFile.url} target="_blank" className='btn btn-outline-dark text-truncate w-100' rel='noreferrer'>
      <FontAwesomeIcon icon={faFile} className="me-1" />
      {childFile.name}
      {showDelete && <FontAwesomeIcon onClick={deleteFile} className='ms-1' style={{color: 'red'}} icon={faTrash} />}
    </a>
  );
}

export default File;