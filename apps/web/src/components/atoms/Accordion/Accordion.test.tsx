import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Accordion } from "./Accordion";

const items = [
  {
    id: "1",
    title: "Accordion Item 1",
    content: "Accordion Item 1 Content",
    disabled: false,
  },
  {
    id: "2",
    title: "Accordion Item 2",
    content: "Accordion Item 2 Content",
    disabled: false,
  },
];
describe("Accordion", () => {
  test("should render", () => {
    render(<Accordion items={items} />);
    expect(screen.getByRole("button", { name: "Accordion Item 1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Accordion Item 2" })).toBeInTheDocument();
  });

  test("should open item when clicked", async () => {
    render(<Accordion items={items} />);
    const button = screen.getByRole("button", { name: "Accordion Item 1" });

    act(() => {
      button.click();
    });

    expect(await screen.findByText("Accordion Item 1 Content")).toBeInTheDocument();
  });

  test("should close item when clicked", async () => {
    render(<Accordion items={items} />);
    const button = screen.getByRole("button", { name: "Accordion Item 1" });

    // Open first
    act(() => {
      button.click();
    });
    expect(await screen.findByText("Accordion Item 1 Content")).toBeInTheDocument();

    // Close
    act(() => {
      button.click();
    });
    expect(screen.queryByText("Accordion Item 1 Content")).not.toBeInTheDocument();
  });
});
