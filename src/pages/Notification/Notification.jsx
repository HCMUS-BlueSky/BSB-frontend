import Navbar from "../../components/Navbar";
import { Card, Col, Container, Image, Row } from "react-bootstrap";

const Notification = ({ notifications }) => {
  return (
    <>
      <Navbar />
      <Container>
        <Row className="d-flex justify-content-center my-3">
          <Col xs={10} md={8} lg={6}>
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className="mb-3 shadow-sm"
                style={{ borderRadius: "10px" }}
              >
                <Card.Body>
                  <Row>
                    <Col xs="auto">
                      <Image
                        src="/img/profile/default.svg"
                        roundedCircle
                        alt="Avatar"
                      />
                    </Col>
                    <Col>
                      <Card.Title className="mb-1">
                        <strong>{notification.title}</strong>
                      </Card.Title>
                      <Card.Text className="mb-1 text-muted">
                        {new Date(notification.createdAt).toLocaleString()}
                      </Card.Text>
                      <Card.Text>{notification.message}</Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Notification;
