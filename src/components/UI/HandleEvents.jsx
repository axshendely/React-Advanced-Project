import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  Stack,
  Select, useToast, ModalOverlay,
} from "@chakra-ui/react";
import {Form, Link, useLoaderData} from "react-router-dom";
import {useContext, useState} from "react";
import {EventsContext} from "../../Context.jsx";
import {MultiSelectCheckBox} from "./MultiSelectCheckBox.jsx"


export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  return {
    event: await event.json(),
  };
};

const post_to_event = async (requestData, method, id) => {
  let api = method === "POST" ? "http://localhost:3000/events" : `http://localhost:3000/events/${id}`.toString()
  const response = await fetch(api, {
    method: method,
    body: JSON.stringify(requestData),
    headers: { "Content-Type": "application/json" },
  });
  return {
    status: response.status,
  };
};

export const HandleEvents = ({Method}) => {
  const toast = useToast();
  const { users, preEvents } = useContext(EventsContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [eventTitle, setEventTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedCatagories, setselectedCatagories] = useState([]);

  const Event = function () {
    if (Method === "POST") {
      const EndTimeS = date + 'T' + endTime;
      const StartTimeS = date + 'T' + startTime;
      return {
        event: undefined,
        eventId: preEvents.length+ 1,
        date: date,
        startTime: EndTimeS,
        endTime: StartTimeS,
        startTimeS: startTime,
        endTimeS: endTime
      }
    }else {
      const { event } = useLoaderData();
      const date = event.startTime.split("T")[0];
      const start = event.startTime.split("T")[1].slice(0, 5);
      const end = event.endTime.split("T")[1].slice(0, 5);
      return {
        event: event,
        eventId: event.id,
        date: date,
        startTime: event.startTime,
        endTime: event.endTime,
        startTimeS: start,
        endTimeS: end
      }
    }
  }
  const current_event = Event()


  const handleEventTitleChange = (e) => {
    setEventTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSelectedUserChange = (e) => {
    setSelectedUser(e.target.value);
  };


  const handleSubmit = async () => {
    if (!eventTitle || !description || !date || !location || !imageUrl || !selectedUser) {
      toast({
            title: "Error",
            description: `You need to fill in all the Boxes...`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
      return;
    }
    const requestData = function () {
      if (Method === "POST") {
        return {
          id: current_event.eventId,
          createdBy: parseInt(selectedUser),
          title: eventTitle,
          description: description,
          image: imageUrl,
          categoryIds: selectedCatagories,
          location: location,
          startTime: date + 'T' + startTime,
          endTime: date + 'T' + endTime,
        };
      } else {
        return   {
          createdBy: parseInt(selectedUser),
          title: eventTitle,
          description: description,
          image: imageUrl,
          categoryIds: selectedCatagories,
          location: location,
          startTime: date + 'T' + startTime,
          endTime: date + 'T' + endTime,
        };
      }
    }
    const rqData = requestData()
    const add_response = await post_to_event(rqData, Method, current_event.eventId)
    if (add_response !== undefined) {
      const status = add_response.status;
      switch (status) {
        case 200:
        case 201:
          toast({
            title: "Success!",
            description: `You're event has been ${Method === "PATCH" ? "Updated": "Added"} succesfully`,
            status: "success",
            duration: 2500,
            isClosable: true,
            onCloseComplete: () => window.location.reload()
          });
          break
        default:
          toast({
            title: "Error",
            description: `Something Went Wrong! status code is "${status}"...`,
            status: "error",
            duration: 2500,
            isClosable: true,
          });
      }
    }
  }
  return (
    <>
      <Button
          boxShadow={Method === "POST" ? "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)": undefined}
          onClick={onOpen}>{Method === "PATCH" ? "Edit": "Add"} event</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{Method === "PATCH" ? "Edit": "Add"} event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Fill in the information about your event below.
            <Form>
              <Stack spacing={3}>
                <Input variant={"outline"} placeholder={Method === "PATCH" ? current_event.event.title : "Event title"} onChange={handleEventTitleChange} />
                <Input variant={"outline"} placeholder={Method === "PATCH" ? current_event.event.description : "Description"} onChange={handleDescriptionChange}/>
                <Input type={"url"} variant={"outline"} placeholder={Method === "PATCH" ? current_event.event.image : "Image url"} onChange={handleImageUrlChange}/>
                <Input type={"date"} variant={"outline"} placeholder={Method === "PATCH" ? current_event.date : "Date"} onChange={handleDateChange}/>
                <Input type={"time"} variant={"outline"} placeholder={Method === "PATCH" ? current_event.startTime : "Start time"} onChange={handleStartTimeChange}/>
                <Input type={"time"} variant={"outline"} placeholder={Method === "PATCH" ? current_event.endTime : "End time"} onChange={handleEndTimeChange}/>
                <Input variant={"outline"} placeholder={Method === "PATCH" ? current_event.event.location : "Location"} onChange={handleLocationChange}/>
                <Select placeholder={Method === "PATCH" ? current_event.event.name: "Select User"} onChange={handleSelectedUserChange}>
                  {users.map((user) => {
                    return (
                        <option value={parseInt(user.id)} key={parseInt(user.id)} itemType={"number"}>
                          {user.name}
                        </option>
                    );
                  })}
                </Select>
                <h1 style={{fontWeight: "bold"}}>Catagories</h1>
                <MultiSelectCheckBox selectedCatagories={selectedCatagories} setselectedCatagories={setselectedCatagories} />
              </Stack>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={"blue"} mr={3} onClick={onClose}>
              Close
            </Button>
              <Link to={Method === "PATCH" ? "" : `/`}><Button variant={"ghost"} onClick={handleSubmit}>Submit</Button></Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
