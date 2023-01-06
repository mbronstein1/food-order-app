import React, { useState, useEffect } from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch('https://react-http-practice-54ed4-default-rtdb.firebaseio.com/meals.json');
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
        console.error(err);
      }
    };

    fetchMeals();
  }, []);

  if (isLoading) {
    return (
      <section className={classes['meals-loading']}>
        <p>Loading...</p>;
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
