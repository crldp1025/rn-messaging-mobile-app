import firestore from '@react-native-firebase/firestore';
import { useAppSelector } from '../tools/hooks';
import { IUserProps } from '../interfaces/User';

const contactsRef = firestore().collection('Contacts');

export const handleContactListener = (userId: string) => {
  let userContacts: IUserProps[] = [];
  
  contactsRef
  .where('userId', '==', userId)
  .onSnapshot(async (contactsSnapshot) => {
    if(contactsSnapshot.size > 0) {
      Promise.all(contactsSnapshot.docs[0].data().contacts.map(async (item: string) => {
        await new Promise(async resolve => {
          const user = await firestore().collection('Users').doc(item).get();
          if(user.exists) {
            if(user.exists) userContacts.push(user.data() as IUserProps);
          }

          resolve(true);
        }).catch(error => {
          console.log('error', error);
        });
        // throw new Error('Something went wrong!');
      })).then(() => {
        console.log('Contacts', userContacts);
      }).catch(error => {
        console.log(error)
      });
    }
  });
}