import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signInRequest } from '~/store/modules/auth/actions';

import getErroMessages from '~/utils/getErroMessages';

import logo from '~/assets/logo.png';

import {
  Container,
  Image,
  InnerForm,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

import Background from '~/components/Background';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email valido')
    .required('E-mail é obrigatorio'),
  password: Yup.string().min(6).required('Senha é obrigatorio'),
});

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);

  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      const { email, password } = data;

      dispatch(signInRequest(email, password));
    } catch (err) {
      formRef.current.setErrors(getErroMessages(err));
    }
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <InnerForm>
            <FormInput
              name="email"
              icon="mail-outline"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Digite seu e-mail"
              returnKeyType="next"
              onSubmitEditing={() =>
                formRef.current.getFieldRef('password').focus()
              }
            />
            <FormInput
              name="password"
              icon="lock-outline"
              secureTextEntry
              placeholder="Digite sua senha"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current.submitForm()}
            />
            <SubmitButton
              loading={loading}
              onPress={() => formRef.current.submitForm()}
            >
              Entrar
            </SubmitButton>
          </InnerForm>
        </Form>
        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>Criar conta gratuita</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
