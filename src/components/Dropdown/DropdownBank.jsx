import React from "react";
import { Dropdown } from "react-bootstrap";

const DropdownBank = ({ bank, selectedBank, setSelectedBank }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        id="dropdown-basic"
        className="w-100 p-3 d-flex justify-content-between align-items-center border border-1 border-gray rounded shadow-sm bg-white"
        style={{
          backgroundColor: "white",
          borderColor: "#dee2e6",
          fontSize: "16px",
          color: "#495057",
          textAlign: "left",
        }}
      >
        <span>{selectedBank || "Chọn tài khoản bạn muốn nhắc nợ"}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu className="w-100 shadow-sm">
        {bank.map((item) => (
          <Dropdown.Item
            key={item.id}
            eventKey={item.id}
            className="w-100 d-flex align-items-center"
            onClick={() => setSelectedBank(item.name)}
            style={{
              padding: "10px",
              fontSize: "16px",
              color: "#495057",
            }}
          >
            <div className="bi-father d-flex justify-content-center align-items-center border rounded-circle p-2 me-3 text-black">
              {item.icon ? (
                <img
                  className="icon-bank d-flex justify-content-center align-items-center"
                  src={item.icon}
                  alt="Bank Icon"
                  style={{ width: "24px", height: "24px" }}
                />
              ) : (
                <i className="icon-bank bi bi-bank d-flex justify-content-center align-items-center"></i>
              )}
            </div>
            <div className="d-flex flex-column text-black">
              <div className="font-weight-bold">{item.name}</div>
              <div className="text-muted">{item.accountNumber} | {item.bank}</div>
            </div>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownBank;
