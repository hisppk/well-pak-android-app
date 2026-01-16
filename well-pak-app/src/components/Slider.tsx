import React from 'react';
import { Slider } from '@miblanchard/react-native-slider';
import { Platform, StyleSheet, View } from 'react-native';
import { SmallParagraph } from './text';
import { hp, wp } from 'utils/helpers/responsive.helpers';
import { Colors, Constants, Fonts } from 'globals';

type Props = {
    value: number,
    setValue: (value: number) => void
}

const Thumb = ({ value }) => {
    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            position: 'absolute',
            top: -hp(Platform.OS === 'ios' ? 6 : 8),
            right: wp(0),
            left: -wp(3.5),
            width: wp(Constants.isTablet ? 6 : 10),
            height: wp(Constants.isTablet ? 6 : 10),
            borderTopLeftRadius: wp(100),
            borderBottomLeftRadius: wp(100),
            borderTopRightRadius: wp(100),
            transform: [
                { rotate: '45deg' },
            ],
        }} >
            <View style={{
                borderRadius: wp(100),
                backgroundColor: Colors.appBackground,
                padding: wp(Constants.isTablet ? 1 : 1.6)
            }} >
                <SmallParagraph style={{
                    color: Colors.white,
                    ...Fonts.bold,
                    transform: [
                        { rotate: '-45deg' },
                    ],
                }} >
                    {Math.floor(value)}
                </SmallParagraph>
            </View>
        </View>
    )
}

export const AppSlider = (props: Props) => {
    const { value, setValue } = props

    return (
        <View style={styles.container}>
            <Slider
                value={value}
                minimumValue={1}
                maximumValue={10}
                onValueChange={value => setValue(value as number)}
                trackStyle={{ backgroundColor: Colors.white }}
                thumbTintColor="red"
                minimumTrackTintColor={Colors.white}
                maximumTrackTintColor={Colors.white}
                renderThumbComponent={() => <Thumb value={value} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: wp(3.4),
        alignItems: 'stretch',
        justifyContent: 'center',
    },
});
