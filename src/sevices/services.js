import Parse from "parse";
import { fetchUser } from "./auth";
const Event = Parse.Object.extend("Event");
const Booking = Parse.Object.extend("Booking");
// const Ticket = Parse.Object.extend("Ticket");
const Coupon = Parse.Object.extend("Coupon");
const Role = Parse.Object.extend("_Role");
// const User = Parse.Object.extend("_User");

// console.log("process.env.REACT_APP_ID", process.env.REACT_APP_ID);

export const fetchData = () => {
  let query = new Parse.Query(Event);
  return query.find();
};

export const fetchEventById = (id) => {
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

export const getCurrentUserRoles = async () => {
  const currentUser = Parse.User.current();
  if (!currentUser) {
    return [];
  }
  const query = new Parse.Query(Role);
  query.equalTo("users", currentUser);
  const userRoles = await query.find();
  const res = userRoles.map((role) => role.get("name"));

  return res[0];
};

export function createBooking(eventId, amount, coupon) {
  const booking = new Booking();
  booking.set("userId", fetchUser());
  booking.set("status", "open");
  booking.set("amount", amount);
  booking.set("coupon", coupon);

  const event = new Event();
  event.id = eventId;
  booking.set("eventId", event);

  return booking.save().then(
    (booking) => {
      return booking;
    },
    (error) => {
      return error.message;
    }
  );
}
