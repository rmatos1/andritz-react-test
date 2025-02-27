import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import { DeleteIcon } from "..";

const setup = (): JSX.Element => {
  return <DeleteIcon />;
};

describe("<DeleteIcon />", () => {
  it("should render correctly", () => {
    const wrapper = render(setup());

    expect(wrapper).toBeDefined();
  });
});
