import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { formatCurrency } from '../../utils/formatCurrency';
import { groupByDate } from '../../utils/groupByDate';
import TransactionList from '../../components/TransactionList/TransactionList';
import './Transactions.css';

const Transactions = () => {
  const [isMoneyVisible, setIsMoneyVisible] = useState(false);
  const visibleMoney = "******";

  const requestList = [
    {
      title: "Timo",
      amount: 100000,
      type: "Gửi",
      note: "Mua đồ ăn",
      date: "2021-09-01",
    },
    {
      title: "Timo",
      amount: 100000,
      type: "Nhận",
      note: "Mua đồ ăn",
      date: "2021-09-11",
    },
    {
      title: "Timo",
      amount: 100000,
      type: "Nhận",
      note: "Mua đồ ăn",
      date: "2021-09-01",
    },
    {
      title: "Timo",
      amount: 100000,
      type: "Gửi",
      note: "Mua đồ ăn",
      date: "2021-09-11",
    },
  ];

  // Lọc và nhóm theo ngày
  const groupedByDate = groupByDate(requestList);

  return (
    <>
      <Navbar />
      <main>
        <Container>
          <Row className="d-flex justify-content-center my-3">
            <Col xs={10} md={6}>
              <Card className="w-100 position-relative">
                <div className="d-flex flex-column justify-content-center align-items-center my-3">
                  <Button 
                    variant="light"
                    onClick={() => setIsMoneyVisible(!isMoneyVisible)}
                    className="position-absolute top-0 end-0 m-3"
                  >
                    {!isMoneyVisible ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                  </Button>
                  <span className="tags-small fw-light">Current balance</span>
                  <span className="tags fw-bold fs-2">
                    {isMoneyVisible ? formatCurrency(1000000) : visibleMoney}
                  </span>
                  <span className="tags-small fw-light">Available to spend: {
                    isMoneyVisible ? formatCurrency(1000000) : visibleMoney
                  }
                  </span>
                </div>
              </Card>
            </Col>
          </Row>
          <TransactionList
            groupedByDate={groupedByDate} 
            isMoneyVisible={isMoneyVisible} 
            visibleMoney={visibleMoney}
          />
        </Container>
      </main>
    </>
  );
};

export default Transactions;
