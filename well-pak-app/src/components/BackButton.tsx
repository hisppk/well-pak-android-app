import { Colors, Constants } from 'globals'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { hp, wp } from 'utils/helpers/responsive.helpers'
import Box from './Box'
import Icon from './Icon'

type Props = {
    navigation: any
}

export const BackButton = (props: Props) => {
    const { navigation } = props
    const handleGoBack = () => {
        if (navigation?.canGoBack()) {
            navigation?.goBack()
        }
    }

    return (
        <TouchableOpacity onPress={handleGoBack} >
            <Box appShadow bg={Colors.appBackground} hasRadius={`${wp(100)}px`} pad={` ${wp(2.5)}px ${wp(2)}px`} >
                <Icon type="back-arrow" width={wp(Constants.isTablet ? 3.5 : 5)} height={hp(Constants.isTablet ? 3.2 : 1.8)} />
            </Box>
        </TouchableOpacity>
    )
}