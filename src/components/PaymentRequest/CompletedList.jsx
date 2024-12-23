import React, { useState } from "react";
import { Row, Col, Button, Dropdown, Card } from "react-bootstrap";
import { formatCurrency } from "../../utils/formatCurrency";
import RequestCompleteModal from "./RequestCompleteModal";

const Completed = ({
  completedList,
  sortOptionCompletedList,
  toggleCompletedList,
  isCompletedListVisible,
  handleSortCompletedChange,
}) => {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedItem, setSelectedItem] = useState(null); // State to store the selected item

  const handleItemClick = (item) => {
    setSelectedItem(item); // Set the selected item
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Hide the modal
    setSelectedItem(null); // Clear the selected item
  };

  return (
    <>
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={8}>
          <Card className="shadow-sm">
            <Card.Body className="py-0">
              <Row className="align-items-center py-3">
                <Col xs="auto">
                  <h6 className="mb-0 text-primary">Hoàn Tất</h6>
                </Col>
                <Col xs="auto">
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="link"
                      className="text-decoration-none"
                    >
                      {sortOptionCompletedList}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() =>
                          handleSortCompletedChange("Gần đây nhất")
                        }
                      >
                        Gần đây nhất
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleSortCompletedChange("từ A-Z")}
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
                    onClick={toggleCompletedList}
                  >
                    {isCompletedListVisible ? "Thu gọn" : "Mở rộng"}
                  </Button>
                </Col>
              </Row>

              {isCompletedListVisible ? (
                completedList.length > 0 ? (
                  <Row className="justify-content-center">
                    {completedList.map((item, index) => (
                      <Row
                        key={index}
                        className="p-3 d-flex justify-content-between align-items-center list-item-hover"
                        style={{
                          borderTop: "1px solid #f4f5f6",
                          cursor: "pointer",
                        }}
                        onClick={() => handleItemClick(item)} // Handle item click
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
                              Đã hoàn tất với <strong>{item.name}</strong>
                            </p>
                            <small className="text-muted">
                              Vào {item.date}
                            </small>
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
                  <Row className="justify-content-center">
                    <div className="pb-4">
                      <div className="text-center mb-2 w-100">
                        Bạn không có nhắc nợ nào
                      </div>
                      <div className="text-muted fw-light text-center w-100">
                        Khi hoàn tất thanh toán, giao dịch nhắc nợ sẽ hiển thị
                        tại đây và tại danh sách giao dịch của Tài khoản Thanh
                        toán
                      </div>
                    </div>
                  </Row>
                )
              ) : null}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal Component */}
      {selectedItem && (
        <RequestCompleteModal
          show={showModal}
          onHide={handleCloseModal}
          data={selectedItem} // Pass selected item to modal
        />
      )}
    </>
  );
};

export default Completed;
