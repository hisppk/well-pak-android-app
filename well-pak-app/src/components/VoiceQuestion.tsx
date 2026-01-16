import ReactNativeBlobUtil from 'react-native-blob-util';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
} from 'react-native-audio-recorder-player';
import {
  Alert,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import 'react-native-get-random-values';
import RNFS from 'react-native-fs';
import {v4 as uuidv4} from 'uuid';

import {checkRecordingPermissions} from 'utils/helpers/androidPermissions';
import {Colors, Constants} from 'globals';
import {hp, wp} from 'utils/helpers/responsive.helpers';
import {Paragraph} from './text';
import {startRecodingGlobal} from 'store/auth/AuthActions';
import {AudioPlayer, BottomSheet, Icon} from 'components';
import {AnswerType} from 'screens/assesment-details';
import SoundPlayer from 'react-native-sound-player';

type Props = {
  questionData?: any;
  questionId: number;
  isEditable: boolean; //to check if this session was submitted and data is commming from backend then only display him player
  isAnsweredDisplayPlayer: any; //to check if user has answered but not submited the session yet data is not in backend yet
  questionText: string;
  handleSubmitAnswer: (
    questionId: string,
    answer: any,
    type: AnswerType,
  ) => void;
};

const audioRecorderPlayer = new AudioRecorderPlayer();
export const VoiceQuestion = (props: Props) => {
  const dispatch = useDispatch();
  const {isAlreadyRecoding} = useSelector(({LHW}: any) => LHW.auth);
  const {
    questionId,
    questionText,
    isEditable,
    isAnsweredDisplayPlayer,
    questionData,
    handleSubmitAnswer,
  } = props;

  const [recordData, setRecordData] = useState({
    recordSecs: 0,
    recordTime: '',
    isRecording: false,
  });
  const [isPlayerVisible, setIsPlayerVisible] = useState<boolean>(false);
  const [localFileUri, setLocalFileUri] = useState<string | undefined>(
    undefined,
  );

  const generateUUID = () => {
    const uuid = uuidv4();
    return `${uuid}-${questionId}`;
  };
  const stopPlayer = async () => {
    try {
      await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setRecordData({
        ...recordData,
        recordSecs: 0,
        isRecording: false,
      });
    } catch (err) {
      console.log('got err', err);
    }
  };
  useEffect(() => {
    if (!isAlreadyRecoding) {
      stopPlayer();
    }
  }, [isAlreadyRecoding]);

  const onStartRecord = async () => {
    try {
      //make sure to pause the previous playing player first before stating new recording
      await SoundPlayer.stop();
      //make sure there is oly one instance of recording
      if (isAlreadyRecoding) {
        return Alert.alert(
          'Error',
          'Another recording is already in progress please stop that or restart app',
        );
      }

      let dirs = ReactNativeBlobUtil.fs.dirs;
      const path = Platform.select({
        ios: `${generateUUID()}.m4a`,
        android: `${dirs.MusicDir}/${generateUUID()}.mp3`,
      });

      const audioSet: AudioSet = {
        AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
        AudioSourceAndroid: AudioSourceAndroidType.MIC,
        AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
        AVNumberOfChannelsKeyIOS: 2,
        AVFormatIDKeyIOS: AVEncodingOption.aac,
      };

      const result = await audioRecorderPlayer.startRecorder(path, audioSet);

      //make sure there is oly one instance of recording
      dispatch(startRecodingGlobal(true) as unknown as any);

      audioRecorderPlayer.addRecordBackListener(e => {
        setRecordData({
          recordSecs: e.currentPosition,
          recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
          isRecording: true,
        });
        return;
      });
    } catch (err: any) {
      if (err?.message === 'Record permission not granted') {
        Alert.alert(
          'Error',
          'Record permission not granted please enable them from settings in order to record voice',
          [
            {
              text: 'Enable',
              onPress: () => Linking.openSettings(),
            },
          ],
        );
      }
    }
  };

  const onStopRecord = async () => {
    dispatch(startRecodingGlobal(false) as unknown as any);
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setRecordData({
        ...recordData,
        recordSecs: 0,
        isRecording: false,
      });
      setLocalFileUri(result);
      const base64 = await RNFS.readFile(result, 'base64');
      handleSubmitAnswer(`${questionId}`, base64, AnswerType.Audio);
    } catch (err) {
      console.log('got err', err);
    }
  };

  const startRecording = async () => {
    if (Platform.OS === 'android') {
      const result = await checkRecordingPermissions();
      if (result) {
        onStartRecord();
      }
    } else {
      onStartRecord();
    }
  };

  const handleCloseBottomSheet = async () => {
    setIsPlayerVisible(false);
    await SoundPlayer.stop();
  };

  const handleDeleteAudio = () => {
    setLocalFileUri(undefined);
    setRecordData({
      recordSecs: 0,
      recordTime: '',
      isRecording: false,
    });
  };

  const isFileRecordedAndReadyToPlay =
    (isAnsweredDisplayPlayer &&
      !recordData?.isRecording &&
      recordData?.recordTime === '') ||
    (localFileUri && !recordData?.isRecording && recordData?.recordTime !== '');

  return (
    <View style={styles.wrapper}>
      {recordData?.recordTime && (
        <Paragraph style={styles.recordingTimer}>
          {recordData?.recordTime}
        </Paragraph>
      )}
      <View style={styles.container}>
        {isFileRecordedAndReadyToPlay ? (
          <View style={styles.audioPlayerContainer}>
            <TouchableOpacity
              onPress={async () => {
                //make sure to pause the previous playing player first before stating new recording
                await SoundPlayer.stop();
                setIsPlayerVisible(true);
              }}
              style={[styles.stopStartRecording, styles.audioPlayerContainer]}>
              <Icon type={'play'} size={wp(Constants.isTablet ? 3 : 5)} />
            </TouchableOpacity>
            {isEditable && (
              <TouchableOpacity
                onPress={handleDeleteAudio}
                style={[
                  styles.stopStartRecording,
                  styles.audioPlayerContainer,
                  {marginLeft: wp(4)},
                ]}>
                <Icon type={'delete'} size={wp(Constants.isTablet ? 3 : 5)} />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <>
            {recordData?.isRecording ? (
              <TouchableOpacity
                onPress={onStopRecord}
                style={styles.stopStartRecording}>
                <Icon
                  type={'stop-record'}
                  size={wp(Constants.isTablet ? 3 : 5)}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={startRecording}
                style={styles.stopStartRecording}>
                <Icon
                  type={'start-record'}
                  size={wp(Constants.isTablet ? 3 : 5)}
                />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
      {isPlayerVisible && (
        <BottomSheet
          height={hp(30)}
          isVisible={isPlayerVisible}
          onClose={handleCloseBottomSheet}
          paddingHorizontal={1}>
          <AudioPlayer
            track={
              isEditable && localFileUri
                ? localFileUri
                : questionData?.answer?.file
            }
          />
        </BottomSheet>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: hp(3),
    alignSelf: 'center',
    width: Constants.isTablet ? '90%' : '90%',
  },
  recordingTimer: {
    textAlign: 'center',
    color: Colors.white,
  },
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  stopStartRecording: {
    padding: wp(1.4),
    borderRadius: wp(100),
    backgroundColor: Colors.white,
  },
  audioPlayerContainer: {
    borderRadius: wp(20),
    alignSelf: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.4),
    alignItems: 'center',
    flexDirection: 'row',
  },
});
