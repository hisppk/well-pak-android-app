import {Colors} from 'globals';
import React, {useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {Switch} from 'react-native-paper';
import {SessionOfflineVideos} from './SessionOfflineVideos';

export const RadioButtonToggle = ({onModeChange}) => {
  const [mode, setMode] = useState('ONLINE');

  const handleModeChange = () => {
    const newMode = mode === 'ONLINE' ? 'OFFLINE' : 'ONLINE';
    setMode(newMode);
    onModeChange(newMode);
  };

  return (
    <View>
      <Switch value={mode === 'ONLINE'} onValueChange={handleModeChange} />
      {mode === 'OFFLINE' ? <SessionOfflineVideos /> : null}
    </View>
  );
};

export default RadioButtonToggle;
