import styled from 'styled-components/native';
import { colors } from '../../assets/colors';
import rem from '../../utils/rem';

export const Container = styled.View`
  flex: 1;
  padding: ${rem(2)};
  padding-top: ${rem(3)};

  align-items: center;
`;

export const ContentContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const ContentContainerBlock = styled.View`
  align-items: center;
  padding-bottom: ${rem(2.4)};
`;

export const Avatar = styled.Image`
  width: ${rem(7.2)};
  height: ${rem(7.2)};
  border-radius: ${rem(3.6)};

  background-color: ${colors.light_2};
  margin-top: ${rem(2.4)};
`;

export const Name = styled.Text`
  margin-top: ${rem(0.8)};
  font-family: 'Quicksand-Regular';
  font-size: ${rem(1.8)};
  color: ${colors.text_light_1};
`;

export const Email = styled.Text`
  margin-top: ${rem(0.4)};
  font-family: 'Quicksand-Regular';
  font-size: ${rem(1.2)};
  color: ${colors.text_light_1};
`;

export const Logout = styled.Text`
  font-family: 'Quicksand-Regular';
  font-size: ${rem(1.4)};
  color: ${colors.danger};
  margin-top: ${rem(1.8)};
`;
