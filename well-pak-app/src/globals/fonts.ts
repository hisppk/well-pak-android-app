import {PixelRatio, Platform} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const primaryFont = 'Montserrat-Regular';
const secondaryFont = 'Montserrat-Medium';
const lightFont =
  Platform.OS === 'ios' ? 'Montserrat-ExtraLight' : 'montserrat-extra-light';

export const fontScale = PixelRatio.getFontScale();

/**
 * Note.
 * In order to handle font scaling gracefully, all font styles with
 * "fontSize" prop must have one of these
 * (fontScaleEquilizer or fontScaleFactor) multipliers
 */

/** Use for styles that should NOT scale based on device font size */
const fontScaleEquilizer = 1 / fontScale;

/** Use for styles that should scale  based on device font size */
export const fontScaleFactor = 1 - Math.log10(fontScale);

export const Fonts = {
  heading1: {
    fontFamily: primaryFont,
    fontSize: RFValue(34) * fontScaleEquilizer,
  },
  heading2: {
    fontFamily: `${primaryFont}`,
    fontSize: RFValue(26) * fontScaleEquilizer,
  },
  heading3Regular: {
    fontFamily: `${primaryFont}`,
    fontSize: RFValue(21) * fontScaleEquilizer,
    letterSpacing: 0,
  },
  heading3: {
    fontFamily: `${secondaryFont}`,
    fontSize: RFValue(21) * fontScaleEquilizer,
    letterSpacing: 1,
    // textTransform: 'uppercase' // Why react native dont support this but doc says so otherwise
  },
  heading4: {
    fontFamily: `${secondaryFont}`,
    fontSize: RFValue(18) * fontScaleEquilizer,
  },
  heading5: {
    fontFamily: `${secondaryFont}`,
    fontSize: RFValue(16) * fontScaleEquilizer,
  },
  paragraphLarge: {
    fontFamily: `${primaryFont}`,
    fontSize: RFValue(18) * fontScaleEquilizer,
  },
  paragraphBold: {
    fontFamily: `${secondaryFont}`,
    fontSize: RFValue(14) * fontScaleFactor,
  },
  paragraph: {
    fontFamily: `${primaryFont}`,
    fontSize: RFValue(14) * fontScaleFactor,
  },
  paragraphSmall: {
    fontFamily: `${primaryFont}`,
    fontSize: RFValue(12) * fontScaleFactor,
  },
  paragraphTiny: {
    fontFamily: `${primaryFont}`,
    fontSize: RFValue(11) * fontScaleFactor,
  },
  paragraphLink: {
    fontFamily: `${primaryFont}`,
    fontSize: RFValue(14) * fontScaleFactor,
    // textTransform: 'uppercase'
  },
  paragraphLinkBold: {
    fontFamily: `${secondaryFont}`,
    fontSize: RFValue(14) * fontScaleFactor,
    // textTransform: 'uppercase'
  },
  bold: {
    fontFamily: `${secondaryFont}`,
  },
  regular: {
    fontFamily: `${primaryFont}`,
  },
  micro: {
    fontFamily: `${primaryFont}`,
    fontSize: RFValue(10) * fontScaleFactor,
  },
  microBold: {
    fontFamily: `${secondaryFont}`,
    fontSize: RFValue(12) * fontScaleFactor,
  },
  tertiary: {
    fontFamily: `${lightFont}`,
  },
};
