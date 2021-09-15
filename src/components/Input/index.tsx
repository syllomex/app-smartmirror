import React from 'react';
import { TextInputProps } from 'react-native';
import { colors } from '../../assets/colors';

import { Container, TextInput } from './styles';

type Props = TextInputProps;

const Input: React.FC<Props> = ({ ...props }) => {
  return (
    <Container>
      <TextInput {...props} selectionColor={colors.dark_3} />
    </Container>
  );
};

export default Input;
