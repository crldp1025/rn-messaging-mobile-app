import React from 'react';
import Container from '../components/common/Container';
import ChatList from '../components/chat/ChatList';
import Text from '../components/common/Text';

const ChatScreen = () => {
  return (
    <Container>
      <ChatList />
    </Container>
  );
};

export default ChatScreen;