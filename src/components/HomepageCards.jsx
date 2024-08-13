import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Homepagecards({ cover_photo, title, updatedAt, address }) {
  return (
    <Card className="text-center border-rounded-5 shadow-md h-100">
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <img src={cover_photo} alt="img" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{updatedAt}</Card.Text>
        <Card.Text>📍 {address}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Homepagecards;
