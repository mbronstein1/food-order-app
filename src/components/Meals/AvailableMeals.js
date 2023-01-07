import React, { useState, useEffect } from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch('https://react-http-practice-54ed4-default-rtdb.firebaseio.com/meals.json');

        if (!response.ok) {
          throw new Error('Something went wrong!');
        }

        const data = await response.json();

        // Changing datatype from object to array
        const loadedMeals = [];
        // Loop through object and push each obj into loadedMeals array
        for (const key in data) {
          loadedMeals.push({
            id: key,
            ...data[key],
          });
        }
        setMeals(loadedMeals);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setHttpError(err.message);
      }
    };

    setHttpError(null);
    fetchMeals();
  }, []);

  if (isLoading) {
    return (
      <section className={classes['meals-loading']}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes['meals-error']}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map(meal => (
    <MealItem
      key={meal.id}
      id={meal.id}
      meal={meal}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
