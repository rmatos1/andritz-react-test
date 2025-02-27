import { describe, expect, it } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NavBar } from "../";

const setup = (): JSX.Element => {
  return (
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );
};

describe("<NavBar />", () => {
  it("link should become active on click", async () => {
    const wrapper = render(setup());

    const addBookLink = wrapper.getByText("Add Book");

    fireEvent.click(addBookLink);

    await waitFor(() => {
      const addBookClass = addBookLink.classList.toString();

      expect(addBookClass).toContain("active");
    });
  });
});
