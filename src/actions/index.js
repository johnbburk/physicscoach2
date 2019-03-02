
export const authAction = user => {
  if (user !== null) {
    return {
      type: "SIGN_IN",
      user
    };
  } else {
    return {
      type: "SIGN_OUT",
      user: null
    };
  }
};
