import Parse from "parse";

// console.log("process.env.REACT_APP_ID", process.env.REACT_APP_ID);

export const fetchData = () => {
  const Event = Parse.Object.extend("Event");
  let query = new Parse.Query(Event);
  return query.find();
};

export const fetchDataById = (id) => {
  const Event = Parse.Object.extend("Event");
  let query = new Parse.Query(Event);
  // console.log(id);

  return query.get(id);
};

export const couponData = async (couponCode) => {
  const Coupon = Parse.Object.extend("Coupon");
  let query = new Parse.Query(Coupon);

  query.equalTo("code", couponCode);

  const result = await query.first();
  return result;
};
