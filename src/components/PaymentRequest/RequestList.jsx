import React from "react";
import { Row, Col, Button, Dropdown, Card } from "react-bootstrap";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

const RequestList = ({
  requestList,
  sortOptionRequestList,
  toggleRequestList,
  isRequestListVisible,
  handleSortRequestChange,
}) => {
  return (
    <Row className="justify-content-center mb-4">
      <Col xs={12} md={8}>
        <Card className="shadow-sm">
          <Card.Body className="py-0">
            <Row className="align-items-center py-3">
              <Col xs="auto">
                <h6 className="mb-0 text-primary">Cần xử lý</h6>
              </Col>
              <Col xs="auto">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="link"
                    className="text-decoration-none"
                  >
                    {sortOptionRequestList}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => handleSortRequestChange("Gần đây nhất")}
                    >
                      Gần đây nhất
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleSortRequestChange("từ A-Z")}
                    >
                      từ A-Z
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col xs="auto" className="ms-auto">
                <Button
                  variant="link"
                  className="text-decoration-none"
                  onClick={toggleRequestList}
                >
                  {isRequestListVisible ? "Thu gọn" : "Mở rộng"}
                </Button>
              </Col>
            </Row>

            {isRequestListVisible ? (
              requestList.length > 0 ? (
                <Row className="justify-content-center">
                  {requestList.map((item, index) => (
                    <Row
                      key={index}
                      className="p-3 d-flex justify-content-between align-items-center list-item-hover"
                      style={{ borderTop: "1px solid #f4f5f6" }}
                    >
                      <Col className="d-flex align-items-center">
                        <img
                          src={item.profilePic}
                          alt="profile"
                          className="rounded-circle"
                          width="40"
                          height="40"
                        />
                        <div className="ms-3">
                          <p className="mb-0">
                            Nhắc nợ {item.direction}{" "}
                            <strong>{item.name}</strong>
                          </p>
                          <small className="text-muted">Vào {formatDate(item.date)}</small>
                        </div>
                      </Col>
                      <Col xs="auto">
                        <h6
                          className={
                            item.direction === "từ"
                              ? "text-danger mb-0"
                              : "mb-0"
                          }
                        >
                          {formatCurrency(item.amount)}
                        </h6>
                      </Col>
                    </Row>
                  ))}
                </Row>
              ) : (
                <div className="pb-4 text-center">
                  Bạn không có nhắc nợ cần xử lý nào
                </div>
              )
            ) : null}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default RequestList;