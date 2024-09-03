import Footer from "../components/Footer";
import MainNavbar from "../components/Navbar";

const About = () => {
  return (
    <>
      <MainNavbar />
      <div className="container my-5">
        <div className="row content">
          <h1 className="text-center py-3 fw-bold">About Mintix</h1>
          <br />
          <div className="text-start justify-content-center fs-5">
            <p>
              Mintix is engaged in technological innovation in the ticketing
              industry, and now offers an API solution that integrates
              blockchain technology with already existing ticketing systems. Our
              approach focuses on improving the security and transparency of
              ticket sales, especially in the secondary market.By utilizing
              blockchain technology, we can offer a solution that is secured
              against fraud, safe to transact and transparent. Our system will
              be continuously updated with new and exciting functions made
              possible through the use of blockchain.
            </p>

            <div className="fs-3 fw-bold">Teamet</div>
            <br />
            <ul>
              <li>
                <b>Sondre Pedersen</b> - Daglig leder
              </li>
              <br />
              <li>
                <b>Jakob Wredstrøm</b> - Assisterende daglig leder
              </li>
              <br />
              <li>
                <b>Abhijeet Goel</b> - Chief Technical Officer
              </li>
              <br />
              <li>
                <b>Tajdar Khan</b> - Produktansvarlig og strategi
              </li>
              <br />
              <li>
                <b>Amplitude Ventures AS</b> - Vår venture studio partner basert
                i Stavanger, med fokus på musikkindustrien.
                <br />
              </li>
            </ul>
            <br />
            <div className="fs-3 fw-bold">Kontakt Oss:</div>
            <br />
            <ul>
              <li>Telefon: +47 921 57 656</li>
              <li>
                E-post:{" "}
                <a href="sondre@mintix.no" className="text-reset">
                  sondre@mintix.no
                </a>
              </li>
            </ul>
            <br />
            <p>
              Ved Mintix er vi dedikert til å skape en mer rettferdig og
              transparent billettbransje, og ser frem til å bringe vår løsning
              til markedet.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
