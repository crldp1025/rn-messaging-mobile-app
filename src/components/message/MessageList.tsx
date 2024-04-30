import React, { useState } from 'react';
import Text from '../common/Text';
import { FlatList, StyleSheet, View } from 'react-native';
import { messages } from '../../constants/Message';
import MessageListItem from './MessageListItem';
import colors from '../../themes/colors';
import TextInput from '../common/TextInput';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '../common/Icon';

const MessageHeader = () => {
  const [searchMessage, setSearchMessage] = useState<string>('');

  return (
    <View style={styles.headerContainer}>
      <View style={styles.textInputWrapper}>
        <TextInput 
          style={{flex: 1}}
          placeholder='Search'
          value={searchMessage}
          onChangeText={text => setSearchMessage(text)} />
          {searchMessage !== '' &&
            <TouchableOpacity 
              onPress={() => setSearchMessage('')}>
              <Icon type='material' name='clear' size={20} />
            </TouchableOpacity>
          }
      </View>
    </View> 
  );
};

const MessageList = () => {
  
  return (
    <>
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={MessageHeader}
      renderItem={({item, index}) => (
        <MessageListItem key={index} data={item} />
      )}
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: 1,
            backgroundColor: colors.lightGray
          }}></View>
      )}
    />
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 10,
    paddingTop: 10
  },
  textInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    gap: 5,
    backgroundColor: colors.lightGray2,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 10
  }
});

export default MessageList;