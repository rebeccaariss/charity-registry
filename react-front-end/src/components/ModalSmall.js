import Modal from 'react-bootstrap/Modal';

function ModalSmall(props) {
  const { show, onHide, title, shippingInfo, orgEmail, orgPhone } = props;
  const modalProps = {
    show: show,
    onHide: onHide,
    size: 'm',
    'aria-labelledby': 'contained-modal-title-vcenter',
    centered: true
  };

  return (
    <Modal {...modalProps}>
      <Modal.Header closeButton>
        <Modal.Title style={{fontFamily: "'Playfair Display', serif", fontWeight: "600", fontSize: "30px"}}>{title}</Modal.Title>
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
      shippingInfo ?
        <Modal.Body>
          <div>
            <h6><strong>Donations can be shipped to:</strong></h6>
            <p>
              <div>{shippingInfo.name}</div>
              <div>{shippingInfo.street_number} {shippingInfo.street_name}</div>
              <div>{shippingInfo.unit}</div>
              <div>{shippingInfo.city}, {shippingInfo.province}</div>
              <div>{shippingInfo.postal_code}</div>
              <div>{shippingInfo.country}</div>
            </p>
          </div>
        </Modal.Body>
        :
        <Modal.Body>
          <p>Sorry, it appears that we don't have any shipping info for this organization.</p>
          <p>Please contact the organization for more information.</p>
        </Modal.Body>}
    </Modal>
  );
}

export default ModalSmall;