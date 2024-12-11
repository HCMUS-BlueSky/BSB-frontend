import React from 'react'
import Navbar from '../../components/Navbar'
import { Container, Row, Col, Button } from 'react-bootstrap'

const Transactions = () => {
  return (
    <>
      <Navbar />
      <main>
        <Container>
        <Row className="d-flex justify-content-center my-3" >
            <Col xs={10} md={6}>
              <Button className='w-100' variant="light">
                <div className='d-flex flex-column my-3'>
                  <span className='fw-light'>Current balance</span>
                  <span className='fw-bold fs-2'>0</span>
                  <span className='fw-light'>Available to spend: 0</span>
                </div>
              </Button>
            </Col>
          </Row>

          <Row className="d-flex justify-content-center mb-3">
            <Col xs={10} md={6}>
              <Row>
                <Col>
                  <Button className="w-100" variant="light">
                    <div className="d-flex justify-content-center p-2">
                      <div className="d-flex gap-2 text-primary text-uppercase">
                        <i className="bi bi-arrow-left-right"></i>
                        <p>Chuyển tiền</p>
                      </div>
                    </div>
                  </Button>
                </Col>
                <Col>
                  <Button className="w-100" variant="light">
                    <div className="d-flex justify-content-center p-2">
                      <div className="d-flex gap-2 text-primary text-uppercase">
                        <i className="bi bi-cash-coin"></i>
                        <p className="text-primary text-uppercase">Nhắc nợ</p>
                      </div>
                    </div>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center mb-3">
            <Col xs={10} md={6}>
              <Button className="w-100" variant="light">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="d-flex flex-column gap-2">
                    <p className="text-start">Tài khoản chính</p>
                    <div>
                      <i className="bi bi-bank"></i>
                      <span className="m-2">Số tài khoản: 902127855814</span>
                    </div>
                  </div>
                  <p className="text-primary fs-4">0 vnd</p>
                </div>
              </Button>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}

export default Transactions
