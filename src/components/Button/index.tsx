import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Label } from './styles';

interface Props extends TouchableOpacityProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const Button: React.FC<Props> = ({ children, left, right, ...props }) => {
  return (
    <Container {...props}>
      {left}
      <Label>{children}</Label>
      {right}
    </Container>
  );
};

Button.defaultProps = { left: null, right: null };

export default Button;
