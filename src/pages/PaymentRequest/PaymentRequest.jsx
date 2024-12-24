import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Button, Col, Container, Row, Card } from "react-bootstrap";
import RequestList from "../../components/PaymentRequest/RequestList";
import { formatCurrency } from "../../utils/formatCurrency";
import PopUpNewDebtReminder from "../../components/PopUp/PopUpNewDebtReminder";
import { getAccount } from "../../apis/services/Account";
import "./PaymentRequest.css";
import { getAllRemind } from "../../apis/services/Remind";
import Loading from "../../components/Loading/Loading";
import CompletedList from "../../components/PaymentRequest/CompletedList";

const PaymentRequest = () => {
  const [isRequestListVisible, setIsRequestListVisible] = useState(true);
  const [isCompletedListVisible, setIsCompletedListVisible] = useState(true);
  const [sortOptionRequestList, setSortOptionRequestList] =
    useState("Gần đây nhất");
  const [sortOptionCompletedList, setSortOptionCompletedList] =
    useState("Gần đây nhất");
  const [account, setAccount] = useState(null);
  const [debtReminders, setDebtReminders] = useState([]);
  const [showNewDebtReminder, setShowNewDebtReminder] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllRemind();
        const accountResponse = await getAccount();
        setAccount(accountResponse.data);

        const reminders = response.data
          .map((item) => {
            const direction =
              item.from._id === accountResponse.data._id
                ? "sent"
                : item.to._id === accountResponse.data._id
                ? "received"
                : null;
            if (direction) {
              return {
                ...item,
                direction,
              };
            }
            return null;
          })
          .filter(Boolean);
        setDebtReminders(reminders);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleVisibility = (setState) => setState((prev) => !prev);

  const moneyAnalysis = debtReminders.reduce(
    (acc, item) => {
      if (item.status != "PENDING") return acc;
      if (item.direction === "sent") {
        acc.totalReceived += item.amount;
      } else {
        acc.totalPaid += item.amount;
      }
      return acc;
    },
    { totalReceived: 0, totalPaid: 0 }
  );

  if (loading) return <Loading />;

  return (
    <>
      <Navbar />
      <main className="py-3">
        <Container>
          <Row className="justify-content-center mb-4">
            <Col xs={12} md={8}>
              <Card className="shadow-sm p-3">
                <Row className="d-flex justify-content-between p-1">
                  {[
                    { label: "Số dư khả dụng", value: account?.balance },
                    {
                      label: "Tổng tiền nhận",
                      value: moneyAnalysis.totalReceived,
                    },
                    {
                      label: "Tổng tiền trả",
                      value: moneyAnalysis.totalPaid,
                      className: "text-danger",
                    },
                  ].map(({ label, value, className = "" }, index) => (
                    <Col
                      key={index}
                      className="d-flex flex-column align-items-center"
                    >
                      <p className="mb-0 text-muted">{label}</p>
                      <h5 className={className}>{formatCurrency(value)}</h5>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>
          </Row>

          <Row className="justify-content-center mb-4">
            <Col xs={12} md={8}>
              <div className="d-flex justify-content-end">
                <Button
                  variant="primary"
                  className="w-auto shadow-sm py-2 text-light"
                  onClick={() => setShowNewDebtReminder(true)}
                >
                  <i className="bi bi-plus me-2"></i> TẠO NHẮC NỢ MỚI
                </Button>
                <PopUpNewDebtReminder
                  show={showNewDebtReminder}
                  handleClose={() => setShowNewDebtReminder(false)}
                />
              </div>
            </Col>
          </Row>

          <RequestList
            requestList={debtReminders.filter(
              (item) => item.status === "PENDING"
            )}
            sortOptionRequestList={sortOptionRequestList}
            toggleRequestList={() => toggleVisibility(setIsRequestListVisible)}
            isRequestListVisible={isRequestListVisible}
            handleSortRequestChange={setSortOptionRequestList}
          />

          <CompletedList
            completedList={debtReminders.filter(
              (item) => item.status === "FULFILLED"
            )}
            sortOptionCompletedList={sortOptionCompletedList}
            toggleCompletedList={() =>
              toggleVisibility(setIsCompletedListVisible)
            }
            isCompletedListVisible={isCompletedListVisible}
            handleSortCompletedChange={setSortOptionCompletedList}
          />
        </Container>
      </main>
    </>
  );
};

export default PaymentRequest;
