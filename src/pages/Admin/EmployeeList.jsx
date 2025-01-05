import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Alert,
  Card,
  ListGroup,
  Image,
} from "react-bootstrap";
import Navbar from "../../components/Navbar";
import {
  addEmployee,
  deleteEmployee,
  getEmployeeList,
  updateEmployee,
} from "../../apis/services/Admin";
import EmployeeModal from "../../components/Admin/EmployeeModal";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({});
  const [reload, setReload] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await getEmployeeList();
      setEmployees(response.data);
    };

    fetchEmployees();
  }, [reload]);

  const handleShowModal = (employee = null) => {
    setCurrentEmployee(employee);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleUpdateEmployee = async (values) => {
    const updatedEmployee = {
      _id: currentEmployee._id,
      email: values.email,
      fullName: values.fullName,
      phone: values.phone,
      address: values.address,
      dob: values.dob,
    };

    const response = await updateEmployee(updatedEmployee);

    if (response.statusCode === 200) {
      setReload(!reload);
      setSuccessMessage("Cập nhật nhân viên thành công!");
    }

    setShowModal(false);
  };

  const handleSave = async (values) => {
    const response = await addEmployee(values);

    if (response.statusCode === 200) {
      setReload(!reload);
      setSuccessMessage("Thêm nhân viên thành công!");
    }

    setShowModal(false);
  };

  const handleUpdate = (id) => {
    const employee = employees.find((e) => e._id === id);
    handleShowModal(employee);
  };

  const handleDelete = async (id) => {
    const response = await deleteEmployee(id);

    if (response.statusCode === 200) {
      setReload(!reload);
      setSuccessMessage("Xóa nhân viên thành công!");
    }
  };

  return (
    <>
      <Navbar />
      <Container className="my-4">
        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        <div className="w-100 d-flex gap-2 justify-content-center">
          <Button
            variant="primary"
            className="mb-3"
            onClick={() => handleShowModal()}
          >
            Thêm nhân viên
          </Button>

          <Button variant="primary" className="mb-3" onClick={()=>navigate("/admin/cross-check")}>
            Đối soát
          </Button>
        </div>

        <Card>
          <Card.Body>
            <ListGroup variant="flush">
              {employees.map((employee) => (
                <ListGroup.Item
                  key={employee._id}
                  className="d-flex align-items-center justify-content-between"
                >
                  <div className="d-flex align-items-center">
                    <Image
                      src="/img/profile/default.svg"
                      roundedCircle
                      width="50"
                      height="50"
                      className="me-3"
                    />
                    <div>
                      <h5 className="mb-1">{employee.fullName}</h5>
                      <p className="mb-0 text-muted">{employee.email}</p>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleUpdate(employee._id)}
                    >
                      Cập nhật
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(employee._id)}
                    >
                      Xóa
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>

        <EmployeeModal
          show={showModal}
          employee={currentEmployee}
          handleUpdate={handleUpdateEmployee}
          handleClose={handleCloseModal}
          handleSave={handleSave}
        />
      </Container>
    </>
  );
};

export default EmployeeList;
