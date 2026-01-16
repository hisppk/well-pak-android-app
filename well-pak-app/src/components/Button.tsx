import React from 'react';
import styled from 'styled-components';
import {buttonStyles} from '../styles';
import {MyText, Paragraph} from 'components';
import {Colors, Fonts} from 'globals';
import {ActivityIndicator} from 'react-native';
const StyledButton = styled.TouchableOpacity`
  ${props => buttonStyles(props)}
`;
const MyButton = props => {
  const {onClick, disabled, color, black, text, loading} = props;
  return (
    <StyledButton onPress={() => !loading && onClick()} {...props}>
      {loading ? (
        <ActivityIndicator size={'small'} color={Colors.white} />
      ) : (
        props.text && (
          <Paragraph
            style={{
              ...Fonts.bold,
              fontSize: props?.fontSize || Fonts.paragraph.fontSize,
              color: disabled
                ? '#00000042'
                : color || (black ? '#ffffff' : '#000000'),
              marginBottom: 0,
            }}>
            {text}
          </Paragraph>
        )
      )}
    </StyledButton>
  );
};

export default MyButton;
