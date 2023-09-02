import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {Flex, Heading} from "@chakra-ui/react";
import {EventsContext} from "../Context.jsx";
import {EventCard} from "../components/UI/Eventcard";
import {HandleEvents} from "../components/UI/HandleEvents.jsx"
import {InputSearcher} from "../components/UI/InputSearcher.jsx"
import {CatagorieSearcher} from "../components/UI/CatagorieSearcher";


export const EventsPage = () => {
    const { preEvents } = useContext(EventsContext);
    const [events, setEventsFound] = useState(preEvents);
    const [selectedCatagories, setselectedCatagories] = useState([]);

    return (
        <>
            <Flex display={"flex"} justifyContent={"start"} bgColor={"#4f8bc9"} >
                <Heading display={"flex"} m={"0.8em"}  justifyContent={"center"} w={"100%"}><Link to={"/"}>List of events</Link></Heading>
            </Flex>
            <Flex flexWrap={"wrap"} justifyContent={"center"} gap={"2em"} rowGap={"2em"} bgColor={"#4f8bc9"}>
                {events.map((event) => {
                    return (
                        <Link to={`/event/${event.id}`} key={event.id}>
                            <EventCard event={event} key={event.id} />
                        </Link>
                    );
                })}
            </Flex>
            <Flex display={"flex"}
                  w={"100%"}
                  h={"15%"}
                  align={"center"}
                  justify={"center"}
                  gap={"2em"} bgColor={"#4f8bc9"}>
                <div>
                    <HandleEvents Method={"POST"}>Add event</HandleEvents>
                </div>
                <Flex>
                    <InputSearcher setEventsFound={setEventsFound} CurrentEvents={events}/>
                </Flex>
                <CatagorieSearcher
                    selectedCatagories={selectedCatagories}
                    setselectedCatagories={setselectedCatagories}
                    events={events}
                    setEventsFound={setEventsFound}/>
            </Flex>
        </>
    );
};
