import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CompetitorCard from "./CompetitorCard";

const competitor = {
  title: "Acme Widgets",
  link: "https://shop.acme.example.com/widgets",
  snippet: "The best widgets money can buy.",
};

describe("CompetitorCard", () => {
  it("renders the title and snippet", () => {
    render(<CompetitorCard competitor={competitor} index={0} />);
    expect(screen.getByText("Acme Widgets")).toBeInTheDocument();
    expect(screen.getByText("The best widgets money can buy.")).toBeInTheDocument();
  });

  it("links out to the competitor in a new, safe tab", () => {
    render(<CompetitorCard competitor={competitor} index={0} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", competitor.link);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("displays the hostname derived from the link", () => {
    render(<CompetitorCard competitor={competitor} index={0} />);
    expect(screen.getByText("shop.acme.example.com")).toBeInTheDocument();
  });

  it("staggers the animation delay by index", () => {
    const { container } = render(<CompetitorCard competitor={competitor} index={5} />);
    const card = container.firstElementChild as HTMLElement;
    expect(card.style.animationDelay).toBe("0.4s");
  });
});
