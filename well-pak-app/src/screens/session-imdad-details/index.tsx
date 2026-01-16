import React, { useEffect, useState } from 'react';
import { Modal, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { hp, wp } from 'utils/helpers/responsive.helpers';
import {
  BackButton,
  Box,
  Button,
  Col,
  Heading3,
  Icon,
  Logout,
  Paragraph,
  Row,
  SessionDetailsModal,
} from 'components';
import { Colors, Constants, Layout } from 'globals';
import { ScreenProps } from 'screens/types';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { getSessionDetails } from 'store/auth/AuthActions';
import RadioButtonToggle from 'components/RadioButtonToggle';

const SessionImdadDetails = (props: ScreenProps<'SessionDetails'>) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState();

  const { selectedSessionDetails, loading } = useSelector(
    ({ LHW }: any) => LHW.auth,
  );
  useEffect(() => {
    dispatch(getSessionDetails(props.route.params.sessionId) as unknown as any);
  }, [props.route.params.sessionId]);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const RenderUI = (
    <Col bg={Colors.darkAppBackground}>
      <Col pad={`0px ${wp(4)}px`} marg={`${hp(2)}px 0 0 0`}>
        <Box row center between wid={`100%`} marg={`${hp(5)}px 0px 0px  0px`}>
          <BackButton navigation={props?.navigation} />
          <Logout />
        </Box>
        <Row endAll noFlex marg={`${wp(10)}px 0px ${wp(3)}px 0px`}></Row>

        <ScrollView>
          <Row centerAll noFlex marg={`${wp(10)}px 0px ${wp(6)}px 0px`}>
            <Icon type="lady-worker" size={wp(6)} />
            <Heading3
              style={{ color: Colors.white, marginBottom: 0, marginLeft: wp(2) }}>
              {props?.route.params.title}
            </Heading3>
          </Row>
          <Box center marg={`${wp(5)}px 0 0 0`}>
            {!loading && selectedSessionDetails?.sessiondetails?.length > 0 ? (
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={selectedSessionDetails?.sessiondetails}
                style={{ width: '100%' }}
                contentContainerStyle={{
                  alignItems: 'center',
                  paddingBottom: hp(10),
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
        </ScrollView>
      </Col>
      <Modal
        visible={showModal}
        animationType="slide"
        onRequestClose={handleCloseModal}
        transparent>
        <SessionDetailsModal
          isPdfHorizental={true}
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

export default SessionImdadDetails;
