import React, { useState } from "react";
import { Modal, Button, Collapse } from "react-bootstrap";
import { FaWikipediaW, FaMedium, FaAngleDown } from "react-icons/fa";

const ModalContent = ({ modalInfo, handleClose, show }) => {
  const [open, setOpen] = useState(false);
  const {
    mission_name,
    launch_site,
    launch_success,
    rocket,
    flight_number,
    launch_date_utc,
    upcoming,
  } = modalInfo;
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      dialogClassName="modal-90w"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Mission Name: {modalInfo && modalInfo.mission_name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex mb-2">
          <p className="p-2">
            <img src={modalInfo.links && modalInfo.links.mission_patch_small} />
          </p>
          <p className="p-2">{modalInfo && modalInfo.details}</p>
        </div>
        {modalInfo && modalInfo.links.video_link ? (
          <iframe
            frameBorder="0"
            height="450px"
            width="100%"
            title="Video player"
            src={
              modalInfo.links.video_link
                ? "https://www.youtube.com/embed/" +
                  modalInfo.links.video_link.split("=")[1]
                : null
            }
            allowFullScreen="allowfullscreen"
            mozallowfullscreen="mozallowfullscreen"
            msallowfullscreen="msallowfullscreen"
            oallowfullscreen="oallowfullscreen"
            webkitallowfullscreen="webkitallowfullscreen"
          />
        ) : (
          <div className="d-flex mb-2">
            <p>No relevant video to display</p>
          </div>
        )}
        <br />
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="example-fade-text"
          aria-expanded={open}
          variant="light"
        >
          More Details <FaAngleDown size={24} />
        </Button>
        <Collapse in={open}>
          <div id="example-fade-text" className="p-2">
            <h6>
              Flight Number : <span>{flight_number}</span>
            </h6>
            <h6>
              Mission Name : <span>{mission_name}</span>
            </h6>
            <h6>
              Rocket Type : <span>{rocket.rocket_type}</span>
            </h6>
            <h6>
              Rocket Name : <span>{rocket.rocket_name}</span>
            </h6>
            <h6>
              Manufacturer :{" "}
              <span>{rocket.second_stage.payloads[0].manufacturer}</span>
            </h6>
            <h6>
              Nationality :{" "}
              <span>{rocket.second_stage.payloads[0].nationality}</span>
            </h6>
            <h6>
              Launch Date : <span>{launch_date_utc}</span>
            </h6>
            <h6>
              Payload Type :{" "}
              <span>{rocket.second_stage.payloads[0].payload_type}</span>
            </h6>
            <h6>
              Orbit : <span>{rocket.second_stage.payloads[0].orbit}</span>
            </h6>
            <h6>
              Launch Site : <span>{launch_site.site_name}</span>
            </h6>
            {!upcoming ? (
              <h6>
                Launch Status:{" "}
                <span>{launch_success ? "Success" : "Fail"}</span>
              </h6>
            ) : null}
            {upcoming ? <span>Upcoming: Yes</span> : null}
          </div>
        </Collapse>
      </Modal.Body>
      <Modal.Footer>
        <div className="container text-center d-flex justify-content-center">
          <div>
            <a target="_blank" href={modalInfo.links.article_link}>
              {" "}
              <FaWikipediaW size={24} />
            </a>
          </div>
          <div className="ml-2">
            <a target="_blank" href={modalInfo.links.wikipedia}>
              <FaMedium size={24} />
            </a>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalContent;
