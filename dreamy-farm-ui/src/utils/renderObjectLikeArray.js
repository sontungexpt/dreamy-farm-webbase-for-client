function renderObjectLikeArray(obj) {
  return Object.keys(obj).map((key) => (renderItem) => {
    renderItem(obj[key] /*currentItem*/, key /*index*/);
  });
}

function objectToArray(obj) {
  if (Array.isArray(obj)) return obj;
  return Object.keys(obj).map((key) => obj[key]);
}

export { renderObjectLikeArray, objectToArray };
