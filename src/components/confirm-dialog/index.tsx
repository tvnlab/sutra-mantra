import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import useConfirmStore from "./hooks/useConfirmStore";

const ConfirmDialog: React.FC = () => {
  const { isOpen, title, content, onConfirm, onCancel, closeConfirm } =
    useConfirmStore();

  return (
    <Modal isOpen={isOpen} onClose={onCancel} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{content}</ModalBody>
        <ModalFooter>
          <Button
            colorScheme="orange"
            mr={3}
            onClick={() => {
              onConfirm();
              closeConfirm();
            }}
          >
            Confirm
          </Button>
          <Button onClick={()=>{
            onCancel();
            closeConfirm();
          }}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDialog;
