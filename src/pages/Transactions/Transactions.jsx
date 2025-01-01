import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import { formatCurrency } from "../../utils/formatCurrency";
import { groupByDate } from "../../utils/groupByDate";
import TransactionList from "../../components/TransactionList/TransactionList";
import "./Transactions.css";

const Transactions = () => {
  const [isMoneyVisible, setIsMoneyVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isCustomRange, setIsCustomRange] = useState(false);
  const [isCustomTime, setIsCustomTime] = useState(false);
  const [isCustomType, setIsCustomType] = useState("All");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [minuminAmount, setMinimumAmount] = useState("");
  const [maxuminAmount, setMaximumAmount] = useState("");

  const [requestList, setRequestList] = useState(data);

  const visibleMoney = "******";

  const groupedByDate = groupByDate(requestList);

  const filterByDate = (transactions, fromDate, toDate) => {
    if (!fromDate || !toDate) {
      return transactions;
    }
    return transactions.filter((transaction) => {
      return transaction.date >= fromDate && transaction.date <= toDate;
    });
  };

  const handleFilterTimePeriod = (value) => {
    setIsCustomTime(value);
    if (value == "1") {
      setToDate("");
      setFromDate("");
    } else if (value == "2") {
      const today = new Date();
      const last7Days = new Date(today.setDate(today.getDate() - 7));
      setFromDate(last7Days.toISOString().split("T")[0]);
      setToDate(new Date().toISOString().split("T")[0]);
    } else if (value == "3") {
      const today = new Date();
      const last30Days = new Date(today.setDate(today.getDate() - 30));
      setFromDate(last30Days.toISOString().split("T")[0]);
      setToDate(new Date().toISOString().split("T")[0]);
    }
  };

  const filterByAmount = (transactions, min, max) => {
    const minAmount = parseFloat(min);
    const maxAmount = parseFloat(max);

    if (isNaN(minAmount) || isNaN(maxAmount)) {
      return transactions;
    }

    return transactions.filter((transaction) => {
      return transaction.amount >= minAmount && transaction.amount <= maxAmount;
    });
  };

  const handleMoneyRange = (value) => {
    setIsCustomRange(value);
    if (value == "1") {
      setMinimumAmount("");
      setMaximumAmount("");
    }
  };

  const handleMoneyType = (value) => {
    setIsCustomType(value);
  };

  const filterByType = (transactions, type) => {
    return transactions.filter((transaction) => {
      console.log("transaction.type: ", transaction.type);
      console.log("type: ", type);
      return transaction.type == type;
    });
  };

  const handleApplyFilter = () => {
    let filteredTransactions = data;

    if (isCustomTime === "4") {
      filteredTransactions = filterByDate(
        filteredTransactions,
        fromDate,
        toDate
      );
    }

    if (isCustomRange === "2") {
      filteredTransactions = filterByAmount(
        filteredTransactions,
        minuminAmount,
        maxuminAmount
      );
    }

    if (isCustomType != "All") {
      filteredTransactions = filterByType(filteredTransactions, isCustomType);
    }

    setRequestList(filteredTransactions);
  };

  const handleCloseFilter = () => {
    setIsCustomRange("1");
    setIsCustomTime("1");
    setIsCustomType("All");
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <>
      <Navbar />
      <main>
        <Container>
          <Row className="d-flex justify-content-center my-3">
            <Col xs={12} md={8}>
              <Card className="w-100 position-relative">
                <div className="d-flex flex-column justify-content-center align-items-center my-3">
                  <Button
                    variant="light"
                    onClick={() => setIsMoneyVisible(!isMoneyVisible)}
                    className="position-absolute top-0 end-0 m-3"
                  >
                    {!isMoneyVisible ? (
                      <i className="bi bi-eye-slash"></i>
                    ) : (
                      <i className="bi bi-eye"></i>
                    )}
                  </Button>
                  <span className="tags-small fw-light">Current balance</span>
                  <span className="tags fw-bold fs-2">
                    {isMoneyVisible ? formatCurrency(1000000) : visibleMoney}
                  </span>
                  <span className="tags-small fw-light">
                    Available to spend:{" "}
                    {isMoneyVisible ? formatCurrency(1000000) : visibleMoney}
                  </span>
                </div>
              </Card>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center mb-3">
            <Col xs={12} md={8}>
              <Row>
                <Col>
                  <Button
                    className="w-100 border border-1 border-gray shadow-sm"
                    variant="light"
                  >
                    <div className="d-flex justify-content-center p-2">
                      <div className="d-flex gap-2 text-primary text-uppercase">
                        <i className="bi bi-filetype-pdf"></i>
                        <p>EXPORT</p>
                      </div>
                    </div>
                  </Button>
                </Col>
                <Col>
                  {!isFilterVisible ? (
                    <Button
                      className="w-100 border border-1 border-gray shadow-sm"
                      variant="light"
                      onClick={() => setIsFilterVisible(!isFilterVisible)}
                    >
                      <div className="d-flex justify-content-center p-2">
                        <div className="d-flex gap-2 text-primary text-uppercase">
                          <i className="bi bi-filter"></i>
                          <p className="text-primary text-uppercase">FILTER</p>
                        </div>
                      </div>
                    </Button>
                  ) : (
                    <Button
                      className="w-100 border border-1 border-gray shadow-sm"
                      variant="primary"
                      onClick={() => setIsFilterVisible(!isFilterVisible)}
                    >
                      <div className="d-flex justify-content-center p-2">
                        <div className="d-flex gap-2 text-light text-uppercase">
                          <i className="bi bi-filter"></i>
                          <p className="text-uppercase">FILTER</p>
                        </div>
                      </div>
                    </Button>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
          {isFilterVisible && (
            <Row className="d-flex justify-content-center mb-3">
              <Col
                xs={12}
                md={8}
                className="d-flex justify-content-center align-items-center flex-column"
              >
                <Row className="w-100">
                  <Col>
                    <FloatingLabel
                      controlId="floatingSelect"
                      label="BY TRANSACTION AMOUNT RANGE"
                      className="mb-2"
                    >
                      <Form.Select
                        aria-label="Floating label select example"
                        onChange={(e) => handleMoneyRange(e.target.value)}
                      >
                        <option value="1">All transactions</option>
                        <option value="2">Custom amount</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                </Row>
                {isCustomRange == "2" && (
                  <Row className="w-100">
                    <Col>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Minimum"
                        className="mb-2"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Minimum"
                          onChange={(e) => setMinimumAmount(e.target.value)}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Maximum"
                        className="mb-2"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Maximum"
                          onChange={(e) => setMaximumAmount(e.target.value)}
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>
                )}
                <Row className="w-100">
                  <Col>
                    <FloatingLabel
                      controlId="floatingSelect"
                      label="BY TYPE"
                      className="mb-2"
                    >
                      <Form.Select
                        aria-label="Floating label select example"
                        onChange={(e) => handleMoneyType(e.target.value)}
                      >
                        <option value="All">All</option>
                        <option value="Nhận">Money in</option>
                        <option value="Gửi">Money out</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <FloatingLabel
                      controlId="floatingSelect"
                      label="BY TIME PERIOD"
                      className="mb-2"
                    >
                      <Form.Select
                        aria-label="Floating label select example"
                        onChange={(e) => handleFilterTimePeriod(e.target.value)}
                      >
                        <option value="1">All time</option>
                        <option value="2">Last 7 days</option>
                        <option value="3">Last 30 days</option>
                        <option value="4">Custom time range</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                </Row>
                {isCustomTime == "4" && (
                  <Row className="w-100">
                    <Col>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="From"
                        className="mb-2"
                      >
                        <Form.Control
                          type="date"
                          placeholder="From"
                          onChange={(e) => setFromDate(e.target.value)}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="To"
                        className="mb-2"
                      >
                        <Form.Control
                          type="date"
                          placeholder="To"
                          onChange={(e) => setToDate(e.target.value)}
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>
                )}
                <Row className="w-100">
                  <Col className="d-flex justify-content-end">
                    <Button
                      className="border border-1 border-gray shadow-sm"
                      variant="light"
                      onClick={handleApplyFilter}
                    >
                      <div className="d-flex justify-content-center p-2">
                        <div className="d-flex gap-2 ">
                          <p>APPLY</p>
                        </div>
                      </div>
                    </Button>
                    <Button
                      className="border border-1 border-gray shadow-sm"
                      variant="light"
                      onClick={handleCloseFilter}
                    >
                      <div className="d-flex justify-content-center p-2">
                        <div className="d-flex gap-2 ">
                          <p>CLOSE</p>
                        </div>
                      </div>
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}

          {requestList.length > 0 ? (
            <TransactionList
              groupedByDate={groupedByDate}
              isMoneyVisible={isMoneyVisible}
              visibleMoney={visibleMoney}
            />
          ) : (
            <Row className="d-flex justify-content-center align-items-center">
              <Col xs={12} md={8} className="text-center">
                <Card className="w-100 p-3">
                  <span className="text-primary fw-bold">
                    Không có giao dịch nào
                  </span>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </main>
    </>
  );
};

export default Transactions;
