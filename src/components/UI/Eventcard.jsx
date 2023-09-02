import {Card, Flex, Heading, Image} from "@chakra-ui/react";
import {
  CardBody,
} from "@chakra-ui/react";
import { CategoryCard } from "./CategoryCard";


export const EventCard = ({ event }) => {
  const date = event.startTime.split("T")[0];
  const start = event.startTime.split("T")[1].slice(0, 5);
  const end = event.endTime.split("T")[1].slice(0, 5);
  return (
        <Card variant={"filled"}
              align={"center"}
              boxSize={"100%"}
              borderRadius={"25px"}
              m={1}
              width={"20rem"}
              height={"30rem"}
              cursor={"pointer"}
              bgColor={"green.50"}
              boxShadow={"0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)"}
              alignItems={"center"}
              textAlign={"center"}
              fontFamily={"Arial Black, sans-serif"}>
          <Image
                src={event.image}
                height={"20rem"}
                width={"20rem"}
                objectFit={"cover"}
                borderTopRadius={"25px"}
                alt={event.title}
                variant={"outline"}
                position={"relative"}
            />
          <Heading h={"10%"} w={"100%"} display={"flex"} textAlign={"center"} justifyContent={"center"}>{event.title}</Heading>
          <CardBody>
              <p>Date: {date}</p>
              <Flex justifyContent={"center"} h={"30px"} textAlign={"center"} alignItems={"center"}>{event.description}</Flex>
            <br />
            <p>Start time: {start}</p>
            <p>End time: {end}</p>
            <br />
              <Flex position={"relative"} justifyContent={"center"}>
                  <CategoryCard event={event} />
              </Flex>
          </CardBody>
        </Card>
  );
};
