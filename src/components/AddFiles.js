import React, { useState } from 'react'
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { database, storage } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { ROOT_FOLDER } from '../constants';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { uuidv4 } from '@firebase/util';
import { ProgressBar, Toast } from 'react-bootstrap';

const AddFiles = ({ currentFolder }) => {
  const { currentUser } = useAuth();
  const [uploadingFiles, setUploadingFiles] = useState([]);

  const handleUpload = e => {
    const file = e.target.files[0];
    if (currentFolder === null || file === null) {
      return;
    }

    const id = uuidv4();
    setUploadingFiles(prevState => [
      ...prevState, {id, name:file.name, progress:0, error:false}
    ]);

    const paths = currentFolder.path.map(pt => pt.name);

    const filePath = currentFolder === ROOT_FOLDER 
    ? `${paths.join('/')}/${file.name}`
    : `${paths.join('/')}/${currentFolder.name}/${file.name}`;

    const storageRef = ref(storage, `/files/${currentUser.uid}/${filePath}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = snapshot.bytesTransferred / snapshot.totalBytes;
      setUploadingFiles(prevState => {
        return prevState.map(currentFile => {
          if (currentFile.id === id) {
            return {...currentFile, progress };
          }
          return currentFile;
        });
      })
    },
    (error)=> { 
      console.log(error);
      setUploadingFiles(prevState => {
        return prevState.map(currentFile => {
          if (currentFile.id === id) {
            return {...currentFile, error: true };
          }
          return currentFile;
        })
      });
    },
    () => {
      setUploadingFiles(prevState => {
        return prevState.filter(currentFile => currentFile.id !== id)
      });

      getDownloadURL(uploadTask.snapshot.ref).then(downloadUrl => {
         addDoc(database.files, {
          url: downloadUrl,
          name: file.name,
          createdAt: serverTimestamp(),
          folderId: currentFolder.id,
          userId: currentUser.uid,
        }).then(data => {
          console.log("File uploaded and saved");
        }).catch(err => {
          console.log(err);
        });
      })
    })
  };

  return (
    <><label className="btn btn-outline-success btn-sm m-0 me-2">
      <FontAwesomeIcon icon={faFileUpload} />
      <input type='file' onChange={handleUpload} style={{opacity: 0, position: 'absolute', left: '-9999px'}} />
    </label>
    {uploadingFiles.length > 0 && ReactDOM.createPortal(<div style={{position: 'absolute', bottom: '1rem', right: '1rem', maxWidth: '250px'}}>
      {uploadingFiles.map(file => (
        <Toast key={file.id} onClose={() => {
          setUploadingFiles(prevState => {
            return prevState.filter(currentFile => currentFile.id !== file.id)
          });
        }}>
          <Toast.Header closeButton={file.error} className='text-truncate w-100 d-block'>{file.name}</Toast.Header>
          <Toast.Body>
            <ProgressBar 
              animated={!file.error} 
              variant={file.error ? 'danger': 'primary'}
              now={file.error ? 100 : file.progress * 100}
              label={ file.error ? 'Error': `${Math.round(file.progress * 100)}%`}
            />
          </Toast.Body>
        </Toast>
      ))}
    </div>, document.body)}
    </>
  );
}

export default AddFiles;