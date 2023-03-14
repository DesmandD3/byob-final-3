import Head from 'next/head';
import Image from 'next/image';
import { Edu_NSW_ACT_Foundation, Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Button from '@/components/Button';

export default function Results() {
  const [cocktails, setCocktails] = useState([]);

  const fetchCocktails = async () => {
    const res = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/randomselection.php'
    );
    const data = await res.json();
    setCocktails(data.drinks);
  };

  return (
    <>
      <Head>
        <title>Results</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main1}>
        <h1 className={styles.h1}>YOUR SEARCH</h1>
        <h2 className={styles.h2}>INGREDIENTS: "vodka"</h2>

        <Button labeltxt='Random Cocktail' onClick={fetchCocktails} />

        {cocktails.length > 0 && (
          <div className={styles.resultimg}>
            {cocktails.map((cocktail) => (
              <figure key={cocktail.idDrink}>
                <img src={cocktail.strDrinkThumb} />
                <figcaption>
                  <h2 className={styles.drinkname}>{cocktail.strDrink}</h2>
                  <h3 className={styles.ingredient}>
                    {cocktail.strIngredient1}
                  </h3>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </main>
    </>
  );
}