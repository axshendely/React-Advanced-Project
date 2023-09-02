import { useContext } from "react";
import { EventsContext } from "../../Context";
import { Flex, Image } from "@chakra-ui/react";

export const UserCard = ({ userId }) => {
  const { users } = useContext(EventsContext);

  const user = users.filter((user) => {
    return user.id === userId;
  });

  return (
    <Flex direction={"row"} align={"center"} gap={4}>
      <Image
        src={user[0].image}
        alt={user[0].name}
        borderRadius={200}
        boxSize={"100px"}
      />
      <div>
        <p>Event created by: </p>
        <p>{user[0].name}</p>
      </div>
    </Flex>
  );
};
