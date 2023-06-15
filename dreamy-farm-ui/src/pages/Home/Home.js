import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import { useState, useEffect } from 'react';
import { getRecipes } from '~/apiServices/recipeServices';

import styles from './Home.module.scss';
import images from '~/assets/images/jpgs/index';
import { productsPageConfigs as configs } from '~/configs/pages';
import { routes as routesConfig } from '~/configs';
import PreivewCard from '~/components/PreivewCard';
import Trans from '~/components/Trans';

function Home() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const handleGetRecipes = async () => {
      const recipesRes = await getRecipes('less');
      setRecipes(recipesRes);
    };
    handleGetRecipes();
  }, []);

  return (
    <div>
      <div
        className={styles.header}
        style={{
          backgroundImage: `url(${images.headerLayoutHomePage})`,
        }}
      >
        <Link to={routesConfig.products} className={styles.headerLink}>
          <Trans>Shop Now!</Trans>
        </Link>
      </div>

      <div className={clsx('grid', 'wide', styles.wrapperContent)}>
        <div className={styles.categoriesPart}>
          <Link to={routesConfig.products} className={styles.brandTitle}>
            <Trans>Categories</Trans>
          </Link>
          <div className="row">
            {configs.categories.map((category, index) => (
              <div key={index} className="col l-4 m-4 c-6">
                <PreivewCard
                  enableClickAny
                  className={styles.card}
                  title={category.title}
                  state={{
                    category: category,
                    page: 'Home',
                  }}
                  subTitle="Show how"
                  to={category.to}
                  image={category.img}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.recipesPart}>
          <Link to={routesConfig.recipes} className={styles.brandTitle}>
            <Trans>Recipes</Trans>
          </Link>
          <div className="row">
            {recipes.map((recipe, index) => (
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
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundImage: `url(${images.footerLayoutHomePage})`,
        }}
        className={clsx(['row', styles.footer])}
      >
        <div className={clsx(['col', 'l-6', 'm-6', 'c-12', styles.footerCol])}>
          <img src={images.footerLayoutImg} alt="footer-img" />
        </div>
        <div
          className={clsx([
            'col l-6 m-6 c-12',
            styles.footerCol,
            styles.footerCol2,
          ])}
        >
          <div>
            <p className={styles.title}>How it works</p>
            <p className={styles.footerContent}>
              1. Shop on the schedule. <br />
              2. We harvest your food. <br />
              3. On the day of your delivery, we pack up your <br /> box and
              bring it to your door.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
