import Head from "next/head"
import { useState, useEffect } from "react"
import Web3 from "web3"
import "bulma/css/bulma.css"
import styles from "../styles/VendingMachine.module.css"
import vendingMachineContract from "../blockchain/vending"

const VendingMachine = () => {
  const [error, setError] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [inventory, setInventory] = useState("")
  const [myDonutCount, setMyDonutCount] = useState("")
  const [buyCount, setBuyCount] = useState("")
  const [web3, setWeb3] = useState(null)
  const [address, setAddress] = useState(null)
  const [vmContract, setVMContract] = useState(null)
  const [purchases, setPurchases] = useState(0)

  useEffect(() => {
    if (vmContract) getInventoryHandler()
    if (vmContract && address) getMyDonutCountHandler()
  }, [vmContract, address, purchases])

  const getInventoryHandler = async () => {
    const inventory = await vmContract.methods.getVendingMachineBalance().call()
    console.log(inventory)
    setInventory(inventory)
  }

  const getMyDonutCountHandler = async () => {
    // const accounts = await web3.eth.getAccounts()
    // console.log(accounts)

    const count = await vmContract.methods.donutBalances(address).call()
    console.log(count)
    setMyDonutCount(count)
  }

  const updateDonutQty = (event) => {
    // console.log(`Donut Quantity: ${event.target.value}`)
    setBuyCount(event.target.value)
  }

  const buyDonutHandler = async () => {
    // const accounts = await web3.eth.getAccounts()
    try {
      await vmContract.methods.purchase(buyCount).send({
        from: address,
        value: web3.utils.toWei("0.001", "ether") * buyCount,
      })
      // setPurchases(purchases++)
      setSuccessMsg(`${buyCount} donuts purchased!`)

      if (vmContract) getInventoryHandler()
      if (vmContract && address) getMyDonutCountHandler()
    } catch (error) {
      setError(error.message)
    }
  }

  // window.ethereum - provider API
  const connectWalletHandler = async () => {
    // Check if Metamask is available
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        // Request wallet connect
        await window.ethereum.request({ method: "eth_requestAccounts" })

        // Set web3 instance
        const web3 = new Web3(window.ethereum)
        setWeb3(web3)

        // Get list of accounts
        const accounts = await web3.eth.getAccounts()
        setAddress(accounts[0])

        // Create local contract copy
        const vm = vendingMachineContract(web3)
        setVMContract(vm)

        // getMyDonutCountHandler()
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
      <section className="mt-5">
        <div className="container">
          <div className="field">
            <label className="label">Buy Donuts</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="Enter amount..."
                onChange={updateDonutQty}
              />
            </div>
            <button
              onClick={buyDonutHandler}
              className="button is-primary mt-2"
            >
              Buy
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="container has-text-danger mt-2">
          <p>{error}</p>
        </div>
      </section>
      <section>
        <div className="container has-text-success mt-2">
          <p>{successMsg}</p>
        </div>
      </section>
    </div>
  )
}

export default VendingMachine
