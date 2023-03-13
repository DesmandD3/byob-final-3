import Head from 'next/head'
import Image from 'next/image'
import { Edu_NSW_ACT_Foundation, Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import styled from 'styled-components'
import Button from '@/components/button'
import Input from '@/components/input'
import { useState } from 'react'


const Logo = styled.img`
margin-top: -4rem;
width: 18rem;
display: flex;
`
const Banner = styled.img`
display: flex;
align-items:baseline;
margin-top: -2rem;
`
const ButtonCont = styled.div`
display: flex;
padding: 10px;

`

export default function Home() {

  const router = useRouter();
  const [cocktails, setCocktails] = useState([]);

  async function fetchRandomCocktails() {
    const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/randomselection.php');
    const data = await res.json();
    return data.drinks;
  }

  async function handleGenerateRandomCocktails() {
    const randomCocktails = await fetchRandomCocktails();
    setCocktails(randomCocktails);
    router.push({
      pathname: '/results',
      query: { cocktails: JSON.stringify(randomCocktails) }
    });
  }

  return (
    <>
      <Head>
        <title>Search</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
            <Banner src='/cocktailbanner.png' />
        </div>
        <div>
            <Logo src='/BYOBLOGO.png' />
        </div>
        <Input txt='enter a cocktail name'/>
        <Input txt='search by ingredients'/>
        <br />
        <h3 className={styles.h3}>OR</h3>
        <ButtonCont>
          <Button wd='7rem' labeltxt='Generate Random Cocktail' bg='#F4681E' marg='10px' wt='300' pad='10px' size='16px'/>

          <Button onClick={handleGenerateRandomCocktails} wd='7rem' labeltxt='Generate Random Cocktails' bg='#F4681E' marg='10px' wt='300' pad='10px' size='16px'/>

          <Button wd='7rem' labeltxt='Generate Random Mocktail' bg='#D8334F' marg='10px' wt='300' pad='10px' size='16px'/>
        </ButtonCont>
      </main>
    </>
  )
}
