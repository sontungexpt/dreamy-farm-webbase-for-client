import Product from '~/models/Product';
import Recipe from '~/models/Recipe';

const initialProducts = async () => {
  const total = await Product.countDocuments({});
  if (total === 0) {
    new Product({
      name: 'Product 1',
      price: 10,

      //category: fruit, vegetable, herb_aromatic, frozen, meat_seafood, dairy_egg
      category: 'fruit',

      types: [
        {
          name: '100g',
          price: 100,
        },
        {
          name: '200g',
          price: 200,
        },
      ],

      // the number of products sold
      sold: 1,
      // the number of products in stock
      inventory: 0,
      // status: stock, out-of-stock, incoming
      status: 'stock',
      description: 'Description 1',
    }).save();

    new Product({
      name: 'Product 2',
      category: 'frozen',
      types: [
        {
          name: '100g',
          price: 100,
        },
        {
          name: '200g',
          price: 200,
        },
      ],
      price: 20,
      description: 'Description 2',
    }).save();

    new Product({
      name: 'Product 3',
      category: 'fruit',
      types: [
        {
          name: '100g',
          price: 100,
        },
        {
          name: '200g',
          price: 200,
        },
      ],
      price: 30,
      description: 'Description 3',
    }).save();

    new Product({
      name: 'Product 4',
      category: 'meat_seafood',
      types: [
        {
          name: '100g',
          price: 100,
        },
        {
          name: '200g',
          price: 200,
        },
        {
          name: '400g',
          price: 400,
        },
        {
          name: '500g',
          price: 500,
        },
      ],
      price: 40,
      description: 'Description 4',
    }).save();

    new Product({
      types: [
        {
          name: '100g',
          price: 100,
        },
        {
          name: '200g',
          price: 200,
        },
      ],
      name: 'Product 5',
      price: 50,
      category: 'fruit',
      description: 'Description 5',
    }).save();
  }
};

const initialRecipes = async () => {
  const total = await Recipe.countDocuments({});
  if (total === 0) {
    new Recipe({
      name: 'Recipe 1',

      // the total time to make the dish
      totalTime: '20mins',

      ingredients: ['apple', 'organge', 'fish'],
      steps: ['Cut the apple', 'Cut organge', 'Preliminary processing of fish'],

      description: 'Description  recipe 1',
    }).save();
    new Recipe({
      name: 'Recipe 2',

      // the total time to make the dish
      totalTime: '40mins',

      ingredients: ['apple', 'organge', 'fish'],
      steps: ['Cut the apple', 'Cut organge', 'Preliminary processing of fish'],

      description: 'Description  recipe 2',
    }).save();
    new Recipe({
      name: 'Recipe 3',

      // the total time to make the dish
      totalTime: '40mins',

      ingredients: ['apple', 'organge', 'fish'],
      steps: ['Cut the apple', 'Cut organge', 'Preliminary processing of fish'],

      description: 'Description  recipe 3',
    }).save();
    new Recipe({
      name: 'Recipe 4',

      // the total time to make the dish
      totalTime: '40mins',

      ingredients: ['apple', 'organge', 'fish'],
      steps: ['Cut the apple', 'Cut organge', 'Preliminary processing of fish'],

      description: 'Description  recipe 4',
    }).save();
    new Recipe({
      name: 'Recipe 5',

      // the total time to make the dish
      totalTime: '40mins',

      ingredients: ['apple', 'organge', 'fish'],
      steps: ['Cut the apple', 'Cut organge', 'Preliminary processing of fish'],

      description: 'Description  recipe 5',
    }).save();
    new Recipe({
      name: 'Recipe 6',

      // the total time to make the dish
      totalTime: '40mins',

      ingredients: ['apple', 'organge', 'fish'],
      steps: ['Cut the apple', 'Cut organge', 'Preliminary processing of fish'],

      description: 'Description  recipe 6',
    }).save();
    new Recipe({
      name: 'Recipe 7',

      // the total time to make the dish
      totalTime: '40mins',

      ingredients: ['apple', 'organge', 'fish'],
      steps: ['Cut the apple', 'Cut organge', 'Preliminary processing of fish'],

      description: 'Description  recipe 7',
    }).save();
    new Recipe({
      name: 'Recipe 8',

      // the total time to make the dish
      totalTime: '40mins',

      ingredients: ['apple', 'organge', 'fish'],
      steps: ['Cut the apple', 'Cut organge', 'Preliminary processing of fish'],

      description: 'Description  recipe 8',
    }).save();
    new Recipe({
      name: 'Recipe 9',

      // the total time to make the dish
      totalTime: '40mins',

      ingredients: ['apple', 'organge', 'fish'],
      steps: ['Cut the apple', 'Cut organge', 'Preliminary processing of fish'],

      description: 'Description  recipe 9',
    }).save();
    new Recipe({
      name: 'Recipe 10',

      // the total time to make the dish
      totalTime: '40mins',

      ingredients: ['apple', 'organge', 'fish'],
      steps: ['Cut the apple', 'Cut organge', 'Preliminary processing of fish'],

      description: 'Description  recipe 10',
    }).save();
  }
};

export { initialProducts, initialRecipes };
