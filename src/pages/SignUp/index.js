import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import getErroMessages from '~/utils/getErroMessages';

import { signUpRequest } from '~/store/modules/auth/actions';

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
  name: Yup.string().required('Nome e obrigatorio'),
  email: Yup.string()
    .email('Insira um email valido')
    .required('E-mail é obrigatorio'),
  password: Yup.string().min(6).required('Senha é obrigatorio'),
});

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, email, password } = data;

      dispatch(signUpRequest(name, email, password));
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
              name="name"
              icon="person-outline"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Nome completo"
              returnKeyType="next"
              onSubmitEditing={() =>
                formRef.current.getFieldRef('email').focus()
              }
            />
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
              Cadastra
            </SubmitButton>
          </InnerForm>
        </Form>
        <SignLink onPress={() => navigation.goBack()}>
          <SignLinkText>Já tenho conta</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
};
