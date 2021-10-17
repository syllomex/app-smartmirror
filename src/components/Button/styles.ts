import styled from 'styled-components/native';

import { colors } from '../../assets/colors';
import rem from '../../utils/rem';

export const Container = styled.TouchableOpacity<{
  theme: 'default' | 'outline';
}>`
  background-color: ${({ theme }) =>
    theme === 'default' ? colors.light_1 : 'transparent'};
  border-radius: ${rem(2)};
  padding: ${rem(1.2)};

  flex-direction: row;

  justify-content: center;
  align-items: center;

  ${({ theme }) =>
    theme === 'outline'
      ? `border-width: 1px; border-color: ${colors.text_light_1}`
      : ''}
`;

export const Label = styled.Text<{ theme: 'default' | 'outline' }>`
  font-family: 'Quicksand-Regular';
  color: ${({ theme }) =>
    theme === 'default' ? colors.text_darK_1 : colors.text_light_1};
  font-size: ${rem(1.4)};

  text-align: center;
`;
