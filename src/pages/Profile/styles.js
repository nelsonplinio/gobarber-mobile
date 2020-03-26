import styled from 'styled-components/native';
import { Platform, Dimensions } from 'react-native';

import Input from '~/components/Input';
import Button from '~/components/Button';

const { width } = Dimensions.get('screen');

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.os === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  align-items: center;
  padding: 0 30px;
`;
export const Title = styled.Text`
  font-size: 24px;
  color: #fff;
  margin-top: 18px;
  margin-bottom: 18px;
  align-self: center;
`;

export const Image = styled.Image``;

export const InnerForm = styled.View`
  align-self: stretch;
  margin-top: 50px;
  align-items: center;
`;

export const Separator = styled.View`
  background: rgba(255, 255, 255, 0.4);
  width: ${width * 0.8}px;
  height: 1px;
  margin-top: 5px;
  margin-bottom: 15px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
  align-self: stretch;
`;
