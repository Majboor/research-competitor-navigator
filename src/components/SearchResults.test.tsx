import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchResults from "./SearchResults";
import type { SearchResponse } from "../types";

const sample: SearchResponse = {
  query: "electronics",
  results: [
    { title: "Comp One", link: "https://one.example.com", snippet: "First" },
    { title: "Comp Two", link: "https://two.example.com", snippet: "Second" },
  ],
};

describe("SearchResults", () => {
  it("shows a loading state while a search is in flight", () => {
    render(
      <SearchResults results={null} loading={true} error={null} onReset={() => {}} />,
    );
    expect(screen.getByText(/Scanning the market/i)).toBeInTheDocument();
  });

  it("renders an error state with the error message and a reset action", async () => {
    const onReset = vi.fn();
    render(
      <SearchResults
        results={null}
        loading={false}
        error={new Error("API error: 500")}
        onReset={onReset}
      />,
    );
    expect(screen.getByText("API error: 500")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /Try another search/i }));
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it("renders a card per competitor and the query summary", () => {
    render(
      <SearchResults results={sample} loading={false} error={null} onReset={() => {}} />,
    );
    expect(screen.getByText("Comp One")).toBeInTheDocument();
    expect(screen.getByText("Comp Two")).toBeInTheDocument();
    // The active query is surfaced in a labeled pill in the results header.
    expect(screen.getByText("electronics")).toBeInTheDocument();
  });

  it("shows an empty state when there are zero results", () => {
    render(
      <SearchResults
        results={{ query: "toys", results: [] }}
        loading={false}
        error={null}
        onReset={() => {}}
      />,
    );
    expect(screen.getByText(/No competitors found/i)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Export CSV/i })).not.toBeInTheDocument();
  });

  it("returns nothing when there is no result payload at all", () => {
    const { container } = render(
      <SearchResults results={null} loading={false} error={null} onReset={() => {}} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  describe("CSV export", () => {
    beforeEach(() => {
      // jsdom lacks these Blob-URL APIs used by the exporter.
      globalThis.URL.createObjectURL = vi.fn(() => "blob:mock");
      globalThis.URL.revokeObjectURL = vi.fn();
    });

    it("triggers a slugged CSV download from the current results", async () => {
      const clickSpy = vi
        .spyOn(HTMLAnchorElement.prototype, "click")
        .mockImplementation(() => {});

      render(
        <SearchResults results={sample} loading={false} error={null} onReset={() => {}} />,
      );
      await userEvent.click(screen.getByRole("button", { name: /Export CSV/i }));

      expect(globalThis.URL.createObjectURL).toHaveBeenCalledTimes(1);
      expect(clickSpy).toHaveBeenCalledTimes(1);
      const blob = (globalThis.URL.createObjectURL as ReturnType<typeof vi.fn>).mock
        .calls[0][0] as Blob;
      expect(blob.type).toContain("text/csv");
    });
  });
});
