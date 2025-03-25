# DEVToken
A bare-bones implementation of the Ethereum [ERC-20 standard](https://eips.ethereum.org/EIPS/eip-20), written in [Solidity](https://github.com/ethereum/solidity) and managed by [Brownie](https://eth-brownie.readthedocs.io/en/stable/index.html), to test smart contract pipelines and verifications in the [Piccadilly instance of Blockscout](https://piccadilly.autonity.org/).

## 🧠 Description

### ✅ Overview
For a contract to be fully matched and verified, the compiled bytecode must match the deployed on-chain bytecode exactly — including both:
- The runtime bytecode (what gets executed)
- The embedded compiler metadata (appended during compilation)

So, it’s not enough for the logic to be the same — everything about how the contract was compiled must match too.

### 📦 What’s in the Metadata That Affects Matching?
The Solidity compiler appends a metadata hash to the bytecode. This metadata contains:
- Compiler version
- Source hash(es)
- Settings (optimizer, evmVersion, bytecodeHash, etc.)
- AST and legacy info
- Tool version (e.g. if compiled by solc, hardhat, etc.)

❗ Any difference in settings — even a different evmVersion or bytecodeHash — will change this metadata and therefore the bytecode hash.

### 🧬 Matching Elements Required for Full Verification

## 🔧 Install
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

- Bake in the [Brownie-mix token contract template](https://github.com/brownie-mix/token-mix):
```
brownie bake
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
>>> account = accounts.add("DEPLOYER_PRIVATE_KEY")
>>> print(account.address)
```

### 🛠️ Compile
- Compile the contracts:
```
brownie compile
```

### ⛓️ Deploy
- Set the `deployer` private key as an environment variable to be used by the `brownie deploy` script:
```
export DEPLOYER_PRIVATE_KEY=...
```

- Deploy the contract:
```
brownie run --network piccadilly scripts/token.py
```

- Healthy output example:
```
Running 'scripts/token.py::main'...
Transaction sent: 0xb7030894c6959b2428e6daa6cc76105cb09de8b9e00a86d69792ab97e9c1983f
  Max fee: 2.5 gwei   Priority fee: 1.5 gwei   Gas limit: 1061061   Nonce: 8
  Token.constructor confirmed   Block: 8961103   Gas used: 964601 (90.91%)   Gas price: 2.0 gwei
  Token deployed at: 0x8ad114bFa6616886E84900549C8Df59C58bA4725
```

### 🔍 Generating the Verification Payload
- To manually ABI-encode the `constructor_args`, update the `scripts/ethers.js`, run it to generate the ABI, and update the `curl.sh` command.
```
sudo apt install nodejs
node scripts/ethers.js
```

- The `contracts/../` `content`, is single lined solidity, with end of line characters replaced with `\n`, so for each contract copy to clipboard, and paste in the `verification_payload.json`:
```
sed ':a;N;$!ba;s/\n/\\n/g' contracts/SafeMath.sol | xclip -selection clipboard
```
and:
```
sed ':a;N;$!ba;s/\n/\\n/g' contracts/Token.sol | xclip -selection clipboard
```

### 🧾 Contract Verification
Contract verification can carried out by both the Blockscout WebUI, and API calls. This example uses curl to call the Blockscout API. Once the `verification_payload.json` and the `curl.sh` are fully populated with the relevant values:
```
./curl.sh
```

### ⚗️ Test
