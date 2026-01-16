import { Colors, Layout } from 'globals'
import React from 'react'
import { TextInput } from 'react-native'

import { hp, wp } from 'utils/helpers/responsive.helpers'
import Icon from './Icon'
import Row from "./Row"

type Props = {
    searchText: string,
    setSearchText: (value: string) => void
}

export const PatientSearch = (props: Props) => {
    const { searchText, setSearchText } = props
    return (
        <Row wid='80%' hasRadius={`${wp(100)}px`} bg={Colors.tableRow} pad={`${hp(1.2)}px ${wp(4)}px`} >
            <TextInput
                placeholder="Enter CNIC / NAME ...."
                underlineColorAndroid="transparent"
                placeholderTextColor={Colors.white}
                value={searchText}
                onChangeText={setSearchText}
                style={{
                    display: 'flex',
                    paddingVertical: Layout.zero,
                    flexDirection: 'row',
                    flex: 1,
                    color: Colors.white
                }}
            />
            <Icon type='search' size={24} />
        </Row>
    )
}