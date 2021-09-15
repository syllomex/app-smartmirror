import styled from 'styled-components/native';
import { colors } from '../../assets/colors';
import rem from '../../utils/rem';

export const Container = styled.View`
  background-color: ${colors.light_1};
  padding: ${rem(1)};
  border-radius: ${rem(0.5)};

  justify-content: space-between;
`;

export const TextInput = styled.TextInput`
  font-family: 'Quicksand-Regular';
  color: ${colors.text_darK_1};
  font-size: ${rem(1.4)};
`;
