import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView } from 'react-native';

import { hp, wp } from 'utils/helpers/responsive.helpers';
import {
  BackButton,
  Box,
  Col,
  Container,
  HeaderTitle,
  Logout,
  SessionCard,
} from 'components';
import { ScreenProps } from 'screens/types';
import { useDispatch, useSelector } from 'react-redux';
import { getSessionsList } from 'store/auth/AuthActions';
import { Colors, Constants, Layout } from 'globals';

const Sessions = (props: ScreenProps<'Sessions'>) => {
  const dispatch = useDispatch();
  const { sessions, selectedPatient, loading } = useSelector(
    ({ LHW }: any) => LHW.auth,
  );

  useEffect(() => {
    dispatch(getSessionsList(selectedPatient?.id) as unknown as any);
  }, [selectedPatient?.id]);

  const RenderUI = (
    <Col>
      <Container
        hasScroll={Constants.isTablet}
        bigCircle
        style={{ width: '100%', height: '100%' }}>
        <Col pad={`0px ${wp(4)}px`} marg={`${hp(2)}px 0 0 0`}>
          <Box row center between wid={`100%`} marg={`${hp(5)}px 0px 0px  0px`}>
            <BackButton navigation={props?.navigation} />
            <Logout />
          </Box>
          <Box center marg={`${hp(6)}px 0px ${hp(16)}px  0px`}>
            <HeaderTitle />
          </Box>
          {loading ? (
            <Col centerAll>
              <ActivityIndicator size={'large'} color={Colors.white} />
            </Col>
          ) : (
            <FlatList
              columnWrapperStyle={{
                justifyContent: 'flex-start',
              }}
              keyboardShouldPersistTaps="handled"
              data={sessions}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              renderItem={({ item }) => (

                <SessionCard
                  isComplete={
                    item?.['session-complete-status'] !== 'In Complete'
                  }
                  image={item?.['image-url']}
                  title={item?.section_name_ur}
                  sessionNo={item?.id}
                  isActive={item?.status === 'Active'}
                />
              )}
            />
          )}

        </Col>
      </Container>
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

export default Sessions;
