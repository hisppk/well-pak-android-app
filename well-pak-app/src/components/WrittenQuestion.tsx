import { Colors, Constants, Layout, } from 'globals'
import React, { useEffect, useState } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'

import { Icon, VoiceQuestion } from 'components'
import { AnswerType } from 'screens/assesment-details'
import { hp, wp } from 'utils/helpers/responsive.helpers'
import { Heading4, Paragraph } from './text'
import { startRecodingGlobal } from 'store/auth/AuthActions'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
    questionData?: any,
    questionId: number;
    questionNo: number;
    answerByChoice?: boolean;
    isEditable: boolean;  //this flag is to check if question is already answered and if it's in reading status
    questionText: string;
    setAnswerByChoice?: (value: boolean) => void;
    handleSubmitAnswer: (questionId: string, answer: any, type: AnswerType) => void
}

export const WrittenQuestion = (props: Props) => {
    const { questionId, questionText, isEditable, questionNo, questionData, answerByChoice, setAnswerByChoice, handleSubmitAnswer } = props
    const { isAlreadyRecoding } = useSelector(({ LHW }: any) => LHW.auth);
    const dispatch = useDispatch()
    const [value, setValue] = useState('')
    const [answerByVoice, setAnswerByVoice] = useState<boolean>(false)

    const handleTextChange = (value: string) => {
        setValue(value)

        handleSubmitAnswer(`${questionId}`, value, AnswerType.Text)
    }

    useEffect(() => {
        if (!isEditable) {
            setValue(questionData?.answer?.assisment_answer)
        }
    }, [, questionData?.answer])

    return (
        <View style={{
            marginVertical: hp(3),
            alignSelf: 'center',
            width: Constants.isTablet ? '80%' : Layout.full
        }} >
            <Heading4 style={{
                color: Colors.white,
            }} >
                {`Question ${questionNo}`}
            </Heading4>
            <Paragraph style={{
                color: Colors.white,
            }} >
                {questionText}
            </Paragraph>
            <View style={{
                backgroundColor: Colors.appBackground,
                elevation: 5,
                paddingVertical: hp(1),
                paddingHorizontal: wp(2),
                borderRadius: wp(2),
                shadowColor: Colors.black,
                shadowOpacity: 0.2,
                marginHorizontal: wp(1),
                shadowRadius: wp(2),
                flexDirection: 'row',
                alignItems: 'center',
                shadowOffset: {
                    height: 1,
                    width: 1
                }
            }}>
                {
                    // if user has already submited and is in view mode then check if he answere as voice
                    (!isEditable && questionData?.answer?.answer_type === AnswerType.Audio) ?
                        <VoiceQuestion
                            isAnsweredDisplayPlayer={true}
                            isEditable={isEditable}
                            questionData={questionData}
                            questionId={questionData?.id}
                            questionText={questionData?.question}
                            handleSubmitAnswer={handleSubmitAnswer}
                        />
                        : <>
                            {
                                answerByVoice ?
                                    <VoiceQuestion
                                        isAnsweredDisplayPlayer={false}
                                        isEditable={isEditable}
                                        questionData={questionData}
                                        questionId={questionData?.id}
                                        questionText={questionData?.question}
                                        handleSubmitAnswer={handleSubmitAnswer}
                                    />
                                    : <TextInput
                                        value={value}
                                        multiline={true}
                                        editable={isEditable}
                                        placeholder="Please Write Answer Here..."
                                        placeholderTextColor={Colors.white}
                                        style={{
                                            color: Colors.white,
                                            width: '90%',
                                            paddingHorizontal: wp(1),
                                            paddingVertical: hp(1.2)
                                        }}
                                        onChangeText={handleTextChange}
                                    />
                            }
                            {isEditable &&
                                <TouchableOpacity onPress={() => {
                                    //if user was answering using voice and while recording he click on answer by write then make sure to stop recording
                                    if (answerByVoice && isAlreadyRecoding) {
                                        dispatch(startRecodingGlobal(false) as unknown as any)
                                    }

                                    if (setAnswerByChoice && typeof setAnswerByChoice === 'function' && !answerByChoice && answerByVoice) {
                                        setAnswerByChoice(true)
                                    } else {
                                        setAnswerByVoice(!answerByVoice)
                                    }
                                }} style={{
                                    padding: wp(1.4),
                                    borderRadius: wp(100),
                                    backgroundColor: Colors.white
                                }} >
                                    <Icon type={answerByVoice ? 'typing' : 'start-record'} size={wp(Constants.isTablet ? 3 : 5)} />
                                </TouchableOpacity>
                            }
                        </>
                }
            </View>
        </View>
    )
}