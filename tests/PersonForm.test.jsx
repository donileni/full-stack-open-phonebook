import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, vi } from "vitest";
import PersonForm from "../src/components/person-form";

describe("<PersonForm />", () => {
  test("renders form", () => {
    render(<PersonForm />);

    const nameInput = screen.getByTestId("name-input");
    const numberInput = screen.getByTestId("number-input");
    const button = screen.getByText("add");

    expect(nameInput).toBeDefined();
    expect(numberInput).toBeDefined();
    expect(button).toBeDefined();
  });

  test("can click form button", async () => {
    const mockHandler = vi.fn();

    render(<PersonForm handleClick={mockHandler} />);

    const form = screen.getByTestId("person-form");
    fireEvent.submit(form);

    expect(mockHandler).toHaveBeenCalledTimes(1);
  });
});
