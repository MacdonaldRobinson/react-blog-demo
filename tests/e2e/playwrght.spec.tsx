import { expect, test } from "@playwright/test";

test("Home page must render blog posts", async ({ page }) => {
    await page.goto("/");

    // Wait for a specific element that will be visible once lazy-loaded content is rendered
    await page.waitForSelector("main > section > div > *", {
        state: "visible",
    });

    const renderedBlogPosts = await page
        .locator("main > section > div > div")
        .count();

    expect(renderedBlogPosts).toBe(30);
});

test("Blog page must render blog posts", async ({ page }) => {
    await page.goto("/blog");

    // Wait for a specific element that will be visible once lazy-loaded content is rendered
    await page.waitForSelector("fieldset > div > *", {
        state: "visible",
    });

    const renderedBlogPosts = await page
        .locator("fieldset > div > div")
        .count();

    expect(renderedBlogPosts).toBe(30);
});
