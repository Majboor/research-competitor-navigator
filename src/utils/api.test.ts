import { describe, it, expect, vi, afterEach } from "vitest";
import { searchCompetitors, CATEGORIES, LOCATIONS } from "./api";

const okResponse = (body: unknown) =>
  ({
    ok: true,
    status: 200,
    json: async () => body,
  }) as Response;

afterEach(() => {
  vi.restoreAllMocks();
});

describe("searchCompetitors", () => {
  it("builds a properly encoded search URL with query, location and limit", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(okResponse({ query: "pet supplies", results: [] }));

    await searchCompetitors("pet supplies", "us", 10);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const calledUrl = fetchMock.mock.calls[0][0] as string;
    expect(calledUrl).toContain("query=pet%20supplies");
    expect(calledUrl).toContain("location=us");
    expect(calledUrl).toContain("limit=10");
    expect(calledUrl).toMatch(/^https:\/\/productfinder\.techrealm\.online\/search\?/);
  });

  it("defaults the result limit to 5 when not provided", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(okResponse({ query: "toys", results: [] }));

    await searchCompetitors("toys", "uk");

    const calledUrl = fetchMock.mock.calls[0][0] as string;
    expect(calledUrl).toContain("limit=5");
  });

  it("normalizes the response and defaults results to an empty array", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      okResponse({ query: "electronics", total_results: 42, limited_results: true }),
    );

    const res = await searchCompetitors("electronics", "de", 5);

    expect(res).toEqual({
      query: "electronics",
      results: [],
      total_results: 42,
      limited_results: true,
    });
  });

  it("passes through competitor results untouched", async () => {
    const competitor = {
      title: "Acme Corp",
      link: "https://acme.example.com",
      snippet: "We make everything.",
    };
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      okResponse({ query: "gadgets", results: [competitor] }),
    );

    const res = await searchCompetitors("gadgets", "us", 5);

    expect(res.results).toHaveLength(1);
    expect(res.results[0]).toEqual(competitor);
  });

  it("throws with the HTTP status when the API responds with an error", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 503,
      json: async () => ({}),
    } as Response);

    await expect(searchCompetitors("toys", "us", 5)).rejects.toThrow("API error: 503");
  });

  it("propagates network failures to the caller", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network down"));

    await expect(searchCompetitors("toys", "us", 5)).rejects.toThrow("network down");
  });
});

describe("CATEGORIES", () => {
  it("exposes the expected set of category ids", () => {
    const ids = CATEGORIES.map((c) => c.id);
    expect(ids).toEqual(["toys", "fashion", "electronics", "home", "other"]);
  });

  it("gives every category a name and an icon", () => {
    for (const category of CATEGORIES) {
      expect(category.name.length).toBeGreaterThan(0);
      expect(category.icon.length).toBeGreaterThan(0);
    }
  });
});

describe("LOCATIONS", () => {
  it("uses unique country codes", () => {
    const codes = LOCATIONS.map((l) => l.code);
    expect(new Set(codes).size).toBe(codes.length);
  });

  it("includes the United States as a default market", () => {
    expect(LOCATIONS.some((l) => l.code === "us")).toBe(true);
  });
});
