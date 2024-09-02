import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Footer from "../components/Footer";
import MainNavbar from "../components/Navbar";
import TicketBooking from "../components/TicketBooking";
import { fetchEventById } from "../sevices/services";
import { useParams } from "react-router-dom";

export function TicketBookingPage() {
  const { id } = useParams();

  const [data, setData] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEventById(id);

      setData(data.toJSON());
    };
    fetchData();
  }, [id]);

  // console.log(data);

  return (
    <div className="d-flex flex-column gap-3">
      <MainNavbar />
      <Container>
        <TicketBooking data={data} id={id} />
      </Container>
      <Footer />
    </div>
  );
}
