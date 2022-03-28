import React from "react";
import Button from "reactstrap/lib/Button";
import Modal from "reactstrap/lib/Modal";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";
import ModalHeader from "reactstrap/lib/ModalHeader";

export default {
	Alert: (msg) => {
		return (
			<Modal isOpen={true} centered>
				<ModalHeader>Modal title</ModalHeader>
				<ModalBody>{msg}</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={false}>
						Do Something
					</Button>{" "}
					<Button color="secondary" onClick={false}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		);
	},
};
