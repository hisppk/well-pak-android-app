import { Colors, Fonts } from 'globals'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { logout } from 'store/auth/AuthActions'
import { wp } from 'utils/helpers/responsive.helpers'
import Icon from './Icon'
import Row from './Row'
import { SmallParagraph } from './text'

export const Logout = () => {
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout() as unknown as any)
    }
    return (
        <TouchableOpacity onPress={handleLogout} >
            <Row center noFlex>
                <Icon type="logout" size={wp(5)} />
                <SmallParagraph style={{
                    ...Fonts.bold,
                    marginLeft: wp(2.4),
                    color: Colors.white
                }} >
                    LogOut
                </SmallParagraph>
            </Row>
        </TouchableOpacity>
    )
}