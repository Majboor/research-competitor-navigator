import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategorySelector from "./CategorySelector";
import { CATEGORIES } from "../utils/api";

describe("CategorySelector", () => {
  it("renders every available category", () => {
    render(
      <CategorySelector
        selectedCategory=""
        customCategory=""
        onSelectCategory={() => {}}
        onCustomCategoryChange={() => {}}
      />,
    );
    for (const category of CATEGORIES) {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    }
  });

  it("fires onSelectCategory with the category id when a card is clicked", async () => {
    const onSelect = vi.fn();
    render(
      <CategorySelector
        selectedCategory=""
        customCategory=""
        onSelectCategory={onSelect}
        onCustomCategoryChange={() => {}}
      />,
    );
    await userEvent.click(screen.getByText("Electronics"));
    expect(onSelect).toHaveBeenCalledWith("electronics");
  });

  it("only shows the custom category input when 'other' is selected", async () => {
    const { rerender } = render(
      <CategorySelector
        selectedCategory="toys"
        customCategory=""
        onSelectCategory={() => {}}
        onCustomCategoryChange={() => {}}
      />,
    );
    expect(
      screen.queryByPlaceholderText(/Beauty products/i),
    ).not.toBeInTheDocument();

    rerender(
      <CategorySelector
        selectedCategory="other"
        customCategory=""
        onSelectCategory={() => {}}
        onCustomCategoryChange={() => {}}
      />,
    );
    expect(screen.getByPlaceholderText(/Beauty products/i)).toBeInTheDocument();
  });

  it("reports custom category typing to the parent", async () => {
    const onChange = vi.fn();
    render(
      <CategorySelector
        selectedCategory="other"
        customCategory=""
        onSelectCategory={() => {}}
        onCustomCategoryChange={onChange}
      />,
    );
    await userEvent.type(screen.getByPlaceholderText(/Beauty products/i), "Pets");
    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls.at(-1)?.[0]).toBe("s");
  });
});
