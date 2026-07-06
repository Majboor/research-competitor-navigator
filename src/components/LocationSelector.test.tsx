import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LocationSelector from "./LocationSelector";

const noop = () => {};

describe("LocationSelector", () => {
  it("renders known markets by name", () => {
    render(
      <LocationSelector
        selectedLocation=""
        customLocation=""
        onSelectLocation={noop}
        onCustomLocationChange={noop}
      />,
    );
    expect(screen.getByText("United States")).toBeInTheDocument();
    expect(screen.getByText("Germany")).toBeInTheDocument();
  });

  it("filters the country grid by the search term", async () => {
    render(
      <LocationSelector
        selectedLocation=""
        customLocation=""
        onSelectLocation={noop}
        onCustomLocationChange={noop}
      />,
    );
    await userEvent.type(screen.getByPlaceholderText(/Search countries/i), "germ");
    expect(screen.getByText("Germany")).toBeInTheDocument();
    expect(screen.queryByText("United States")).not.toBeInTheDocument();
  });

  it("emits the country code when a location is chosen", async () => {
    const onSelect = vi.fn();
    render(
      <LocationSelector
        selectedLocation=""
        customLocation=""
        onSelectLocation={onSelect}
        onCustomLocationChange={noop}
      />,
    );
    await userEvent.click(screen.getByText("Canada"));
    expect(onSelect).toHaveBeenCalledWith("ca");
  });

  it("reports free-text custom locations to the parent", async () => {
    const onCustom = vi.fn();
    render(
      <LocationSelector
        selectedLocation=""
        customLocation=""
        onSelectLocation={noop}
        onCustomLocationChange={onCustom}
      />,
    );
    await userEvent.type(screen.getByPlaceholderText(/Enter country name/i), "Kenya");
    expect(onCustom).toHaveBeenCalled();
    expect(onCustom.mock.calls.at(-1)?.[0]).toBe("a");
  });

  it("shows an empty grid when the search matches nothing", async () => {
    render(
      <LocationSelector
        selectedLocation=""
        customLocation=""
        onSelectLocation={noop}
        onCustomLocationChange={noop}
      />,
    );
    await userEvent.type(
      screen.getByPlaceholderText(/Search countries/i),
      "zzzznotacountry",
    );
    expect(screen.queryByText("United States")).not.toBeInTheDocument();
    expect(screen.queryByText("Germany")).not.toBeInTheDocument();
  });
});
