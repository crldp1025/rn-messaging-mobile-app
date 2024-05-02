import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { RootStackParamList } from '../components/common/Navigation';
import Container from '../components/common/Container';
import Profile from '../components/common/Profile';
import Text from '../components/common/Text';
import Button from '../components/common/Button';
import colors from '../themes/colors';
import Icon from '../components/common/Icon';
import { IUserProps } from '../interfaces/User';

const ContactDetailsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'ContactDetails'>>();
  const [user] = useState<IUserProps>(route.params?.data);
  const headerHeight = useHeaderHeight();
  
  return (
    <Container>
      <ScrollView style={{flex: 1, paddingTop: headerHeight + 10}}>
        <Profile user={user} />
        <View>
          <Button
            type='clear'
            align='left'
            color={colors.black}>
            Search Conversation
          </Button>

          <Button
            type='clear'
            align='left'
            color={colors.black}>
            Media, Links and Files
          </Button>

          <Button
            type='clear'
            align='left'
            color={colors.red}>
            Clear Conversation
          </Button>

          <Button
            type='clear'
            align='left'
            color={colors.red}>
            Block
          </Button>
        </View>
      </ScrollView>
    </Container>
  );
};



export default ContactDetailsScreen;