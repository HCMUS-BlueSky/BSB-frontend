import React, { useState } from "react";
import { Row, Col, Button, Dropdown, Card } from "react-bootstrap";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import RequestToModal from "./RequestToModal";
import RequestFromModal from "./RequestFromModal";

const RequestList = ({
  setReload,
  requestList,
  sortOptionRequestList,
  toggleRequestList,
  isRequestListVisible,
  handleSortRequestChange,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleItemClick = (item) => {
    setSelectedRequest(item);
    setModalShow(true);
  };

  return (
    <>
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
                        style={{
                          borderTop: "1px solid #f4f5f6",
                          cursor: "pointer",
                        }}
                        onClick={() => handleItemClick(item)}
                      >
                        <Col className="d-flex align-items-center">
                          <img
                            src="/img/profile/default.svg"
                            alt="profile"
                            className="rounded-circle"
                            width="40"
                            height="40"
                          />
                          <div className="ms-3">
                            <p className="mb-0">
                              Nhắc nợ{" "}
                              {item.direction === "sent" ? "tới " : "từ"}{" "}
                              {item.direction === "sent" ? (
                                <strong>{item.to.owner.fullName}</strong>
                              ) : (
                                <strong>{item.from.owner.fullName}</strong>
                              )}
                            </p>
                            <small className="text-muted">
                              Vào {formatDate(item.createdAt)}
                            </small>
                          </div>
                        </Col>
                        <Col xs="auto">
                          <h6
                            className={
                              item.direction === "received"
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
                  <Row>
                    <div className="pb-4 text-center w-100">
                      Bạn không có nhắc nợ cần xử lý nào
                    </div>
                  </Row>
                )
              ) : null}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {selectedRequest &&
        (selectedRequest.direction === "sent" ? (
          <RequestToModal
            setReload={setReload}
            show={modalShow}
            onHide={() => setModalShow(false)}
            data={selectedRequest}
          />
        ) : (
          <RequestFromModal
            setReload={setReload}
            show={modalShow}
            onHide={() => setModalShow(false)}
            data={selectedRequest}
          />
        ))}
    </>
  );
};

export default RequestList;
