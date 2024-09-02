import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { fetchData } from "../sevices/services";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Homepagecards from "../components/HomepageCards";
import HomepageCorousal from "../components/HomepageCorousal";
import MainNavbar from "../components/Navbar";

export function Homepage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();

        // console.log("data", data);
        const arr = data.map((item) => ({
          address: item.get("address"),
          title: item.get("title"),
          updatedAt: item.get("updatedAt").toLocaleDateString(),
          cover_photo: item.get("cover_photo"),
          isLive: item.get("isLive"),
          objectId: item.id,
        }));
        setData(arr);
        console.log(arr);
      } catch (err) {
        setError("Failed to fetch data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center "
        style={{ height: "100vh" }}
      >
        <div class="spinner-border text-dark" role="status">
          {/* <span class="sr-only">Loading...</span> */}
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  // console.log(data);

  const handleEvent = async (id) => {
    // const data =  await fetchDataById(id);

    return navigate(`/ticketbooking/${id}`);
  };

  return (
    <div className="d-flex flex-column gap-3">
      <MainNavbar />
      <HomepageCorousal />
      <Container>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
          {data.length > 0 &&
            data.map((item, index) => {
              return (
                item.isLive && (
                  <div
                    className="col"
                    key={index}
                    onClick={() => handleEvent(item.objectId)}
                  >
                    <Homepagecards
                      address={item.address}
                      title={item.title}
                      updatedAt={item.updatedAt}
                      cover_photo={item.cover_photo}
                    />
                  </div>
                )
              );
            })}
        </div>
      </Container>
      <Footer />
    </div>
  );
}
