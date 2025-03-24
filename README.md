# Buzzard Token
Testing [ERC20 (imported from @OpenZeppelin) tokens](https://docs.openzeppelin.com/contracts/3.x/erc20) on the Autonity blockchain.

## Description

### Pre-requisites
- Ensure the correct version of `solc`:
```
pip3 install solc-select
solc-select install 0.8.20
solc-select use 0.8.20
```
- This repository uses `brownie` for compilation and deployments of smart contracts, extending the [Autonity documentation on smart contract deployment](https://docs.autonity.org/developer/deploy-brownie/):
```
pipx install eth-brownie
```

- Initialisation of the `brownie` project structure:
```
brownie init
```

- Network configurations can not live in the resident `brownie-config.yaml` file, and must be updated in the `~/.brownie/network-config.yaml` with:
```
export RPC_URL=https://favourite.autonity.arc.host
brownie networks add Autonity piccadilly host=$RPC_URL chainid=65100004
```

- Ensure the `brownie` network list now contains the Autonity Piccadilly network:
```
brownie network list
```

- Adding the deployer address to `brownie`:
```
brownie console --network piccadilly
>>> account = accounts.add("PRIVATE_KEY")
>>> print(account.address)
```

### Compile
To ensure there are no issues with `imports`, the original Solidity test contract has been moved out of the `contracts/` directory to prevent `brownie` from reading the contract twice. The original file was flattened using the [RemixIDE](https://remix.ethereum.org/), and has been uploaded as `contracts/BUZToken.sol`

- Compile the `BUZToken` with `brownie`:
```
brownie compile
```

### Deploy
- Set the `deployer` private key as an environment variable to be used by the `brownie deploy` script:
```
export DEPLOYER_PRIVATE_KEY=...
```

- Deploy the contract:
```
brownie run --network piccadilly deploy main 0x2F329433dbCF4918E5803776D866049D3F396D7E
```

- Healthy output example:
```
Brownie v1.19.5 - Python development framework for Ethereum

BuztokenProject is the active project.

Running 'scripts/deploy.py::main'...
Transaction sent: 0x2cee549fc4225df368e89f63edd3efdbad0f55a741d50d98f70bdc95fcce9dd5
  Max fee: 2.5 gwei   Priority fee: 1.5 gwei   Gas limit: 1063010   Nonce: 7
  BUZToken.constructor confirmed   Block: 8913182   Gas used: 966373 (90.91%)   Gas price: 2.0 gwei
  BUZToken deployed at: 0xC66B0Ab3c084a57d0155B302186d84Ed7F47a6c8
```


```
sed ':a;N;$!ba;s/\n/\\n/g' contracts/BUZToken_flattened.sol | xclip -selection clipboard
```

- https://www.chainlens.com/post/solving-source-code-verification-in-ethereum
