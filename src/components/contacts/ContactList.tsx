import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import colors from '../../themes/colors';
import ContactListItem from './ContactListItem';
import Search from '../common/Search';
import { useAppSelector } from '../../tools/hooks';

const ContactHeader = () => {
  const [searchContact, setSearchContact] = useState<string>('');

  return (
    <Search 
      value={searchContact}
      handleSearch={value => setSearchContact(value)} />
  );
};

const ContactList = () => {
  const {contacts} = useAppSelector((state) => state.contacts);

  return (
    <FlatList
      data={contacts}
      keyExtractor={(item) => item.email}
      ListHeaderComponent={ContactHeader}
      renderItem={({item, index}) => <ContactListItem key={index} data={item} />}
      ItemSeparatorComponent={() => <View style={styles.itemSeparator}></View>}
    />
  );
};

const styles = StyleSheet.create({
  itemSeparator: {
    height: 1,
    backgroundColor: colors.lightGray2
  }
});

export default ContactList;