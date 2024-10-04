import { test, expect } from "@playwright/test";

test("adds some Pokémon to the Pokédex", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await expect(
    page.getByRole("link", { name: "pokeball Your Pokédex" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "pokeball Your Pokédex" }).click();

  await expect(
    page.getByRole("main").getByRole("img", { name: "pokeball" }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "No Pokémon found. :(" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Pokémon Tracker" }).click();

  await page.locator(".grayscale").first().click();

  await expect(page.getByText("Bulbasaur has been caught!")).toBeVisible();

  await page.getByRole("link", { name: "pokeball Your Pokédex" }).click();

  await expect(page.getByText("Bulbasaur", { exact: true })).toBeVisible();

  await expect(page.getByText(/caught at/i)).toBeVisible();
});
