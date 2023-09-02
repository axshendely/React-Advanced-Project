import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {Link} from "react-router-dom";

export const DeleteEvent = ({ event }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let toast = useToast();

  const deleteEvent = async () => {
    const response = await fetch(`http://localhost:3000/events/${event.id}`, {
      method: "DELETE",
    });
    return response.status;
  };

  const handleDelete = async () => {
    const status = await deleteEvent();

    switch (status) {
      case 200:
        toast({
          title: "Success!",
          description: "Your event was deleted SuccessFully",
          status: "success",
          duration: 2500,
          isClosable: true,
          onCloseComplete: () => window.location.reload()
        });
        break;
      case 404:
        toast({
          title: "Oops",
          description: `The event you tried to delete cannot be found ${status} `,
          status: "error",
          duration: 2500,
          isClosable: true,
        });
        break;
      default:
        toast({
          title: "error",
          description: `Somthing went wrong ${status}...`,
          status: "error",
          duration: 2500,
          isClosable: true,
        });
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Delete</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this event?</ModalBody>
          <ModalFooter>
            <Link to="/">
              <Button colorScheme={"red"} onClick={handleDelete}>
                Delete
              </Button>
            </Link>
            <Button variant={"ghost"} mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
