import React, { useEffect, useState, memo, useCallback } from 'react';
import { View, Modal, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { hp, wp } from 'utils/helpers/responsive.helpers';
import {
  AppInput,
  AssessmentDetailsModal,
  BackButton,
  BoldParagraph,
  Box,
  Button,
  Col,
  Container,
  HeaderTitle,
  Heading3,
  Icon,
  Logout,
  Row,
  WrittenQuestion,
  ChoiceQuestion,
  Paragraph,
} from 'components';
import { Colors, Constants, Layout } from 'globals';
import { ScreenProps } from 'screens/types';
import { useDispatch, useSelector } from 'react-redux';
import { getAssessmentDetails, submitAssessment } from 'store/auth/AuthActions';
import { RFValue } from 'react-native-responsive-fontsize';

export enum AnswerType {
  Text = 'Text',
  Audio = 'Audio',
  Choice = 'Choice',
}

type Answer = {
  id: string;
  answer: any;
  file: any;
  answer_type: AnswerType;
  answerIndex: any;
  question_no: any;
  parent_question: any;
};

const AssessmentDetails = (props: ScreenProps<'AssessmentDetails'>) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [cnic, setCnic] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [minuts, setMinuts] = useState(0);
  const [hours, setHours] = useState(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Array<Answer>>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isAlreadySubmited, setIsAlreadySubmited] = useState<boolean>(false);

  const { selectedAssessmentDetails, selectedPatient, loading } = useSelector(
    ({ LHW }: any) => LHW.auth,
  );

  useEffect(() => {
    if (props?.route?.params?.isComplete) {
      setIsAlreadySubmited(true);
    } else {
      setIsAlreadySubmited(false);
    }
  }, [props?.route?.params?.isComplete]);

  useEffect(() => {
    dispatch(
      getAssessmentDetails(
        props.route.params.sessionId,
        selectedPatient?.id,
      ) as unknown as any,
    );
  }, [props.route.params.sessionId]);

  useEffect(() => {
    setUserName(selectedPatient?.name);
    setCnic(selectedPatient?.cnic);
  }, [selectedPatient]);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  let timer;
  useEffect(() => {
    timer = setInterval(() => {
      setSeconds(seconds + 1);
      if (seconds === 59) {
        setMinuts(minuts + 1);
        setSeconds(0);
      }
      if (minuts === 59) {
        setHours(hours + 1);
        setMinuts(0);
        setSeconds(0);
      }
    }, 1000);
    return () => clearInterval(timer);
  });

  const handleSubmitAnswer = (
    questionId,
    answer,
    type,
    value,
    quesionNo,
    parent_question,
  ) => {
    if (quesionNo === '4' && (value === 4 || value === 5)) {
      Alert.alert('', 'خودکشی کا سوال پوچھیں۔', [
        {
          text: 'OK',
          onPress: () => setShowAnswer(true),
        },
      ]);
    }
    const questionAlreadyAnswered = answers?.find(
      item => item?.id === questionId,
    );
    if (questionAlreadyAnswered) {
      //update exisiting answer
      const newAnswersData = answers?.map((item, index) => {
        if (item?.id === questionId) {
          //update the answere for existing answered question
          const fileTemp = type === AnswerType.Audio ? answer : undefined;
          const answerTemp = type === AnswerType.Audio ? undefined : answer;
          const newItem = {
            ...item,
            answer: answerTemp,
            file: fileTemp,
            answer_type: type,
            answerIndex: ++value,
            question_no: quesionNo,
            parent_question: parent_question,
          };
          return newItem;
        } else {
          return item;
        }
      });
      setAnswers(newAnswersData);
    } else {
      const fileTemp = type === AnswerType.Audio ? answer : undefined;
      const answerTemp = type === AnswerType.Audio ? undefined : answer;
      // add new answer
      setAnswers([
        ...answers,
        {
          id: questionId,
          answer: answerTemp,
          file: fileTemp,
          answer_type: type,
          answerIndex: ++value,
          question_no: quesionNo,
          parent_question: parent_question,
        },
      ]);
    }
  };

  const handleSubmitAssessment = () => {
    const noOfQuestionsThatHaveParentQuestions = selectedAssessmentDetails?.filter((question) => question?.parent_question !== 0);

    // 1. instead of just checking the length need to check with state as well 
    // if user has selected the sucide option then this length should be equal
    // else the total question will be 1 greather then the answers so need to change the contion 
    // if answered for sucide then equal else selectedAssessmentDetails?.length-1 === answers?.length
    const condition = showAnswer ? selectedAssessmentDetails?.length === answers?.length
      : selectedAssessmentDetails?.length - noOfQuestionsThatHaveParentQuestions?.length === answers?.length
    if (condition) {
      const myTime = `${hours < 10 ? '0' + hours : hours} Hours ${minuts < 10 ? '0' + minuts : minuts
        } Minuts ${seconds < 10 ? '0' + seconds : seconds} seconds`;
      const answeredData = {
        patient_id: selectedPatient?.id,
        session_id: selectedAssessmentDetails?.[0]?.session_id,
        assissment_data: answers,
        assessment_time: myTime,
      };
      dispatch(submitAssessment(answeredData) as unknown as any);
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
            {selectedAssessmentDetails?.[0]?.answer === null && (
              <BoldParagraph
                style={{
                  marginTop: hp(3),
                  color: Colors.white,
                  textAlign: 'center',
                }}>
                Assessment Timer {hours < 10 ? '0' + hours : hours} :{' '}
                {minuts < 10 ? '0' + minuts : minuts} :{' '}
                {seconds < 10 ? '0' + seconds : seconds}
              </BoldParagraph>
            )}
          </Box>

          <ScrollView>
            <Row center noFlex marg={`0px 0px ${wp(6)}px 0px`}>
              <Icon type="assesment-title" size={wp(6)} />
              <Heading3
                style={{
                  color: Colors.white,
                  marginBottom: 0,
                  marginLeft: wp(2),
                }}>
                Assessment
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

            {/* slider */}
            <View
              style={{
                marginTop: hp(4),
              }}>
              <BoldParagraph
                style={{
                  marginTop: hp(2),
                  color: Colors.white,
                  textAlign: 'center',
                }}>
                Questionaries
              </BoldParagraph>
            </View>

            {/* quiz */}
            {loading ? (
              <ActivityIndicator
                style={{ marginTop: hp(3) }}
                size={'small'}
                color={Colors.white}
              />
            ) : selectedAssessmentDetails?.length > 0 ? (
              selectedAssessmentDetails?.map((item, index) => {
                switch (item?.question_type) {
                  case 'Text':
                    return (
                      <WrittenQuestion
                        isEditable={!isAlreadySubmited}
                        questionData={item}
                        questionNo={item?.question_number}
                        questionId={item?.id}
                        questionText={item?.question}
                        handleSubmitAnswer={handleSubmitAnswer}
                      />
                    );
                  case 'Multiple Choice':
                    const choicesArray = item?.options?.split('|');
                    const cleanedArray = choicesArray?.map(itm =>
                      itm?.toString()?.toLowerCase()?.trim(),
                    );
                    const answeredOptionIndex = cleanedArray?.indexOf(
                      item?.answer?.assisment_answer
                        ?.toString()
                        ?.toLowerCase()
                        ?.trim(),
                    );

                    if (item?.parent_question === 0) {
                      return (
                        <ChoiceQuestion
                          isEditable={!isAlreadySubmited}
                          questionData={item}
                          questionNo={item?.question_number}
                          questionId={item?.id}
                          answeredOptionIndex={answeredOptionIndex}
                          questionText={item?.question}
                          parent_question={item?.parent_question}
                          options={item?.options?.split('|')}
                          handleSubmitAnswer={handleSubmitAnswer}
                        />
                      );
                    } else if (
                      showAnswer === true &&
                      item?.parent_question !== 0
                    ) {
                      return (
                        <ChoiceQuestion
                          isEditable={!isAlreadySubmited}
                          questionData={item}
                          questionNo={item?.question_number}
                          questionId={item?.id}
                          answeredOptionIndex={answeredOptionIndex}
                          questionText={item?.question}
                          parent_question={item?.parent_question}
                          options={item?.options?.split('|')}
                          handleSubmitAnswer={handleSubmitAnswer}
                        />
                      );
                    }
                }
              })
            ) : (
              <Paragraph style={{ color: Colors.white }}>
                No Results Found
              </Paragraph>
            )}
            {/* submit assessment */}
            {selectedAssessmentDetails?.[0]?.answer === null && (
              <Button
                text="Submit Psyclops"
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
                onPress={handleSubmitAssessment}
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
        <AssessmentDetailsModal closeModal={handleCloseModal} />
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

export default AssessmentDetails;
