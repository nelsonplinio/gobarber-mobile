import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import getErroMessages from '~/utils/getErroMessages';
import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

import Background from '~/components/Background';

import {
  Container,
  Scroll,
  InnerForm,
  Separator,
  FormInput,
  SubmitButton,
  LogoutButton,
} from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome e obrigatorio'),
  email: Yup.string()
    .email('Insira um email valido')
    .required('E-mail é obrigatorio'),
});

export default function Profile() {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.user.profile);

  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      console.tron.log(data);
      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, email, oldPassword, password, confirmPassword } = data;
      dispatch(
        updateProfileRequest({
          name,
          email,
          oldPassword,
          password,
          confirmPassword,
        })
      );
    } catch (err) {
      formRef.current.setErrors(getErroMessages(err));
    }
  }

  useEffect(() => {
    formRef.current.setFieldValue('oldPassword', '');
    formRef.current.setFieldValue('password', '');
    formRef.current.setFieldValue('confirmPassword', '');
    formRef.current.setData(profile);
  }, [profile]);

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Background title="Meu Perfil">
      <Container>
        <Scroll>
          <Form ref={formRef} initialData={profile} onSubmit={handleSubmit}>
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
                  formRef.current.getFieldRef('oldPassword').focus()
                }
              />

              <Separator />

              <FormInput
                name="oldPassword"
                icon="lock-outline"
                secureTextEntry
                placeholder="Digite sua antiga senha"
                returnKeyType="send"
                onSubmitEditing={() =>
                  formRef.current.getFieldRef('password').focus()
                }
              />
              <FormInput
                name="password"
                icon="lock-outline"
                secureTextEntry
                placeholder="Digite sua nova senha"
                returnKeyType="send"
                onSubmitEditing={() =>
                  formRef.current.getFieldRef('confirmPassword').focus()
                }
              />
              <FormInput
                name="confirmPassword"
                icon="lock-outline"
                secureTextEntry
                placeholder="Confirme sua senha"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current.submitForm()}
              />
            </InnerForm>
            <SubmitButton onPress={() => formRef.current.submitForm()}>
              Atualizar
            </SubmitButton>
          </Form>
          <LogoutButton onPress={handleLogout}>Sair</LogoutButton>
        </Scroll>
      </Container>
    </Background>
  );
}
