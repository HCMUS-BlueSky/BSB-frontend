import React from "react";
import { Card, Row, Col, Button, Form } from "react-bootstrap";
import { formatDate } from "../../utils/formatDate";

const PersonalInformationCard = ({
  editing,
  inputValues,
  handleEditClick,
  handleSaveClick,
  handleInputChange,
  handleCancelClick,
}) => {
  return (
    <Row className="d-flex justify-content-center mt-4">
      <Col xs={12} md={8}>
        <Card className="shadow-sm px-3">
          <div className="d-flex align-items-center justify-content-center py-3">
            <i className="bi bi-person-circle text-primary fs-3 me-2"></i>
            <h1 className="mb-0 fs-4">THÔNG TIN CÁ NHÂN</h1>
          </div>

          {/* Current Address */}
          <Row
            className="p-3 d-flex align-items-center"
            style={{ borderTop: "1px solid #f4f5f6" }}
          >
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <i className="bi bi-geo-alt-fill me-2"></i>
                <p className="mb-0">
                  <strong>Địa chỉ hiện tại:</strong> {inputValues.address}
                </p>
              </div>
              <div>
                {!editing.address ? (
                  <Button
                    variant="link"
                    className="text-primary d-flex text-decoration-none"
                    onClick={() => handleEditClick("address")}
                  >
                    Chỉnh sửa
                    <i className="bi bi-pencil ms-1"></i>
                  </Button>
                ) : (
                  <div className="d-flex align-items-center">
                    <Button
                      variant="link"
                      className="text-danger text-decoration-none"
                      onClick={() => handleCancelClick("address")}
                    >
                      Hủy
                    </Button>
                    <Button
                      variant="link"
                      className="text-success text-decoration-none"
                      onClick={() => handleSaveClick("address")}
                    >
                      Tiếp theo
                    </Button>
                  </div>
                )}
              </div>
            </div>
            {editing.address && (
              <div className="mt-3">
                <Form.Control
                  type="text"
                  value={inputValues.address}
                  onChange={(e) => handleInputChange(e, "address")}
                />
              </div>
            )}
          </Row>


          {/* Date of Birth */}
          <Row
            className="p-3 d-flex align-items-center"
            style={{ borderTop: "1px solid #f4f5f6" }}
          >
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <i className="bi bi-calendar-event-fill me-2"></i>
                <p className="mb-0">
                  <strong>Ngày sinh:</strong> {formatDate(inputValues.dob)}
                </p>
              </div>
              <div>
                {!editing.dob ? (
                  <Button
                    variant="link"
                    className="text-primary d-flex text-decoration-none"
                    onClick={() => handleEditClick("dob")}
                  >
                    Chỉnh sửa
                    <i className="bi bi-pencil ms-1"></i>
                  </Button>
                ) : (
                  <div className="d-flex align-items-center">
                    <Button
                      variant="link"
                      className="text-danger text-decoration-none"
                      onClick={() => handleCancelClick("dob")}
                    >
                      Hủy
                    </Button>
                    <Button
                      variant="link"
                      className="text-success text-decoration-none"
                      onClick={() => handleSaveClick("dob")}
                    >
                      Tiếp theo
                    </Button>
                  </div>
                )}
              </div>
            </div>
            {editing.dob && (
              <div className="mt-3">
                <Form.Control
                  type="date"
                  value={inputValues.dob}
                  onChange={(e) => handleInputChange(e, "dob")}
                />
              </div>
            )}
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default PersonalInformationCard;
