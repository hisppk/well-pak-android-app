//need to imrove this component to support background graient color as well as header of app
import React, { useEffect } from 'react'
import { Animated } from 'react-native'
import styled from 'styled-components'
import LinearGradient from 'react-native-linear-gradient'
import {
  KeyboardAvoidingView,
  StatusBar,
  ScrollView,
  Platform,
  View
} from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'
import { Colors, Layout } from 'globals'
import { hp, wp } from 'utils/helpers/responsive.helpers'

const Container = styled.View`
  ${props => props.pad && `backgroundColor: ${props.pad}`};
  ${props => props.bg && `backgroundColor: ${props.bg}`};
  ${props => props.spaceBetween && `justify-content: space-between`};
  ${props => props.endAll && `justify-content: flex-end`};
`

export const AppBackground = (props) => {
  return (
    <>
      {props?.gradientBg ?
        <LinearGradient
          colors={[Colors.lightGreen, Colors.darkGreen]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.3 }}
          {...props}
        >
          {props.children}
        </LinearGradient>
        :
        <View style={{
          width: Layout.full,
          height: Layout.full,
          backgroundColor: Colors.appBackground
        }}>
          {props.children}
        </View>
      }
    </>
  )
}

const MyContainer = (props) => {

  const animated = new Animated.Value(-hp(props?.bigCircle ? 118 : 49));
  const duration = 300;
  useEffect(() => {
    Animated.timing(animated, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true,
    }).start()
  }, []);

  const isAndroid = Platform.OS === 'android'

  return (
    <AppBackground {...props}>
      <KeyboardAvoidingView
        behavior={isAndroid ? undefined : 'padding'}
        keyboardVerticalOffset={useHeaderHeight() + StatusBar!.currentHeight!}

      >
        {
          !props.hideHeader && props.animatedHeader ?
            <Animated.View style={[{ transform: [{ translateY: animated }] }]}>
              <View style={{
                width: wp(props?.bigCircle ? 100 + 50 : 100),
                height: hp(props?.bigCircle ? 100 + 50 : 71),
                borderRadius: wp(props?.bigCircle ? 100 + 10 : 100),
                position: 'absolute',
                top: -hp(props?.bigCircle ? 118 : 49),
                left: -wp(props?.bigCircle ? 25 : 0),
                backgroundColor: Colors.darkAppBackground,
              }}
              />
            </Animated.View>
            : !props.hideHeader &&
            <View style={{
              width: wp(props?.bigCircle ? 100 + 50 : 100),
              height: hp(props?.bigCircle ? 100 + 50 : 71),
              borderRadius: wp(props?.bigCircle ? 100 + 10 : 100),
              position: 'absolute',
              top: -hp(props?.bigCircle ? 118 : 49),
              left: -wp(props?.bigCircle ? 25 : 0),
              backgroundColor: Colors.darkAppBackground,
            }}
            />
        }
        {props.hasScroll
          ? (
            <ScrollView
              bounces={props.bounces}
              onScroll={props.onScroll}
              scrollEventThrottle={props.scrollEventThrottle}
              keyboardShouldPersistTaps={props.persistTaps && 'always'}
            >
              <Container {...props} />
            </ScrollView>
          ) : (
            <Container {...props} />
          )
        }
      </KeyboardAvoidingView>
    </AppBackground>
  )
}

export default MyContainer
