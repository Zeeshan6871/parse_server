import Parse from "parse";

// console.log("process.env.REACT_APP_ID", process.env.REACT_APP_ID);

const Event = Parse.Object.extend("Event");
const Coupon = Parse.Object.extend("Coupon");
const Booking = Parse.Object.extend("Booking");
export const fetchData = () => {
  let query = new Parse.Query(Event);
  return query.find();
};

export const fetchDataById = (id) => {
  let query = new Parse.Query(Event);
  // console.log(id);

  return query.get(id);
};

export const couponData = async (couponCode) => {
  let query = new Parse.Query(Coupon);

  query.equalTo("code", couponCode);

  const result = await query.first();
  return result;
};
export const getBookings = async () => {
  let query = new Parse.Query(Booking);
  let user;

  try {
    user = Parse.User.current();
  } catch (error) {
    console.error("Error fetching current user:", error);
  }

  if (!user) {
    console.log("No user is currently logged in.");
    return [];
  }

  console.log(user);
  query.equalTo("userId", user);
  return query.find();
};
