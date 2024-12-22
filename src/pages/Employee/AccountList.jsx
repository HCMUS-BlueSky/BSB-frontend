import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getAccountList, registerAccount } from "../../apis/services/Employee";
import { Button, Card, Image, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AccountCreationModal from "../../components/Employee/AccountCreationModal";

const AccountList = () => {
  const [accountList, setAccountList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await getAccountList();
        setAccountList(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAccounts();
  }, [reload]);

  const handleViewProfile = (accountId) => {
    navigate(`/employee/account/${accountId}`);
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSaveAccount = async (data) => {
    const response = await registerAccount(data);
    if (response) {
      setReload(!reload);
      handleCloseModal();
    }
  };

  const handleDeposit = () => {
    navigate("/employee/deposit");
  };

  return (
    <>
      <Navbar />
      <div className="container my-4">
        <div className="w-100 d-flex justify-content-center mb-3 gap-4">
          <Button variant="outline-primary" size="md" onClick={handleOpenModal}>
            Tạo tài khoản
          </Button>
          <Button variant="primary" size="md" onClick={handleDeposit}>
            Nạp tiền
          </Button>
        </div>

        <Card>
          <Card.Body>
            <ListGroup variant="flush">
              {accountList.map((account) => (
                <ListGroup.Item
                  key={account._id}
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
                      <h5 className="mb-1">{account.owner?.fullName}</h5>
                      <p className="mb-0 text-muted">{account.owner?.email}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleViewProfile(account._id)}
                  >
                    View Profile
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </div>

      <AccountCreationModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSaveAccount}
      />
    </>
  );
};

export default AccountList;
