import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Folder = ({ childFolder }) => {
  return (
    <Button as={Link} to={`/folder/${childFolder.id}`} state={{ folder: childFolder}} className="text-truncate w-100" variant='outline-dark'>
      <FontAwesomeIcon className='me-1' icon={faFolder}></FontAwesomeIcon> {childFolder.name}
    </Button>
  );
}

export default Folder;