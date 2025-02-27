import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import { EditIcon } from "..";

const setup = (): JSX.Element => {
  return <EditIcon />;
};

describe("<EditIcon />", () => {
  it("should render correctly", () => {
    const wrapper = render(setup());

    expect(wrapper).toBeDefined();
  });
});
