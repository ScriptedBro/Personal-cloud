import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

const File = ({ childFile }) => {
  return (
    <a href={childFile.url} target="_blank" className='btn btn-outline-dark text-truncate w-100' rel='noreferrer'>
      <FontAwesomeIcon icon={faFile} className="me-1" />
      {childFile.name}
    </a>
  );
}

export default File;