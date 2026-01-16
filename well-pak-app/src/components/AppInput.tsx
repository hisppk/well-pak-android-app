import { Colors, Fonts, fontScaleFactor } from 'globals';
import React from 'react'
import { Platform, TextInput } from 'react-native'
import { wp } from 'utils/helpers/responsive.helpers';
import Row from './Row';
import { BoldParagraph } from './text';

type Props = {
    value: string;
    title: string;
    editable: boolean;
    setValue: (value: string) => void;
}

export const AppInput = (props: Props) => {
    const { value, title, editable, setValue } = props
    return (
        <Row noFlex center >
            <BoldParagraph style={{
                color: Colors.white,
                flex: 0.2,
                marginBottom: 0,
            }} >
                {title}
            </BoldParagraph>
            <TextInput
                value={value}
                onChangeText={setValue}
                underlineColorAndroid="transparent"
                editable={editable}
                style={{
                    color: Colors.appBackground,
                    borderRadius: wp(100),
                    backgroundColor: Colors.white,
                    paddingVertical: Platform.OS === 'ios' ? wp(2) : wp(2),
                    paddingHorizontal: wp(3),
                    ...Fonts.bold,
                    fontSize: 16 * fontScaleFactor,
                    flex: 0.8
                }}
            />
        </Row>
    )
}