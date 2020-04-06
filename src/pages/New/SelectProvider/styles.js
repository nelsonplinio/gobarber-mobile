import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
`;

export const ProvidersList = styled.FlatList.attrs({
  numColumns: 2,
  showsVerticalScrollIndicator: false,
})`
  margin-top: 60px;
  padding: 0 20px;
`;

export const Provider = styled(RectButton)`
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  flex: 1;

  align-items: center;
  margin: 0 10px 20px;
  min-height: 150px;
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: #eee;
`;

export const Name = styled.Text`
  margin-top: 15px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  align-self: stretch;
  text-align: center;
`;
