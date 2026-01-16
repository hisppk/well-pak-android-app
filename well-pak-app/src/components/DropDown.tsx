import { Colors, Fonts, Layout } from 'globals';
import React, { useEffect, useRef, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Modal,
    View,
    TouchableHighlight,
    StyleProp,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { wp } from 'utils/helpers/responsive.helpers';
import { Conditional } from './Conditional';
import { LargeParagraph, Micro, Paragraph, SmallParagraph } from './text';

interface IProps {
    defaultLabel?: string;
    data: Array<IDropDownItem>;
    placeHolder?: string;
    dropDownLabel?: string;
    rightIcon?: React.ReactElement;
    rightIconColor?: string;
    selectedItem?: IDropDownItem | undefined;
    placeHolderStyles?: StyleProp<TextStyle>;
    listItemStyles?: StyleProp<TextStyle>;
    containerStyles?: StyleProp<ViewStyle>;
    dropDownListStyles?: StyleProp<ViewStyle>;
    dropDownLabelTextStyles?: StyleProp<TextStyle>;
    selectedItemTextStyles?: StyleProp<TextStyle>;
    onSelect: (item: IDropDownItem) => void;
}

export interface IDropDownItem {
    label?: string;
    value?: string;
}

export const Dropdown = ({ defaultLabel, data, placeHolder, rightIcon, rightIconColor, selectedItem, selectedItemTextStyles, dropDownListStyles, containerStyles, placeHolderStyles, listItemStyles, dropDownLabel, dropDownLabelTextStyles, onSelect }: IProps) => {
    const DropdownButton = useRef<any>();
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState<IDropDownItem>(selectedItem!);
    const [dropdownTop, setDropdownTop] = useState(0);

    useEffect(() => {
        setSelected(selectedItem!)
    }, [selectedItem])

    const toggleDropdown = () => {
        visible ? setVisible(false) : openDropdown();
    };

    const openDropdown = () => {
        DropdownButton.current.measure((_fx: number, _fy: number, _w: number, h: number, _px: number, py: number) => {
            setDropdownTop((py + h) - 10);
        });
        setVisible(true);
    };

    const onItemPress = (item: IDropDownItem) => {
        setSelected(item);
        onSelect(item);
        setVisible(false);
    };

    const renderItem = (item: IDropDownItem) => (
        <TouchableHighlight underlayColor={Colors.lightGreen} style={styles.item} onPress={() => onItemPress(item)}>
            <SmallParagraph style={[styles.dropDownItem, listItemStyles]} >
                {item.label!}
            </SmallParagraph>
        </TouchableHighlight>
    );

    const renderDropdown = () => {
        return (
            <Modal visible={visible} transparent animationType="none">
                <TouchableOpacity
                    style={styles.overlay}
                    onPress={() => setVisible(false)}
                >
                    <View style={[styles.dropDownList, { top: dropdownTop }, dropDownListStyles]}>
                        <FlatList
                            data={data}
                            renderItem={({ item }) => renderItem(item)}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    };

    const dropDownMessage = selected ? selected?.label : defaultLabel
    const RenderDefaultDropDown = (
        <Paragraph style={[styles.dropDownText, selectedItemTextStyles, { ...Fonts.bold }]}>
            {dropDownMessage!}
        </Paragraph>
    )

    const RenderDropDownWithPlaceHolder = (
        <>
            <Conditional ifTrue={selected} elseChildren={<Micro style={[styles.dropDownText, placeHolderStyles]}>{placeHolder}</Micro>} >
                <Paragraph style={[styles.dropDownText, selectedItemTextStyles, { ...Fonts.bold }]}>
                    {selected && selected?.label!}
                </Paragraph>
            </Conditional>
        </>
    )

    return (
        <>
            <Conditional ifTrue={dropDownLabel} >
                <LargeParagraph style={[{ ...Fonts.bold, }, dropDownLabelTextStyles]} >
                    {dropDownLabel}
                </LargeParagraph>
            </Conditional>

            <TouchableOpacity
                ref={DropdownButton}
                style={[styles.dropDown, containerStyles]}
                onPress={toggleDropdown}
                activeOpacity={0.6}
            >
                {renderDropdown()}

                <Conditional ifTrue={placeHolder} elseChildren={RenderDefaultDropDown}>
                    {RenderDropDownWithPlaceHolder}
                </Conditional>

                <Conditional ifTrue={rightIcon} >
                    {rightIcon!}
                </Conditional>

            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    dropDown: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.inputFieldsBg,
        zIndex: 1,
    },
    dropDownItem: {
        marginBottom: Layout.zero,
        paddingVertical: Layout.tiny
    },
    dropDownText: {
        flex: 1,
        color: Colors.white
    },
    dropDownList: {
        backgroundColor: Colors.inputFieldsBg,
        marginHorizontal: wp(5),
        width: '90%'
    },
    overlay: {
        width: Layout.full,
        height: Layout.full,
    },
    item: {
        paddingHorizontal: Layout.mini,
        paddingVertical: Layout.mini,
    }
});
