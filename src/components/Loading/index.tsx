import React from 'react';
import { ActivityIndicator, Modal } from 'react-native';
import { colors } from '../../assets/colors';

import { Container } from './styles';

type Props = {
  loading?: boolean;
  onRequestClose?: () => void;
};

const Loading: React.FC<Props> = ({ loading, onRequestClose }) => {
  return (
    <Modal
      animationType="fade"
      visible={loading}
      transparent
      onRequestClose={onRequestClose}
    >
      <Container>
        <ActivityIndicator size="large" color={colors.dark_3} />
      </Container>
    </Modal>
  );
};

Loading.defaultProps = {
  loading: true,
  onRequestClose: undefined,
};

export default Loading;
