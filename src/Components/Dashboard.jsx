import React, { useState, useEffect } from "react";
import axios from "axios";
import BootStrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ModalContent from "../Components/ModelContent";

const Dashboard = () => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalInfo, setModalInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleModal = () => {
    setShowModal(handleShow);
  };

  const getAllLaunchData = async (searchTerm) => {
    try {
      const launchData = await axios.get(
        "https://api.spacexdata.com/v3/launches"
      );
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
      console.log(modalInfo);
      setModalInfo(row);
      toggleModal();
    },
  };

  useEffect(() => {
    getAllLaunchData();
  }, []);

  return (
    <div>
      <BootStrapTable
        keyField="flight_number"
        data={launches}
        columns={columns}
        striped={true}
        // hover={true}
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
