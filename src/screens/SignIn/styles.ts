import styled from 'styled-components/native';

import { colors } from '../../assets/colors';

import google from '../../assets/icons/google.png';
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

export const Title = styled.Text`
  font-family: 'Quicksand-Regular';
  font-size: ${rem(3.6)};
  color: ${colors.text_light_1};

  margin-bottom: ${rem(2.4)};
`;

export const SubTitle = styled.Text`
  font-family: 'Quicksand-Regular';
  font-size: ${rem(1.6)};
  color: ${colors.text_light_1};

  margin-bottom: ${rem(5.6)};
`;

export const GoogleIcon = styled.Image.attrs({ source: google })`
  margin-right: ${rem(1.2)};
`;
