import { apis } from '~/configs';
import jpgImages from '~/assets/images/jpgs';
import { routes as routesConfig } from '~/configs';

const configs = {
  itemsPerPage: 12,
  categories: [
    {
      title: 'Fruits',
      api: apis.products.fruit,
      category: 'fruit',
      to: routesConfig.products,
      img: jpgImages.farmFruit,
    },
    {
      title: 'Vegetables',
      api: apis.products.vegetables,
      category: 'vegetable',
      to: routesConfig.products,
      img: jpgImages.farmVegetable,
    },
    {
      title: 'Herbs & Aromatics',
      api: apis.products.herbs_aromatics,
      category: 'herb_aromatic',
      to: routesConfig.products,
      img: jpgImages.farmHerb,
    },
    {
      title: 'Frozen',
      api: apis.products.frozens,
      category: 'frozen',
      to: routesConfig.products,
      img: jpgImages.farmFrozen,
    },
    {
      title: 'Meat & Seafood',
      api: apis.products.meats_seafoods,
      category: 'meat_seafood',
      to: routesConfig.products,
      img: jpgImages.farmMeat,
    },
    {
      title: 'Dairy & Eggs',
      api: apis.products.dairy_eggs,
      category: 'dairy_egg',
      to: routesConfig.products,
      img: jpgImages.farmDairy,
    },
  ],
};

export default configs;
