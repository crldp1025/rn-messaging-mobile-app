import React from 'react';
import Container from '../components/common/Container';
import Text from '../components/common/Text';
import { StyleSheet, View } from 'react-native';
import TextInput from '../components/common/TextInput';
import colors from '../themes/colors';
import Button from '../components/common/Button';

const EditProfileScreen = () => {
  return (
    <Container style={styles.container}>
      <View style={styles.form}>
        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.textInputWrapper}>
            <TextInput
              placeholder='crldp1025@gmail.com' />
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>First Name</Text>
          <View style={styles.textInputWrapper}>
            <TextInput
              placeholder='Carlo' />
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Last Name</Text>
          <View style={styles.textInputWrapper}>
            <TextInput
              placeholder='Papolonias' />
          </View>
        </View>
      </View>
      <View style={[styles.row, styles.bottomContainer]}>
        <Button>
          Update
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  form: {
    flex: 1
  },
  row: {
    marginBottom: 15
  },
  label: {
    paddingHorizontal: 5
  },
  textInputWrapper: {
    backgroundColor: colors.lightGray2,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 5
  },
  bottomContainer: {
    paddingVertical: 10
  }
});

export default EditProfileScreen;