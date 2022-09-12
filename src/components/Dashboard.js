import React from "react";
import { Container } from "react-bootstrap";
import AddFolder from "./AddFolder";
import FolderBreadcrumbs from "./FolderBreadcrumbs";
import NavbarComponent from "./Navbar";
import useFolder from '../hooks/useFolder';
import Folder from './Folder';
import File from './File';
import { useParams, useLocation } from 'react-router-dom';
import AddFiles from "./AddFiles";

const Dashboard = () => {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles } = useFolder(folderId, state?.folder);

  return (
    <>
      <NavbarComponent />
      <Container fluid>
        <div className="d-flex align-items-center">
          <FolderBreadcrumbs currentFolder={folder} />
          <AddFiles currentFolder={folder} />
          <AddFolder currentFolder={folder} />
        </div>
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map(childFolder => (
              <div key={childFolder.id} className="p-2" style={{maxWidth: '250px'}}>
                <Folder childFolder={childFolder} />
              </div>
              ))
            }
          </div>
        )}
        {childFolders.length > 0 && childFiles.length > 0 && <hr />}
        {childFiles.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFiles.map(childFile => (
              <div key={childFile.id} className="p-2" style={{maxWidth: '250px'}}>
                <File childFile={childFile} />
              </div>
              ))
            }
          </div>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
