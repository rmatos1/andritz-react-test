import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import { PageNotFound } from "..";

import { MemoryRouter } from "react-router-dom";

const setup = (): JSX.Element => {
  return (
    <MemoryRouter>
      <PageNotFound />
    </MemoryRouter>
  );
};

describe("<PageNotFound />", () => {
  it("should render correctly", () => {
    const wrapper = render(setup());

    expect(wrapper).toBeDefined();
  });
});
