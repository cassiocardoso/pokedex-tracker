import { test, expect } from "@playwright/test";

test("loads the Pokémon list", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await expect(
    page.getByRole("link", { name: "Pokémon Tracker" }),
  ).toBeVisible();

  await expect(
    page.getByRole("link", { name: "pokeball Your Pokédex" }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "Your Progress:" }),
  ).toBeVisible();

  await expect(page.getByText("Bulbasaur")).toBeVisible();

  await page.locator(".grayscale").first().click();

  await page
    .locator("div")
    .filter({
      hasText:
        /^4CharmanderFire0\.6m - 8\.5kgHP39Attack52Defense43Sp\. Attack60Sp\. Defense50Speed65$/,
    })
    .getByRole("img")
    .first()
    .click();

  await page
    .locator("div")
    .filter({
      hasText:
        /^7SquirtleWater0\.5m - 9kgHP44Attack48Defense65Sp\. Attack50Sp\. Defense64Speed43$/,
    })
    .getByRole("img")
    .first()
    .click();
});
