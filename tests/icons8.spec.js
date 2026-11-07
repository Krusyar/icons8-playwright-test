const { test, expect } = require("@playwright/test");

test("Поиск и открытие иконки кота на Icons8", async ({ page }) => {
  await page.goto("https://icons8.com/icons");

  const searchInput = page.locator('[data-test="search-input"]');

  // 1. Вставляем текст
  await searchInput.fill("cat");

  // 2. Ждем полсекунды, чтобы Vue.js обновил состояние (спасает Firefox)
  await page.waitForTimeout(500);

  // 3. Принудительно возвращаем фокус в поле (спасает WebKit от поп-апа Google)
  await searchInput.click();

  // 4. Жмем Enter
  await searchInput.press("Enter");

  const firstGridIcon = page.locator('[data-test="grid-icon"]').first();
  await expect(firstGridIcon).toBeVisible({ timeout: 10000 });

  await firstGridIcon.click();

  const downloadButton = page.getByRole("button", { name: /download/i });
  await expect(downloadButton).toBeVisible();
});
