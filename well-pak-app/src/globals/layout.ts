import {Dimensions, PixelRatio, Platform, StatusBar} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const smallFormFactorMaxHeight = 620;

export const Layout = {
  window: {
    width,
    height,
    bottom: height - height * 0.86,
    top: 100,
  },
  screen: {
    headerHeight: 62,
    controlsHeight: 31,
    isOfSmallFormFactor: height < smallFormFactorMaxHeight,
    minContentHeight: height * 0.92,
  },

  /**
   * Incremental sizes
   * used for margin, padding
   */
  zero: 0,
  tiny: 2,
  micro: 5,
  mini: 10,
  small: 15,
  medium: 20,
  large: 25,
  xlarge: 27,
  xxlarge: 40,
  xxxlarge: 80,

  /**
   * Dimensional sizes in percentage
   */
  zeroWidth: '0%',
  half: '50%',
  full: '100%',

  /**
   * Loader Width
   */
  loaderWidth: '15%',
  loaderContainerWidth: '85%',

  /**
   * Width of screen
   */
  widthWithMiniPadding: '90%',

  /**
   * Position of an element
   */
  absolutePosition: 'absolute' as 'absolute',
  relativePosition: 'relative' as 'relative',

  /**
   * Border sizes
   */
  extraThin: 0.3,
  thin: 1,
  thick: 2,
  extraThick: 3,

  /**
   * Radius sizes
   */
  radius: {
    tiny: 2,
    micro: 4,
    mini: 6,
    small: 8,
    medium: 10,
    large: 12,
    xlarge: 14,
    xxlarge: 20,
    xxxlarge: 30,
  },

  /**
   * Z-indexes
   */
  zIndex: {
    hide: 0,
    visible: 1,
    tiny: 2,
    mini: 6,
    small: 8,
    medium: 10,
    large: 12,
    xlarge: 14,
    xxlarge: 20,
    xxxlarge: 30,
  },
  /**
   * image, video aspect ratios
   */
  media: {
    aspectRatio21: 2,
    aspectRatio32: 3 / 2,
    aspectRatio43: 4 / 3,
    aspectRatio169: 16 / 9,
  },
  /**
   * Offset for avoiding keyboard
   */
  keyboardVerticalOffset: {
    small: 50,
    medium: 100,
    large: 150,
    xlarge: 200,
  },

  /**
   * Shadow boxes
   */
  shadowBox: {
    lightestShadow: {
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 4,
      shadowOpacity: 0.1,
      elevation: 3,
    },
    lightShallow: {
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 2,
      shadowOpacity: 0.1,
      elevation: 3,
    },
    shallow: {
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 3,
      shadowOpacity: 0.3,
      elevation: 2,
    },
    lightDropShadow: {
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowRadius: 4,
      shadowOpacity: 0.05,
      elevation: 3,
      marginBottom: 3,
    },
    low: {
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 3,
      shadowOpacity: 0.4,
      elevation: 3,
      marginBottom: 3,
    },
    deep: {
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowRadius: 8,
      shadowOpacity: 0.6,
      elevation: 8,
    },
  },

  /** Text related */
  text: {
    maxNumberOfLines: {
      single: 1,
      heading: 2,
      paragraph: 5,
    },
  },
  /**
   * Textarea
   */
  textarea: {
    height: {
      small: 150,
      medium: 170,
      large: 200,
    },
  },

  /**
   * Predefined values for sizes.
   */
  flagSize: {
    small: 16,
    medium: 24,
    large: 32,
    xlarge: 48,
    // 64 is also valid.
  },

  /**
   * Predefined values for text lineHeights.
   */
  lineHeights: {
    mini: 12,
    small: 18,
    medium: 20,
    large: 28,
    xlarge: 44,
  },

  // Shapes
  shape: {
    circle: {
      width: 60,
      height: 60,
      borderRadius: 60 / 2,
      padding: 10,
    },
    box: {
      borderRadius: 6,
      paddingVertical: 6,
    },
    dropDownBox: {
      borderBottomLeftRadius: 6,
      borderBottomRightRadius: 6,
      paddingBottom: 6,
    },
    button: {
      padding: 0,
      overflow: 'hidden',
      borderRadius: 4,
    },
    buttonGroupFirst: {
      height: 35,
      borderWidth: 1,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      padding: 8,
    },
    buttonGroupLast: {
      height: 35,
      borderWidth: 1,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      padding: 8,
    },
    smallButton: {
      height: 35,
      borderWidth: 1,
      borderRadius: 20,
      paddingHorizontal: 15,
      padding: 2,
    },
    countryFlag: {
      width: 25,
      height: 25,
    },
    chatAvatar: {
      height: 40,
      width: 40,
      borderRadius: 0,
      borderWidth: 0,
    },
    chatUserBubble: {
      marginTop: 0,
      borderWidth: 0,
      padding: 12,
      minHeight: 30,
      maxWidth: width * 0.7,
      borderRadius: 18,
      borderBottomRightRadius: 0,
    },
    chatBotBubble: {
      marginTop: 0,
      borderWidth: 0,
      padding: 12,
      minHeight: 30,
      maxWidth: width * 0.7,
      borderRadius: 18,
      borderBottomLeftRadius: 0,
    },
    infoDial: {
      width: 30,
      height: 30,
      margin: 8,
      containerWidth: 80,
    },
  },
  card: {
    pharmacyFill: {
      cardHeight: 250,
      statusRowHeight: 40, // considering topBar height (Layout.small)
      detailsRowHeight: 145,
      ctaRowHeight: 55,
      width: width * 0.77,
    },
  },
  lottieIcon: {
    size: {
      medium: 46,
    },
  },
  icon: {
    size: {
      tiny: 5,
      micro: 10,
      mini: 15,
      small: 20,
      medium: 22,
      large: 26,
      xlarge: 32,
      xxlarge: 50,
      huge: 80,
    },
    microCircle: {
      width: 14,
      height: 14,
      borderRadius: 16,
    },
    miniCircle: {
      width: 25,
      height: 25,
      borderRadius: 30 / 2,
    },
    smallCircle: {
      width: 40,
      height: 40,
      borderRadius: 40 / 2,
    },
    mediumCircle: {
      width: 48,
      height: 48,
      borderRadius: 48 / 2,
    },
    largeCircle: {
      width: 52,
      height: 52,
      borderRadius: 52 / 2,
    },
    xlargeCircle: {
      width: 62,
      height: 62,
      borderRadius: 62 / 2,
    },
    xxlargeCircle: {
      width: 100,
      height: 100,
      borderRadius: 100 / 2,
    },
    hugeCircle: {
      width: 120,
      height: 120,
      borderRadius: 120 / 2,
    },
  },
  image: {
    small: {
      height: 30,
      width: 30,
      borderRadius: 0,
      borderWidth: 0,
    },
    medium: {
      height: 40,
      width: 40,
      borderRadius: 0,
      borderWidth: 0,
    },
  },
  // Opacity
  opacity: {
    opaque: 1,
    tint: 0.8,
    translucent: 0.6,
    transparent: 0.2,
  },
  inputHeight: 50,
  isSmallDevice: width < 375,

  /**
   * Animations
   */
  animation: {
    runDuration: {
      cheetah: 100,
      greyhound: 500,
      horse: 800,
      kangaroo: 1000,
      camel: 2000,
      human: 3000,
      koala: 5000,
      snail: 6000,
    },
  },

  /**
   * Calculate App Responsive Units to make UI responsive on all of (Small And Large) devices
   */

  /**
   * Converts provided width percentage to independent pixel (dp).
   * @param  {string} widthPercent The percentage of screen's width that UI element should cover
   *                               along with the percentage symbol (%).
   * @return {number}              The calculated dp depending on current device's screen width.
   */
  widthPercentageToDP: (widthPercent: number | string) => {
    // Parse string percentage input and convert it to number.
    const elemWidth =
      typeof widthPercent === 'number'
        ? widthPercent
        : parseFloat(widthPercent);

    // Use PixelRatio.roundToNearestPixel method in order to round the layout
    // size (dp) to the nearest one that correspons to an integer number of pixels.
    return PixelRatio.roundToNearestPixel((width * elemWidth) / 100);
  },

  /**
   * Converts provided height percentage to independent pixel (dp).
   * @param  {string} heightPercent The percentage of screen's height that UI element should cover
   *                                along with the percentage symbol (%).
   * @return {number}               The calculated dp depending on current device's screen height.
   */
  heightPercentageToDP: (heightPercent: number | string) => {
    // Parse string percentage input and convert it to number.
    const elemHeight =
      typeof heightPercent === 'number'
        ? heightPercent
        : parseFloat(heightPercent);

    // Use PixelRatio.roundToNearestPixel method in order to round the layout
    // size (dp) to the nearest one that correspons to an integer number of pixels.
    return PixelRatio.roundToNearestPixel((height * elemHeight) / 100);
  },

  RFPercentage: percent => {
    const {height, width} = Dimensions.get('window');
    const standardLength = width > height ? width : height;
    const offset =
      width > height ? 0 : Platform.OS === 'ios' ? 78 : StatusBar.currentHeight; // iPhone X style SafeAreaView size in portrait

    const deviceHeight =
      isIphoneX() || Platform.OS === 'android'
        ? standardLength - offset!
        : standardLength;

    const heightPercent = (percent * deviceHeight) / 100;
    return Math.round(heightPercent);
  },

  // guideline height for standard 5" device screen is 680
  RFValue: (fontSize, standardScreenHeight = 680) => {
    const {height, width} = Dimensions.get('window');
    const standardLength = width > height ? width : height;
    const offset =
      width > height ? 0 : Platform.OS === 'ios' ? 78 : StatusBar.currentHeight; // iPhone X style SafeAreaView size in portrait

    const deviceHeight =
      isIphoneX() || Platform.OS === 'android'
        ? standardLength - offset!
        : standardLength;

    const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
    return Math.round(heightPercent);
  },
};
