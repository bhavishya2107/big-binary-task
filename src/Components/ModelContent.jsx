import React from "react";
import { Modal } from "react-bootstrap";
import { FaWikipediaW, FaMedium } from "react-icons/fa";

const ModalContent = ({ modalInfo, handleClose, show }) => {
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
            <p>No relevant data to display</p>
          </div>
        )}
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
