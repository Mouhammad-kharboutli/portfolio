const fetchMeals = async (url) => {
  // url
  const meals = [];
  const res = await fetch(url);
  const data = await res.json();
  for (const key in data) {
    const id = key;
    const mealItem = {
      id,
      description: data[key].description,
      price: data[key].price,
      name: data[key].name,
    };
    meals.push(mealItem);
  }
  return meals;
};

export default fetchMeals;
