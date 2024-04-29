import React from 'react';
import Text from '../components/common/Text';
import Container from '../components/common/Container';
import MessageList from '../components/message/MessageList';

const MessageScreen = () => {
  return (
    <Container>
      <MessageList />
    </Container>
  );
};

export default MessageScreen;