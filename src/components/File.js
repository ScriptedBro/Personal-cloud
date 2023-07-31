import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';
import { database, storage } from '../firebase';
import { getStorage, deleteObject, ref, getDownloadURL } from 'firebase/storage';
import { deleteDoc } from 'firebase/firestore';

const File = ({ childFile }) => {  
  const [showDelete, setShowDelete] = useState(false);
  const [showDownload, setShowDownload] = useState(false);

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

      // Fetch the file content using the download URL
      const response = await fetch(downloadUrl);
      const data = await response.blob();

      // Create a temporary URL to initiate the download
      const fileURL = URL.createObjectURL(data);

      // Create a dynamic anchor element and click it to initiate download
      const anchor = document.createElement('a');
      anchor.href = fileURL;
      anchor.download = childFile.name;
      anchor.click();

      // Cleanup the temporary URL
      URL.revokeObjectURL(fileURL);
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <a 
      onMouseEnter={() => {
        setShowDelete(true);
        setShowDownload(true);
      }} 
      onMouseLeave={() => {
        setShowDelete(false);
        setShowDownload(false);
      }} 
      href={childFile.url} 
      target="_blank" 
      className='btn btn-outline-dark text-truncate w-100' 
      rel='noreferrer'
    >
      <FontAwesomeIcon icon={faFile} className="me-1" />
      {childFile.name}
      {showDelete && <FontAwesomeIcon onClick={deleteFile} className='ms-1' style={{ color: 'red' }} icon={faTrash} />}
      {showDownload && <FontAwesomeIcon onClick={downloadFile} className='ms-1' icon={faDownload} />}
    </a>
  );
}

export default File;
