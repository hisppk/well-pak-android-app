import React from 'react';
import {View, Text} from 'react-native';
import * as RNFS from 'react-native-fs';

const ReadDocumentFile = () => {
  RNFS.readDir(RNFS.DocumentDirectoryPath)
    .then(files => {
      console.log('Files', files);
    })
    .catch(err => {
      console.log('Files', err.message, err.code);
    });
};

export const SessionOfflineVideos = () => {
  return ReadDocumentFile();
};
