import Modal from 'react-bootstrap/Modal';

function ModalSmall({ show, onHide, title, shippingInfo }) {
  return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{shippingInfo}</Modal.Body>
      </Modal>
  );
}

export default ModalSmall;