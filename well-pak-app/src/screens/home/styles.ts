import {StyleSheet} from 'react-native';

import {Colors, Fonts, Layout} from 'globals';
import {hp, wp} from 'utils/helpers/responsive.helpers';

export const styles = StyleSheet.create({
  tableContainer: {
    marginTop: wp(Layout.small - Layout.micro),
    backgroundColor: Colors.darkAppBackground,
    borderRadius: wp(2),
  },
  leftAlignText: {
    textAlign: 'left',
    color: Colors.white,
    paddingLeft: wp(4),
    ...Fonts.bold,
  },
  centerAlignText: {
    textAlign: 'center',
    color: Colors.white,
    ...Fonts.bold,
  },
  tableRowContainer: {
    flexDirection: 'row',
    paddingVertical: hp(1),
    marginVertical: hp(0.3),
    // backgroundColor:  Colors.tableRow,
  },
  verticleDottedLine: {
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 1,
  },
});
