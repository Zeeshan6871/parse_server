import { Container } from "react-bootstrap";
import Homepagecards from "../components/HomepageCards";
import HomepageCorousal from "../components/HomepageCorousal";
import MainNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { fetchData, fetchDataById } from "../sevices/services";
import TicketBooking from "../components/TicketBooking";

export function TicketBookingPage() {

    const id = window.location.pathname.split("/")[2];

    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchDataById(id); 

            setData(data.toJSON());
        };
        fetchData();
    }, []);

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
