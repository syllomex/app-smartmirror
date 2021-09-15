import styled from 'styled-components/native';

import { colors } from '../../assets/colors';
import rem from '../../utils/rem';

export const Container = styled.TouchableOpacity`
  background-color: ${colors.light_1};
  border-radius: ${rem(2)};
  padding: ${rem(1.2)};

  flex-direction: row;

  justify-content: center;
  align-items: center;
`;

export const Label = styled.Text`
  font-family: 'Quicksand-Regular';
  color: ${colors.text_darK_1};
  font-size: ${rem(1.4)};

  text-align: center;
`;
