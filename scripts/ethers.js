// Constructor Arguments Encoding: The constructorArguments field should contain the ABI-encoded
// constructor parameters as a continuous hex string without the 0x prefix. Given the constructor in:
// contracts/Token.sol, and values in:
// scripts/token.py
const ethers = require('ethers');
const abiCoder = new ethers.utils.AbiCoder();

const encoded = abiCoder.encode(
    ['string', 'string', 'uint256', 'uint256'],
    ['DEVToken', 'DEV', 18, ethers.utils.parseUnits('10000000000000000000000000000', 0)]
);

console.log(encoded.slice(2)); // Remove '0x' prefix
