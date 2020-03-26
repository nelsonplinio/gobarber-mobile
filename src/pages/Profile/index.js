import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from '@unform/mobile';

import Background from '~/components/Background';

import {
  Container,
  Title,
  InnerForm,
  Separator,
  FormInput,
  SubmitButton,
} from './styles';

export default function Profile() {
  const profile = useSelector((state) => state.user.profile);

  const formRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const oldPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [data, setData] = useState({});
  function handleSubmit(d) {
    setData(d);
  }

  return (
    <Background>
      <Container>
        <Title>Meu Perfil{data.name}</Title>
        <Form ref={formRef} initialData={profile} onSubmit={handleSubmit}>
          <InnerForm>
            <FormInput
              name="name"
              ref={nameRef}
              icon="person-outline"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Nome completo"
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current.focus()}
            />
            <FormInput
              name="email"
              ref={emailRef}
              icon="mail-outline"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Digite seu e-mail"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
            />

            <Separator />

            <FormInput
              name="oldPassword"
              ref={oldPasswordRef}
              icon="lock-outline"
              secureTextEntry
              placeholder="Digite sua antiga senha"
              returnKeyType="send"
              onSubmitEditing={() => passwordRef.current.focus()}
            />
            <FormInput
              name="password"
              ref={passwordRef}
              icon="lock-outline"
              secureTextEntry
              placeholder="Digite sua nova senha"
              returnKeyType="send"
              onSubmitEditing={() => confirmPasswordRef.current.focus()}
            />
            <FormInput
              name="confirmPassword"
              ref={confirmPasswordRef}
              icon="lock-outline"
              secureTextEntry
              placeholder="Confirme sua senha"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current.submitForm()}
            />
            <SubmitButton onPress={() => formRef.current.submitForm()}>
              Ataualizar
            </SubmitButton>
          </InnerForm>
        </Form>
      </Container>
    </Background>
  );
}
