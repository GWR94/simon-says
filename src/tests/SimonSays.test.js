import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SimonSays from "../components/SimonSays";

describe("<SimonSays />", () => {
  test("renders app correctly", () => {
    const { container } = render(<SimonSays />);
    expect(container.firstChild).toHaveClass("simon__background");
    expect(screen.queryAllByRole("button")).toHaveLength(7);
    expect(screen.getByText(/strict/i)).toBeInTheDocument();
    expect(screen.getByText(/start/i)).toBeInTheDocument();
    expect(screen.getByText(/simon/i)).toBeInTheDocument();
  });

  test("should turn game on correctly", () => {
    render(<SimonSays />);
    const score = screen.getByText("--");
    expect(score).toBeInTheDocument();
    expect(score).toHaveClass("simon__score");
    fireEvent.click(screen.getByRole("checkbox"));
    expect(score).toHaveClass("simon__score--active");
  });

  test("should set strict mode correctly", () => {
    render(<SimonSays />);
    // turn on game
    fireEvent.click(screen.getByRole("checkbox"));
    expect(screen.getByTestId("strict-light")).toHaveClass(
      "simon__light--inactive"
    );
    fireEvent.click(screen.getByTestId("strict-btn"));
    expect(screen.getByTestId("strict-light")).toHaveClass(
      "simon__light--active"
    );
  });

  test("should start game properly", () => {
    render(<SimonSays />);
    // turn on game
    fireEvent.click(screen.getByRole("checkbox"));
    const score = screen.getByText("--");
    expect(screen.getByTestId("start-light")).toHaveClass(
      "simon__light--inactive"
    );
    fireEvent.click(screen.getByTestId("start-btn"));
    expect(screen.getByTestId("start-light")).toHaveClass(
      "simon__light--active"
    );
    expect(score).toHaveTextContent(0);
  });
});
