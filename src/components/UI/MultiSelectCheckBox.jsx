import React, {useContext} from 'react';
import {Flex, FormLabel} from "@chakra-ui/react";
import {EventsContext} from "../../Context.jsx";

export const MultiSelectCheckBox = ({selectedCatagories, setselectedCatagories}) => {
    const { categories } = useContext(EventsContext);

    const handleCheckboxChange = (option) => {
        if (selectedCatagories.includes(option)) {
            setselectedCatagories(selectedCatagories.filter(item => item !== option));
        } else {
            setselectedCatagories([...selectedCatagories, option]);
        }
    };

    return (
        <Flex flexWrap={"wrap"} display={"flex"}>
            <div>
                {categories.map(catagory => (
                    <FormLabel key={catagory.id} boxSizing={"border-box"} >
                        <input
                            type={"checkbox"}
                            value={catagory.name}
                            checked={selectedCatagories.includes(catagory.id)}
                            onChange={() => handleCheckboxChange(catagory.id)}
                        />
                         {catagory.name}
                    </FormLabel>
                ))}
                <p>Selected CategoryID: {selectedCatagories.join(', ')}</p>
            </div>
        </Flex>
  );
}

