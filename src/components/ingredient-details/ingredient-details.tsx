import { IngredientDetailsUI, Preloader } from '@ui';
import { useParams } from 'react-router-dom';

import { selectIngredients } from '../../services/selectors/ingredientsSelectors';
import { useSelector } from '../../services/store';

export const IngredientDetails = (): React.JSX.Element => {
  const { id } = useParams();

  const ingredients = useSelector(selectIngredients);

  const ingredientData = ingredients.find((ingredient) => ingredient._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
