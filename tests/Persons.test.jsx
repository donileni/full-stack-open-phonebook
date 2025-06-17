import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect } from "vitest";
import Persons from "../src/components/persons";

describe("<Persons />", () => {
  const persons = [
    {
      name: "David",
      number: "123-2222233",
    },
    {
      name: "Anton",
      number: "123-2222234",
    },
  ];
  test("shows persons", () => {
    render(<Persons personsToShow={persons} removeItem={() => {}} />);

    expect(screen.getByText(/David/)).toBeDefined();
    expect(screen.getByText(/Anton/)).toBeDefined();
  });
});
