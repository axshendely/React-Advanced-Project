import {Flex, Input} from "@chakra-ui/react";
import React, {useContext, useState} from "react";
import {EventsContext} from "../../Context.jsx";


export const filter_events = async (keywords="") => {
    const response = await fetch(`http://localhost:3000/events?q=${keywords}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const json = await response.json()
    return {
        length: json.length,
        json: json,
        status: response.status,
    };
};

export const InputSearcher = ({ setEventsFound, CurrentEvents }) => {
  const { preEvents } = useContext(EventsContext);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchValueChange = async (event) => {
    const newValue = event.target.value;
    setSearchValue(newValue);

    const newEvents = await filter_events(newValue);
    if (newEvents.length > 0) {
      setEventsFound(newEvents.json);
      if (CurrentEvents === undefined || CurrentEvents.length === 0 || CurrentEvents === "") {
          setEventsFound(preEvents);
      }
    } else {
      setEventsFound(preEvents);
    }
  };

  return (
    <>
      <Flex>
        <div>
          <Input
              backgroundColor={"white"}
              value={searchValue}
              boxShadow={"0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)"}
              onChange={handleSearchValueChange}
              type={"text"}
              placeholder={"search here for name"}
          />
        </div>
      </Flex>
    </>
  );
};