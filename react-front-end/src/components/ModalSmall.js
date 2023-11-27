import Modal from 'react-bootstrap/Modal';

function ModalSmall({ show, onHide, title, shippingInfo, orgEmail, orgPhone }) {
  return (
      orgEmail && orgPhone ?
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
          {orgEmail}
        </div>
        <div>
          {orgPhone}
        </div>
        </Modal.Body>
      </Modal>
      :
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{shippingInfo}</Modal.Body>
      </Modal>
  );
}

export default ModalSmall;