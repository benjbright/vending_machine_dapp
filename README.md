# Vending Machine Dapp

Tutorial project using Solidity, Web3.js and NextJs

## Notes and key learning points

29:00 Truffle set up

- set up new folder - vending_machine
- run `npm init`
- run `npm install -g truffle` to install truffle globally
- can then run `truffle init` to intitialise a new truffle project
- install `dotenv` and `npm install @truffle/hdwallet-provider`
- complete the truffle config and then run `truffle migrate --network goerli`
- contract address on Goerli test network 0x059D1FFF845c3df71E6898931898Ef182e9E06E5
- NOTE - changed the value on the contract to 0.001 ether for testing purposes

46:00 Front end connection

1. Front end app
   - ```javascript
     const localContract = new web3.eth.Contract(abi, address)
     ```
2. ABI
3. Blockchain - Vending Machine smart contract

- think of the ABI as a passport between the Javascript and Ethereum worlds
- need to compile the contract locally to generate the ABI
- install the solidity compiler `npm install solc`
- Add the compile script in the package.json file
- `npm run compile`

56:00 Front end design

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
