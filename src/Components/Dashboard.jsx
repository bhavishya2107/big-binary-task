import React, { useState, useEffect } from "react";
import axios from "axios";
import BootStrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ModalContent from "../Components/ModelContent";
import FilterDropDown from "../Components/FilterDropDown";
import FilterByDate from "../Components/FilterByDate";

const Dashboard = () => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalInfo, setModalInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleModal = () => {
    setShowModal(handleShow);
  };

  const getLaunchesInBetweenDates = () => {
    const ed = endDate && endDate.getTime();
    const sd = startDate && startDate.getTime();
    if (ed < sd) {
      alert("errro");
    } else {
      const result = launches.filter((d) => {
        var time = new Date(d.launch_date_utc).getTime();
        return sd < time && time < ed;
      });
      console.log(result);
      setLaunches(result);
    }
  };

  const getAllLaunchData = async () => {
    try {
      const launchData = await axios.get(
        `https://api.spacexdata.com/v3/launches/${searchTerm}`
      );
      console.log(launchData.data);
      setLaunches(launchData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { dataField: "flight_number", text: "Flight No." },
    { dataField: "rocket.rocket_name", text: "Rocket Name" },
    { dataField: "launch_year", text: "Launch Year" },
    { dataField: "launch_site.site_name", text: "Location" },
    { dataField: "launch_success", text: "Launch Status" },
  ];

  const rowEvents = {
    onClick: (e, row) => {
      console.log(row);
      setModalInfo(row);
      toggleModal();
    },
  };

  useEffect(() => {
    getAllLaunchData();
  }, [searchTerm]);

  useEffect(() => {
    getLaunchesInBetweenDates();
    if (!startDate || !endDate) {
      getAllLaunchData();
    }
  }, [startDate, endDate]);

  return (
    <div>
      <FilterDropDown setSearchTerm={setSearchTerm} />

      <FilterByDate
        startDate={startDate}
        endDate={endDate}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
      />

      <BootStrapTable
        keyField="flight_number"
        data={launches}
        columns={columns}
        striped={true}
        pagination={paginationFactory()}
        rowEvents={rowEvents}
      />
      {show ? (
        <ModalContent
          modalInfo={modalInfo}
          handleClose={handleClose}
          show={show}
          setShow={setShow}
        />
      ) : null}
    </div>
  );
};

export default Dashboard;
