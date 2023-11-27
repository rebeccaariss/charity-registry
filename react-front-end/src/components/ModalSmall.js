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
          <div>
            {orgEmail}
          </div>
          <div>
            {orgPhone}
          </div>
        </Modal.Body>
      :
        <Modal.Body>{shippingInfo}</Modal.Body>}
    </Modal>
  );
}

export default ModalSmall;