import React, { useEffect } from 'react';
import { Platform, PermissionsAndroid, BackHandler } from 'react-native';
import { Button, Col, Container, MyText } from 'components';
import { Colors } from 'globals';
import { hp } from 'utils/helpers/responsive.helpers';
import Icon from 'components/Icon';
import { ScreenProps } from 'screens/types';
import { RFValue } from 'react-native-responsive-fontsize';
import RNFS from 'react-native-fs';

const requestExternalStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'External Storage Permission',
        message:
          'Your app needs access to your external storage ' +
          'to create the Wellpak folder.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      await createWellpakFolder();
    } else {
      BackHandler.exitApp();
    }
  } catch (err) {
    console.warn(err);
  }
};

const createWellpakFolder = async () => {
  const folderName = 'wellpak';
  let galleryPath = '';

  if (Platform.OS === 'android') {
    galleryPath = RNFS.ExternalStorageDirectoryPath + '/DCIM/';
  } else if (Platform.OS === 'ios') {
    galleryPath = RNFS.LibraryDirectoryPath + '/Photos/';
  }
  await RNFS.mkdir(galleryPath + folderName);
};

const checkPermission = async () => {
  const granted = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  );

  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    await createWellpakFolder();
  } else {
    await requestExternalStoragePermission();
  }
};

useEffect(() => {
  checkPermission();
}, []);

const Welcome = (props: ScreenProps<'Welcome'>) => {
  return (
    <Col>
      <Container gradientBg hideHeader style={{ width: '100%', height: '100%' }}>
        <Col center marg={`${hp(12)}px 0 0 0`}>
          <Icon
            type="logo"
            height={hp(16)}
            width={hp(12.4)}
            marg={`0 0 ${hp(4)}px 0`}
          />
          <MyText
            marg={`0 0 ${hp(20)}px 0`}
            size={`${RFValue(24)}px`}
            color={Colors.white}>
            متاثرابالغ افرادکیلےمدد
          </MyText>
          <Button
            text="Sign In"
            color={Colors.white}
            shadow
            hasRadius="100px"
            bg={Colors.appBackground}
            wid="50%"
            onPress={() => props.navigation.navigate('Login')}
            fontSize={RFValue(12)}
          />
        </Col>
      </Container>
    </Col>
  );
};

export default Welcome;
