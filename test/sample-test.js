const { expect } = require("chai");
const { hre } = require("hardhat");

describe("NFT", function () {
  it("Withdraw fails if amount more then limit", async () => {
    //Limit is 200

    const faucetFactory = await ethers.getContractFactory("Faucet");
    const contract = await faucetFactory.deploy();
    await contract.deployed();

    const owner = "0x9Bde0836d9F7386446a455684571e7694F9d909C";

    await expect(contract.withdrawTokens(owner, 300)).to.be.revertedWith(
      "FaucetError: Insufficient funds"
    );
  });
  it("Withdwaw tokens fail if balance low then limit", async () => {
    const faucetFactory = await ethers.getContractFactory("Faucet");
    const contract = await faucetFactory.deploy();
    await contract.deployed();

    await expect(contract.send()).to.be.revertedWith(
      "FaucetError: Insufficient funds"
    );
  });
});
