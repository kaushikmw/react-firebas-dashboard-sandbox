import firebase from "./config";
import "firebase/auth";
import { createUserDocument } from "./user";

export const signup1 = async ({ firstName, lastName, email, password }) => {
  console.log("In auth");
  console.log(firebase.app().options);
  const resp = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  console.log(`resp:`);console.log(resp);
  const user = resp.user;
  await user.updateProfile({ displayName: `${firstName} ${lastName}` });
  await createUserDocument(user);
  return user;
};

export const Logout = () => {
    return firebase.auth().signOut();
}

export const login = async ({email, password}) => {
    const resp = await firebase.auth().signInWithEmailAndPassword(email, password);
    return resp.user;

}