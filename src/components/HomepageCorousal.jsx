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
            alt="First slide"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          {/* <ExampleCarouselImage text="Second slide" /> */}
          <img
            src="https://mintix.s3.eu-north-1.amazonaws.com/David+Andre%CC%81+%C3%98stby+Trune%CC%81+Banner+(1600+%C3%97+900+px).png"
            width={"100%"}
            alt="Second slide"
          />

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://mintix.s3.eu-north-1.amazonaws.com/David+Andre%CC%81+%C3%98stby+Trune%CC%81+Banner+(1600+%C3%97+900+px).png"
            width={"100%"}
            alt="Third slide"
          />

          {/* <ExampleCarouselImage text="Third slide" /> */}
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default HomepageCorousal;
