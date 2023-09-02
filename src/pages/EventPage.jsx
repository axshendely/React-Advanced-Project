import React from "react";
import {
  Heading,
  Card,
  Image,
  CardFooter,
  CardBody,
  CardHeader,
  Button, Flex, UnorderedList, ListItem
} from "@chakra-ui/react";
import {useLoaderData, Link} from "react-router-dom";
import { UserCard } from "../components/UI/UserCard";
import { CategoryCard } from "../components/UI/CategoryCard";
import { DeleteEvent } from "../components/UI/DeleteEvent";
import {HandleEvents} from "../components/UI/HandleEvents.jsx";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  return {
    event: await event.json(),
  };
};

export const EventPage = () => {
  const { event } = useLoaderData();
  const date = event.startTime.split("T")[0];
  const start = event.startTime.split("T")[1].slice(0, 5);
  const end = event.endTime.split("T")[1].slice(0, 5);

  return (
      <Flex flexWrap={"wrap"}
            position={"absolute"}
            justifyContent={"center"}
            alignContent={"center"}
            variant="filled"
            borderRadius={"25px"}
            width={"100%"}
            height={"100vh"}
            bgColor={"#4f8bc9"}
            fontFamily={"Arial Black, sans-serif"}
      >
        <Card variant={"filled"} borderRadius={"25px"} position={"sticky"} >
          <Image src={event.image}
                 alt={event.title}
                 cursor={"pointer"}
                 height="10rem"
                 width="100%"
                 objectFit="cover"
                 borderTopRadius="25px"
                 variant={"outline"}
                 position={"relative"} />
          <CardHeader>
            <Heading textAlign={"center"}>{event.title}</Heading>
            {/* eslint-disable-next-line react/no-unknown-property */}
            <p align={"center"}>{date}</p>
            {/* eslint-disable-next-line react/no-unknown-property */}
            <p align={"center"}>{event.description}</p>
            <Flex justifyContent={"center"}>
              <CategoryCard event={event} />
            </Flex>
          </CardHeader>
          <CardBody>
            <UnorderedList position={"relative"} listStyleType={"none"} bottom={"1em"}>
              <ListItem>Start time: {start}</ListItem>
              <ListItem>End time: {end}</ListItem>
              <ListItem width={"15rem"} h={"3rem"}>Location: {event.location}</ListItem>
            </UnorderedList>
          </CardBody>
          <Flex justifyContent={"center"}>
            <UserCard userId={event.createdBy} />
          </Flex>
          <CardFooter justifyContent={"center"}>
            <HandleEvents h={"100%"} Method={"PATCH"}>Edit event</HandleEvents>
            <DeleteEvent event={event} />
            <Link to="/">
              <Button>Home</Button>
            </Link>
          </CardFooter>
        </Card>
      </Flex>
  );
};
