export const signIn = user => {
  return {
    type: "SIGN_IN",
    user
  };
};

// export const signOut = () => dispatch => {
//   firebaseAuth
//     .signOut()
//     .then(() => {
//       // Sign-out successful.
//     })
//     .catch(error => {
//       console.log(error);
//     });
// };
