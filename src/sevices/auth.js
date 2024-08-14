import Parse from "parse";

const signUp = async (username, email, password) => {
  const user = new Parse.User();
  user.set("username", username);
  user.set("email", email);
  user.set("password", password);
  try {
    await user.signUp();
    return user.toJSON();
  } catch (err) {
    console.log(err);
  }
};

const login = async (username, password) => {
  const user = new Parse.User();
  user.set("username", username);
  user.set("password", password);
  try {
    await user.logIn();

    return user.toJSON();
  } catch (err) {
    console.log(err);
  }
};

const logOut = async () => {
  try {
    await Parse.User.logOut();
  } catch (err) {
    console.log(err);
  }
};

export { signUp, login, logOut };
