import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import { ChevronIcon, ChevronIconProps } from "..";

const defaultProps: ChevronIconProps = {
  fill: "#fff",
};

const setup = (componentProps?: Partial<ChevronIconProps>): JSX.Element => {
  const baseProps = { ...defaultProps, ...componentProps };

  return <ChevronIcon {...baseProps} />;
};

describe("<ChevronIcon />", () => {
  it("should render with the correct color", () => {
    const wrapper = render(setup());

    const polyline = wrapper.container.querySelector("polyline");

    expect(polyline?.getAttribute("style")).toContain(
      `stroke: ${defaultProps.fill}`
    );
  });

  it("should render with the correct rotation when", () => {
    const wrapper = render(setup({ isInverted: true }));

    const svg = wrapper.container.querySelector("svg");

    expect(svg?.getAttribute("style")).toContain("rotate(180deg)");
  });
});
