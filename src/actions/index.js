
export const signIn = user => {
  return {
    type: "SIGN_IN",
    user
  };
};

export const signOut =() => {
  return{
    type: "SIGN_OUT",
    user: null
  };

};
