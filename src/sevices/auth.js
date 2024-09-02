import Parse from "parse";

const signUp = async (username, email, password) => {
  const user = new Parse.User();
  user.set("username", username);
  user.set("password", password);
  user.set("email", email);

  try {
    let newUser = await user.signUp();
    if (newUser) {
      const Profile = Parse.Object.extend("Profile");
      const profile = new Profile();

      profile.set("firstname", username);
      profile.set("lastname", "");

      const newProfile = await profile.save();
      user.set("profileId", newProfile);
      await user.save();
    } else {
      console.log("else is ", newUser);
    }
    await Parse.User.logIn(username, password);
    const sessionToken = Parse.User.current().getSessionToken();
    //assigning new user default role is user
    const query = new Parse.Query(Parse.Role);
    //finding static user role
    query.equalTo("name", "user");
    const role = await query.first({ sessionToken });

    if (role) {
      role.getUsers().add(user);
      await role.save(null, { sessionToken });
    } else {
      console.error("role not found ", role);
    }
    await Parse.User.logOut();
    return user;
  } catch (error) {
    alert(error?.message);
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

function fetchUser() {
  return Parse.User.current();
}

const getProfileData = async () => {
  try {
    let currentUserId = fetchUser();
    let profileId = currentUserId?.get("profileId")?.id;

    // console.log(profileId, currentUserId);

    const Profile = Parse.Object.extend("Profile");
    const query = new Parse.Query(Profile);

    const res = await query.get(profileId);
    return res.attributes;
  } catch (error) {
    console.log(error);
  }
};

const updateProfile = async (userDetails) => {
  try {
    const Profile = Parse.Object.extend("Profile");
    const query = new Parse.Query(Profile);
    const currentUser = fetchUser();
    const profileId = currentUser?.get("profileId")?.id;

    let currentUserEmail = currentUser?.get("email");

    if (userDetails?.email) {
      if (currentUserEmail !== userDetails?.email) {
        currentUser.set("email", userDetails?.email);
        await currentUser.save();
      }
    }

    const profile = await query.get(profileId);
    profile.set("address", userDetails?.address);
    profile.set("phone", userDetails?.phone);
    profile.set("country", userDetails?.country);
    profile.set("dateOfBirth", userDetails?.dateOfBirth);
    profile.set("firstname", userDetails?.firstname);
    profile.set("lastname", userDetails?.lastname);
    profile.set("gender", userDetails?.gender);
    await profile.save();
  } catch (error) {
    console.log("updating Profile Error ", error);
  }
};

const deleteAccount = async () => {
  const currentUser = Parse.User.current();
  if (currentUser) {
    try {
      //deleting user account
      const res = await currentUser.destroy();

      //deleting user profile data
      let profileId = currentUser?.get("profileId")?.id;
      const Profile = Parse.Object.extend("Profile");
      const profileQuery = new Parse.Query(Profile);

      const profile = await profileQuery.get(profileId);
      await profile.destroy();
      return res;
    } catch (error) {
      console.log("delete Account error ", error);
    }
  }
};

const changePassword = async (newpassword) => {
  const currentUser = Parse.User.current();
  if (currentUser && newpassword) {
    try {
      currentUser.setPassword(newpassword);
      await currentUser.save();
      return currentUser;
    } catch (error) {
      console.error("Error updating the new Password");
    }
  }
};

export {
  signUp,
  login,
  logOut,
  fetchUser,
  getProfileData,
  deleteAccount,
  changePassword,
  updateProfile,
};
