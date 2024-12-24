import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Button, Col, Container, Row, Card } from "react-bootstrap";
import RequestList from "../../components/PaymentRequest/RequestList";
import Completed from "../../components/PaymentRequest/CompletedList";
import { formatCurrency } from "../../utils/formatCurrency";
import PopUpNewDebtReminder from "../../components/PopUp/PopUpNewDebtReminder";
import { getAccount } from "../../apis/services/Account";
import "./PaymentRequest.css";
import { getAllRemind } from "../../apis/services/Remind";

const PaymentRequest = () => {
  const [isRequestListVisible, setIsRequestListVisible] = useState(true);
  const [isCompletedListVisible, setIsCompletedListVisible] = useState(true);
  const [sortOptionRequestList, setSortOptionRequestList] = useState("Gần đây nhất");
  const [sortOptionCompletedList, setSortOptionCompletedList] = useState("Gần đây nhất");
  const [account, setAccount] = useState(null);
  const [debtReminders, setDebtReminders] = useState([]);
  const [showNewDebtReminder, setShowNewDebtReminder] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch account and debt reminders data in parallel
    const fetchData = async () => {
      try {
        const [accountResponse, receiverResponse] = await Promise.all([getAccount(), getAllRemind()]);
        setAccount(accountResponse.data);
        setDebtReminders(receiverResponse.data);
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
      if(item.status != "pending") return acc;
      if (item.direction === "tới") {
        acc.totalReceived += item.amount;
      } else {
        acc.totalPaid += item.amount;
      }
      return acc;
    },
    { totalReceived: 0, totalPaid: 0 }
  );

  if (loading) return <div>Loading...</div>;

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
                    { label: "Tổng tiền nhận", value: moneyAnalysis.totalReceived },
                    { label: "Tổng tiền trả", value: moneyAnalysis.totalPaid, className: "text-danger" },
                  ].map(({ label, value, className = "" }, index) => (
                    <Col key={index} className="d-flex flex-column align-items-center">
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
            requestList={debtReminders.filter((item) => item.status === "pending")}
            sortOptionRequestList={sortOptionRequestList}
            toggleRequestList={() => toggleVisibility(setIsRequestListVisible)}
            isRequestListVisible={isRequestListVisible}
            handleSortRequestChange={setSortOptionRequestList}
          />

          <Completed
            completedList={debtReminders.filter((item) => item.status === "completed")}
            sortOptionCompletedList={sortOptionCompletedList}
            toggleCompletedList={() => toggleVisibility(setIsCompletedListVisible)}
            isCompletedListVisible={isCompletedListVisible}
            handleSortCompletedChange={setSortOptionCompletedList}
          />
        </Container>
      </main>
    </>
  );
};

export default PaymentRequest;
