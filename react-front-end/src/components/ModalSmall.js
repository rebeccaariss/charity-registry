import Modal from 'react-bootstrap/Modal';

function ModalSmall(props) {
  const { show, onHide, title, shippingInfo, orgEmail, orgPhone } = props;
  return (
      orgEmail && orgPhone ?
      <Modal show={show} onHide={onHide} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
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
      <Modal show={show} onHide={onHide} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{shippingInfo}</Modal.Body>
      </Modal>
  );
}

export default ModalSmall;