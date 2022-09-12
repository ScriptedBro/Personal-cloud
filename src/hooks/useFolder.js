import { useEffect, useReducer } from 'react';
import { getDoc, onSnapshot, query, where } from 'firebase/firestore';
import { database } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { ACTIONS, ROOT_FOLDER } from '../constants';

const reducer = (state, { type, payload}) => {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {folderId: payload.folderId, folder: payload.folder, childFolders: [], childFiles: []};
    case ACTIONS.UPDATE_FOLDER:
      return {...state, folder: payload.folder};
    case ACTIONS.SET_CHILD_FOLDERS:
      return {...state, childFolders: payload.childFolders};
    case ACTIONS.SET_CHILD_FILES:
      return {...state, childFiles: payload.childFiles};
    default:
      return state;
  }
}

const useFolder = (folderId = null, folder = null) => {
  const [state, dispatch] = useReducer(reducer, {
    folderId: null,
    folder: null,
    childFolders: [],
    childFiles: []
  });
  const { currentUser } = useAuth();

  // Whenever folderId and folder changes reselect folder in state
  useEffect(() => {
    dispatch({type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder }});
  }, [folderId, folder]);

  // Whenever folderId changes we need to get more info of that folder and update in state
  useEffect(() => {
    if (folderId === null) {
      return dispatch({ type: ACTIONS.UPDATE_FOLDER, payload: { folder: ROOT_FOLDER }});
    }

    getDoc(database.getFolder(folderId)).then(queryData => {
      dispatch({ type: ACTIONS.UPDATE_FOLDER, payload: { folder: database.formatDoc(queryData) }});
    }).catch(err => {
      console.log(err);
      dispatch({ type: ACTIONS.UPDATE_FOLDER, payload: { folder: ROOT_FOLDER }});
    })
  }, [folderId]);

  // When folderId changes we need to get childFolders inside of it and update state
  useEffect(() => {
    const q = query(database.folders, where('parentId', '==', folderId), where('userId', '==', currentUser.uid));
    //, orderBy('createdAt')
    return onSnapshot(q, (queryData) => {
      dispatch({ type: ACTIONS.SET_CHILD_FOLDERS, payload: {childFolders: queryData.docs.map(database.formatDoc)}});
    });
  }, [folderId, currentUser.uid]);

  // When folderId changes we need to get childFiles inside of it and update state
  useEffect(() => {
    const q = query(database.files, where('folderId', '==', folderId), where('userId', '==', currentUser.uid));
    return onSnapshot(q, (queryData) => {
      dispatch({ type: ACTIONS.SET_CHILD_FILES, payload: {childFiles: queryData.docs.map(database.formatDoc)}});
    })
  }, [folderId, currentUser.uid]);

  return state;
}

export default useFolder;