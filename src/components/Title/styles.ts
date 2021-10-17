import styled from 'styled-components/native';
import { colors } from '../../assets/colors';
import rem from '../../utils/rem';

export const Wrapper = styled.View`
  align-items: center;
`;

export const Container = styled.View`
  padding: ${rem(1.6)};
  border-bottom-width: 1px;
  border-color: ${colors.text_light_1};
`;

export const Text = styled.Text`
  font-family: 'Quicksand-Regular';
  font-size: ${rem(2.4)};
  color: ${colors.text_light_1};
`;
