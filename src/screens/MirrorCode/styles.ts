import styled from 'styled-components/native';

import { colors } from '../../assets/colors';

import tree from '../../assets/images/tree.png';

import rem from '../../utils/rem';

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${colors.dark_1};
`;

export const BackgroundImage = styled.Image.attrs({ source: tree })`
  position: absolute;
  bottom: 0;
  right: ${rem(-4)};
`;

export const Container = styled.View`
  flex: 1;
  padding: ${rem(2)};

  justify-content: center;

  padding-bottom: 40%;
`;

export const Asterisk = styled.Text.attrs({ children: '***' })`
  font-family: 'Quicksand-Bold';
  font-size: ${rem(6.4)};
  color: ${colors.dark_3};

  text-align: center;
`;

export const Label = styled.Text`
  font-family: 'Quicksand-Regular';
  font-size: ${rem(1.8)};
  color: ${colors.text_light_1};

  text-align: center;

  margin-bottom: ${rem(1.6)};
`;

export const LogoutContainer = styled.TouchableOpacity`
  padding: ${rem(2.4)};
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
`;

export const LogoutText = styled.Text`
  font-family: 'Quicksand-Regular';
  color: ${colors.text_light_1};
  padding-right: ${rem(0.8)};
`;
