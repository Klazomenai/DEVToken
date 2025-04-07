### Decription
Deploy & verify a simple ERC20 token, imported from OpenZeppelin, using Hardhat and Blockscout, on the Autonity Piccadilly blockchain.

#### Dependencies
- Install NVM:
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

- Install pre-requities defined in `package.json`:
```
npm install
```

- Create a Hardhat project:
```
npx hardhat
```

#### Configurations
Network configurations are defined in `hardhat.config.ts`:
- Setting `london` as the evm target
- Defining the Autonity Piccadilly network, as defined here: https://docs.autonity.org/networks/testnet-piccadilly/
- With Blockscout block explorer: https://piccadilly.autonity.org/
- And RPC node: https://rpc2.piccadilly.autonity.org

#### Contract
- Compile the ERC20 test contract.
```
npx hardhat compile
```

- Run tests to ensure constructor values and other hardcoded values are as expected:
```
npx hardhat test
```

- Deploy the contract:
```
npx hardhat run scripts/deploy.ts --network piccadilly
```

- Verify the newly deployed contract:
```
npx hardhat verify --network piccadilly 0xb8Be312E3EA6cC2606f8DF7b2Ee1B6FA911a2Ee7 1000000000000000000000000
```

- The final contract verification on Blockscout: https://piccadilly.autonity.org/address/0xb8Be312E3EA6cC2606f8DF7b2Ee1B6FA911a2Ee7?tab=contract
