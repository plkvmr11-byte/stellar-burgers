import { describe, test, expect } from '@jest/globals';

import {
  ingredientsReducer,
  getIngredients,
} from '../ingredientsSlice';

describe('ingredientsReducer', () => {
  test('возвращает начальное состояние для неизвестного action', () => {
    const state = ingredientsReducer(undefined, { type: 'UNKNOWN' });

    expect(state).toEqual({
      ingredients: [],
      isLoading: false,
      error: null,
    });
  });

  test('обрабатывает getIngredients.pending', () => {
  const state = ingredientsReducer(
    {
      ingredients: [],
      isLoading: false,
      error: 'Ошибка загрузки',
    },
    getIngredients.pending('')
  );

  expect(state).toEqual({
    ingredients: [],
    isLoading: true,
    error: null,
  });
});

test('обрабатывает getIngredients.fulfilled', () => {
  const ingredients = [
    {
      _id: '1',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 13.5,
      fat: 5.5,
      carbohydrates: 22.5,
      calories: 420,
      price: 1255,
      image: 'image.jpg',
      image_large: 'image-large.jpg',
      image_mobile: 'image-mobile.jpg',
    },
  ];

  const state = ingredientsReducer(
    {
      ingredients: [],
      isLoading: true,
      error: null,
    },
    getIngredients.fulfilled(ingredients, '', undefined)
  );

  expect(state).toEqual({
    ingredients,
    isLoading: false,
    error: null,
  });
});

test('обрабатывает getIngredients.rejected', () => {
  const state = ingredientsReducer(
    {
      ingredients: [],
      isLoading: true,
      error: null,
    },
    getIngredients.rejected(new Error('Ошибка загрузки'), '')
  );

  expect(state).toEqual({
    ingredients: [],
    isLoading: false,
    error: 'Ошибка загрузки',
  });
});

});