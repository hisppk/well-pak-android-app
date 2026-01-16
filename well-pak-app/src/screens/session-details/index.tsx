import React, { useEffect, useState } from 'react';
import {
  View,
  Modal,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';

import { hp, wp } from 'utils/helpers/responsive.helpers';
import {
  AppInput,
  BackButton,
  Box,
  Button,
  Col,
  Container,
  HeaderTitle,
  Heading3,
  Icon,
  Logout,
  Paragraph,
  Row,
  BoldParagraph,
  SessionDetailsModal,
} from 'components';
import { Colors, Constants, Layout } from 'globals';
import { ScreenProps } from 'screens/types';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSessionDetails,
  submitAssessment,
  submitSession,
} from 'store/auth/AuthActions';
import moment from 'moment';

const SessionDetails = (props: ScreenProps<'SessionDetails'>) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [cnic, setCnic] = useState('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState();
  const [seconds, setSeconds] = useState(0);
  const [minuts, setMinuts] = useState(0);
  const [hours, setHours] = useState(0);

  const { selectedSessionDetails, selectedPatient, loading } = useSelector(
    ({ LHW }: any) => LHW.auth,
  );


  useEffect(() => {
    dispatch(
      getSessionDetails(
        props.route.params.sessionId,
        selectedPatient?.id,
      ) as unknown as any,
    );
  }, [props.route.params.sessionId]);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    setUserName(selectedPatient?.name);
    setCnic(selectedPatient?.cnic);
  }, [selectedPatient]);
  let timer;
  useEffect(() => {
    timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
      if (seconds === 59) {
        setMinuts((prev) => prev + 1);
        setSeconds(0);
      }
      if (minuts === 59) {
        setHours((prev) => prev + 1);
        setMinuts(0);
        setSeconds(0);
      }
    }, 1000);

    return () => clearInterval(timer);
  });

  const handleSubmitSession = () => {
    if (selectedSessionDetails?.sessiondetails) {

      const myTime = `${hours < 10 ? '0' + hours : hours} Hours ${minuts < 10 ? '0' + minuts : minuts
        } Minuts ${seconds < 10 ? '0' + seconds : seconds
        } Seconds`;

      const sessionData = {
        patient_id: selectedPatient?.id,
        session_id: selectedSessionDetails?.sessiondetails?.[0]?.session_id,
        session_time: myTime,
      };

      dispatch(submitSession(sessionData) as unknown as any);
    } else {

      Alert.alert('Incomplete', 'Please Complete The Assessment');
    }
  };

  const RenderUI = (
    <Col>
      <Container bigCircle style={{ width: '100%', height: '100%' }}>
        <Col pad={`0px ${wp(4)}px`} marg={`${hp(2)}px 0 0 0`}>
          <Box row center between wid={`100%`} marg={`${hp(5)}px 0px 0px  0px`}>
            <BackButton navigation={props?.navigation} />
            <Logout />
          </Box>
          <Box center marg={`${hp(6)}px 0px ${hp(16)}px  0px`}>
            <HeaderTitle />

            {(selectedSessionDetails?.['patient-session']
              ?.session_assessment_status === 'Complete' && selectedSessionDetails?.['patient-session']?.session_status !== 'Complete') &&
              (
                <BoldParagraph
                  style={{
                    color: Colors.white,
                    textAlign: 'center',
                    marginTop: hp(3),
                  }}>
                  Session Timer {hours < 10 ? '0' + hours : hours} :{' '}
                  {minuts < 10 ? '0' + minuts : minuts} :{' '}
                  {seconds < 10 ? '0' + seconds : seconds}
                </BoldParagraph>
              )}


          </Box>

          <ScrollView>
            <Row center noFlex marg={`0px 0px ${wp(6)}px 0px`}>
              <Icon type="session-title" size={wp(6)} />
              <Heading3
                style={{
                  color: Colors.white,
                  marginBottom: 0,
                  marginLeft: wp(2),
                }}>
                {props?.route.params.title}
              </Heading3>
            </Row>

            <Box marg={`0px 0px ${wp(3)}px 0px`}>
              <AppInput
                editable={false}
                title={'For'}
                value={userName}
                setValue={setUserName}
              />
            </Box>
            <Box marg={`0px 0px ${wp(3)}px 0px`}>
              <AppInput
                editable={false}
                title={'CNIC'}
                value={cnic}
                setValue={setCnic}
              />
            </Box>

            <Box center marg={`${wp(5)}px 0 0 0`}>

              {!loading && selectedSessionDetails?.sessiondetails?.length > 0 ? (

                <FlatList
                  keyExtractor={(item, index) => index.toString()}
                  data={selectedSessionDetails?.sessiondetails}
                  contentContainerStyle={{
                    alignItems: 'center',
                  }}
                  renderItem={({ item }) => (
                    <Button
                      text={item?.heading}
                      color="white"
                      wid={Constants.isTablet ? '80%' : '90%'}
                      customShadow={{
                        ios: '0px 4px 7px rgba(0, 0, 0, 0.2)',
                        android: '10',
                      }}
                      hasRadius="100px"
                      marg={`0 0 ${wp(4)}px 0`}
                      bg={Colors.appBackground}
                      fontSize={RFValue(12)}
                      onPress={() => {
                        setShowModal(true), setModalData(item);
                      }}
                    />
                  )}
                />
              ) : loading ? (
                <Col centerAll>
                  <ActivityIndicator size={'small'} color={Colors.white} />
                </Col>
              ) : (
                <Paragraph style={{ color: Colors.white }}>
                  No Results Found
                </Paragraph>
              )}
            </Box>
            {/* play button */}

            {/* <Button
                            text={`Complete ${props?.route?.params?.title}`}
                            color="white"
                            customShadow={{ ios: '0px 4px 7px rgba(0, 0, 0, 0.2)', android: '10' }}
                            hasRadius="100px"
                            wid="auto"
                            marg={`${wp(4)}px 0 0 0`}
                            style={{
                                alignSelf: 'center',
                            }}
                            bg={Colors.appBackground}
                            fontSize={RFValue(12)}
                            onPress={() => { }} /> */}

            {(selectedSessionDetails?.['patient-session']
              ?.session_assessment_status === 'Complete' && selectedSessionDetails?.['patient-session']?.session_status !== 'Complete') && (
                <Button
                  text="Submit Session"
                  color={Colors.white}
                  customShadow={{
                    ios: '0px 4px 7px rgba(0, 0, 0, 0.2)',
                    android: '6',
                  }}
                  style={{
                    alignSelf: 'center',
                  }}
                  marg={`${hp(5)}px 0px ${hp(3)}px 0px`}
                  hasRadius="100px"
                  bg={Colors.appBackground}
                  onPress={handleSubmitSession}
                  fontSize={RFValue(16)}
                />
              )}
          </ScrollView>
        </Col>
      </Container>
      <Modal
        visible={showModal}
        animationType="slide"
        onRequestClose={handleCloseModal}
        transparent>
        <SessionDetailsModal
          isPdfHorizental={false}
          modalData={modalData}
          closeModal={handleCloseModal}
        />
      </Modal>
    </Col>
  );

  return (
    <>
      {Constants.isTablet ? (
        <ScrollView
          style={{
            width: Layout.full,
            height: Layout.full,
            backgroundColor: Colors.appBackground,
          }}
          showsVerticalScrollIndicator={false}>
          {RenderUI}
        </ScrollView>
      ) : (
        <>{RenderUI}</>
      )}
    </>
  );
};

export default SessionDetails;
