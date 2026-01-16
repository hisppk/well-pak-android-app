import React from 'react';
import styled from 'styled-components'
import { ColorValue, StyleSheet, Text, TextStyle, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Emphasis, ParagraphLinkBoldProps, ParagraphLinkProps, Props, SmallParagraphLinkProps } from './types';

// https://material.io/design/color/text-legibility.html#text-backgrounds
const handleEmphasis = (emph?: Emphasis): ColorValue => {
  switch (emph) {
    case 'low':
      return '#00000061'; // 38%
    case 'high':
      return '#000000DE'; // 87%
    case 'medium':
      return '#00000099'; // 60%
    default:
      return '#000000DE';
  }
};

export const Heading1: Props = (props) => {
  const style = StyleSheet.compose<TextStyle>(
    [styles.heading1, { color: handleEmphasis(props.emphasis) }],
    props.style
  );
  return (
    <Text {...props} allowFontScaling={false} style={style}>
      {props.children}
    </Text>
  );
};
export const Heading2: Props = (props) => {
  const style = StyleSheet.compose<TextStyle>(
    [styles.heading2, { color: handleEmphasis(props.emphasis) }],
    props.style
  );
  return (
    <Text {...props} allowFontScaling={false} style={style}>
      {props.children}
    </Text>
  );
};
export const Heading3: Props = (props) => {
  const style = StyleSheet.compose<TextStyle>(
    [styles.heading3, { color: handleEmphasis(props.emphasis) }],
    props.style
  );
  return (
    <Text {...props} allowFontScaling={false} style={style}>
      {props.children}
    </Text>
  );
};
export const Heading4: Props = (props) => {
  const style = StyleSheet.compose<TextStyle>(
    [styles.heading4, { color: handleEmphasis(props.emphasis) }],
    props.style
  );
  return (
    <Text {...props} allowFontScaling={false} style={style}>
      {props.children}
    </Text>
  );
};

export const Heading5: Props = (props) => {
  const style = StyleSheet.compose<TextStyle>(
    [styles.heading5, { color: handleEmphasis(props.emphasis) }],
    props.style
  );
  return (
    <Text {...props} allowFontScaling={false} style={style}>
      {props.children}
    </Text>
  );
};
export const Paragraph: Props = (props) => {
  const style = StyleSheet.compose<TextStyle>(
    [styles.paragraph, { color: handleEmphasis(props.emphasis) }],
    props.style
  );
  return (
    <Text {...props} allowFontScaling={false} style={style}>
      {props.children}
    </Text>
  );
};
export const LargeParagraph: Props = (props) => {
  const style = StyleSheet.compose<TextStyle>(
    [styles.paragraphLarge, { color: handleEmphasis(props.emphasis) }],
    props.style
  );
  return (
    <Text {...props} allowFontScaling={false} style={style} numberOfLines={props.maxNumberOfLines}>
      {props.children}
    </Text>
  );
};
export const BoldParagraph: Props = (props) => {
  const style = StyleSheet.compose<TextStyle>(
    [styles.paragraphBold, { color: handleEmphasis(props.emphasis) }],
    props.style
  );
  return (
    <Text {...props} allowFontScaling={false} style={style}>
      {props.children}
    </Text>
  );
};
export const SmallParagraph: Props = (props) => {
  const style = StyleSheet.compose<TextStyle>(
    [styles.paragraphSmall, { color: handleEmphasis(props.emphasis) }],
    props.style
  );
  return (
    <Text {...props} allowFontScaling={false} style={style} numberOfLines={props.maxNumberOfLines}>
      {props.children}
    </Text>
  );
};
export const TinyParagraph: Props = (props) => {
  const style = StyleSheet.compose<TextStyle>(
    [styles.paragraphTiny, { color: handleEmphasis(props.emphasis) }],
    props.style
  );
  return (
    <Text {...props} allowFontScaling={false} style={style} numberOfLines={props.maxNumberOfLines}>
      {props.children}
    </Text>
  );
};
export const Micro: Props = (props) => {
  const style = StyleSheet.compose<TextStyle>(
    [styles.micro, { color: handleEmphasis(props.emphasis) }],
    props.style
  );
  return (
    <Text {...props} allowFontScaling={false} style={style}>
      {props.children}
    </Text>
  );
};

export const Heading6: Props = (props) => {
  const style = StyleSheet.compose<TextStyle>(
    [styles.heading6, { color: handleEmphasis(props.emphasis) }],
    props.style
  );
  return (
    <Text {...props} allowFontScaling={false} style={style}>
      {props.children}
    </Text>
  );
};

