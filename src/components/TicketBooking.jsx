import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

function TicketBooking({data}) {
  const generalPrice = data?.ticket_types?.Ordinær|| 0;
  const studentPrice = data?.ticket_types?.["Student & U18"] || 0;
  const PWdPrice = data?.ticket_types?.Ledsager || 0;
  const date = new Date(data.date?.iso).toDateString()

  const [generalCount, setGeneralCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [PWdCount, setPWdCount] = useState(0);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalGeneralPrice = generalCount * generalPrice;
    const totalStudentPrice = studentCount * studentPrice;
    const totalPWdPrice = PWdCount * PWdPrice;
    setTotal(totalGeneralPrice + totalStudentPrice + totalPWdPrice);
  }, [generalCount, studentCount, PWdCount, generalPrice, studentPrice, PWdPrice]);

  const checkCondition = () => {
    let totalTicket = generalCount + studentCount + PWdCount;
    return totalTicket <= 29;
  };

  return (
    <Container>
      <Container style={{ maxWidth: "900px" }} className="mx-auto">
        <img
          src={data?.cover_photo}
          alt="img"
          style={{ maxWidth: "100%" }}
        />
        <h1 className="text-center p-3">
          {data?.title}
        </h1>
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
            <h6>🗓 Dato: {date}</h6>
            <h6>🕒 Tid: 12:30</h6>
            <h6>📍 Adresse: {data?.address}</h6>
            
            <div style={{ whiteSpace: "pre-wrap" }}>
              {`${data?.description}
`}
            </div>
          </div>
          <div className="Bookingcontainer">
            <h3>Velg billetter (maks. 30)</h3>
            <p>
              Nedenfor finner du ledige billetter til dette arrangementet. Velg
              antall billetter du ønsker og klikk Kjøp nå. Du har 15 minutter på
              deg til å fullføre bestillingen.
            </p>

            <div className="ticket-option">
              <span>Ordinær ({generalPrice} NOK)</span>
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
              <span>Student & U18 ({studentPrice} NOK)</span>
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
              <span>Ledsager ({PWdPrice} NOK)</span>
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
              <input type="text" placeholder="Kupongkode" />
              <button>Søke om</button>
            </div>

            <div className="total">Total: {total} kr</div>

            <button className="buy-button" disabled={total === 0}>
              Kjøp nå
            </button>
          </div>
        </div>
      </Container>
    </Container>
  );
}

export default TicketBooking;
