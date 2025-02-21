import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  test("display login form", () => {
    render(<LoginForm />);
    const password = screen.getByLabelText(/password/i);
    const email = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole("button");
  });
});
