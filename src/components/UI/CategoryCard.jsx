import { useContext } from "react";
import { EventsContext } from "../../Context";

export const CategoryCard = ({ event }) => {
  const { categories } = useContext(EventsContext);

  let eventCategoryIdList = [];
  if (typeof event.categoryIds === "string") {
    eventCategoryIdList.push(Number(event.categoryIds));
  } else {
    eventCategoryIdList = event.categoryIds;
  }

  let categoryList = [];
  eventCategoryIdList.map((id) => {
    categories.map((category) => {
      if (category.id === id) {
        categoryList.push(category.name);
      }
    });
  });

  if (categoryList.length > 1) {
    return (
      <p>Categories: {categoryList.join(" - ")}</p>
    );
  } else {
    return (
        <p>Category: {categoryList}</p>
    );
  }
};
