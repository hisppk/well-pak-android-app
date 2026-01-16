import React, { useState, useEffect } from 'react';
import Video from 'react-native-video';
import RadioButtonToggle from './RadioButtonToggle';
import { View, Text, Alert } from 'react-native';
import RNFS from 'react-native-fs';
import Icon from './Icon';
import { Colors } from 'globals';

type Props = {
  uri: string;
  size?: any;
  width?: any;
  height?: any;
  borderRadius?: any;
  videoName?: string;
};
export const VideoPlayer = (props: Props) => {
  const [videoPath, setVideoPath] = useState(null);
  const [mode, setMode] = useState('ONLINE');
  const { uri, size, width, height, borderRadius } = props;
  if (!uri)
    return (
      <Icon
        type="post-placeholder"
        size={size}
        width={width}
        height={height}
        borderRadius={borderRadius}
      />
    );

  const handleModeChange = newMode => {
    setMode(newMode);
  };
  useEffect(() => {
    if (mode === 'OFFLINE') {
      loadVideo();
    }
  }, [mode]);

  const loadVideo = async () => {
    try {
      const documentDirPath = RNFS.ExternalStorageDirectoryPath;

      const wellpakFolderPath = `${documentDirPath}/DCIM/wellpak`;

      const fileName = props.videoName || 'video.mp4';

      const filePath = `${wellpakFolderPath}/${fileName}`;

      const exists = await RNFS.exists(filePath);
      if (!exists) {
        Alert.alert('ویڈیو موجود نہیں ہے');
        return;
      }

      setVideoPath(filePath);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <RadioButtonToggle onModeChange={handleModeChange} />
      <Text style={{ color: Colors.white }}>Current mode: {mode}</Text>

      <Video
        source={{ uri: mode === 'OFFLINE' ? videoPath : uri }}
        controls={true}
        style={{
          width: width ? width : size || 25,
          height: height ? height : size || 25,
          marginTop: 1,
          borderRadius: borderRadius ? borderRadius : 0,
          alignSelf: 'center',
          borderColor: 'white',
        }}
        resizeMode="cover"
      />
    </View>
  );
};
