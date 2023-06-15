import Recipe from '~/models/Recipe';

class RecipeController {
  getRecipes = async (req, res) => {
    try {
      const recipes = await Recipe.find({});
      const { method } = req.query;
      if (method === 'less') {
        const littleRecipes = recipes.slice(0, 6);
        return res.json({
          status: 'success',
          message: 'Get recipes successfully',
          data: littleRecipes,
        });
      }
      res.json({
        status: 'success',
        message: 'Get recipes successfully',
        data: recipes,
      });
    } catch (err) {
      res.status(404).json({ status: 'error', message: err });
    }
  };

  addRecipe = async (req, res) => {
    try {
      const { name, image, description, totalTime, steps } = req.body;
      const recipe = await Recipe.create({
        name,
        image,
        description,
        totalTime,
        steps,
      });

      res.json({
        status: 'success',
        message: 'Add recipe successfully',
        data: recipe,
      });
    } catch (err) {
      res.status(404).json({ status: 'error', message: err });
    }
  };

  show = async (req, res) => {
    try {
      const { slug } = req.params;

      if (!slug) {
        return res.status(404).json({
          status: 'error',
          message: 'Slug is not found',
          required: 'slug',
        });
      }

      const recipe = await Recipe.findOne({ slug });

      if (!recipe) {
        return res
          .status(404)
          .json({ status: 'error', message: 'Recipe not found' });
      }

      res.json({ status: 'success', message: 'Recipe found', data: recipe });
    } catch (err) {
      res.status(404).json({ status: 'error', message: err });
    }
  };
}

export default RecipeController;
