import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Badge,
  Form,
  Button,
  FloatingLabel,
} from "react-bootstrap";
import moment from "moment";
import { formatCurrency } from "../../utils/formatCurrency";
import { getAdminExternalTransactions } from "../../apis/services/Admin";
import { getBanks } from "../../apis/services/Admin";
import Loading from "../../components/Loading/Loading";

const CrossCheck = () => {
  const [limitDays, setLimitDays] = useState(30);
  const [selectedBank, setSelectedBank] = useState("");
  const [banks, setBanks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalSent, setTotalSent] = useState(0);
  const [totalReceived, setTotalReceived] = useState(0);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await getBanks();
        setBanks(response.data);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };

    fetchBanks();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const resp = await getAdminExternalTransactions(limitDays, selectedBank);
      setTransactions(resp.data);

      const totalSentAmount = resp.data
        .filter((transaction) => transaction.sender.owner)
        .reduce((acc, curr) => acc + curr.amount, 0);
      const totalReceivedAmount = resp.data
        .filter((transaction) => transaction.receiver.owner)
        .reduce((acc, curr) => acc + curr.amount, 0);

      setTotalSent(totalSentAmount);
      setTotalReceived(totalReceivedAmount);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [selectedBank]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTransactions();
  };

  const getBadgeInfo = (status) => {
    switch (status) {
      case "FULFILLED":
        return { variant: "success", label: "Thành công" };
      case "PENDING":
        return { variant: "warning", label: "Đang chờ" };
      case "REJECTED":
        return { variant: "danger", label: "Đã từ chối" };
      default:
        return { variant: "danger", label: "" };
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mt-5">
      <Row className="d-flex justify-content-center mb-3">
        <Col xs={10} md={8} lg={6}>
          <Card className="mb-4 py-3">
            <Row className="d-flex justify-content-between p-1">
              {[
                {
                  label: "Tổng số tiền",
                  value: totalSent + totalReceived,
                },
                {
                  label: "Tổng tiền nhận",
                  value: totalReceived,
                  className: "text-success",
                },
                {
                  label: "Tổng tiền gửi",
                  value: totalSent,
                  className: "text-danger",
                },
              ].map(({ label, value, className = "" }, index) => (
                <Col
                  key={index}
                  className="d-flex flex-column align-items-center"
                >
                  <p className="mb-0 text-muted">{label}</p>
                  <h5 className={className}>{formatCurrency(value)} VND</h5>
                </Col>
              ))}
            </Row>
          </Card>

          <Form onSubmit={handleSubmit} className="mb-4">
            <Row className="w-100 align-items-center justify-content-between">
              <Col xs="auto" className="d-flex align-items-center">
                <Form.Group controlId="bankSelect">
                  <FloatingLabel
                    className="mb-3"
                    controlId="bankSelect"
                    label="Chọn Ngân Hàng"
                  >
                    <Form.Select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      aria-label="Chọn ngân hàng"
                    >
                      <option value="">Tất cả Ngân Hàng</option>
                      {banks.map((bank) => (
                        <option key={bank._id} value={bank._id}>
                          {bank.name}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col xs="auto" className="d-flex align-items-center">
                <Form.Group controlId="limitDays">
                  <FloatingLabel
                    className="mb-3"
                    controlId="limitDays"
                    label="Số ngày giới hạn"
                  >
                    <Form.Control
                      type="number"
                      value={limitDays}
                      onChange={(e) => setLimitDays(e.target.value)}
                      min={1}
                      placeholder="Nhập số ngày"
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>

              <Col xs="auto" className="mb-3">
                <Button type="submit" className="w-100 text-light">
                  Tìm kiếm
                </Button>
              </Col>
            </Row>
          </Form>

          <Card className="px-4 mb-5" style={{ border: "none" }}>
            <p className="text-start py-3">
              Lịch sử Giao dịch Ngân hàng liên kết
            </p>
            {transactions.length > 0 ? (
              transactions.map((transaction) => {
                const {
                  sender,
                  receiver,
                  amount,
                  description,
                  createdAt,
                  bank,
                  status,
                } = transaction;
                const badgeInfo = getBadgeInfo(status);

                const isSenderFromOurBank = sender?.owner;
                const isReceiverFromOurBank = receiver?.owner;

                return (
                  <Row
                    key={transaction._id}
                    className="p-3 d-flex justify-content-between align-items-center border-top"
                    style={{ borderColor: "#f4f5f6" }}
                  >
                    <Col>
                      <p className="mb-1">
                        <Badge bg={badgeInfo.variant}>{badgeInfo.label}</Badge>
                      </p>
                      <p className="mb-0">
                        Người gửi: <strong>{sender.accountNumber}</strong>
                      </p>
                      <p className="mb-0">
                        Người nhận: <strong>{receiver.accountNumber}</strong>
                      </p>
                      <p className="mb-0">
                        Ngân hàng: <strong>{bank.name}</strong>
                      </p>
                      <p
                        className="mb-0 text-muted"
                        style={{ fontSize: "0.85rem" }}
                      >
                        {description
                          ? `Nội dung: ${description}`
                          : "Không có nội dung"}
                      </p>
                      <p
                        className="mb-0 text-muted"
                        style={{ fontSize: "0.85rem" }}
                      >
                        Thời điểm:{" "}
                        {moment(createdAt).format("DD/MM/YYYY HH:mm")}
                      </p>
                    </Col>

                    <Col xs="auto" className="text-end">
                      <p
                        className={`mb-0 ${
                          isSenderFromOurBank ? "text-danger" : "text-success"
                        }`}
                      >
                        {isSenderFromOurBank
                          ? `- ${formatCurrency(amount)}`
                          : `+ ${formatCurrency(amount)}`}{" "}
                        VND
                      </p>
                    </Col>
                  </Row>
                );
              })
            ) : (
              <p
                className="text-center pb-3 text-muted"
                style={{ whiteSpace: "nowrap" }}
              >
                Chưa có lịch sử giao dịch
              </p>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CrossCheck;
