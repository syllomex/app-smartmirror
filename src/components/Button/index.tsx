import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Label } from './styles';

interface Props extends TouchableOpacityProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  theme?: 'default' | 'outline';
}

const Button: React.FC<Props> = ({
  children,
  left,
  right,
  theme,
  ...props
}) => {
  return (
    <Container {...props} theme={theme}>
      {left}
      <Label theme={theme}>{children}</Label>
      {right}
    </Container>
  );
};

Button.defaultProps = { left: null, right: null, theme: 'default' };

export default Button;
