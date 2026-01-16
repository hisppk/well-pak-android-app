import { StyleSheet, View } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';

import React, { useEffect, useState } from 'react';
import { hp, wp } from 'utils/helpers/responsive.helpers';
import { Colors, Constants, Layout } from 'globals';
import { Heading4, Paragraph } from './text';
import { AnswerType } from 'screens/assesment-details';
import { WrittenQuestion } from './WrittenQuestion';

type Props = {
  questionId: number;
  answeredOptionIndex?: number;
  questionText: string;
  questionNo: number;
  parent_question: number;
  isEditable: boolean;
  questionData: any;
  options: Array<string>;
  handleSubmitAnswer: (
    questionId: string,
    answer: string,
    type: AnswerType,
    value: any,
    quesionNo: any,
    parent_question: any,
  ) => void;
};

const otherOption = 'Other';

export const ChoiceQuestion = (props: Props) => {
  const {
    questionId,
    questionText,
    answeredOptionIndex,
    questionData,
    questionNo,
    parent_question,
    isEditable,
    options,

    handleSubmitAnswer,
  } = props;
  const [answerByChoice, setAnswerByChoice] = useState<boolean>(true);
  const [questionOptions, setQuestionOptions] = useState([
    { label: '', value: 0 },
  ]);

  useEffect(() => {
    const formatedData = options?.map((item, index) => {
      return { label: item, value: index };
    });
    if (isEditable) {
      formatedData.push({
        label: otherOption,
        value: formatedData?.length,
      });
    }
    setQuestionOptions(formatedData);
  }, [options]);

  return (
    <View
      style={{
        marginVertical: hp(3),
        alignSelf: 'center',
        width: Constants.isTablet
          ? answerByChoice
            ? '80%'
            : Layout.full
          : Layout.full,
      }}>
      {answerByChoice && (
        <>
          <Heading4
            style={{
              color: Colors.white,
            }}>
            {`Question ${questionNo}`}
          </Heading4>
          <Paragraph
            style={{
              color: Colors.white,
            }}>
            {questionText}
          </Paragraph>
        </>
      )}
      {answerByChoice ? (
        <View
          style={{
            backgroundColor: Colors.appBackground,
            elevation: 5,
            paddingVertical: hp(1),
            paddingHorizontal: wp(2),
            borderRadius: wp(2),
            shadowColor: Colors.black,
            shadowOpacity: 0.2,
            marginHorizontal: wp(1),
            shadowRadius: wp(2),
            shadowOffset: {
              height: 1,
              width: 1,
            },
          }}>
          <RadioForm
            radio_props={questionOptions}
            initial={answeredOptionIndex || 0}
            buttonColor={Colors.white}
            selectedButtonColor={Colors.white}
            labelStyle={{ color: Colors.white }}
            animation={true}
            disabled={!isEditable}
            onPress={value => {
              //if user is selecting other option and that option is at the last index then display him the option to either write or record
              if (
                questionOptions?.[value]?.label?.toLowerCase() ===
                otherOption?.toLowerCase() &&
                value === questionOptions?.length - 1
              ) {
                setAnswerByChoice(false);
              } else {
                handleSubmitAnswer(
                  `${questionId}`,
                  questionOptions?.[value]?.label,
                  AnswerType.Choice,
                  value,
                  questionNo,
                  parent_question,
                );
              }
            }}
          />
        </View>
      ) : (
        <WrittenQuestion
          questionNo={questionNo}
          answerByChoice={answerByChoice}
          setAnswerByChoice={setAnswerByChoice}
          isEditable={isEditable}
          questionData={questionData}
          questionId={questionData?.id}
          questionText={questionData?.question}
          handleSubmitAnswer={handleSubmitAnswer}
        />
      )}
    </View>
  );
};
