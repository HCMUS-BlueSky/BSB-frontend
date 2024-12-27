import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Modal,
  Row,
  Toast,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./TransferMoney.scss";
import { getUserByAccountNumber } from "../../apis/services/Account";
import {
  addReceiver,
  deleteReceiver,
  getReceiver,
  updateReceiver,
} from "../../apis/services/Receiver";
import { ToastContainer } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "../../components/Loading/Loading";

const TransferMoney = () => {
  const [showModal, setShowModal] = useState(false);
  const [showBSBAccountInfoScreen, setShowBSBAccountInfoScreen] =
    useState(true);
  const [accountInfo, setAccountInfo] = useState("");
  const [nickname, setNickname] = useState("");
  const [showError, setShowError] = useState(false);
  const [searchAccountInfo, setSearchAccountInfo] = useState({});
  const [accountList, setAccountList] = useState([]);
  const [showToastCreateReceiver, setShowToastCreateReceiver] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [selectedDeleteAccount, setSelectedDeleteAccount] = useState(null);
  const [expandedAccountId, setExpandedAccountId] = useState(null);
  const [editingAccountId, setEditingAccountId] = useState(null);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEditClick = (account) => {
    setEditingAccountId(account._id);
    setNickname(account.nickname); // Populate input with the current nickname
  };

  const handleEditSaveClick = async (accountId) => {
    const response = await updateReceiver({
      id: accountId,
      nickname,
    });

    if (response.statusCode !== 200) {
      return;
    }

    setReload(!reload);
    setEditingAccountId(null);
  };

  const handleEditCancelClick = () => {
    setEditingAccountId(null); // Exit edit mode without saving
  };

  const handleAccountClick = (accountId) => {
    setExpandedAccountId((prevId) => (prevId === accountId ? null : accountId));
  };

  const handleDeleteClick = (account) => {
    setSelectedDeleteAccount(account);
    setShowConfirmDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    const response = await deleteReceiver(selectedDeleteAccount._id);

    if (response.statusCode !== 200) {
      return;
    }

    setReload(!reload);
    setShowConfirmDeleteModal(false);
    setSelectedDeleteAccount(null);
  };

  const handleCloseConfirmDelete = () => {
    setShowConfirmDeleteModal(false);
    setSelectedDeleteAccount(null);
  };

  useEffect(() => {
    async function getAccountList() {
      setLoading(true);
      const res = await getReceiver();
      setLoading(false);
      if (res.statusCode !== 200) {
        return;
      }
      setAccountList(res.data.receiverList);
    }
    getAccountList();
  }, [reload]);

  const handleClose = () => {
    setShowModal(false);
    setShowBSBAccountInfoScreen(true);
    setShowError(false);
    setAccountInfo("");
  };

  const handleShow = () => setShowModal(true);

  const handleTransferClick = (accountNumber) => {
    navigate("/transfer-money/internal", { state: { accountNumber } });
  };

  const handleSave = async () => {
    const res = await addReceiver({
      accountNumber: accountInfo,
      nickname,
      type: "INTERNAL",
    });

    if (res.statusCode !== 200) {
      return;
    }

    setReload(!reload);
    handleClose();
  };

  const handleSearchAccount = async () => {
    const res = await getUserByAccountNumber(accountInfo);
    if (res.statusCode !== 200) {
      return;
    }
    setSearchAccountInfo(res.data);
    setShowBSBAccountInfoScreen(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <Container>
        <Row className="d-flex justify-content-center my-3">
          <Col xs={10} md={6}>
            <div className="w-100 bg-light p-2 rounded mb-3">
              <div className="p-2">
                <p>Bạn chuyển tiền qua kênh nào?</p>
              </div>
              <Row>
                <Col>
                  <Link to={"/transfer-money/internal"}>
                    <Button
                      className="w-100 d-flex flex-column align-items-center"
                      variant="light"
                    >
                      <i className="bi bi-moon-stars text-primary fs-5"></i>
                      <span className="m-2">Nội bộ BSB</span>
                    </Button>
                  </Link>
                </Col>
                <Col>
                  <Link to={"/transfer-money/external"}>
                    <Button
                      className="w-100 d-flex flex-column align-items-center"
                      variant="light"
                    >
                      <i className="bi bi-bank text-primary fs-5"></i>
                      <span className="m-2">Tài khoản ngân hàng khác</span>
                    </Button>
                  </Link>
                </Col>
              </Row>
            </div>

            <div className="d-flex justify-content-end mb-3">
              <Button
                variant="primary"
                className="text-white"
                onClick={handleShow}
              >
                <i className="bi bi-person-plus me-2"></i> THÊM NGƯỜI NHẬN MỚI
              </Button>
            </div>

            <div className="receiver-list">
              {accountList?.map((account) => (
                <div key={account._id} className="mb-2">
                  <div
                    className={`d-flex align-items-center justify-content-between p-3 bg-white ${
                      expandedAccountId === account._id
                        ? "rounded-top"
                        : "rounded"
                    }`}
                    onClick={() => handleAccountClick(account._id)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle bg-light d-flex justify-content-center align-items-center me-3"
                        style={{ width: "40px", height: "40px" }}
                      >
                        <img
                          src="/img/profile/default.svg"
                          alt={account.nickname}
                          className="rounded-circle"
                          style={{ width: "100%", height: "100%" }}
                        />
                      </div>
                      {editingAccountId === account._id ? (
                        <FloatingLabel
                          controlId={`floatingInput-${account._id}`}
                          label="Tên gợi nhớ"
                          className="w-100"
                        >
                          <Form.Control
                            type="text"
                            value={nickname}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              setNickname(e.target.value);
                            }}
                          />
                        </FloatingLabel>
                      ) : (
                        <div>
                          <p className="mb-0 fw-bold">{account.nickname}</p>
                        </div>
                      )}
                    </div>
                    <div>
                      {editingAccountId === account._id ? (
                        <>
                          <Button
                            variant="primary"
                            className="me-2 text-light"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditSaveClick(account._id);
                            }}
                          >
                            LƯU
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditCancelClick();
                            }}
                          >
                            HỦY
                          </Button>
                        </>
                      ) : (
                        <div>
                          <Button
                            variant="light"
                            className="me-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditClick(account);
                            }}
                          >
                            <i className="bi bi-pencil text-primary"></i>
                          </Button>
                          <Button
                            variant="light"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(account);
                            }}
                          >
                            <i className="bi bi-trash text-secondary"></i>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {expandedAccountId === account._id && (
                    <div className="p-3 bg-light rounded-bottom border-top d-flex justify-content-between align-items-center">
                      <div>
                        <p className="mb-1">
                          <strong>Số tài khoản:</strong> {account.accountNumber}
                        </p>
                        <p className="mb-0">
                          <strong>Ngân hàng:</strong>{" "}
                          {account.bank || "Chưa xác định"}
                        </p>
                      </div>
                      <button
                        className="btn btn-primary text-white"
                        onClick={() =>
                          handleTransferClick(account.accountNumber)
                        }
                      >
                        CHUYỂN KHOẢN
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Col>
        </Row>
        <Row></Row>
      </Container>
      <Modal
        show={showConfirmDeleteModal}
        onHide={handleCloseConfirmDelete}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn chắc chắn muốn xóa người nhận này?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmDelete}>
            Hủy
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={handleClose} centered>
        {showBSBAccountInfoScreen ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="w-100">
                <p className="w-100 text-center mb-4 fw-bold text-primary fs-4">
                  Nhập thông tin tài khoản BSB
                </p>
              </div>

              <FloatingLabel
                controlId="floatingInput"
                label="THÔNG TIN TÀI KHOẢN BSB"
                className={`mb-4 ${
                  showError ? "text-danger" : "Thông tin này không thể để trống"
                }`}
              >
                <Form.Control
                  type="text"
                  placeholder="Nhập số tài khoản hoặc địa chỉ email"
                  value={accountInfo}
                  onChange={(e) => setAccountInfo(e.target.value)}
                  isInvalid={showError}
                />
              </FloatingLabel>
              {showError && (
                <small className="text-danger">
                  Thông tin này không thể để trống
                </small>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                className="text-light"
                onClick={handleSearchAccount}
              >
                TÌM NGƯỜI NHẬN
              </Button>
            </Modal.Footer>
          </>
        ) : (
          <>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <p className="w-100 text-center mb-4 fw-bold text-primary fs-4">
                Nhập thông tin tài khoản BSB
              </p>
              <FloatingLabel
                controlId="floatingInput"
                label="THÔNG TIN TÀI KHOẢN BSB"
                className={`mb-4 ${
                  showError ? "text-danger" : "Thông tin này không thể để trống"
                }`}
              >
                <Form.Control
                  type="text"
                  placeholder="Nhập số tài khoản hoặc địa chỉ email"
                  value={accountInfo}
                  onChange={(e) => setAccountInfo(e.target.value)}
                  isInvalid={showError}
                />
              </FloatingLabel>
              <small className="text-muted">{searchAccountInfo.fullName}</small>
              <FloatingLabel
                controlId="floatingInput"
                label="Tên gợi nhớ"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="mb-4 mt-4"
              >
                <Form.Control type="text" placeholder="Nhập tên gợi nhớ" />
              </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="text-light"
                variant="primary"
                onClick={() => {
                  handleSave();
                  setShowModal(false);
                  setShowToastCreateReceiver(true);
                }}
              >
                LƯU NGƯỜI NHẬN
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
      <ToastContainer className="p-3" position="bottom-end">
        <Toast
          className="bg-success text-white"
          onClose={() => setShowToastCreateReceiver(false)}
          show={showToastCreateReceiver}
          delay={3000}
          autohide
        >
          <Toast.Header></Toast.Header>
          <Toast.Body>Thêm người nhận thành công</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default TransferMoney;
