import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { couponData } from "../sevices/services";

function TicketBooking({ data }) {
  const generalPrice = data?.ticket_types?.Ordinær || 0;
  const studentPrice = data?.ticket_types?.["Student & U18"] || 0;
  const PWdPrice = data?.ticket_types?.Ledsager || 0;
  const date = new Date(data.date?.iso).toDateString();

  const [generalCount, setGeneralCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [PWdCount, setPWdCount] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [couponRes, setCouponRes] = useState({});

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalGeneralPrice = generalCount * generalPrice;
    const totalStudentPrice = studentCount * studentPrice;
    const totalPWdPrice = PWdCount * PWdPrice;
    setTotal(totalGeneralPrice + totalStudentPrice + totalPWdPrice);
  }, [
    generalCount,
    studentCount,
    PWdCount,
    generalPrice,
    studentPrice,
    PWdPrice,
  ]);

  const checkCondition = () => {
    let totalTicket = generalCount + studentCount + PWdCount;
    return totalTicket <= 29;
  };

  const handleCoupon = (e) => {
    setCoupon(e.target.value);
  };

  const handleSubmitCoupon = async (e) => {
    e.preventDefault();
    try {
      const couponName = await couponData(coupon);
      console.log(couponName.toJSON());
      // couponName?.isActive
      //   ?
      setCouponRes(couponName.toJSON());
      // : setCouponRes({});
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Container style={{ maxWidth: "900px" }} className="mx-auto">
        <img src={data?.cover_photo} alt="img" style={{ maxWidth: "100%" }} />
        <h1 className="text-center p-3">{data?.title}</h1>
      </Container>
      <Container>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "16px",
          }}
        >
          <div>
            <h6>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
              </svg>{" "}
              <b>Date:</b>
              <i>{date}</i>
            </h6>
            <h6>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
              </svg>{" "}
              <b>Time:</b>
              <i>12:30</i>
            </h6>
            <h6>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
              </svg>{" "}
              <b>Address:</b>
              <i>{data?.address}</i>
            </h6>

            <div style={{ whiteSpace: "pre-wrap" }}>
              {`${data?.description}
`}
            </div>
          </div>
          <div className="Bookingcontainer">
            <h3>Select tickets (max. 30)</h3>
            <p>
              Below you will find available tickets for this event. Select
              number of tickets you want and click Buy now. You have 15 minutes
              you to complete the order.
            </p>

            <div className="ticket-option">
              <span>
                Ordinær <br />({generalPrice} NOK)
              </span>
              <div>
                <button
                  onClick={() =>
                    setGeneralCount((prev) => {
                      const newCount = Math.max(0, prev - 1);
                      setTotal((total) => Math.max(0, total - generalPrice));
                      return newCount;
                    })
                  }
                  disabled={generalCount === 0}
                >
                  -
                </button>
                <span>{generalCount}</span>
                <button
                  onClick={() =>
                    checkCondition() &&
                    setGeneralCount((prev) => {
                      const newCount = prev + 1;
                      setTotal((total) => total + generalPrice);
                      return newCount;
                    })
                  }
                >
                  +
                </button>
              </div>
            </div>
            <div className="ticket-option">
              <span>
                Student & U18 <br /> ({studentPrice} NOK)
              </span>
              <div>
                <button
                  onClick={() =>
                    setStudentCount((prev) => {
                      const newCount = Math.max(0, prev - 1);
                      setTotal((total) => Math.max(0, total - studentPrice));
                      return newCount;
                    })
                  }
                  disabled={studentCount === 0}
                >
                  -
                </button>
                <span>{studentCount}</span>
                <button
                  onClick={() =>
                    checkCondition() &&
                    setStudentCount((prev) => {
                      const newCount = prev + 1;
                      setTotal((total) => total + studentPrice);
                      return newCount;
                    })
                  }
                >
                  +
                </button>
              </div>
            </div>
            <div className="ticket-option">
              <span>
                Ledsager <br /> ({PWdPrice} NOK)
              </span>
              <div>
                <button
                  onClick={() =>
                    setPWdCount((prev) => {
                      const newCount = Math.max(0, prev - 1);
                      return newCount;
                    })
                  }
                  disabled={PWdCount === 0}
                >
                  -
                </button>
                <span>{PWdCount}</span>
                <button
                  onClick={() =>
                    checkCondition() &&
                    setPWdCount((prev) => {
                      const newCount = Math.min(1, prev + 1);
                      return newCount;
                    })
                  }
                >
                  +
                </button>
              </div>
            </div>

            <div className="subtotal">Subtotal: {total} kr</div>

            <div className="coupon">
              <input
                type="text"
                placeholder="Coupon Code"
                onChange={handleCoupon}
                value={coupon}
              />
              <button onClick={handleSubmitCoupon} disabled={coupon === ""}>
                Apply
              </button>
            </div>
            {couponRes?.amount && couponRes?.amount && (
              <div className="coupon">
                Congrats 🤑 you save :{" "}
                {couponRes.amount * (generalCount + studentCount)} kr
              </div>
            )}

            <div className="total">
              Total:{" "}
              {couponRes?.amount && couponRes?.amount
                ? total - couponRes.amount * (generalCount + studentCount)
                : total}{" "}
              kr
            </div>

            <button className="buy-button" disabled={total === 0}>
              Buy Now
            </button>
          </div>
        </div>
      </Container>
    </Container>
  );
}

export default TicketBooking;
