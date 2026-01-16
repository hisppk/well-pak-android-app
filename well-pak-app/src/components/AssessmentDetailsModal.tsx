import { Button } from 'components'
import { Colors } from 'globals'
import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { navigate } from 'screens/navigation'
import { hp, wp } from 'utils/helpers/responsive.helpers'
import Box from './Box'
import { Heading5, SmallParagraph } from './text'

type Props = {
    closeModal: () => void
}

export const AssessmentDetailsModal = (props: Props) => {
    const { closeModal } = props
    return (
        <View style={styles.container}>
            <Box pad={`${hp(5)}px ${wp(4)}px`} bg={Colors.modalBg} hasRadius={`${wp(2)}px`} marg={`0px ${wp(6)}px`} >
                <ScrollView>
                    <Heading5 style={[styles.heading, { textAlign: 'right' }]} >
                        تحقیق اور تعلیم کے زریعے سمجھ میں بہتریم
                    </Heading5>

                    <SmallParagraph style={{ color: Colors.white, textAlign: 'right' }}>
                        تحقیق اور تعلیم کے زریعے سمجھ میں بہتریم
                    </SmallParagraph>
                    <Heading5 style={[styles.heading, { marginTop: hp(3), textAlign: 'right' }]} >
                        تحقیق اور تعلیم کے زریعے سمجھ میں بہتریم
                    </Heading5>
                    <Button
                        text="واپس جا ئیے"
                        color={Colors.white}
                        customShadow={{ ios: '0px 4px 7px rgba(0, 0, 0, 0.2)', android: '6' }}
                        style={{
                            alignSelf: 'center'
                        }}
                        marg={`${hp(5)}px 0px ${hp(3)}px 0px`}
                        hasRadius="100px"
                        bg={Colors.appBackground}
                        onPress={closeModal}
                        fontSize={RFValue(14)} />
                </ScrollView>
            </Box>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: Colors.transparentLightGreen
    },
    heading: {
        color: Colors.white,
    }
});
