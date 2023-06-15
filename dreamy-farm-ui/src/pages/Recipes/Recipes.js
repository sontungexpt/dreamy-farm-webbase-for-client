import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { getRecipes } from '~/apiServices/recipeServices';

import styles from './Recipes.module.scss';
import PaginatePage from '~/components/PaginatePage/PaginatePage';
import PreivewCard from '~/components/PreivewCard';
import { routes as routesConfig } from '~/configs';

function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const handleGetRecipes = async () => {
      const recipesRes = await getRecipes();
      setRecipes(recipesRes);
    };
    handleGetRecipes();
  }, []);

  return (
    <div className={clsx(['grid', 'wide', styles.wrapper])}>
      <div className={clsx([styles.header])}>
        <h1>Recipes</h1>
        <div className={styles.lineHeader}></div>
      </div>
      <PaginatePage
        className={styles.itemWrapper}
        data={recipes}
        renderItem={(recipe, index) => {
          return (
            <div key={index} className="col l-4 m-4 c-6">
              <PreivewCard
                enableClickAny
                className={styles.card}
                title={recipe.name}
                subTitle="Show how"
                to={routesConfig.moveRecipeDetail(recipe.slug)}
                image={recipe.image}
              />
            </div>
          );
        }}
        itemsPerPage={6}
      />
    </div>
  );
}

export default RecipesPage;
