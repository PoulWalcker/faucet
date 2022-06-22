const { expect } = require("chai");
const { hre } = require("hardhat");

describe("NFT", function() {

  it("It should deploy the contract, mint a token, and resolve to the right URI", async function() {

    const [owner] = await ethers.getSigners();

    const NFTFactory = await ethers.getContractFactory("GTONMemorableNFT")
    const nft = await NFTFactory.deploy()
    await nft.deployed()

    await nft.mint(owner.address, 826)
    expect(await nft.tokenURI(0)).to.equal("https://nft.gton.capital/memorable/metadata/1.json")
    expect(await nft.tokenURI(1)).to.equal("https://nft.gton.capital/memorable/metadata/1.json")

    await nft.mint("0xf7a643F3Dfc4b49a06e30AfA349ae13873FF86BD", 1)
  });

  it("Whitelist fails for random user", async function() {

    const [owner] = await ethers.getSigners();

    const WhitelistFactory = await ethers.getContractFactory("WhitelistStatus")
    const whitelist = await WhitelistFactory.deploy()
    await whitelist.deployed()

    await expect(whitelist.amIWhitelisted([])).to.be.revertedWith("Invalid Merkle Proof")
  });
});
