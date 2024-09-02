import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import DatePicker from "react-datepicker";
import { fetchUser, getProfileData, updateProfile } from "../../sevices/auth";
import { ValidateField, validateProfileForm } from "../validation/validations";

const EditProfile = forwardRef((props, ref) => {
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});
  const [error, setError] = useState({});

  //handle method to fetch the current loggedIn user Profile details
  const fetchProfile = async () => {
    try {
      const res = await getProfileData();
      setProfile(res);
    } catch (error) {
      console.log("profile res error ", error);
    }
  };

  useEffect(() => {
    const user = fetchUser();
    setUser(user?.attributes);
    fetchProfile();
  }, []);

  //this method is used to call the function in child fom parent
  useImperativeHandle(ref, () => ({
    callChildFunction: handleupdateProfile,
  }));

  //submit the new Updated profile
  const handleupdateProfile = async () => {
    const err = validateProfileForm(user);
    if (!err) {
      const res = await updateProfile(profile);
      window.location.reload();
    } else {
      console.log("error ", err);
    }
  };

  //Custoom Header for DatePicker calender
  const CustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    decreaseYear,
    increaseYear,
  }) => {
    return (
      <div className="custom-header">
        <button className="arrow-button" onClick={decreaseYear}>
          {"<<"}
        </button>
        <button className="arrow-button" onClick={decreaseMonth}>
          {"<"}
        </button>
        <span className="header-text">
          {date.toLocaleString("default", { month: "long", year: "numeric" })}
        </span>
        <button className="arrow-button" onClick={increaseMonth}>
          {">"}
        </button>
        <button className="arrow-button" onClick={increaseYear}>
          {">>"}
        </button>
      </div>
    );
  };

  //handle updating profile fields
  const handleProfile = (e) => {
    const { name, value } = e.target;
    const err = ValidateField(name, value);
    if (!err) {
      console.log("no error");
      setError((prev) => ({
        ...prev,
        [name]: err,
      }));
    } else {
      console.log("error in handleprofile ", err);
      setError((prev) => ({
        ...prev,
        [name]: err,
      }));
    }
    if (name === "email" || name === "username") {
      setUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // else {
    //   setProfile((prev) => ({
    //     ...prev,
    //     email: 132,
    //     [name]: value,
    //   }));
    // }

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <div className="row">
        {/* email */}
        <div className="col-md-5 col-12  my-2">
          <label htmlFor="" className="fw-bold" aria-placeholder="email">
            Email
          </label>
          <input
            type="text"
            name="email"
            value={user?.email}
            className="form-control my-2"
            onChange={handleProfile}
          />
          <p className="text-danger">{error && error?.email}</p>
        </div>
        {/* username */}
        <div className="col-md-5 col-12  my-2">
          <label htmlFor="" className="fw-bold" aria-placeholder="username">
            UserName
          </label>
          <input
            readOnly
            disabled
            type="text"
            name="username"
            value={user?.username}
            className="form-control my-2"
            onChange={handleProfile}
          />
        </div>
        {/* firstname */}
        <div className="col-md-5 col-12 my-2">
          <label htmlFor="" className="fw-bold" aria-placeholder="firstname">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            value={profile?.firstname}
            className="form-control my-2"
            onChange={handleProfile}
          />
        </div>
        {/* lastname */}
        <div className="col-md-5 col-12 my-2">
          <label htmlFor="" className="fw-bold" aria-placeholder="lastname">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            value={profile?.lastname}
            className="form-control my-2"
            onChange={handleProfile}
          />
        </div>
        {/* dob */}
        <div className="col-md-5 col-12 my-2">
          <label htmlFor="" className="fw-bold" aria-placeholder="dateofbirth">
            Date of Birth
          </label>
          <br />
          <DatePicker
            selected={profile?.dateOfBirth}
            name="dateOfBirth"
            dateFormat="dd-MM-yyyy"
            className="form-control w-100 my-2"
            placeholderText="dd-mm-yyyy"
            onChange={(date) => {
              return handleProfile({
                target: { name: "dateOfBirth", value: date },
              });
            }}
            renderCustomHeader={({
              date,
              decreaseMonth,
              increaseMonth,
              decreaseYear,
              increaseYear,
            }) => (
              <CustomHeader
                date={date}
                decreaseMonth={decreaseMonth}
                increaseMonth={increaseMonth}
                decreaseYear={decreaseYear}
                increaseYear={increaseYear}
              />
            )}
          />
        </div>
        {/* gender */}
        <div className="col-md-5 col-12 my-2">
          <label htmlFor="" className="fw-bold" aria-placeholder="gender">
            Sex
          </label>
          <div className="d-flex justify-content-around">
            <div class="form-check">
              <input
                name="gender"
                class="form-check-input"
                value="Male"
                type="radio"
                id="flexRadioDefault2"
                onChange={handleProfile}
                checked={profile?.gender === "Male"}
              />
              <label
                class="form-check-label"
                for="flexRadioDefault2"
                aria-placeholder="Male"
              >
                Male
              </label>
            </div>
            <div class="form-check">
              <input
                name="gender"
                value="Female"
                class="form-check-input"
                type="radio"
                id="flexRadioDefault1"
                onChange={handleProfile}
                checked={profile?.gender === "Female"}
              />
              <label
                class="form-check-label"
                for="flexRadioDefault1"
                aria-placeholder="Female"
              >
                Female
              </label>
            </div>
            <div class="form-check">
              <input
                name="gender"
                value="other"
                class="form-check-input"
                type="radio"
                id="flexRadioDefault1"
                onChange={handleProfile}
                checked={profile?.gender === "other"}
              />
              <label
                class="form-check-label"
                for="flexRadioDefault1"
                aria-placeholder="other"
              >
                Others
              </label>
            </div>
          </div>
        </div>
        {/* address */}
        <div className="col-md-5 col-12 my-2">
          <label className="fw-bold" aria-placeholder="address">
            Address
          </label>
          <textarea
            name="address"
            type="text"
            id=""
            value={profile?.address}
            className="form-control my-2"
            onChange={handleProfile}
          ></textarea>
        </div>
        {/* country */}
        <div className="col-md-5 col-12 my-2">
          <label htmlFor="" className="fw-bold" aria-placeholder="Land">
            Country
          </label>
          <input
            type="text"
            name="country"
            value={profile?.country}
            className="form-control my-2"
            onChange={handleProfile}
          />
        </div>
        {/* phone */}
        <div className="col-md-5 col-12 my-2">
          <label htmlFor="" className="fw-bold" aria-placeholder="Telefon">
            Telephone
          </label>
          <input
            type="number"
            name="phone"
            value={profile?.phone}
            className="form-control my-2"
            onChange={handleProfile}
          />
        </div>
      </div>
    </div>
  );
});

export default EditProfile;
