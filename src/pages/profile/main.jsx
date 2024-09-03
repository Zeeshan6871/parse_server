import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUserRoles } from "../../sevices/services";
import { deleteAccount } from "../../sevices/auth";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import Password from "./password";
import Bank from "./BankDetails";
import "react-datepicker/dist/react-datepicker.css";
import MainNavbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const MainProfile = () => {
  const [activeTab, setActiveTab] = useState("My account");
  const [edit, setEdit] = useState(false);
  const [role, setRole] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState("");

  const navigate = useNavigate();
  const childref = useRef();

  //method to get the current User Role
  const getRole = async () => {
    const role = await getCurrentUserRoles();
    setRole(role);
  };

  //initially when page loads it will fetch the current looged In User Role
  useEffect(() => {
    getRole();
  }, []);

  //method to delete account
  const handleDeleteAccount = async () => {
    if (deleteConfirm === "delete account") {
      try {
        const res = await deleteAccount();
        setDeleteConfirm("");
        navigate("/");
      } catch (error) {
        console.log("delete account error ", error);
      }
      setDeleteConfirm("");
    }
  };

  //handle goBack
  const handleGoBack = () => {
    setEdit(false);
    setActiveTab("My account");
  };

  //handle Active Tab
  const handleActivetab = (tabname) => {
    setActiveTab(tabname);
    setEdit(false);
  };

  //delete User Account Model
  const deleteAcount = () => (
    <div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 fw-bold" id="staticBackdropLabel">
                Delete Account
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-flex">
              <div>
                <p>Enter "delete account" to confirm this action</p>
                <input
                  className="d-block border-2 px-2 palceholder-danger"
                  type="text"
                  name="deleteConfirm"
                  value={deleteConfirm}
                  onChange={(e) => setDeleteConfirm(e.target.value)}
                  placeholder="delete account"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setDeleteConfirm("")}
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteAccount}
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                disabled={deleteConfirm !== "delete account"}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn  bg-danger text-white fw-bold cursor-pointer my-2 px-4 w-100"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        aria-placeholder="deleteAccount"
        // style={{ background: "red" }}
      >
        <div className="d-flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-person-x-fill"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708"
            />
          </svg>
          <p className="d-inline m-0"> Delete Account</p>
        </div>
      </button>
    </div>
  );

  //calling child component method from parent component
  const handleProfileSave = () => {
    handleActivetab("My account");
    if (childref?.current) {
      childref?.current?.callChildFunction();
    }
  };

  //calling child component method from parent component
  const handlePasswordSave = () => {
    if (childref?.current) {
      childref?.current?.callChildFunction();
    }
  };

  //rendercomponent based on condition
  const renderPage = () => {
    switch (activeTab) {
      case "My account":
        return <Profile />;
      case "Edit account":
        return <EditProfile ref={childref} />;
      case "Change Password":
        return <Password ref={childref} />;
      case "Bank":
        return <Bank />;
    }
  };

  return (
    <>
      <MainNavbar />
      <div className="container py-3  my-3">
        <div className="row">
          <div className="col-md-2">
            <aside>
              <div>
                <ul
                  className="nav nav-pills list-unstyled fw-bold d-flex flex-column"
                  role="tablist"
                >
                  <li
                    className="nav-item"
                    role="presentation"
                    onClick={() => {
                      setActiveTab("My account");
                      {
                        edit
                          ? handleActivetab("Edit account")
                          : handleActivetab("My account");
                      }
                    }}
                  >
                    <a
                      className="nav-link active px-3 cursor-pointer px-4 py-2 mb-2"
                      id="nav-upcoming"
                      data-bs-toggle="tab"
                      data-bs-target="#upcoming"
                      type="button"
                      role="tab"
                      aria-controls="nav-upcoming"
                      aria-selected="true"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-person-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                      </svg>
                      My Account
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link px-3 cursor-pointer px-1 py-2 mb-2"
                      id="nav-failed"
                      data-bs-toggle="tab"
                      data-bs-target="#failed"
                      type="button"
                      role="tab"
                      onClick={() => handleActivetab("Change Password")}
                    >
                      <div className="d-flex justify-content-start">
                        <FontAwesomeIcon icon={faKey} className="mx-2 py-2" />
                        <p className="d-inilne m-0">Change Password</p>
                      </div>
                    </a>
                  </li>
                  {role === "organizer" && (
                    <li className="nav-item" role="presentation">
                      <a
                        className="nav-link px-3 cursor-pointer px-1 py-1 mb-2"
                        id="nav-failed"
                        data-bs-toggle="tab"
                        data-bs-target="#failed"
                        type="button"
                        role="tab"
                        onClick={() => handleActivetab("Bank")}
                        // onClick={() => setActiveTab("Bank")}
                      >
                        <div className="d-flex justify-content-start">
                          <i className="bi bi-bank2 mx-2 py-2"></i>
                          <p className="d-inilne pt-2">Bank Account</p>
                        </div>
                      </a>
                    </li>
                  )}
                  <li className="w-100">{deleteAcount()}</li>
                </ul>
              </div>
            </aside>
          </div>
          <div className="col-md-9 px-5">
            <div className="d-flex justify-content-between fw-bold">
              {edit && (
                <div className="d-inline cursor d-flex" onClick={handleGoBack}>
                  <i className="bi bi-arrow-left-circle mx-2 fs-3"></i>
                  <h2 className="fw-bold">Edit Account</h2>
                </div>
              )}
              {activeTab == "My account" && (
                <h2 className="fw-bold">My Account</h2>
              )}
              {activeTab == "Change Password" && (
                <div className="d-flex justify-content-between w-100">
                  <h3 className="fw-bold"> Change Password</h3>
                  <button
                    className="btn btn-secondary fw-bold"
                    onClick={handlePasswordSave}
                  >
                    Save
                  </button>
                </div>
              )}
              <div>
                {(activeTab === "My account" ||
                  activeTab === "Edit account") && (
                  <>
                    {edit ? (
                      <button
                        className="btn btn-secondary fw-bold"
                        onClick={handleProfileSave}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="btn btn-secondary fw-bold"
                        onClick={() => {
                          setEdit(true);
                          setActiveTab("Edit account");
                        }}
                      >
                        Edit
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
            <div>{renderPage()}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainProfile;
