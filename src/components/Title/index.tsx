import React from 'react';

import { Container, Text, Wrapper } from './styles';

const Title: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Container>
        <Text>{children}</Text>
      </Container>
    </Wrapper>
  );
};

export default Title;
