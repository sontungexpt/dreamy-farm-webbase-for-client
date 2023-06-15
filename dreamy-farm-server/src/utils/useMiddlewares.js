function useMiddlewares(router, middlewares) {
  Object.keys(middlewares).forEach((path) => {
    router.use(path, ...middlewares[path]);
  });
}

export default useMiddlewares;
