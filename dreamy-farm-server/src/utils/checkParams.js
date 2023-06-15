function checkParams(params, ...requiredParams) {
  const missingParams = requiredParams.filter((param) => {
    if (typeof param !== 'string') {
      throw new Error(`Require ${param} must be a string`);
    }
    return !params[param];
  });
  if (missingParams.length > 0) {
    throw new Error(`Missing required params: ${missingParams.join(', ')}`);
  }
}

export default checkParams;
