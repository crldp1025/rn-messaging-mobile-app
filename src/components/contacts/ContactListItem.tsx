import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../../themes/colors';
import { RectButton } from 'react-native-gesture-handler';
import Avatar from '../common/Avatar';
import Text from '../common/Text';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IUserProps } from '../../interfaces/User';

interface IContactListItemProps {
  data: IUserProps;
}

const ContactListItem = ({data}: IContactListItemProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  
  return (
    <View>
      <RectButton 
        style={styles.container} 
        onPress={() => navigation.navigate('Conversation', {data})}>
        <View>
          <Avatar 
            name={data.firstName}
            size='sm'
            url={data.avatar} />
        </View>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}> 
              {`${data.firstName} ${data.lastName}`}
            </Text>
          </View>
        </View>
      </RectButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    alignItems: 'center',
    gap: 10
  },
  title: {
    flex: 1,
    fontWeight: '600'
  },
  message: {
    fontSize: 14,
    color: colors.darkGray
  },
  time: {
    fontSize: 13,
    color: colors.darkGray
  },
  rightButton: {
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  }
});

export default ContactListItem;