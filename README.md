# 💻 DEVToken
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
- Settings (optimizer, evmVersion, etc.)
- AST and legacy info
- Tool version (e.g. if compiled by solc, hardhat, etc.)

❗ Any difference in settings will change this metadata and therefore the bytecode hash.

### 🧬 Matching Elements Required for Full Verification

## 🔧 Install
### 🧰 Pre-requisites
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
brownie networks add Autonity piccadilly host=$RPC_URL chainid=65100004 explorer=https://piccadilly.autonity.org/api/
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

### ⚗️ Test
Open a shell inside the eth-brownie environment:
```
pipx runpip eth-brownie install --upgrade typing_extensions
```

This uses `pip` inside the `eth-brownie` environment to directly upgrade `typing_extensions`.

- Run the tests:
```
brownie test
```

### 🧾 Contract Verification
Contract verification can carried out by both the Blockscout WebUI, and API calls. This example uses curl to call the Blockscout API. Once the `verification_payload.json` and the `curl.sh` are fully populated with the relevant values:

#### 🔍 Payload
The JSON _payload_ is constructed from several files, and posted using curl.

- [curl.sh](curl.sh) - Shell script using `curl` to interract with the [Blockscout smart-contract verification API
](https://docs.blockscout.com/devs/verification/blockscout-smart-contract-verification-api)

- [scripts/ethers.js](scripts/ethers.js) - ABI Encoder for the smart-contract constructor values
To manually ABI-encode the `constructor_args`, update the `scripts/ethers.js`, run it to generate the ABI, and update the `curl.sh` command (or use [online ABI Encoding Service](https://abi.hashex.org/)).
```
sudo apt install nodejs
node scripts/ethers.js
```

- [verification_payload.json](verification_payload.json) - Manually generated payload from the `brownie run` output
The ouput from `brownie run` does not directly fit the input requirements of the Blockscout verifier service. The following are needed:

The `contracts/../` `content`, is single lined solidity, with end of line characters replaced with `\n`, so for each contract copy to clipboard, and paste in the `verification_payload.json`:
```
sed ':a;N;$!ba;s/\n/\\n/g' contracts/SafeMath.sol | xclip -selection clipboard
```
and:
```
sed ':a;N;$!ba;s/\n/\\n/g' contracts/Token.sol | xclip -selection clipboard
```

Once the JSON payload is fully generated, it can be submitted to the Blockscout contract verifier service, either by API calls, or by the Blaockscout WebUI.

#### API
```
./curl.sh
```

#### WebUI
- On the Blockscout WebUI, click on Tokens, and search for the deployed contract, i.e. for [0x8ad114bFa6616886E84900549C8Df59C58bA4725](https://piccadilly.autonity.org/token/0x8ad114bFa6616886E84900549C8Df59C58bA4725)
- Click on `Contract` > `Verify & publish`
- Ensure values match the definitions as provided to the compiler:
![2025-03-26_11-35](https://github.com/user-attachments/assets/aeb137ad-6a22-4c4e-96bc-4557cce5ede2)
