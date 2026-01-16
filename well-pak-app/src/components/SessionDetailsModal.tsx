import {Button} from 'components';
import {Colors, Constants} from 'globals';
import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {hp, wp} from 'utils/helpers/responsive.helpers';
import {ImageViewer, VideoPlayer, PdfViewer} from 'components';
import Box from './Box';
import {Heading5} from './text';

type Props = {
  modalData: any;
  isPdfHorizental: boolean;
  closeModal: () => void;
};

export const SessionDetailsModal = (props: Props) => {
  const {modalData, closeModal, isPdfHorizental} = props;

  return (
    <View style={styles.container}>
      <Box
        pad={`${hp(5)}px ${wp(4)}px`}
        wid={Constants.isTablet ? '70%' : '90%'}
        style={{alignSelf: 'center'}}
        bg={Colors.modalBg}
        hasRadius={`${wp(2)}px`}
        marg={`0px ${wp(6)}px`}>
        <ScrollView>
          <Heading5 style={styles.heading}>{modalData?.heading}</Heading5>

          <View style={{marginBottom: hp(3)}}>
            {modalData?.assets_type === 'Image' ? (
              <ImageViewer
                uri={modalData?.['asset-url']}
                width={'100%'}
                height={hp(32)}
                borderRadius={2}
              />
            ) : modalData?.assets_type === 'Pdf' ? (
              <PdfViewer
                isHorizental={isPdfHorizental}
                uri={modalData?.['asset-url']}
                width={'100%'}
                height={hp(50)}
              />
            ) : (
              <VideoPlayer
                uri={modalData?.['asset-url']}
                videoName={modalData?.offlineVideo}
                width={'100%'}
                height={hp(32)}
                borderRadius={2}
              />
            )}
          </View>

          <Button
            text="Go Back"
            color={Colors.white}
            customShadow={{ios: '0px 4px 7px rgba(0, 0, 0, 0.2)', android: '6'}}
            style={{
              alignSelf: 'center',
            }}
            marg={`${hp(5)}px 0px ${hp(3)}px 0px`}
            hasRadius="100px"
            bg={Colors.appBackground}
            onPress={closeModal}
            fontSize={RFValue(14)}
          />
        </ScrollView>
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.transparentLightGreen,
  },
  heading: {
    color: Colors.white,
    marginBottom: hp(2),
  },
});
