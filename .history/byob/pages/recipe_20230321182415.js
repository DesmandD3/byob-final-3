import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styled from 'styled-components'
import styles from '@/styles/Home.module.css'
import Head from "next/head";
import Image from "next/image";

const Logo = styled.img`
width: 18rem;
display: flex;
`
const Cont = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
margin-top: 12rem;
`

const ButtonCont = styled.div`
margin-top: 70px;
`


const Recipe = () => {
  const router = useRouter();
  const [cocktail, setCocktail] = useState(null);

  function handleClick() {
    router.push('/results');
  }

  useEffect(() => {
    const fetchCocktail = async () => {
      const { id } = router.query;
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await response.json();
      setCocktail(data.drinks[0]);
    };
    fetchCocktail();
  }, []);

  return (
    <>
      <Head>
        <title>Recipe</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Image className={styles.backbutton} onClick={handleClick} src='/arrow.svg' width='70' height='70' />
    <div className={styles.recipeContainer}>
      
{Object.keys(cocktail)
  .filter((key) => key.startsWith("strIngredient"))
  .map((key, index) => {
    if (cocktail[key]) {
      return (
        <li className={styles.recipeItems} key={key}>
          ✰ {cocktail[key]} {cocktail[`strMeasure${index + 1}`]}
        </li>
      );
    }
    return null;
  })}

          
          <h2 className={styles.recipeHeader}>INSTRUCTIONS</h2>
          <p className={styles.recipeInfo}>{cocktail.strInstructions}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </main>
    </>
  );
};


export default Recipe;
