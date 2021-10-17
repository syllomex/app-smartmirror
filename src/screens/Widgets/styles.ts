import styled from 'styled-components/native';
import { colors } from '../../assets/colors';
import rem from '../../utils/rem';

export const Container = styled.View`
  flex: 1;
  padding: ${rem(2)};
  padding-top: ${rem(3)};
`;

export const Description = styled.Text`
  font-family: 'Quicksand-Regular';
  font-size: ${rem(1.4)};
  color: ${colors.text_light_1};

  margin: ${rem(2.4)} 0;
`;

export const WidgetContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: ${rem(0.8)} 0;
`;

export const WidgetLabel = styled.Text`
  font-family: 'Quicksand-Regular';
  font-size: ${rem(1.4)};
  color: ${colors.text_light_1};
`;
