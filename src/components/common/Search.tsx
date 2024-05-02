import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import colors from '../../themes/colors';
import TextInput from './TextInput';
import Icon from './Icon';

interface ISearchProps {
  value: string;
  handleSearch: (value: string) => void
}

const Search = ({value, handleSearch}: ISearchProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.textInputWrapper}>
        <TextInput 
          style={{flex: 1}}
          placeholder='Search'
          value={value}
          onChangeText={text => handleSearch(text)} />
          {value !== '' &&
            <TouchableOpacity 
              onPress={() => handleSearch('')}>
              <Icon type='material' name='clear' size={20} />
            </TouchableOpacity>
          }
      </View>
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.lightGray2
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

export default Search;