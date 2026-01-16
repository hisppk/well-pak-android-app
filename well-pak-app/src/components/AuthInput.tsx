
import React from 'react'

import { Colors, Constants, Fonts, Layout } from 'globals';
import { TextInput } from 'react-native'
import { hp, wp } from 'utils/helpers/responsive.helpers';
import Col from './Col';
import { SmallParagraph } from './text';

type Props = {
    title: string;
    value: string;
    secure?: boolean;
    setValue: (value: string) => void
}

export const AuthInput = (props: Props) => {
    const { title, value, secure, setValue } = props
    return (
        <Col noFlex wid={Constants.isTablet ? '60%' : "100%"} pad={`0px ${wp(5)}px`} marg={`0px 0px 20px 0px`}>
            <SmallParagraph style={{ color: Colors.white, ...Fonts.bold, marginBottom: Layout.tiny }} >
                {title}
            </SmallParagraph>
            <TextInput
                underlineColorAndroid="transparent"
                secureTextEntry={secure}
                style={{
                    width: '100%',
                    color: Colors.white,
                    height: hp(3.5),
                    paddingHorizontal: wp(2),
                    paddingVertical: Layout.zero,
                    backgroundColor: Colors.inputFieldsBg
                }}
                value={value}
                onChangeText={setValue}
            />
        </Col>
    )
}