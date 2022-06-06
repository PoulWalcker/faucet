const { expect } = require("chai");

describe("NFT", function() {

  it("It should deploy the contract, mint a token, and resolve to the right URI", async function() {
    const NFT = await ethers.getContractFactory("GTONMemorableNFT");
    console.log("1")
    const nft = await NFT.deploy();
    console.log("2")
    await nft.deployed();
    console.log("3")
    await nft.mint("0xf7a643F3Dfc4b49a06e30AfA349ae13873FF86BD")
    expect(await nft.tokenURI(1)).to.equal(URI)
  });
});
