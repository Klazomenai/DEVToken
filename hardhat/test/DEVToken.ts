import { expect } from "chai";
import { ethers } from "hardhat";

describe("DEVToken", function () {
  it("should deploy with correct total supply and name", async function () {
    const initialSupply = ethers.parseEther("1000000");
    const [owner] = await ethers.getSigners();

    const DEVToken = await ethers.getContractFactory("DEVToken");
    const token = await DEVToken.deploy(initialSupply);

    expect(await token.totalSupply()).to.equal(initialSupply);
    expect(await token.name()).to.equal("DEVToken");
    expect(await token.symbol()).to.equal("DEV");
    expect(await token.balanceOf(owner.address)).to.equal(initialSupply);
  });
});
