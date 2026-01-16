import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Platform,
  ScrollView,
} from 'react-native';

import {
  Box,
  Col,
  Container,
  HeaderTitle,
  Heading3,
  Logout,
  Paragraph,
  PatientSearch,
  Row,
  TinyParagraph,
} from 'components';
import { hp, wp } from 'utils/helpers/responsive.helpers';
import { Colors, Layout } from 'globals';
import { styles } from './styles';
import Icon from 'components/Icon';
import moment from 'moment';
import { ScreenProps } from 'screens/types';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLadyHealthWorkerPatients,
  setSelectedPatient,
} from 'store/auth/AuthActions';
import { colStyles } from 'styles';

const Home = (props: ScreenProps<'Home'>) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState<string>('');
  const [colors, setColors] = useState([])
  const { patients, loading } = useSelector(({ LHW }: any) => LHW.auth);

  const [localPatients, setLocalPatients] = useState(patients);


  //  useEffect(()=>{
  //        const newData = patients?.map(item => {
  //         const color = item.patientsColors;
  //         return {color };
  //       });
  //       setColors(newData);
  //  },[])
  //  console.log("colors",colors)


  useEffect(() => {
    //get lhw patients
    dispatch(getLadyHealthWorkerPatients() as unknown as any);
  }, []);

  const handlePatientClick = patient => {
    dispatch(setSelectedPatient(patient) as unknown as any);
    props.navigation.navigate('Sessions');
  };

  useEffect(() => {

    if (searchText != '') {
      const results = patients.filter(
        patient =>
          patient?.name.toLowerCase().includes(searchText.toLowerCase()) ||
          patient?.cnic.toLowerCase().includes(searchText.toLowerCase()),
      );
      setLocalPatients(results);
    } else {
      setLocalPatients(patients);
    }
  }, [searchText, patients]);



  return (
    <Col>
      <Container bigCircle style={{ width: '100%', height: '100%' }}>
        <Col pad={`0px ${wp(4)}px `} marg={`${hp(2)}px 0 0 0`}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: hp(20) }}>
            <Box marg={`${hp(5)}px 0px 0px  0px`}>
              <Logout />
            </Box>
            <Box center marg={`${hp(6)}px 0px ${hp(15)}px  0px`}>
              <HeaderTitle />
            </Box>
            <Row center noFlex>
              <Icon type="dashboard" size={24} />
              <Heading3

                style={{
                  color: Colors.white,
                  marginLeft: wp(2),
                  marginBottom: 0,
                }}>
                Dashboard
              </Heading3>
            </Row>

            {loading ? (
              <Col centerAll>
                <ActivityIndicator size={'large'} color={Colors.white} />
              </Col>
            ) : (
              <View style={styles.tableContainer}>
                <Box
                  center
                  absolute
                  top={`-${hp(Platform.OS === 'ios' ? 2 : 3)}px`}
                  left="0"
                  right="0">
                  <PatientSearch
                    searchText={searchText}
                    setSearchText={setSearchText}
                  />
                </Box>
                <ScrollView horizontal={true}>
                  <ScrollView style={{ marginTop: hp(5) }}>
                    {localPatients?.length > 0 ? (

                      localPatients?.map((item, index) => {

                        return (
                          <>
                            {index === 0 ? (
                              <View >
                                <View style={styles.tableRowContainer}>
                                  <View style={{ width: wp(30) }} >
                                    <TinyParagraph style={styles.leftAlignText}>
                                      Name
                                    </TinyParagraph>
                                  </View>
                                  <View style={styles.verticleDottedLine} />
                                  <View style={{ width: wp(15) }}>
                                    <TinyParagraph
                                      style={styles.centerAlignText}>
                                      Age
                                    </TinyParagraph>
                                  </View>
                                  <View style={styles.verticleDottedLine} />
                                  <View style={{ width: wp(30) }}>
                                    <TinyParagraph style={styles.leftAlignText}>
                                      Phone
                                    </TinyParagraph>
                                  </View>
                                  <View style={styles.verticleDottedLine} />
                                  <View style={{ width: wp(15) }}>
                                    <TinyParagraph
                                      style={styles.centerAlignText}>
                                      Session
                                    </TinyParagraph>
                                  </View>
                                  <View style={styles.verticleDottedLine} />
                                  <View style={{ width: wp(40) }}>
                                    <TinyParagraph
                                      style={styles.centerAlignText}>
                                      Cnic
                                    </TinyParagraph>
                                  </View>
                                </View>

                                <TouchableOpacity
                                  onPress={() => handlePatientClick(item)}
                                  style={[styles.tableRowContainer, { backgroundColor: item?.patientsColorsCode }]}>
                                  <View style={{ width: wp(30) }}>
                                    <TinyParagraph style={styles.leftAlignText}>
                                      {item?.name}
                                    </TinyParagraph>
                                  </View>
                                  <View style={styles.verticleDottedLine} />
                                  <View style={{ width: wp(15) }}>
                                    <TinyParagraph
                                      style={styles.centerAlignText}>
                                      {item?.age}
                                    </TinyParagraph>
                                  </View>
                                  <View style={styles.verticleDottedLine} />
                                  <View style={{ width: wp(30) }}>
                                    <TinyParagraph style={styles.leftAlignText}>
                                      {item?.phone}
                                    </TinyParagraph>
                                  </View>
                                  <View style={styles.verticleDottedLine} />
                                  <View style={{ width: wp(15) }}>
                                    <TinyParagraph
                                      style={styles.centerAlignText}>
                                      {item?.session_count || '0'}
                                    </TinyParagraph>
                                  </View>
                                  <View style={styles.verticleDottedLine} />
                                  <View style={{ width: wp(40) }}>
                                    <TinyParagraph
                                      style={styles.centerAlignText}>
                                      {item?.cnic || '0'}
                                    </TinyParagraph>
                                  </View>
                                </TouchableOpacity>


                              </View>
                            ) : (
                              <TouchableOpacity
                                onPress={() => handlePatientClick(item)}
                                style={[styles.tableRowContainer, { backgroundColor: item?.patientsColorsCode }]}>
                                <View style={{ width: wp(30) }}>
                                  <TinyParagraph style={styles.leftAlignText}>
                                    {item?.name}
                                  </TinyParagraph>
                                </View>
                                <View style={styles.verticleDottedLine} />
                                <View style={{ width: wp(15) }}>
                                  <TinyParagraph style={styles.centerAlignText}>
                                    {item?.age}
                                  </TinyParagraph>
                                </View>
                                <View style={styles.verticleDottedLine} />
                                <View style={{ width: wp(30) }}>
                                  <TinyParagraph style={styles.leftAlignText}>
                                    {item?.phone}
                                  </TinyParagraph>
                                </View>
                                <View style={styles.verticleDottedLine} />
                                <View style={{ width: wp(15) }}>
                                  <TinyParagraph style={styles.centerAlignText}>
                                    {item?.session_count || '0'}
                                  </TinyParagraph>
                                </View>
                                <View style={styles.verticleDottedLine} />
                                <View style={{ width: wp(40) }}>
                                  <TinyParagraph style={styles.centerAlignText}>
                                    {item?.cnic || '0'}
                                  </TinyParagraph>
                                </View>
                              </TouchableOpacity>
                            )}
                          </>
                        );
                      })
                    ) : (
                      <Paragraph
                        style={{
                          textAlign: 'center',
                          marginTop: hp(2),
                          color: Colors.white,
                        }}>
                        No Results Found
                      </Paragraph>
                    )}
                  </ScrollView>
                </ScrollView>
                {/* <FlatList
                                        data={localPatients}
                                        style={{ marginTop: hp(5), }}
                                        renderItem={({ item, index }) =>
                                            <ScrollView horizontal={true} >
                                                {
                                                    index === 0 ? <View>
                                                        <View style={styles.tableRowContainer}>
                                                            <View style={{ width: wp(30) }} >
                                                                <TinyParagraph style={styles.leftAlignText}>Name</TinyParagraph>
                                                            </View>
                                                            <View style={styles.verticleDottedLine} />
                                                            <View style={{ width: wp(15) }} >
                                                                <TinyParagraph style={styles.centerAlignText}>Age</TinyParagraph>
                                                            </View>
                                                            <View style={styles.verticleDottedLine} />
                                                            <View style={{ width: wp(30) }} >
                                                                <TinyParagraph style={styles.leftAlignText}>Phone</TinyParagraph>
                                                            </View>
                                                            <View style={styles.verticleDottedLine} />
                                                            <View style={{ width: wp(15) }} >
                                                                <TinyParagraph style={styles.centerAlignText}>Session</TinyParagraph>
                                                            </View>
                                                            <View style={styles.verticleDottedLine} />
                                                            <View style={{ width: wp(40) }} >
                                                                <TinyParagraph style={styles.centerAlignText}>Cnic</TinyParagraph>
                                                            </View>
                                                        </View>
                                                        <TouchableOpacity onPress={() => handlePatientClick(item)} style={styles.tableRowContainer}>
                                                            <View style={{ width: wp(30) }} >
                                                                <TinyParagraph style={styles.leftAlignText}>{item?.name}</TinyParagraph>
                                                            </View>
                                                            <View style={styles.verticleDottedLine} />
                                                            <View style={{ width: wp(15) }} >
                                                                <TinyParagraph style={styles.centerAlignText}>{item?.age}</TinyParagraph>
                                                            </View>
                                                            <View style={styles.verticleDottedLine} />
                                                            <View style={{ width: wp(30) }} >
                                                                <TinyParagraph style={styles.leftAlignText}>{item?.phone}</TinyParagraph>
                                                            </View>
                                                            <View style={styles.verticleDottedLine} />
                                                            <View style={{ width: wp(15) }} >
                                                                <TinyParagraph style={styles.centerAlignText}>{item?.session_count || '0'}</TinyParagraph>
                                                            </View>
                                                            <View style={styles.verticleDottedLine} />
                                                            <View style={{ width: wp(40) }} >
                                                                <TinyParagraph style={styles.centerAlignText}>{item?.cnic || '0'}</TinyParagraph>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                        :
                                                        <TouchableOpacity onPress={() => handlePatientClick(item)} style={styles.tableRowContainer}>
                                                            <View style={{ width: wp(30) }} >
                                                                <TinyParagraph style={styles.leftAlignText}>{item?.name}</TinyParagraph>
                                                            </View>
                                                            <View style={styles.verticleDottedLine} />
                                                            <View style={{ width: wp(15) }} >
                                                                <TinyParagraph style={styles.centerAlignText}>{item?.age}</TinyParagraph>
                                                            </View>
                                                            <View style={styles.verticleDottedLine} />
                                                            <View style={{ width: wp(30) }} >
                                                                <TinyParagraph style={styles.leftAlignText}>{item?.phone}</TinyParagraph>
                                                            </View>
                                                            <View style={styles.verticleDottedLine} />
                                                            <View style={{ width: wp(15) }} >
                                                                <TinyParagraph style={styles.centerAlignText}>{item?.session_count || '0'}</TinyParagraph>
                                                            </View>
                                                            <View style={styles.verticleDottedLine} />
                                                            <View style={{ width: wp(40) }} >
                                                                <TinyParagraph style={styles.centerAlignText}>{item?.cnic || '0'}</TinyParagraph>
                                                            </View>
                                                        </TouchableOpacity>
                                                }
                                            </ScrollView>
                                        }
                                    /> */}
              </View>
            )}
          </ScrollView>
        </Col>
      </Container>
    </Col>
  );
};

export default Home;
