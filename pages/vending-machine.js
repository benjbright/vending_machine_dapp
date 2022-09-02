import Head from "next/head"
import { useState, useEffect } from "react"
import Web3 from "web3"
import "bulma/css/bulma.css"
import styles from "../styles/VendingMachine.module.css"
import vmContract from "../blockchain/vending"

const VendingMachine = () => {
  const [error, setError] = useState("")
  const [inventory, setInventory] = useState("")
  const [myDonutCount, setMyDonutCount] = useState("")

  let web3

  useEffect(() => {
    getInventoryHandler()
  }, [])

  const getInventoryHandler = async () => {
    const inventory = await vmContract.methods.getVendingMachineBalance().call()
    console.log(inventory)
    setInventory(inventory)
  }

  const getMyDonutCountHandler = async () => {
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)

    const count = await vmContract.methods.donutBalances(accounts[0]).call()
    console.log(count)
    setMyDonutCount(count)
  }

  const buyDonutHandler = async () => {}

  // window.ethereum - provider API
  const connectWalletHandler = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        web3 = new Web3(window.ethereum)
        getMyDonutCountHandler()
      } catch (error) {
        console.log(error.message)
        setError(error.message)
      }
    } else {
      // Metamask not installed
      console.log("Please install Metamask.")
    }
  }

  return (
    <div className={styles.main}>
      <Head>
        <title>Vending Machine Dapp</title>
        <meta name="description" content="A blockchain vending machine dapp" />
      </Head>
      <nav className="navbar mt-4 mb-4">
        <div className="container">
          <div className="navbar-brand">
            <h1>Vending Machine Dapp</h1>
          </div>
          <div className="navbar-end">
            <button
              onClick={connectWalletHandler}
              className="button is-primary"
            >
              Connect Wallet
            </button>
          </div>
        </div>
      </nav>
      <section>
        <div className="container">
          <h2>Vending machine inventory: {inventory}</h2>
        </div>
      </section>
      <section>
        <div className="container">
          <h2>My donuts: {myDonutCount}</h2>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="field">
            <label className="label">Buy Donuts</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="Enter amount..."
              />
            </div>
            <button onClick={buyDonutHandler} className="button is-primary">
              Buy
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="container has-text-danger">
          <p>{error}</p>
        </div>
      </section>
    </div>
  )
}

export default VendingMachine
