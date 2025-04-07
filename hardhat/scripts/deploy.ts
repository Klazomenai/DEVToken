import { ethers } from "hardhat";

async function main() {
  const initialSupply = ethers.parseEther("1000000"); // 1 million tokens

  const DEVToken = await ethers.getContractFactory("DEVToken");
  const token = await DEVToken.deploy(initialSupply);

  await token.waitForDeployment();

  const address = await token.getAddress();
  console.log(`✅ DEVToken deployed at: ${address}`);
  console.log(`🛠 Constructor arg (initialSupply): ${initialSupply.toString()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

