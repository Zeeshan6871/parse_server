import Card from "react-bootstrap/Card";

function Homepagecards({ cover_photo, title, updatedAt, address }) {
  return (
    <Card className="text-center border-0 rounded-2 shadow-lg  h-100 cursor-pointer">
      <img src={cover_photo} alt="img" className="card-img-top rounded-2" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{updatedAt}</Card.Text>
        <Card.Text>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
          </svg>{" "}
          {address}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Homepagecards;
