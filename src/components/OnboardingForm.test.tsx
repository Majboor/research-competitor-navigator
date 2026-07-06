import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OnboardingForm from "./OnboardingForm";

describe("OnboardingForm", () => {
  it("starts on step 1 with the Next action disabled until a category is picked", () => {
    render(<OnboardingForm onSubmit={() => {}} onCancel={() => {}} />);
    expect(screen.getByText(/Select a product category/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Next/i })).toBeDisabled();
  });

  it("advances to the location step after choosing a category", async () => {
    render(<OnboardingForm onSubmit={() => {}} onCancel={() => {}} />);
    await userEvent.click(screen.getByText("Toys & Games"));
    const next = screen.getByRole("button", { name: /Next/i });
    expect(next).toBeEnabled();
    await userEvent.click(next);
    expect(screen.getByText(/Where are your competitors/i)).toBeInTheDocument();
  });

  it("submits the collected category and location to onSubmit", async () => {
    const onSubmit = vi.fn();
    render(<OnboardingForm onSubmit={onSubmit} onCancel={() => {}} />);

    await userEvent.click(screen.getByText("Electronics"));
    await userEvent.click(screen.getByRole("button", { name: /Next/i }));
    await userEvent.click(screen.getByText("Canada"));
    await userEvent.click(screen.getByRole("button", { name: /Find Competitors/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ category: "electronics", location: "ca" }),
    );
  });

  it("lets the user go back from the location step to the category step", async () => {
    render(<OnboardingForm onSubmit={() => {}} onCancel={() => {}} />);
    await userEvent.click(screen.getByText("Fashion & Apparel"));
    await userEvent.click(screen.getByRole("button", { name: /Next/i }));
    expect(screen.getByText(/Where are your competitors/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /Back/i }));
    expect(screen.getByText(/Select a product category/i)).toBeInTheDocument();
  });

  it("invokes onCancel from the cancel control on step 1", async () => {
    const onCancel = vi.fn();
    render(<OnboardingForm onSubmit={() => {}} onCancel={onCancel} />);
    // Step 1 exposes two paths back out (header link + footer button); both cancel.
    const cancels = screen.getAllByRole("button", { name: /^Cancel$/i });
    await userEvent.click(cancels[0]);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("keeps 'Find Competitors' disabled until a location is provided", async () => {
    render(<OnboardingForm onSubmit={() => {}} onCancel={() => {}} />);
    await userEvent.click(screen.getByText("Home & Kitchen"));
    await userEvent.click(screen.getByRole("button", { name: /Next/i }));
    expect(screen.getByRole("button", { name: /Find Competitors/i })).toBeDisabled();
  });
});
