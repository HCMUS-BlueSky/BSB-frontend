import React from "react";
import { Row, Col, Card, Badge } from "react-bootstrap";
import moment from "moment";
import { formatCurrency } from "../../utils/formatCurrency";

const TransactionHistoryDetail = ({ history, account, loading }) => {
  if (loading) {
    return <p className="text-center">Đang tải dữ liệu...</p>;
  }

  return (
    <Row className="d-flex justify-content-center mb-3">
      <Col>
        <Card className="px-4" style={{ border: "none" }}>
          <p className="text-start py-3">Lịch sử giao dịch</p>
          {history.length > 0 ? (
            history.map((transaction) => {
              const isInternal = transaction.sender && transaction.receiver;
              const isSender = isInternal
                ? transaction.sender._id === account._id
                : transaction.to._id === account._id;

              const counterpartName = isInternal
                ? isSender
                  ? transaction.receiver.owner.fullName
                  : transaction.sender.owner.fullName
                : isSender
                ? transaction.from.owner.fullName
                : transaction.to.owner.fullName;

              const description = transaction.description
                ? `Nội dung: ${transaction.description}`
                : "Không có nội dung";

              const transactionType = isInternal
                ? isSender
                  ? "Chuyển đến"
                  : "Chuyển từ"
                : isSender
                ? "Trả nợ cho"
                : "Được trả nợ bởi";

              const badgeText = isInternal ? "Nội bộ" : "Nhắc nợ";
              const badgeVariant = isInternal ? "primary" : "warning";

              return (
                <Row
                  key={transaction._id}
                  className="p-3 d-flex justify-content-between align-items-center border-top"
                  style={{ borderColor: "#f4f5f6" }}
                >
                  <Col>
                    <p className="mb-1">
                      <Badge bg={badgeVariant}>{badgeText}</Badge>
                    </p>
                    <p className="mb-0">
                      {transactionType} <strong>{counterpartName}</strong>
                    </p>
                    <p
                      className="mb-0 text-muted"
                      style={{ fontSize: "0.85rem" }}
                    >
                      {description}
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
                        ? `- ${formatCurrency(transaction.amount)}`
                        : `+ ${formatCurrency(transaction.amount)}`}{" "}
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

export default TransactionHistoryDetail;
