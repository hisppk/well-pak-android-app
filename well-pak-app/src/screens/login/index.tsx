import React, {useState} from 'react';

import {AuthInput, Button, Col, Container} from 'components';
import {Colors} from 'globals';
import {hp} from 'utils/helpers/responsive.helpers';
import {useDispatch, useSelector} from 'react-redux';
import {submitLogin} from 'store/auth/AuthActions';
import {AnyAction} from 'redux';
import Icon from 'components/Icon';
import {ScreenProps} from 'screens/types';
import {RFValue} from 'react-native-responsive-fontsize';
import {Alert} from 'react-native';

const Login = (props: ScreenProps<'Login'>) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const {patients, loading} = useSelector(({LHW}: any) => LHW.auth);

  const handleLogin = () => {
    if (!(email.length > 0)) {
      return Alert.alert('Please Enter Your Email');
    }
    if (!(password.length > 0)) {
      return Alert.alert('Please Enter Your Password');
    }
    dispatch(submitLogin(email, password) as unknown as AnyAction);
  };

  return (
    <Col>
      <Container
        hasScroll
        animatedHeader
        style={{width: '100%', height: '100%'}}>
        <Col center marg={`${hp(8)}px 0 0 0`}>
          <Icon
            type="logo"
            height={80}
            width={62}
            marg={`0px 0px ${hp(16)}px  0px`}
          />
          <AuthInput title="Email Address" value={email} setValue={setEmail} />
          <AuthInput
            title="Password"
            secure
            value={password}
            setValue={setPassword}
          />
          <Button
            text="Sign In"
            color="white"
            shadow
            hasRadius="100px"
            bg={Colors.appBackground}
            wid="50%"
            loading={loading}
            fontSize={RFValue(12)}
            marg={`${hp(10)}px 0 ${hp(5)}px 0`}
            onPress={handleLogin}
          />
        </Col>
      </Container>
    </Col>
  );
};

export default Login;
