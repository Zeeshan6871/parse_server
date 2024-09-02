import React, { useState } from "react";

const Bank = () => {
  const [account, setAccount] = useState({});

  //handle account details
  const handleAccount = (e) => {
    const { name, value } = e.target;
    setAccount((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <div className="row">
        <form action="">
          <div className="d-flex justify-content-between">
            <h2 className="fw-bold">Bank Account</h2>
            <button className="btn btn-secondary fw-bold" type="submit">
              ADD
            </button>
          </div>
          <div className="col-12 mb-2">
            <label htmlFor="" className="fw-bold my-2">
              Account Name
            </label>
            <div>
              <input
                type="text"
                name="accountName"
                value={account?.accountName}
                onChange={handleAccount}
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="col-12 mb-2">
            <label htmlFor="" className="fw-bold my-2">
              Account Number
            </label>
            <input
              type="number"
              name="accountNumber"
              value={account?.accountNumber}
              onChange={handleAccount}
              className="form-control"
            />
          </div>
          <div className="col-12 mb-2">
            <label htmlFor="" className="fw-bold my-2">
              Confirm Account Number
            </label>
            <input
              type="number"
              name="confirmAccountNumber"
              value={account?.confirmAccountNumber}
              onChange={handleAccount}
              className="form-control"
            />
          </div>
          <div className="col-12 mb-2">
            <label htmlFor="" className="fw-bold my-2">
              SWIFT Code
            </label>
            <input
              type="text"
              name="swiftCode"
              value={account?.swiftCode}
              onChange={handleAccount}
              className="form-control"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Bank;
