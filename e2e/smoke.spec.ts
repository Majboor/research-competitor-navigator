import { test, expect } from "@playwright/test";

// The app talks to this upstream; we stub it so the smoke test is deterministic
// and does not depend on the live search backend.
const API_HOST = "https://productfinder.techrealm.online";

const mockResults = {
  query: "electronics",
  total_results: 2,
  limited_results: false,
  results: [
    {
      title: "Gadget Galaxy",
      link: "https://gadget-galaxy.example.com",
      snippet: "A leading electronics retailer.",
    },
    {
      title: "Circuit Central",
      link: "https://circuit-central.example.com",
      snippet: "Components and consumer electronics.",
    },
  ],
};

test.describe("CompetitorFinder smoke", () => {
  test("landing page renders the hero and header", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Discover Your Competitors/i })).toBeVisible();
    await expect(page.getByText("CompetitorFinder").first()).toBeVisible();
    await expect(page.getByRole("button", { name: /Find Competitors Now/i }).first()).toBeVisible();
  });

  test("full onboarding flow returns competitor results", async ({ page }) => {
    await page.route(`${API_HOST}/search**`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockResults),
      });
    });

    await page.goto("/");

    // Enter the onboarding flow.
    await page.getByRole("button", { name: /Find Competitors Now/i }).first().click();
    await expect(page.getByText(/Select a product category/i)).toBeVisible();

    // Step 1: pick a category.
    await page.getByText("Electronics", { exact: true }).click();
    await page.getByRole("button", { name: /Next/i }).click();

    // Step 2: pick a location.
    await expect(page.getByText(/Where are your competitors/i)).toBeVisible();
    await page.getByText("United States", { exact: true }).click();
    await page.getByRole("button", { name: /Find Competitors/i }).click();

    // Results render from the stubbed backend.
    await expect(page.getByRole("heading", { name: /Your Competitors/i })).toBeVisible();
    await expect(page.getByText("Gadget Galaxy")).toBeVisible();
    await expect(page.getByText("Circuit Central")).toBeVisible();
    await expect(page.getByRole("button", { name: /Export CSV/i })).toBeVisible();
  });

  test("surfaces an error state when the backend fails", async ({ page }) => {
    await page.route(`${API_HOST}/search**`, async (route) => {
      await route.fulfill({ status: 500, contentType: "application/json", body: "{}" });
    });

    await page.goto("/");
    await page.getByRole("button", { name: /Find Competitors Now/i }).first().click();
    await page.getByText("Electronics", { exact: true }).click();
    await page.getByRole("button", { name: /Next/i }).click();
    await page.getByText("United States", { exact: true }).click();
    await page.getByRole("button", { name: /Find Competitors/i }).click();

    await expect(page.getByText(/Error Finding Competitors/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /Start Over/i })).toBeVisible();
  });
});
