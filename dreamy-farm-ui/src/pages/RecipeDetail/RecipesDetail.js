import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import { getRecipe } from '~/apiServices/recipeServices';

import styles from './RecipesDetail.module.scss';
import { routes as routesConfig } from '~/configs';
import history from '~/utils/navigateSite';
import Trans from '~/components/Trans';
import Image from '~/components/Image';
import { Clock as ClockIcon } from '~/assets/images/icons/SvgIcons';

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState();
  const { slug } = useParams();

  useEffect(() => {
    const handleGetRecipeDetail = async () => {
      const recipeRes = await getRecipe(slug);
      if (recipeRes) setRecipe(recipeRes);
      else history.navigate(routesConfig.e404, { replace: true });
    };
    handleGetRecipeDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // make sure recipe is loaded
  if (!recipe) return null;

  return (
    <div className={clsx(['grid', 'wide', styles.wrapper])}>
      <div className={styles.name}>
        <h2 className={styles.headerTitle}>{recipe.name}</h2>
        <ClockIcon className={styles.clockIcon} color="var(--green-color)" />
        <span className={styles.estimateCookTime}>
          {/*get the time*/}
          {recipe.totalTime.replace(/[^0-9]/g, '') + ' '}
          {/*get the unit of time*/}
          <Trans>{recipe.totalTime.replace(/[0-9]/g, '')}</Trans>
        </span>
      </div>
      <div className="row">
        <div className="col l-8 m-12 c-12">
          <div className={styles.imageWrapper}>
            <Image className={styles.image} src={recipe.image} />
          </div>
        </div>
      </div>

      <section className={styles.section}>
        <h2 className={styles.headerTitle}>
          <Trans>Ingredient</Trans>
        </h2>
        <ul className={styles.list}>
          {recipe?.ingredients.map((ingredient, index) => (
            <li className={styles.listItem} key={index}>
              {ingredient}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.headerTitle}>
          <Trans>Making</Trans>
        </h2>
        <ul className={clsx([styles.list, styles.stepList])}>
          {recipe?.steps.map((step, index) => (
            <>
              <h3 className={styles.stepTitle}>
                <Trans>Step</Trans>
                {` ${index + 1}`}:
              </h3>
              <li className={styles.listItem}>{step}</li>
            </>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.headerTitle}>
          <Trans>Description</Trans>
        </h2>
        <p className={styles.description}>{recipe.description}</p>
      </section>
    </div>
  );
};

export default RecipeDetail;
