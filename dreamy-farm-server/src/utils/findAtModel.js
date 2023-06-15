const findAtModel = async ({
  sort, // sort = 'sold,desc' => sort = ['sold', 'desc'] // sort = 'sold' => sort = ['sold']
  model,
  page = 1,
  find = {},
  limit = 5,
}) => {
  if (typeof page === 'string') {
    page = parseInt(page);
  }
  if (typeof limit === 'string') {
    limit = parseInt(limit);
  }
  page = page - 1; // page = 1 => page = 0

  let sortBy = {};
  if (sort) {
    sort = sort.trim(); // remove space example: 'sold ' => 'sold'
    sort = sort.split(','); // split string to array
    sort = sort.map((item) => item.trim()); // remove space in array

    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = 'asc'; //default sort asc
    }
  }

  const result = await model
    .find(find)
    .sort(sortBy)
    .skip(page * limit) // done
    .limit(limit); // done

  const total = await model.countDocuments(find);

  return {
    total,
    page: page + 1,
    limit,
    data: result,
  };
};

export default findAtModel;
