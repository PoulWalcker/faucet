const { expect } = require("chai");
const { hre } = require("hardhat");

describe("NFT", function() {

  it("It should deploy the contract, mint a token, and resolve to the right URI", async function() {

    const [owner] = await ethers.getSigners();

    const NFT = await ethers.getContractFactory("GTONMemorableNFT");
    const nft = await NFT.deploy();
    await nft.deployed();

    await nft.mint(owner.address, 826)
    expect(await nft.tokenURI(0)).to.equal("https://nft.gton.capital/memorable/metadata/1.json")
    expect(await nft.tokenURI(1)).to.equal("https://nft.gton.capital/memorable/metadata/1.json")

    await nft.mint("0xf7a643F3Dfc4b49a06e30AfA349ae13873FF86BD", 826)

    for (i=0; i<826; i++) {
      await nft.transferFrom(
        owner.address, 
        "0x18e9fcc47EF431BC160B797cBD8480E0d24B222B", 
        i)
    }
  });
});
