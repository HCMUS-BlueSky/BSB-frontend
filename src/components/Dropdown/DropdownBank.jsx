import React from 'react';
import { Dropdown } from 'react-bootstrap';

const DropdownBank = ({ bank, selectedBank, setSelectedBank}) => {

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        className="w-100 p-3 d-flex justify-content-between align-items-center border border-1 border-gray shadow-sm"
      >
        <span>{selectedBank}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu className="w-100"> 
        {bank.map((item) => (
          <Dropdown.Item
            key={item.id}
            eventKey={item.id}
            className="w-100 d-flex align-items-center dItem" 
            onClick={() => setSelectedBank(item.name)}
          >
            <div className='bi-father d-flex justify-content-center align-items-center border rounded-circle p-2 me-3 text-black'>
              {
                item.icon ? 
                <img className="icon-bank d-flex justify-content-center align-items-center" src="" alt="BSB" /> 
                  :
                <i className="icon-bank bi bi-bank d-flex justify-content-center align-items-center"></i>
              }
            </div>
            <div className='d-flex flex-column text-black'>
              <div className='fw-bolder'>
                {item.name}
              </div>
              <div className='fw-bolder text-light-gray'>
                {item.description}
              </div>
            </div>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownBank;
