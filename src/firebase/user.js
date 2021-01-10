import {firestore} from './config';

export const createUserDocument = async (user) => {
    //get a reference to the Firestore document
    console.log("In the createUserDocument");
    const docRef = firestore.doc(`/users/${user.uid}`);
    console.log("docRef");console.log(docRef);

    //create user objext
    const userProfile = {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        address: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        speciality: '',
        ip: '',
    };

    //Write to Cloud firestore

    return docRef.set(userProfile);
}

export const updateUserDocument = async (user) => {
    console.log("user/userId");console.log(`/user/${user.uid}`);
    const docRef = firestore.doc(`/users/${user.uid}`);
    const updateReq = docRef.update(user);
    console.log(updateReq);
    return updateReq;
}