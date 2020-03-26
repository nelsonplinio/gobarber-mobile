import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
// takeLastes observa uma action do redux e redireciona ela para a função que e o segundo parametro.

import api from '~/services/api';

import { signInSuccess, signUpSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  const { email, password } = payload;

  try {
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    // Adicionando o token do  usuário logado em todas as requisições.
    api.defaults.headers.Authorization = `Bearer ${token}`;

    if (user.provider) {
      Alert.alert(
        'Erro no login',
        'O usuário não pode ser prestador de serviços.'
      );
      return;
    }

    yield put(signInSuccess(token, user));

    // history.push('/dashboard');
  } catch (error) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um error no login, verifique seus dados'
    );
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
    });
    Alert.alert('Criação de conta', `Conta criada com sucesso ${name}.`);
    yield put(signUpSuccess());

    // history.push('/');
  } catch (error) {
    Alert.alert(
      'Falha no cadastro',
      'Houve uma erro no cadastro, verifique seus dados!'
    );
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) {
    return;
  }

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  // history.push('/');/
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
