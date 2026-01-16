import { Colors, Fonts } from 'globals'
import React from 'react'
import { Modal, TouchableOpacity } from 'react-native'
import { navigate } from 'screens/navigation'
import styled from 'styled-components'
import { hp, wp } from 'utils/helpers/responsive.helpers'
import Icon from './Icon'
import { LargeParagraph } from './text'

const Header = styled.View`
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.2);
    elevation: 8;
    flex-direction:row;
    align-items:center;
    padding: ${hp(1.2)}px ${wp(5)}px;
`

const IdForSessionImdadSession = 7

export const HeaderTitle = () => {

    const handleOpenDetails = () => {
        navigate('SessionImdadDetails', { title: 'سیشن امداد', sessionId: IdForSessionImdadSession, isComplete: false })
    }
    return (
        <TouchableOpacity onPress={handleOpenDetails} >
            <Header
                style={{
                    backgroundColor: Colors.appBackground,
                    borderRadius: 100,
                }}
            >
                <Icon type="lady-worker" size={24} />
                <LargeParagraph style={{ color: Colors.white, marginLeft: wp(3), ...Fonts.bold }} >سیشن امداد</LargeParagraph>
            </Header>
        </TouchableOpacity>
    )
}