// import React from 'react';
// import { Button } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFolder } from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom';

// const Folder = ({ childFolder }) => {
//   return (
//     <Button as={Link} to={`/folder/${childFolder.id}`} state={{ folder: childFolder}} className="text-truncate w-100" variant='outline-dark'>
//       <FontAwesomeIcon className='me-1' icon={faFolder}></FontAwesomeIcon> {childFolder.name}
//     </Button>
//   );
// }

// export default Folder;

import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';

const Folder = ({ childFolder }) => {
  const deleteFolder = async (folderId) => {
    const db = getFirestore();
    const folderRef = doc(db, 'folders', folderId);

    try {
      await deleteDoc(folderRef);
      console.log('Folder deleted successfully.');
    } catch (error) {
      console.error('Error deleting folder:', error);
    }
  };

  const handleDeleteFolder = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const confirmDelete = window.confirm(`Are you sure you want to delete the folder "${childFolder.name}"?`);
    if (confirmDelete) {
      deleteFolder(childFolder.id);
    }
  };

  return (
    <Button as={Link} to={`/folder/${childFolder.id}`} state={{ folder: childFolder }} className="text-truncate w-100" variant="outline-dark">
      <FontAwesomeIcon className="me-1" icon={faFolder}></FontAwesomeIcon> {childFolder.name}
      <FontAwesomeIcon onClick={handleDeleteFolder} className="ms-1" style={{ color: 'green' }} icon={faTrash} />
    </Button>
  );
};

export default Folder;
