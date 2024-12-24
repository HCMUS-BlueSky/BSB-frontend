import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import moment from "moment";

const TransactionHistory = ({ history, account, loading }) => {
  if (loading) {
    return <p className="text-center">Đang tải dữ liệu...</p>;
  }
  return (
    <Row className="d-flex justify-content-center my-3">
      <Col xs={10} md={8} lg={6}>
        <Card className="px-4" style={{ border: "none" }}>
          <p className="text-start py-3">Lịch sử giao dịch</p>
          {history.length > 0 ? (
            history.map((transaction) => {
              const isSender = transaction.sender._id === account._id;
              return (
                <Row
                  key={transaction._id}
                  className="p-3 d-flex justify-content-between align-items-center border-top"
                  style={{ borderColor: "#f4f5f6" }}
                >
                  <Col>
                    <p className="mb-0">
                      {isSender ? "Chuyển đến" : "Chuyển từ"}{" "}
                      <strong>
                        {isSender
                          ? transaction.receiver.owner.fullName
                          : transaction.sender.owner.fullName}
                      </strong>
                    </p>
                    <p
                      className="mb-0 text-muted"
                      style={{ fontSize: "0.85rem" }}
                    >
                      {transaction.description
                        ? `Nội dung: ${transaction.description}`
                        : "Không có nội dung"}
                    </p>
                    <p
                      className="mb-0 text-muted"
                      style={{ fontSize: "0.85rem" }}
                    >
                      Thời gian:{" "}
                      {moment(transaction.createdAt).format("DD/MM/YYYY HH:mm")}
                    </p>
                  </Col>

                  <Col xs="auto">
                    <p
                      className={`mb-0 ${
                        isSender ? "text-danger" : "text-success"
                      }`}
                    >
                      {isSender
                        ? `- ${transaction.amount}`
                        : `+ ${transaction.amount}`}{" "}
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
  );
};

export default TransactionHistory;
