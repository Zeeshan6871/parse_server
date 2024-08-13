import { useState } from "react";
import { Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
// import ExampleCarouselImage from "components/ExampleCarouselImage";

function HomepageCorousal() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Container>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          {/* <ExampleCarouselImage text="First slide" /> */}
          <img
            src="https://mintix.s3.eu-north-1.amazonaws.com/David+Andre%CC%81+%C3%98stby+Trune%CC%81+Banner+(1600+%C3%97+900+px).png"
            width={"100%"}
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          {/* <ExampleCarouselImage text="Second slide" /> */}
          <img
            src="https://mintix.s3.eu-north-1.amazonaws.com/David+Andre%CC%81+%C3%98stby+Trune%CC%81+Banner+(1600+%C3%97+900+px).png"
            width={"100%"}
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://mintix.s3.eu-north-1.amazonaws.com/David+Andre%CC%81+%C3%98stby+Trune%CC%81+Banner+(1600+%C3%97+900+px).png"
            width={"100%"}
          />

          {/* <ExampleCarouselImage text="Third slide" /> */}
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default HomepageCorousal;
