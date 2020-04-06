import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RectButton } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled(LinearGradient).attrs({
  colors: ['#7159c1', '#ab59c1'],
})`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #fff;
  flex: 1;
  text-align: center;
`;

export const Toolbar = styled.View`
  flex-direction: row;
  padding: 18px 8px;
  align-items: center;
  justify-content: space-between;
`;

export const Actions = styled.View`
  min-width: 36px;
`;

export const ActionButton = styled(RectButton)`
  height: 36px;
  width: 36px;
  border-radius: 16px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

export const BackButtonIcon = styled(Icon)``;
