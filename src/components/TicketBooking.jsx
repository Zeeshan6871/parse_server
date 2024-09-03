import { useEffect, useState, useMemo, useCallback } from "react";
import { Container } from "react-bootstrap";
import { fetchUser } from "../sevices/auth";
import { useNavigate } from "react-router-dom";
import { couponData, createBooking } from "../sevices/services";

function TicketBooking({ data, id }) {
  const generalPrice = useMemo(() => data?.ticket_types?.Ordinær || 0, [data]);
  const studentPrice = useMemo(
    () => data?.ticket_types?.["Student & U18"] || 0,
    [data]
  );
  const PWdPrice = useMemo(() => data?.ticket_types?.Ledsager || 0, [data]);
  const date = useMemo(() => new Date(data.date?.iso).toDateString(), [data]);

  const [ticketCounts, setTicketCounts] = useState({
    general: 0,
    student: 0,
    PWd: 0,
  });
  const [coupon, setCoupon] = useState("");
  const [couponRes, setCouponRes] = useState(null);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const { general, student, PWd } = ticketCounts;
    setTotal(general * generalPrice + student * studentPrice + PWd * PWdPrice);
  }, [ticketCounts, generalPrice, studentPrice, PWdPrice]);

  const buy = useCallback(async () => {
    const user = fetchUser();

    if (user) {
      try {
        const arrayofTickets = Object.values(ticketCounts);
        const amount = total;
        const maxTicketsCount = data?.max_tickets || 0;
        const sum = arrayofTickets.reduce((acc, cur) => acc + cur, 0);
        const totalTickets = maxTicketsCount - sum;

        const res = await createBooking(id, amount, coupon);
        const bookingId = res?.id;

        const bookingDetails = {
          eventId: id,
          totalTickets,
          ticketSoldOut: sum,
          ticketTypes: ticketCounts,
          couponCode: coupon,
          totalAmount: amount,
        };

        localStorage.setItem("booking", JSON.stringify(bookingDetails));

        if (bookingId) {
          const data = {
            email: user?.get("email"),
            amount,
            bookingId,
          };

          navigate("/checkout", { state: data });
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error during booking:", error);
      }
    } else {
      navigate("/login");
    }
  }, [coupon, data?.max_tickets, id, navigate, ticketCounts, total]);

  const checkCondition = useCallback(() => {
    const { general, student, PWd } = ticketCounts;
    return general + student + PWd <= 29;
  }, [ticketCounts]);

  const handleCouponChange = useCallback((e) => setCoupon(e.target.value), []);

  const handleSubmitCoupon = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const couponName = await couponData(coupon);
        setCouponRes(couponName?.toJSON() || null);
      } catch (error) {
        console.error("Coupon error:", error);
      }
    },
    [coupon]
  );

  const updateTicketCount = useCallback((type, delta) => {
    setTicketCounts((prevCounts) => {
      const newCount = Math.max(0, prevCounts[type] + delta);
      return { ...prevCounts, [type]: newCount };
    });
  }, []);

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
              <b>Date:</b> <i>{date}</i>
            </h6>
            <h6>
              <b>Time:</b> <i>12:30</i>
            </h6>
            <h6>
              <b>Address:</b> <i>{data?.address}</i>
            </h6>
            <div style={{ whiteSpace: "pre-wrap" }}>{data?.description}</div>
          </div>
          <div className="Bookingcontainer">
            <h3 className="fw-normal">Select tickets (max. 30):</h3>
            <p>
              Below you will find available tickets for this event. Select
              number of tickets you want and click Buy now. You have 15 minutes
              to complete the order.
            </p>

            <div className="ticket-option">
              <span>
                Ordinær <br />({generalPrice} NOK)
              </span>
              <div>
                <button
                  onClick={() => updateTicketCount("general", -1)}
                  disabled={ticketCounts.general === 0}
                >
                  -
                </button>
                <span>{ticketCounts.general}</span>
                <button
                  onClick={() =>
                    checkCondition() && updateTicketCount("general", 1)
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
                  onClick={() => updateTicketCount("student", -1)}
                  disabled={ticketCounts.student === 0}
                >
                  -
                </button>
                <span>{ticketCounts.student}</span>
                <button
                  onClick={() =>
                    checkCondition() && updateTicketCount("student", 1)
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
                  onClick={() => updateTicketCount("PWd", -1)}
                  disabled={ticketCounts.PWd === 0}
                >
                  -
                </button>
                <span>{ticketCounts.PWd}</span>
                <button
                  onClick={() =>
                    checkCondition() && updateTicketCount("PWd", 1)
                  }
                >
                  +
                </button>
              </div>
            </div>

            <div className="subtotal">Subtotal: {total}kr</div>

            <div className="coupon d-flex gap-0">
              <input
                type="text"
                placeholder="Coupon Code"
                onChange={handleCouponChange}
                value={coupon}
              />
              <button onClick={handleSubmitCoupon} disabled={coupon === ""}>
                Apply
              </button>
            </div>
            {couponRes?.amount && (
              <div
                className="coupon fs-5"
                style={{
                  display: "flex",
                  flexFlow: "row-reverse",
                  fontStyle: "italic",
                }}
              >
                You saved:{" "}
                {couponRes.amount *
                  (ticketCounts.general + ticketCounts.student)}
                kr
              </div>
            )}

            <div className="total">
              Total:{" "}
              {couponRes?.amount
                ? total -
                  couponRes.amount *
                    (ticketCounts.general + ticketCounts.student)
                : total}
              kr
            </div>

            <button className="buy-button" disabled={total === 0} onClick={buy}>
              Buy Now
            </button>
          </div>
        </div>
      </Container>
    </Container>
  );
}

export default TicketBooking;
