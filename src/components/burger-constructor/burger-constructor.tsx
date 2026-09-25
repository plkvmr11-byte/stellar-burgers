import { BurgerConstructorUI } from '@ui';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { selectIsAuthenticated } from '../../services/selectors/authSelectors';
import {
  selectConstructorBun,
  selectConstructorIngredients,
} from '../../services/selectors/constructorSelectors';
import {
  selectOrderModalData,
  selectOrderRequest,
} from '../../services/selectors/orderSelectors';
import { clearConstructor } from '../../services/slices/constructorSlice';
import { createOrder, clearOrder } from '../../services/slices/orderSlice';
import { useDispatch, useSelector } from '../../services/store';

import type { TConstructorIngredient } from '@utils-types';

export const BurgerConstructor = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bun = useSelector(selectConstructorBun);
  const ingredients = useSelector(selectConstructorIngredients);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const constructorItems = {
    bun,
    ingredients,
  };

  const onOrderClick = (): void => {
    if (!constructorItems.bun || orderRequest) {
      return;
    }

    if (!isAuthenticated) {
      void navigate('/login');
      return;
    }

    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id,
    ];

    void dispatch(createOrder(ingredientIds)).then((action) => {
      if (createOrder.fulfilled.match(action)) {
        dispatch(clearConstructor());
      }
    });
  };

  const closeOrderModal = (): void => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (sum: number, ingredient: TConstructorIngredient) => sum + ingredient.price,
        0
      ),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
