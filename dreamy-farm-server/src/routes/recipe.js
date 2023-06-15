import express from 'express';
import RecipeController from '~/controllers/RecipeController';
const router = express.Router();

const recipeController = new RecipeController();

router.post('/add', recipeController.addRecipe);

router.get('/detail/:slug', recipeController.show);

router.get('/', recipeController.getRecipes);

export default router;
