import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Footer from "../components/Footer";
import MainNavbar from "../components/Navbar";
import TicketBooking from "../components/TicketBooking";
import { fetchDataById } from "../sevices/services";

export function TicketBookingPage() {

    const id = window.location.pathname.split("/")[2];

    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchDataById(id); 

            setData(data.toJSON());
        };
        fetchData();
    }, [id]);

    // console.log(data);
    
  return (
    <div className="d-flex flex-column gap-3">
      <MainNavbar />
      <Container>
        <TicketBooking data = {data}/>
      </Container>
      <Footer />
    </div>
  );
}
