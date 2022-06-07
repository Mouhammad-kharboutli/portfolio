import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useState, useEffect } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async (url) => {
      setIsLoading(true);

      const res = await fetch(url);
      if (!res.ok) {
        console.log('Error called here');
        throw new Error("Something went wrong");
      }
      const data = await res.json();
      const loadedMeals = [];
      for (const key in data) {
        const mealItem = {
          id: key,
          description: data[key].description,
          price: data[key].price,
          name: data[key].name,
        };
        loadedMeals.push(mealItem);
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals(
      "https://react-tasks-4b15c-default-rtdb.firebaseio.com/meals.json"
    ).catch((error) => {
      setIsLoading(false);
      setHttpError(error);
    });
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  if (httpError) {
    return(
      <section>
      <Card>
        <p className={classes.httpError}> {httpError.message}</p>
      </Card>
    </section>
    )
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
        {isLoading && <p className={classes.loading}> Loading ...</p>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
