import React from 'react';

import Box from './Box';
import { hp, wp } from 'utils/helpers/responsive.helpers';
import { Micro } from './text';
import { Colors } from 'globals';
import { Button } from 'components';
import { navigate } from 'screens/navigation';
import { RFValue } from 'react-native-responsive-fontsize';
import { Alert, Image } from 'react-native';

type Props = {
  image: string;
  title: string;
  sessionNo: string;
  isActive: boolean;
  isComplete: boolean;
};

export const SessionCard = (props: Props) => {
  const { image, title, sessionNo, isActive, isComplete } = props;
  const handleOpenAssessment = () => {
    if (isActive) {
      navigate('AssessmentDetails', { sessionId: sessionNo, isComplete });
    } else {
      Alert.alert('Please Complete Previous Sessions first');
    }
  };
  const handleOpenDetails = () => {
    if (isActive) {
      navigate('SessionDetails', {
        title: title,
        sessionId: sessionNo,
        isComplete,
      });
    } else {
      Alert.alert('Please Complete Previous Sessions first');
    }
  };

  return (
    <Box
      wid={`${wp(36)}px`}
      centerAll
      marg={`${wp(8)}px ${wp(12)}px ${wp(4)}px 0px`}
      hasRadius={`${wp(3)}px`}
      pad={`${wp(2)}px`}
      bg={Colors.darkAppBackground}>
      <Box
        pad={`${wp(2)}px`}
        absolute
        centerAll
        hasRadius={`${wp(100)}px`}
        bg={isComplete ? Colors?.success : Colors.darkAppBackground}
        top={`-${wp(7)}px`}
        right={`-${wp(7)}px`}>
        <Image
          source={{ uri: image }}
          style={{
            width: wp(15),
            height: wp(15),
            alignSelf: 'center',
            borderRadius: wp(100),
          }}
        />
      </Box>
      <Micro
        style={{
          maxWidth: '70%',
          marginTop: hp(1),
          marginRight: wp(10),
          textAlign: 'right',
          color: Colors.white,
        }}>
        {title}
      </Micro>

      <Button
        ht={'auto'}
        pad={`${wp(2.6)}px 0px`}
        fontSize={RFValue(9)}
        marg={`${wp(8)}px 0px ${wp(2)}px 0px`}
        hasRadius={`${wp(100)}px`}
        color={Colors.white}
        bg={Colors.appBackground}
        wid={'80%'}
        text="PSYCLOPS"
        onPress={handleOpenAssessment}
      />
      <Button
        pad={`${wp(2.6)}px 0px`}
        ht={'auto'}
        fontSize={RFValue(9)}
        hasRadius={`${wp(100)}px`}
        color={Colors.appBackground}
        bg={Colors.white}
        wid={'80%'}
        text={`Session ${sessionNo}`}
        onPress={handleOpenDetails}
      />

    </Box>
  );
};
