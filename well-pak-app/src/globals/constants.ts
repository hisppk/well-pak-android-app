import DeviceInfo from 'react-native-device-info'
class _Constants {
  /**
   * Durations in millisecs
   */
  readonly duration = {
    extraShort: 250,
    short: 500,
    medium: 1000,
    long: 2000,
    extraLong: 6000,
  };
  readonly commaSeparator = ',';
  readonly REGEX_EMAIL = {
    production: /^\s*\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.[a-zA-Z0-9\-]{2,})+\s*$/,
    other: /^\s*\w+([\.\+-]?\w+)*@\w+([\.-]?\w+)*(\.[a-zA-Z0-9\-]{2,})+\s*$/,
  };
  readonly REGEX_SHORT_NAME = /^[A-Za-z0-9-]{1,}$/;
  readonly REGEX_LONG_NAME =
    /^\s*[A-Za-z]['\-,.]*[^0-9_!¡?÷?¿\/\\+=@#$%ˆ&*(){}|~<>;:[\]\s]*[A-Za-z]\s*$/;
  readonly REGEX_USA_CELL_NUMBER = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  readonly REGEX_CHECK_EMPTY_STRING = /^(?!\s*$).+/;

  // updated to atleast 1 alpha, 1 numeric, min 6 char length, special char optional
  readonly REGEX_PASSWORD =
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!-\/:-@\[-`{-~\s]{6,}$/;
  readonly REGEX_SIX_DIGIT_CODE = /([0-9]|[a-z]){6}/i;
  readonly REGEX_PHONE_NUMBER = /^[0-9()\s]{1,}$/;
  readonly REGEX_BUSINESS_NAME =
    /^(?!\s)(?!.*\s$)(?=.*[a-zA-Z0-9])[a-zA-Z0-9 \u2019'~\-&]{4,}$/;
  readonly REGEX_STREET_ADDRESS = /^[\w\s,.'-\/]{5,}$/;
  readonly REGEX_OTP = /^\d{6}$/;
  readonly REGEX_SPLIT_WORDS = /[\s,]+/;
  readonly REGEX_US_ZIP = /\d{5}([\-]?\d{4})?/;
  readonly DEBOUNCE_DELAY = 400;

  readonly isTablet = DeviceInfo.isTablet();

  /** Search */
  readonly Search = {
    DefaultResultsLimit: 10,
    StartPageNumber: 1,
  };
  readonly DEFAULT_ON_END_REACHED_THRESHOLD = 0.5;
  readonly MIN_LIST_ITEMS_ALLOW_SEARCH_FILTER = 5;
}

export const Constants = new _Constants();
