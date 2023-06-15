import Product from '~/models/Product';
import Recipe from '~/models/Recipe';
import findAtModel from '~/utils/findAtModel';

class SiteController {
  index(req, res, next) {
    // .. some logic here .. like any other middleware
    res.send('index');
    next();
  }

  searchAtModel = async ({
    keySearch,
    sort, // sort = 'sold,desc' => sort = ['sold', 'desc'] // sort = 'sold' => sort = ['sold']
    model,
    page = 1,
    limit = 5,
  }) => {
    keySearch = keySearch.replace(/\\/g, '\\\\');
    return findAtModel({
      model,
      page,
      limit,
      find: {
        name: { $regex: keySearch, $options: 'i' },
      },
      sort,
    });
  };

  search = async (req, res) => {
    try {
      const { page, limit, keySearch } = req.query;

      const productsResult = await this.searchAtModel({
        keySearch,
        sort: 'sold,desc',
        model: Product,
        page,
        limit,
      });

      productsResult.data = productsResult.data.map((item) => ({
        ...item._doc,
        typeSearch: 'product',
      }));

      const recipesResult = await this.searchAtModel({
        keySearch,
        model: Recipe,
        page,
        limit,
      });

      recipesResult.data = recipesResult.data.map((item) => ({
        ...item._doc,
        typeSearch: 'recipe',
      }));

      // combine 2 array
      const total = productsResult.total + recipesResult.total;
      const data = [...productsResult.data, ...recipesResult.data];

      // priority: product > recipe
      const dataResult = data.slice(0, productsResult.limit);

      const response = {
        status: 'success',
        message: 'Search successfully',
        total,
        page: productsResult.page,
        limit: productsResult.limit,
        data: dataResult,
      };

      res.status(200).json(response);
    } catch (err) {
      res
        .status(404)
        .json({ status: 'error', message: err.message, error: err });
    }
  };
}

export default SiteController;
