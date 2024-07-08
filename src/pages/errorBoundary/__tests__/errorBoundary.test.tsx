import { describe, expect, it } from 'vitest'
import { render } from "@testing-library/react";

import { ErrorBoundary, ErrorBoundaryProps } from "..";

const defaultProps: ErrorBoundaryProps = {
    children: <div data-testid="children-element" />
}

const ErrorThrower = () => {
    throw new Error('Error test');
};

const setup = (componentProps?: ErrorBoundaryProps): JSX.Element => {

    const baseProps = componentProps || defaultProps;

    return(
        <ErrorBoundary {...baseProps} />
    )
};

describe('<ErrorBoundary />', () => {
  it('should render correctly the defined children element', () => {
    const wrapper = render(setup());

    const children = wrapper.getByTestId("children-element");

    expect(children).toBeDefined()
  });

  it("should render the error page whenever an error happens",  () => {
    const wrapper = render(setup({ children: <div><ErrorThrower  /></div> }));

    const gotErrorTitle = wrapper.getByTestId("error-title")

    expect(gotErrorTitle).toBeDefined();
  })
});
