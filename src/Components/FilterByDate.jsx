import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FilterByDate = ({ startDate, setStartDate, setEndDate, endDate }) => {
  return (
    <div>
      <p>Filter By Date:</p>
      <div className="mb-3 d-flex">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          isClearable
          showYearDropdown
          showMonthDropdown
          placeholderText="Start Date"
          className="pl-2"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          isClearable
          showYearDropdown
          showMonthDropdown
          className="ml-2 pl-2"
          placeholderText="End Date"
        />
      </div>
    </div>
  );
};

export default FilterByDate;
