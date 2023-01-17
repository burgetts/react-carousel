import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it ("renders without crashing", function () {
  render(<Carousel />)
})

it("matches snapshot", function() {
  const {asFragment} = render(<Carousel />)
  expect(asFragment()).toMatchSnapshot()
})

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  // move forward to last image in carousel, expect no right arrow
  fireEvent.click(rightArrow);
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Josh Post on Unsplash")).toBeInTheDocument();
  expect(rightArrow).not.toBeInTheDocument();
});

it("works when you click on the left arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect left arrow not to appear on first slide
  expect(queryByTestId("left-arrow")).not.toBeInTheDocument();

  // click right arrow to move forward in carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect left arrow to be there on second slide
  expect(queryByTestId("left-arrow")).toBeInTheDocument();

  // click left arrow and expect first slide again
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument()
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
})


