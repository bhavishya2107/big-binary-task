import React from "react";
import { Form } from "react-bootstrap";

const FilterDropDown = ({ setSearchTerm }) => {
  return (
    <div>
      <Form.Group>
        <Form.Control
          as="select"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        >
          <option value="">All Launches</option>
          <option value="upcoming">Upcoming Launches</option>
          <option value="past">Past Launches</option>
        </Form.Control>
        <br />
      </Form.Group>
    </div>
  );
};

export default FilterDropDown;
