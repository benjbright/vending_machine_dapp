import Web3 from "web3"
// const { INFURA_API_URL } = require("../secrets.json")

// const provider = new Web3.providers.HttpProvider(INFURA_API_URL)

// const web3 = new Web3(provider)

const abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "donutBalances",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getVendingMachineBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "purchase",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "restock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
]

const vendingMachineContract = (web3) => {
  return new web3.eth.Contract(
    abi,
    "0x059D1FFF845c3df71E6898931898Ef182e9E06E5"
  )
}

// const vmContract = new web3.eth.Contract(
//   abi,
//   "0x059D1FFF845c3df71E6898931898Ef182e9E06E5"
// )

export default vendingMachineContract
