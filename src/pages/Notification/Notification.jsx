import Navbar from "../../components/Navbar";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import RequestFromModal from "../../components/PaymentRequest/RequestFromModal";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationContext";

const Notification = () => {
  const { notifications } = useNotifications();
  const [modalShow, setModalShow] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const { user } = useAuth();

  const handleNotificationClick = (notification) => {
    if (notification.title === "Nhắc nợ") {
      setSelectedRequest(notification.message);
      setModalShow(true);
    }
  };

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
                style={{ borderRadius: "10px", cursor: "pointer" }}
                onClick={() => handleNotificationClick(notification)}
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
                      <Card.Text>
                        <strong>
                          {notification.title === "Huỷ nhắc nợ"
                            ? notification.message.from.owner.fullName !==
                              user.fullName
                              ? notification.message.from.owner.fullName
                              : notification.message.to.owner.fullName
                            : notification.message.from.owner.fullName}
                        </strong>{" "}
                        <span style={{ textTransform: "lowercase" }}>
                          {notification.title}{" "}
                        </span>
                        <strong>{notification.message.amount} VND</strong>{" "}
                        {notification.title === "Nhắc nợ" && (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: `với nội dung <strong>${notification.message.message}</strong>`,
                            }}
                          ></span>
                        )}
                      </Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>

      <RequestFromModal
        notification={true}
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={selectedRequest}
      />
    </>
  );
};

export default Notification;
