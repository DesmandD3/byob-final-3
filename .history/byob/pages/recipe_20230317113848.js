import { useState, useEffect } from 'react';
import Head from 'next/head';

import { useRouter } from 'next/router';

export default function Recipe() {
  const [cocktail, setCocktail] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchCocktail = async () => {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await response.json();
      setCocktail(data.drinks[0]);
    };
    fetchCocktail();
  }, [id]);

  if (!cocktail) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{cocktail.strDrink} Recipe</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.recipe}>
          <div className={styles.imgContainer}>
            <img className={styles.img} src={cocktail.strDrinkThumb} />
          </div>
          <div className={styles.details}>
            <h1 className={styles.title}>{cocktail.strDrink}</h1>
            <h3 className={styles.category}>{cocktail.strCategory}</h3>
            <div className={styles.ingredients}>
              <h2>Ingredients:</h2>
              <ul>
                {Object.entries(cocktail)
                  .filter(([key, value]) => {
                    return (
                      key.startsWith('strIngredient') &&
                      value !== null &&
                      value !== ''
                    );
                  })
                  .map(([key, value]) => (
                    <li key={key}>{value}</li>
                  ))}
              </ul>
            </div>
            <div className={styles.instructions}>
              <h2>Instructions:</h2>
              <p>{cocktail.strInstructions}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
