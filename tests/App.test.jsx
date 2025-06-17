import { render, screen } from "@testing-library/react";
import App from "../src/App";
import { beforeAll, describe } from "vitest";

describe("<App />", () => {
  beforeAll(() => {
    vi.mock("../src/services/persons.js", () => ({
      default: {
        getAll: vi.fn(() => Promise.resolve([])),
        addToList: vi.fn(),
        updateContact: vi.fn(),
        removeItem: vi.fn(),
      },
    }));
  });

  test("renders basic content", () => {
    render(<App />);

    const filterInput = screen.getByTestId("filter-input");
    const personForm = screen.getByTestId("person-form");

    expect(filterInput).toBeDefined();
    expect(personForm).toBeDefined();
  });
});