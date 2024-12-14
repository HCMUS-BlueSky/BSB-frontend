// src/components/TransactionList.js
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { formatCurrency } from '../../utils/formatCurrency';

const TransactionList = ({ groupedByDate, isMoneyVisible, visibleMoney }) => {
  return (
    <Row className="justify-content-center mb-4">
      <Col xs={12} md={8}>
        <div className="shadow-sm">
          {groupedByDate.map((group, index) => (
            <div key={index}>
              <Row className="align-items-center py-2 mb-3 bg-gray">
                <Col xs="auto" className="d-flex justify-content-between w-100">
                  <h6 className="mb-0 text-black">{group.date}</h6>
                </Col>
              </Row>

              {group.data.length > 0 ? (
                <Row className="justify-content-center ">
                  {group.data.map((item, index) => (
                    <Row
                      key={index}
                      className="p-3 d-flex justify-content-between align-items-center list-item-hover"
                      style={{ borderTop: "1px solid #f4f5f6", color: item.type === 'Nhận' ? 'green' : null, }}
                    >
                      <Col className="d-flex align-items-center">
                        <img
                          src={item.bankPic}
                          alt="profile"
                          className="rounded-circle"
                          width="40"
                          height="40"
                        />
                        <div className="ms-3">
                          <p className="mb-0">
                            <strong>{item.title}</strong>
                          </p>
                          <small className="text-muted">{item.note}</small>
                        </div>
                      </Col>
                      <Col xs="auto">
                        <h6
                          className={
                            item.direction === "từ"
                              ? "text-danger mb-0"
                              : "mb-0"
                          }
                        >
                          {
                            isMoneyVisible ? 
                              (item.type === "Nhận" ? "-" + formatCurrency(item.amount) : "+" + formatCurrency(item.amount))
                            : visibleMoney
                          }
                        </h6>
                      </Col>
                    </Row>
                  ))}
                </Row>
                
              ) : (
                <div className="pb-4 text-center">
                  Bạn không có giao dịch vào nào
                </div>
              )}
            </div>
          ))}
        </div>
      </Col>
    </Row>
  );
};

export default TransactionList;
