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
      note: "Bạn chuyển tiền cho Nguyễn Gia Kiệt từ Timo",
      date: "2021-09-01",
      bankPic: "https://timo.vn/wp-content/uploads/thumbnail-Timo.png"
    },
    {
      title: "Agribank",
      amount: 100000,
      type: "Nhận",
      note: "Nguyễn Gia Kiệt gửi tiền đến bạn",
      date: "2021-09-01",
      bankPic: "https://th.bing.com/th/id/R.e003a1c9053975a8dd083614e139fac9?rik=fC0sapmrPQ5nLQ&pid=ImgRaw&r=0"
    },
    {
      title: "Vietcombank",
      amount: 200000,
      type: "Gửi",
      note: "Bạn chuyển tiền cho Trần Thị Lan từ Vietcombank",
      date: "2021-09-15",
      bankPic: "https://th.bing.com/th?id=OIP.6rGzO2j2Dy_7dotwoZCvPgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
    },
    {
      title: "Techcombank",
      amount: 150000,
      type: "Nhận",
      note: "Nguyễn Thị Hảo Trinh gửi tiền đến bạn",
      date: "2021-09-20",
      bankPic: "https://th.bing.com/th/id/R.0cf4fc6e9151a17a5cdf30d758365059?rik=3wDnITFDsDYWQA&pid=ImgRaw&r=0"
    }
  ];


  // Lọc và nhóm theo ngày
  const groupedByDate = groupByDate(requestList);

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
          <Row className="d-flex justify-content-center mb-3">
            <Col xs={12} md={8}>
              <Row>
                <Col>
                  <Button className="w-100" variant="light">
                    <div className="d-flex justify-content-center p-2">
                      <div className="d-flex gap-2 text-primary text-uppercase">
                        <i className="bi bi-filetype-pdf"></i>
                        <p>EXPORT</p>
                      </div>
                    </div>
                  </Button>
                </Col>
                <Col>
                  <Button className="w-100" variant="light">
                    <div className="d-flex justify-content-center p-2">
                      <div className="d-flex gap-2 text-primary text-uppercase">
                        <i className="bi bi-filter"></i>
                        <p className="text-primary text-uppercase">FILTER</p>
                      </div>
                    </div>
                  </Button>
                </Col>
              </Row>
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
