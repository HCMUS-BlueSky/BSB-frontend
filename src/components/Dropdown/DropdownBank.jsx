import React from 'react'
import { Dropdown } from 'react-bootstrap'

const DropdownBank = ({bank}) => {
  return (
    <Dropdown>
      <Dropdown.Toggle 
        variant="success" 
        id="dropdown-basic" 
        className="w-100 p-3 d-flex justify-content-between align-items-center border border-1 border-gray shadow-sm" // Flex container
      >
        <span>CHỌN NGÂN HÀNG</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {bank.map((item) => (
          <Dropdown.Item
            key={item.id} 
            eventKey={item.id}
          >
            <i className="bi bi-bank pe-3"></i>
            {item.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropdownBank