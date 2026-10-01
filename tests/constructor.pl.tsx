import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('ingredient modal works correctly', function () {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR(
      path.resolve(process.cwd(), 'tests', 'hars', 'constructor.har'),
      {
        url: 'https://norma.education-services.ru/api/**',
        update: false,
      }
    );

    await page.goto('/');
  });

  test('открывает модальное окно ингредиента', async ({ page }) => {
    const bun = page
      .getByRole('listitem')
      .filter({ hasText: 'Тестовая булка' });

    const modal = page.locator('#modals');

    await expect(
      modal.getByRole('heading', { name: 'Детали ингредиента' })
    ).not.toBeVisible();

    await bun.getByRole('link').click();

    await expect(
      modal.getByRole('heading', { name: 'Детали ингредиента' })
    ).toBeVisible();

    await expect(
      modal.getByText('Тестовая булка', { exact: true })
    ).toBeVisible();
  });

  test('закрывает модальное окно по клику на крестик', async ({ page }) => {
    const bun = page
      .getByRole('listitem')
      .filter({ hasText: 'Тестовая булка' });

    await bun.getByRole('link').click();

    const modal = page.locator('#modals');

    await expect(
      modal.getByRole('heading', { name: 'Детали ингредиента' })
    ).toBeVisible();

    await modal.locator('button').first().click();

    await expect(
      modal.getByRole('heading', { name: 'Детали ингредиента' })
    ).not.toBeVisible();
  });
});

test.describe('add ingredients to constructor works correctly', function () {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR(
      path.resolve(process.cwd(), 'tests', 'hars', 'constructor.har'),
      {
        url: 'https://norma.education-services.ru/api/**',
        update: false,
      }
    );

    await page.goto('/');
  });

  test('добавляет булку в конструктор', async ({ page }) => {
    const bun = page
      .getByRole('listitem')
      .filter({ hasText: 'Тестовая булка' });

    await expect(page.getByTestId('constructor-bun-1')).not.toBeVisible();
    await expect(page.getByTestId('constructor-bun-2')).not.toBeVisible();

    await bun.getByRole('button', { name: 'Добавить' }).click();

    await expect(page.getByTestId('constructor-bun-1')).toContainText(
      'Тестовая булка'
    );

    await expect(page.getByTestId('constructor-bun-2')).toContainText(
      'Тестовая булка'
    );
  });
});

test.describe('create order', function () {
  test.beforeEach(async ({ page, context }) => {
    await page.routeFromHAR(
      path.resolve(process.cwd(), 'tests', 'hars', 'constructor.har'),
      {
        url: '**/api/ingredients',
        update: false,
      }
    );

    await page.routeFromHAR(
      path.resolve(process.cwd(), 'tests', 'hars', 'order.har'),
      {
        url: /\/api\/(auth\/user|orders)$/,
        update: false,
      }
    );

    await context.addCookies([
      {
        name: 'accessToken',
        value: 'Bearer%20fake-access-token',
        url: 'http://localhost:4000',
      },
    ]);

    await page.addInitScript(() => {
      localStorage.setItem('refreshToken', 'fake-refresh-token');
    });

    await page.goto('/');
  });

  test('создаёт заказ и очищает конструктор', async ({ page }) => {
    const bun = page
      .getByRole('listitem')
      .filter({ hasText: 'Тестовая булка' });

    const main = page
      .getByRole('listitem')
      .filter({ hasText: 'Тестовая начинка' });

    await bun.getByRole('button', { name: 'Добавить' }).click();
    await main.getByRole('button', { name: 'Добавить' }).click();

    const modal = page.locator('#modals');

    await expect(page.getByTestId('constructor-bun-1')).toContainText(
      'Тестовая булка'
    );

    await expect(page.getByTestId('constructor-bun-2')).toContainText(
      'Тестовая булка'
    );

    await expect(page.getByTestId('constructor-ingredients')).toContainText(
      'Тестовая начинка'
    );

    await expect(modal.getByTestId('order-number')).not.toBeVisible();

    await page.getByRole('button', { name: 'Оформить заказ' }).click();

    await expect(modal.getByTestId('order-number')).toHaveText('123456');

    await expect(page.getByTestId('constructor-bun-1')).not.toBeVisible();
    await expect(page.getByTestId('constructor-bun-2')).not.toBeVisible();

    await expect(page.getByTestId('constructor-ingredients')).toContainText(
      'Выберите начинку'
    );

    await modal.locator('button').first().click();

    await expect(modal.getByTestId('order-number')).not.toBeVisible();
  });
});