import React from "react";
import { Card, Row, Col, Button, Form } from "react-bootstrap";

const PersonalInformationCard = ({
  editing,
  inputValues,
  maritalStatus,
  handleEditClick,
  handleSaveClick,
  handleInputChange,
  handleMaritalStatusChange,
  handleCancelClick
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
          <Row className="p-3 d-flex align-items-center" style={{ borderTop: "1px solid #f4f5f6" }}>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <i className="bi bi-geo-alt-fill  me-2"></i>
                <p className="mb-0"><strong>Địa chỉ hiện tại:</strong> {inputValues.currentAddress}</p>
              </div>
              <div>
                {!editing.currentAddress ? (
                  <Button
                    variant="link"
                    className="text-primary d-flex text-decoration-none"
                    onClick={() => handleEditClick("currentAddress")}
                  >
                    Chỉnh sửa
                    <i className="bi bi-pencil ms-1"></i>
                  </Button>
                ) : (
                  <div className="d-flex align-items-center">
                    <Button
                      variant="link"
                      className="text-danger text-decoration-none"
                      onClick={() => handleCancelClick("currentAddress")}
                    >
                      Hủy
                    </Button>
                    <Button
                      variant="link"
                      className="text-success text-decoration-none"
                      onClick={() => handleSaveClick("currentAddress")}
                    >
                      Tiếp theo
                    </Button>
                  </div>
                )}
              </div>
            </div>
            {editing.currentAddress && (
              <div className="mt-3">
                <Form.Control
                  type="text"
                  value={inputValues.currentAddress}
                  onChange={(e) => handleInputChange(e, "currentAddress")}
                />
              </div>
            )}
          </Row>

          {/* Marital Status */}
          <Row className="p-3 d-flex align-items-center" style={{ borderTop: "1px solid #f4f5f6" }}>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <i className="bi bi-heart-fill me-2"></i>
                <p className="mb-0"><strong>Tình trạng hôn nhân:</strong> {maritalStatus || "Chưa cập nhật"}</p>
              </div>
              <div>
                {!editing.maritalStatus ? (
                  <Button
                    variant="link"
                    className="text-primary d-flex text-decoration-none"
                    onClick={() => handleEditClick("maritalStatus")}
                  >
                    Chỉnh sửa
                    <i className="bi bi-pencil ms-1"></i>
                  </Button>
                ) : (
                  <div className="d-flex align-items-center">
                    <Button
                      variant="link"
                      className="text-danger text-decoration-none"
                      onClick={() => handleCancelClick("maritalStatus")}
                    >
                      Hủy
                    </Button>
                    <Button
                      variant="link"
                      className="text-success text-decoration-none"
                      onClick={() => handleSaveClick("maritalStatus")}
                    >
                      Tiếp theo
                    </Button>
                  </div>
                )}
              </div>
            </div>
            {editing.maritalStatus && (
              <div className="mt-3">
                <Form.Check
                  type="radio"
                  label="Đã kết hôn"
                  value="Đã kết hôn"
                  checked={maritalStatus === "Đã kết hôn"}
                  onChange={handleMaritalStatusChange}
                />
                <Form.Check
                  type="radio"
                  label="Độc thân"
                  value="Độc thân"
                  checked={maritalStatus === "Độc thân"}
                  onChange={handleMaritalStatusChange}
                />
                <Form.Check
                  type="radio"
                  label="Khác"
                  value="Khác"
                  checked={maritalStatus === "Khác"}
                  onChange={handleMaritalStatusChange}
                />
                <Form.Check
                  type="radio"
                  label="Không cung cấp"
                  value="Không cung cấp"
                  checked={maritalStatus === "Không cung cấp"}
                  onChange={handleMaritalStatusChange}
                />
              </div>
            )}
          </Row>

          {/* Occupation */}
          <Row className="p-3 d-flex align-items-center" style={{ borderTop: "1px solid #f4f5f6" }}>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <i className="bi bi-briefcase-fill me-2"></i>
                <p className="mb-0"><strong>Nghề nghiệp:</strong> {inputValues.occupation}</p>
              </div>
              <div>
                {!editing.occupation ? (
                  <Button
                    variant="link"
                    className="text-primary d-flex text-decoration-none"
                    onClick={() => handleEditClick("occupation")}
                  >
                    Chỉnh sửa
                    <i className="bi bi-pencil ms-1"></i>
                  </Button>
                ) : (
                  <div className="d-flex align-items-center">
                    <Button
                      variant="link"
                      className="text-danger text-decoration-none"
                      onClick={() => handleCancelClick("occupation")}
                    >
                      Hủy
                    </Button>
                    <Button
                      variant="link"
                      className="text-success text-decoration-none"
                      onClick={() => handleSaveClick("occupation")}
                    >
                      Tiếp theo
                    </Button>
                  </div>
                )}
              </div>
            </div>
            {editing.occupation && (
              <div className="mt-3">
                <Form.Control
                  type="text"
                  value={inputValues.occupation}
                  onChange={(e) => handleInputChange(e, "occupation")}
                />
              </div>
            )}
          </Row>

          {/* Title */}
          <Row className="p-3 d-flex align-items-center" style={{ borderTop: "1px solid #f4f5f6" }}>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <i className="bi bi-tag-fill me-2"></i>
                <p className="mb-0"><strong>Chức danh:</strong> {inputValues.title}</p>
              </div>
              <div>
                {!editing.title ? (
                  <Button
                    variant="link"
                    className="text-primary d-flex text-decoration-none"
                    onClick={() => handleEditClick("title")}
                  >
                    Chỉnh sửa
                    <i className="bi bi-pencil ms-1"></i>
                  </Button>
                ) : (
                  <div className="d-flex align-items-center">
                    <Button
                      variant="link"
                      className="text-danger text-decoration-none"
                      onClick={() => handleCancelClick("title")}
                    >
                      Hủy
                    </Button>
                    <Button
                      variant="link"
                      className="text-success text-decoration-none"
                      onClick={() => handleSaveClick("title")}
                    >
                      Tiếp theo
                    </Button>
                  </div>
                )}
              </div>
            </div>
            {editing.title && (
              <div className="mt-3">
                <Form.Control
                  type="text"
                  value={inputValues.title}
                  onChange={(e) => handleInputChange(e, "title")}
                />
              </div>
            )}
          </Row>

          {/* Tax Code */}
          <Row className="p-3 d-flex align-items-center" style={{ borderTop: "1px solid #f4f5f6" }}>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <i className="bi bi-file-earmark-text-fill me-2"></i>
                <p className="mb-0"><strong>Mã số thuế (nếu có):</strong> {inputValues.taxCode}</p>
              </div>
              <div>
                {!editing.taxCode ? (
                  <Button
                    variant="link"
                    className="text-primary d-flex text-decoration-none"
                    onClick={() => handleEditClick("taxCode")}
                  >
                    Chỉnh sửa
                    <i className="bi bi-pencil ms-1"></i>
                  </Button>
                ) : (
                  <div className="d-flex align-items-center">
                    <Button
                      variant="link"
                      className="text-danger text-decoration-none"
                      onClick={() => handleCancelClick("taxCode")}
                    >
                      Hủy
                    </Button>
                    <Button
                      variant="link"
                      className="text-success text-decoration-none"
                      onClick={() => handleSaveClick("taxCode")}
                    >
                      Tiếp theo
                    </Button>
                  </div>
                )}
              </div>
            </div>
            {editing.taxCode && (
              <div className="mt-3">
                <Form.Control
                  type="text"
                  value={inputValues.taxCode}
                  onChange={(e) => handleInputChange(e, "taxCode")}
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
