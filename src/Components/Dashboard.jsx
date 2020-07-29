import React, { useState, useEffect } from "react";
import axios from "axios";
import BootStrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ModalContent from "../Components/ModelContent";
import FilterDropDown from "../Components/FilterDropDown";
import FilterByDate from "../Components/FilterByDate";
import FilterBySuccessFailure from "../Components/FilterBySuccessFailure";
import Loader from "./Loader";
import {
  getLaunchesInBetweenDates,
  getAllLaunches,
  toggleModal,
} from "../utils/methods";

const Dashboard = () => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalInfo, setModalInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentLaunch, setCurrentLaunch] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getAllLaunchData = async () => {
    try {
      setLoading(true);
      const launchData = await axios.get(
        `https://api.spacexdata.com/v3/launches/${searchTerm}`
      );
      setLaunches(launchData.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { dataField: "flight_number", text: "Flight No." },
    { dataField: "rocket.rocket_name", text: "Rocket Name" },
    { dataField: "rocket.rocket_type", text: "Rocket Type" },
    { dataField: "rocket.second_stage.payloads[0].orbit", text: "Orbit" },
    { dataField: "launch_site.site_name", text: "Location" },
    { dataField: "launch_year", text: "Launch Year" },
    { dataField: "launch_success", text: "Launch Status" },
  ];

  const rowEvents = {
    onClick: (e, row) => {
      setModalInfo(row);
      console.log(row);
      toggleModal(setShowModal, handleShow);
    },
  };

  useEffect(() => {
    getAllLaunchData();
  }, [searchTerm]);

  useEffect(() => {
    getLaunchesInBetweenDates(
      endDate,
      startDate,
      setLaunches,
      launches,
      setEndDate
    );
    if (!startDate || !endDate) {
      getAllLaunchData();
    }
  }, [startDate, endDate]);

  return (
    <div>
      <FilterDropDown setSearchTerm={setSearchTerm} />
      <div className="d-flex justify-content-between">
        <div>
          <FilterByDate
            startDate={startDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
          />
        </div>
        <div>
          <FilterBySuccessFailure setCurrentLaunch={setCurrentLaunch} />
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <BootStrapTable
          keyField="flight_number"
          data={getAllLaunches(currentLaunch, launches)}
          columns={columns}
          striped={true}
          pagination={paginationFactory()}
          rowEvents={rowEvents}
        />
      )}

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
