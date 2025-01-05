import React from "react";
import { Dropdown } from "react-bootstrap";

const DropdownExternalBank = ({ banks, selectedBank, setSelectedBank }) => {
  const handleSelect = (item) => {
    setSelectedBank(item);
  };

  return (
    <Dropdown className="w-100 mb-3">
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
        <span>{selectedBank.name || "Chọn tài khoản bạn muốn nhắc nợ"} </span>
        <i className="bi bi-chevron-down"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu className="w-100 shadow-sm">
        {banks.map((item) => (
          <Dropdown.Item
            key={item.id}
            eventKey={item.id}
            className="w-100 d-flex align-items-center"
            onClick={() => handleSelect(item)}
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
            </div>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownExternalBank;
