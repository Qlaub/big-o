import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Big-O Demonstration</title>
        <meta name="Big-O Demonstration" content="A demonstration of sorting algorithm efficiency in big-O notation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}
