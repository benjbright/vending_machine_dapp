import Head from "next/head"
import "bulma/css/bulma.css"
import styles from "../styles/Home.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Vending Machine Dapp</title>
        <meta name="description" content="A blockchain vending machine dapp" />
      </Head>

      <section className="hero is-primary">
        <div className="hero-body">
          <p className="title">The Donut Factory</p>
        </div>
      </section>
      <div className="p-6">
        <button className="button is-primary">Connect Wallet</button>
      </div>
    </div>
  )
}
