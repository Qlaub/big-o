import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { data } from '../lib/data'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Big-O Demonstration</title>
        <meta name="Big-O" content="An informative and interactive big-O website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section id="tldr">
        <h2>tldr:</h2>
        <p>
          Big-O notation can be used to describe how long it takes your computer 
          to sort a bunch of data. Press the graph button to plot data sorting 
          in real time using various sorting algorithms. Leave an algorithm 
          suggestion for all to see at the bottom of the page if you would like.
        </p>
      </section>
      <article id="info">
        <h2>What is big-O?</h2>
        <p>Big-O describes the space and time complexities...</p>
        <h3>What are in-place and stable sorting algorithms?</h3>
        <p>--descriptions--</p>
      </article>
      <section id="sorts">
        {/* These will be cards that are selectable from a dropdown */}
        {data.map((sort, i) => {
          return (
            <div key={i}>
              <div>
                <h3>{sort.name} at a glance</h3>
                <div>
                  <h4>Time Complexity</h4>
                  <p>Average: {sort.timeComplexity.average}</p>
                  <p>Best: {sort.timeComplexity.best}</p>
                  <p>Worst: {sort.timeComplexity.worst}</p>
                </div>
                <div>
                  <h4>Space Complexity</h4>
                  <p>{sort.spaceComplexity}</p>
                </div>
                <div>
                  <h4>Stable?</h4>
                  <p>{sort.stable === true ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <h4>In-place?</h4>
                  <p>{sort.inPlace === true ? 'Yes' : 'No'}</p>
                </div>
              </div>
              <div>
                <h3>When or where might this sorting algorithm be useful?</h3>
                <p>Need to add additional key of &apos;where&apos; to the data object with information for this section</p>
              </div>
              <div>
                <h3>Here&apos;s the code used for this sorting algorithm on this website:</h3>
                <p>Need to add additional key of &apos;code&apos; to the data object with code including comments</p>
              </div>
              <div>
                <h3>Here&apos;s how this code works written out in plain English</h3>
                <p>Need to add additional key of &apos;explanation&apos; to the data object with a step by step explanation</p>
              </div>
            </div>
          )
        })}
      </section>
      <section id="suggestions">
        <h2>Want to see another sorting algorithm added?</h2>
        <p>Type in a suggestion below and if possible I'll add it to the website!</p>
        <textarea typeof='input'></textarea>
        <button>Submit</button>
        <div>
          <h3>User suggestions:</h3>
          <div>Data fetched from backend</div>
        </div>
      </section>
    </div>
  )
}
