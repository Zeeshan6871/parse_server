import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import MainNavbar from "../components/Navbar";
import { getBookings } from "../sevices/services";
// import { getBookings } from "../services/services";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const location = useLocation();

  useEffect(() => {
    getBookings()
      .then((result) => {
        setTickets(result);
      })
      .catch((err) => console.log(err));
  }, []);

  const applyCss = () => {
    let { pathname } = location;
    if (pathname === "/mytickets") {
      return "col-md-10 offset-md-1";
    } else {
      return "col-md-12";
    }
  };

  const RenderRow = ({ booking }) => {
    console.log(booking?.get("eventId")?.get("title"));
    return (
      <tr>
        <td className="col-2">
          <i>
            {booking?.get("status") === "open"
              ? booking?.get("createdAt").toLocaleDateString()
              : booking?.get("eventId")?.get("date")?.toLocaleDateString()}
          </i>
        </td>
        <td className="col-6">{booking?.get("eventId")?.get("title")}</td>
        <td className="col-2">
          {booking?.get("amount")} NOK
          <br />
        </td>
        {booking?.get("status") === "open" ? (
          <td className="col-2">
            <p>Not Applicable</p>
          </td>
        ) : (
          <td className="col-2">
            <a
              className="btn btn-outline-secondary"
              href={booking?.get("ticket_url")}
              download="very_important_report.pdf"
            >
              <FontAwesomeIcon icon={faFileDownload} className="fs-5 mx-2" />
              Download
            </a>
          </td>
        )}
      </tr>
    );
  };

  return (
    <>
      <MainNavbar />
      <div className="container py-5">
        <div className="row">
          <div className={applyCss()}>
            <h3>Your Tickets</h3>
            <hr />
            <ul className="nav nav-pills" role="tablist">
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link active bg-[#6b757d]"
                  id="nav-upcoming"
                  data-bs-toggle="tab"
                  data-bs-target="#upcoming"
                  type="button"
                  role="tab"
                  aria-controls="nav-upcoming"
                  aria-selected="true"
                >
                  Upcoming Shows
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link"
                  id="nav-failed"
                  data-bs-toggle="tab"
                  data-bs-target="#failed"
                  type="button"
                  role="tab"
                  aria-controls="nav-failed"
                  aria-selected="false"
                >
                  Failed Bookings
                </a>
              </li>
            </ul>
            <div className="tab-content bg-transparent">
              <div
                className="tab-pane fade show active"
                id="upcoming"
                role="tabpanel"
                tabIndex={0}
              >
                <table className="table my-4">
                  <thead>
                    <tr>
                      <th scope="col-1">Show Date</th>
                      <th scope="col-5">Show Name</th>
                      <th scope="col-2">Ticket Amount</th>
                      <th scope="col-4">Tickets</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets
                      ? tickets.map((ticket, index) =>
                          ticket.get("status") === "complete" ? (
                            <RenderRow key={index} booking={ticket} />
                          ) : null
                        )
                      : null}
                  </tbody>
                </table>
              </div>
              <div
                className="tab-pane fade"
                id="failed"
                role="tabpanel"
                tabIndex={0}
              >
                <table className="table my-4">
                  <thead>
                    <tr>
                      <th scope="col-2">Show date</th>
                      <th scope="col-6">Show Name</th>
                      <th scope="col-2">Ticket Amount</th>
                      <th scope="col-2">Refund status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets
                      ? tickets.map((ticket, index) =>
                          ticket.get("status") === "open" ? (
                            <RenderRow key={index} booking={ticket} />
                          ) : null
                        )
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Tickets;
