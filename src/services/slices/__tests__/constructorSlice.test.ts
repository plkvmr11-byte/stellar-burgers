import { describe, test, expect } from '@jest/globals';

import {
  constructorReducer,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
} from '../constructorSlice';

describe('constructorReducer', () => {
  test('возвращает начальное состояние для неизвестного action', () => {
    const state = constructorReducer(undefined, { type: 'UNKNOWN' });

    expect(state).toEqual({
      bun: null,
      ingredients: [],
    });
  });

  test('добавляет булку в конструктор', () => {
    const bun = {
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
    };

    const action = addIngredient(bun);

    const state = constructorReducer(
      {
        bun: null,
        ingredients: [],
      },
      action
    );

    expect(state).toEqual({
      bun: action.payload,
      ingredients: [],
    });
  });

  test('добавляет начинку в конструктор', () => {
    const ingredient = {
      _id: '2',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 1,
      fat: 2,
      carbohydrates: 3,
      calories: 30,
      price: 90,
      image: 'sauce.jpg',
      image_large: 'sauce-large.jpg',
      image_mobile: 'sauce-mobile.jpg',
    };

    const action = addIngredient(ingredient);

    const state = constructorReducer(
      {
        bun: null,
        ingredients: [],
      },
      action
    );

    expect(state).toEqual({
      bun: null,
      ingredients: [action.payload],
    });
  });

  test('удаляет ингредиент из конструктора', () => {
    const firstIngredient = {
      _id: '2',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 1,
      fat: 2,
      carbohydrates: 3,
      calories: 30,
      price: 90,
      image: 'sauce.jpg',
      image_large: 'sauce-large.jpg',
      image_mobile: 'sauce-mobile.jpg',
      id: 'ingredient-1',
    };

    const secondIngredient = {
      _id: '2',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 1,
      fat: 2,
      carbohydrates: 3,
      calories: 30,
      price: 90,
      image: 'sauce.jpg',
      image_large: 'sauce-large.jpg',
      image_mobile: 'sauce-mobile.jpg',
      id: 'ingredient-2',
    };

    const state = constructorReducer(
      {
        bun: null,
        ingredients: [firstIngredient, secondIngredient],
      },
      removeIngredient(firstIngredient.id)
    );

    expect(state).toEqual({
      bun: null,
      ingredients: [secondIngredient],
    });
  });

  test('перемещает ингредиент в конструкторе', () => {
    const firstIngredient = {
      _id: '1',
      name: 'Первый ингредиент',
      type: 'main',
      proteins: 1,
      fat: 1,
      carbohydrates: 1,
      calories: 10,
      price: 100,
      image: 'first.jpg',
      image_large: 'first-large.jpg',
      image_mobile: 'first-mobile.jpg',
      id: 'ingredient-1',
    };

    const secondIngredient = {
      _id: '2',
      name: 'Второй ингредиент',
      type: 'main',
      proteins: 2,
      fat: 2,
      carbohydrates: 2,
      calories: 20,
      price: 200,
      image: 'second.jpg',
      image_large: 'second-large.jpg',
      image_mobile: 'second-mobile.jpg',
      id: 'ingredient-2',
    };

    const state = constructorReducer(
      {
        bun: null,
        ingredients: [firstIngredient, secondIngredient],
      },
      moveIngredient({ from: 0, to: 1 })
    );

    expect(state).toEqual({
      bun: null,
      ingredients: [secondIngredient, firstIngredient],
    });
  });

  test('не изменяет конструктор при некорректных индексах', () => {
    const firstIngredient = {
      _id: '1',
      name: 'Первый ингредиент',
      type: 'main',
      proteins: 1,
      fat: 1,
      carbohydrates: 1,
      calories: 10,
      price: 100,
      image: 'first.jpg',
      image_large: 'first-large.jpg',
      image_mobile: 'first-mobile.jpg',
      id: 'ingredient-1',
    };

    const secondIngredient = {
      _id: '2',
      name: 'Второй ингредиент',
      type: 'main',
      proteins: 2,
      fat: 2,
      carbohydrates: 2,
      calories: 20,
      price: 200,
      image: 'second.jpg',
      image_large: 'second-large.jpg',
      image_mobile: 'second-mobile.jpg',
      id: 'ingredient-2',
    };

    const thirdIngredient = {
      _id: '3',
      name: 'Третий ингредиент',
      type: 'main',
      proteins: 3,
      fat: 3,
      carbohydrates: 3,
      calories: 30,
      price: 300,
      image: 'third.jpg',
      image_large: 'third-large.jpg',
      image_mobile: 'third-mobile.jpg',
      id: 'ingredient-3',
    };

    const state = constructorReducer(
      {
        bun: null,
        ingredients: [
          firstIngredient,
          secondIngredient,
          thirdIngredient,
        ],
      },
      moveIngredient({ from: -1, to: 1 })
    );

    expect(state).toEqual({
      bun: null,
      ingredients: [
        firstIngredient,
        secondIngredient,
        thirdIngredient,
      ],
    });
  });

  test('очищает конструктор', () => {
    const ingredient = {
      _id: '1',
      name: 'Ингредиент',
      type: 'main',
      proteins: 1,
      fat: 1,
      carbohydrates: 1,
      calories: 10,
      price: 100,
      image: 'image.jpg',
      image_large: 'image-large.jpg',
      image_mobile: 'image-mobile.jpg',
      id: 'ingredient-1',
    };

    const state = constructorReducer(
      {
        bun: {
          _id: '2',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 13.5,
          fat: 5.5,
          carbohydrates: 22.5,
          calories: 420,
          price: 1255,
          image: 'bun.jpg',
          image_large: 'bun-large.jpg',
          image_mobile: 'bun-mobile.jpg',
          id: 'bun-1',
        },
        ingredients: [ingredient],
      },
      clearConstructor()
    );

    expect(state).toEqual({
      bun: null,
      ingredients: [],
    });
  });
});