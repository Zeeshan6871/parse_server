import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  validatePassword,
  validatePasswordForm,
} from "../validation/validations";
import { changePassword } from "../../sevices/auth";

const Password = forwardRef((props, ref) => {
  const [password, setPassword] = useState({});
  const [error, setError] = useState({});

  const navigate = useNavigate();

  // const updateProfile =()=>{
  //   console.log("updateProfile ")
  // }

  //hideandshow method for password field
  const handleShowHidePassword = (eleId) => {
    const ele = document.getElementById(eleId);
    if (ele.type === "text") {
      ele.type = "password";
    } else {
      ele.type = "text";
    }
  };

  //update the new password fields
  const handlePassword = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const err = validatePassword(value);

    setError((prev) => ({
      ...prev,
      [name]: err,
    }));

    setPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //submti new Password
  const submitPassword = async () => {
    const err = validatePasswordForm(password);
    if (!err) {
      if (password?.newPassword !== "" && password?.confirmPassword !== "") {
        if (password?.newPassword === password?.confirmPassword) {
          try {
            const res = await changePassword(password?.newPassword);
            if (res) {
              navigate(-1);
            }
          } catch (error) {
            console.log("error password ", error);
          }
        } else {
          setError((prev) => ({
            ...prev,
            ["confirmPassword"]: "password not matched",
          }));
          // console.log("password not matched");
        }
      }
    } else {
      setError(err);
      console.log("Error is present ", error);
    }
  };

  //this method is used to call the function in child fom parent
  useImperativeHandle(ref, () => ({
    callChildFunction: submitPassword,
  }));

  return (
    <div className="my-2">
      <form action="" className="needs-validation">
        <div className="col-12 mb-3">
          <label
            htmlFor="oldPassword"
            className="form-label fw-bold"
            aria-placeholder="oldpassword"
          >
            Old Password
          </label>
          <div className="position-relative">
            <input
              type="password"
              name="oldPassword"
              value={password?.oldPassword || ""}
              className="form-control w-100 my-2"
              id="oldPassword"
              onChange={handlePassword}
              required
            />
            <span
              className="position-absolute top-0  end-0 p-2"
              style={{ cursor: "pointer" }}
            >
              <i
                className="bi bi-eye"
                onClick={() => handleShowHidePassword("oldPassword")}
              ></i>
            </span>
          </div>
          {/* {error?.oldPassword && (
          <p className="text-danger">{error?.oldPassword}</p>
        )} */}
        </div>

        <div className="col-12 mb-3">
          <label
            htmlFor="newPassword"
            className="form-label fw-bold"
            aria-placeholder="newpassword"
          >
            New Password
          </label>
          <div className="position-relative">
            <input
              type="password"
              name="newPassword"
              className="form-control my-2"
              id="newPassword"
              value={password?.newPassword || ""}
              onChange={handlePassword}
              required
            />
            <span
              className="position-absolute top-0 end-0 p-2"
              style={{ cursor: "pointer" }}
            >
              <i
                className="bi bi-eye"
                onClick={() => handleShowHidePassword("newPassword")}
              ></i>
            </span>
          </div>
        </div>
        {error?.newPassword && (
          <p className="text-danger">{error?.newPassword}</p>
        )}

        <div className="col-12 mb-3">
          <label
            htmlFor="confirmPassword"
            className="form-label fw-bold"
            aria-placeholder="confirmpassword"
          >
            Confirm Password
          </label>
          <div className="position-relative">
            <input
              type="text"
              name="confirmPassword"
              className="form-control my-2"
              id="confirmPassword"
              value={password?.confirmPassword || ""}
              onChange={handlePassword}
              required
            />
          </div>
        </div>
        {error?.confirmPassword && (
          <p className="text-danger">{error?.confirmPassword}</p>
        )}
      </form>
    </div>
  );
});

export default Password;
