import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { fetchUser, getProfileData } from "../../sevices/auth";

const Profile = () => {
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});

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

  return (
    <div>
      <table className="table table-borderless">
        <tbody>
          <tr>
            <td className="fw-bolder" aria-placeholder="name">
              Name
            </td>
            <td>{`${profile?.firstname} ${profile?.lastname}`}</td>
          </tr>
          <tr>
            <td className="fw-bolder" aria-placeholder="email">
              Email
            </td>
            <td>{user?.email}</td>
          </tr>
          <tr>
            <td className="fw-bolder" aria-placeholder="gender">
              Sex
            </td>
            <td>{profile?.gender}</td>
          </tr>
          <tr>
            <td className="fw-bolder" aria-placeholder="country">
              Country
            </td>
            <td>{profile?.country}</td>
          </tr>
          <tr>
            <td className="fw-bolder" aria-placeholder="address">
              Address
            </td>
            <td>{profile?.address}</td>
          </tr>
          <tr>
            <td className="fw-bolder" aria-placeholder="phone">
              Telephone
            </td>
            <td>{profile?.phone}</td>
          </tr>
          <tr>
            <td className="fw-bolder" aria-placeholder="dateofbirth">
              Date of Birth
            </td>
            <td>
              <DatePicker
                selected={profile?.dateOfBirth}
                dateFormat="dd-MM-yyyy"
                name="dateOfBirth"
                className="form-control w-100 bg-transparent border-0 px-0"
                disabled
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
