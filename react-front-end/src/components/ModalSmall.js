import Modal from 'react-bootstrap/Modal';

function ModalSmall(props) {
  const { show, onHide, title, shippingInfo, orgEmail, orgPhone } = props;
  const modalProps = {
    show: show,
    onHide: onHide,
    size: 'lg',
    'aria-labelledby': 'contained-modal-title-vcenter',
    centered: true
  };

  return (
    <Modal {...modalProps}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      {orgEmail && orgPhone ?
        <Modal.Body>
          <h6>
            <span><strong>Email:</strong></span> {orgEmail}
          </h6>
          <h6>
          <span><strong>Phone:</strong></span> {orgPhone}
          </h6>
        </Modal.Body>
      :
        <Modal.Body>
          <div>
            <h6><strong>Donations can be shipped to:</strong></h6>
          </div>
          {shippingInfo}
        </Modal.Body>}
    </Modal>
  );
}

export default ModalSmall;