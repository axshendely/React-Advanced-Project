import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { EventsContext } from "../Context";

export const loader = async () => {
  const users = await fetch("http://localhost:3000/users");
  const categories = await fetch("http://localhost:3000/categories");
  const preEvents = await fetch("http://localhost:3000/events");

  return {
      preEvents: await preEvents.json(),
      users: await users.json(),
      categories: await categories.json(),
  };
};

export const Root = () => {
  const { users, categories, preEvents } = useLoaderData();

  return (
    <Box bgColor={"#4f8bc9"} h={"100vh"} w={"100vw"}>
      <EventsContext.Provider value={{ users, categories, preEvents }}>
        <Outlet />
      </EventsContext.Provider>
    </Box>
  );
};
