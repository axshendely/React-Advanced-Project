import {Button, Flex} from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { EventsContext } from "../../Context.jsx";

export const filter_events = async (categories = []) => {
  const queryParams = new URLSearchParams();
  categories.forEach((category) => {
    queryParams.append("categoryIds", category);
  });
  const url = `http://localhost:3000/events?${queryParams.toString()}`;
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const json = await response.json();
  return {
    length: json.length,
    json: json,
    status: response.status};
};

export const CatagorieSearcher = ({ selectedCatagories, setselectedCatagories, setEventsFound }) => {
  const { preEvents, categories } = useContext(EventsContext);

  useEffect(() => {
  async function fetchData() {
    await handleFilterEvents();
  }
  fetchData();
  }, [selectedCatagories])

  const handleCheckboxChange = (categoryId) => {
    if (selectedCatagories.includes(categoryId)) {
      setselectedCatagories(selectedCatagories.filter((id) => id !== categoryId));
    } else {
      setselectedCatagories([...selectedCatagories, categoryId]);
    }
  };

  const handleFilterEvents = async () => {
    if (selectedCatagories.length > 0){
      const NewEvents = await filter_events(selectedCatagories)
      setEventsFound(NewEvents.json)
    }
    else {
      setEventsFound(preEvents)
    }
  };

  const handleButtonToggle = (categoryId) => {
    if (selectedCatagories.includes(categoryId)) {
      setselectedCatagories(selectedCatagories.filter((id) => id !== categoryId));
    } else {
      setselectedCatagories([...selectedCatagories, categoryId]);
    }
  };

  return (
      <Flex
          position={"relative"}
          display={"flex"}
          flexDirection={"row"}
          gap={"0.5em"}
          justifyContent={"center"}
          justifySelf={"center"}
      >
        {categories.map((category) => (
            <Button
                key={category.id}
                value={category.name}
                w={"100%"}
                variant={"ghost"}
                onClick={() => handleButtonToggle(category.id)}
                onChange={() => handleCheckboxChange(category.id)}
                boxShadow="0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)"
                style={{
                  backgroundColor: selectedCatagories.includes(category.id) ? "blue" : "white",
                  color: selectedCatagories.includes(category.id) ? "white" : "black",
                }}
            >
              {category.name}
            </Button>
        ))}
    </Flex>
  );
};