export const Subtitle1: Props = (props) => {
  const style = StyleSheet.compose<TextStyle>(
    [styles.subtitle1, { color: handleEmphasis(props.emphasis) }],
    props.style
  );
  return (
    <Text {...props} allowFontScaling={false} style={style}>
      {props.children}
    </Text>
  );
};

export const Subtitle2: Props = (props) => {
  const style = StyleSheet.compose<TextStyle>(
    [styles.subtitle2, { color: handleEmphasis(props.emphasis) }],
    props.style
  );
  return (
    <Text {...props} allowFontScaling={false} style={style}>
      {props.children}
    </Text>
  );
};

export const Body1: Props = (props) => {
  const style = StyleSheet.compose<TextStyle>([styles.body1, { color: handleEmphasis(props.emphasis) }], props.style);
  return (
    <Text {...props} allowFontScaling={false} style={style}>
      {props.children}
    </Text>
  );
};

export const Body2: Props = (props) => {
  const style = StyleSheet.compose<TextStyle>([styles.body2, { color: handleEmphasis(props.emphasis) }], props.style);
  return (
    <Text {...props} allowFontScaling={false} style={style}>
      {props.children}
    </Text>
  );
};

export const Button: Props = (props) => {
  const style = StyleSheet.compose<TextStyle>([styles.button, { color: handleEmphasis(props.emphasis) }], props.style);
  return (
    <Text {...props} allowFontScaling={false} style={style}>
      {props.children}
    </Text>
  );
};

export const Caption: Props = (props) => {
  const style = StyleSheet.compose<TextStyle>([styles.caption, { color: handleEmphasis(props.emphasis) }], props.style);
  return (
    <Text {...props} allowFontScaling={false} style={style}>
      {props.children}
    </Text>
  );
};

export const Overline: Props = (props) => {
  const style = StyleSheet.compose<TextStyle>(
    [styles.overline, { color: handleEmphasis(props.emphasis) }],
    props.style
  );
  return (
    <Text {...props} allowFontScaling={false} style={style}>
      {props.children}
    </Text>
  );
};

export const ParagraphLinkBold = (props: ParagraphLinkBoldProps) => {
  return (
    <TouchableOpacity onPress={props?.onPress} style={props?.containerStyle}>
      <Text style={[styles.paragraphLinkBold, props?.style]}>{props?.title}</Text>
    </TouchableOpacity>
  )
}
export const ParagraphLink = (props: ParagraphLinkProps) => {
  return (
    <TouchableOpacity onPress={props?.onPress} style={props?.containerStyle}>
      <Text style={[styles.paragraphLink, props?.style]}>{props?.title}</Text>
    </TouchableOpacity>
  );
}
export const SmallParagraphLink = (props: SmallParagraphLinkProps) => {
  return <Text {...props} onPress={() => props.onPress()} style={[styles.textLink, props.style]} />;
}


// styled component for text
export const MyText = styled.Text`
  ${(props) => props.h1 &&
    `
    font-size: 34px;
    color: #000;
    ${(props) => props}
  `
  };
  ${(props) => props.h2 &&
    `
    font-size: 28px;
    color: #000;
    ${(props) => props}
  `
  };
  ${(props) => props.body16 &&
    `
    font-size: 16px;
    color: #000;
    ${(props) => props}
  `
  };
  ${(props) => props.body17 &&
    `
    font-size: 16px;
    color: #000;
    ${(props) => props}
  `
  };

  background-color: transparent;
  color:  ${(props) => props.color ? props.color : '#000000'};

  ${(props) => props.position && `position: ${props.position}`};
  ${(props) => props.posLeft && `left: ${props.posLeft}`};
  ${(props) => props.posRight && `right: ${props.posRight}`};
  ${(props) => props.posTop && `top: ${props.posTop}`};
  ${(props) => props.posBottom && `bottom: ${props.posBottom}`};
  ${(props) => props.weight && `font-weight: ${props.weight}`};
  ${(props) => props.size && `font-size: ${props.size}`};
  ${(props) => props.center && `text-align: center`};
  ${(props) => props.right && `text-align: right`};
  ${(props) => props.left && `text-align: left`};
  ${(props) => props.marg && `margin: ${props.marg}`};
  ${(props) => props.pad && `padding: ${props.pad}`};
  ${(props) => props.wid && `width: ${props.wid}`};
  ${(props) => props.spacing && `letter-spacing: ${props.spacing}`};
  ${(props) => props.textTransform && `text-transform: ${props.textTransform}`};
  ${(props) => props.textDecorationLine &&
    `text-decoration-line: ${props.textDecorationLine}`
  };
`
