import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("HomePage", () => {
  it("renders the page heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toEqual("Pokédex Tracker");
  });
});
