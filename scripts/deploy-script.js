const hre = require("hardhat");

async function main() {
  const NFT = await hre.ethers.getContractFactory("GTONMemorableNFT");
  const nft = await NFT.deploy();
  await nft.deployed();
  console.log("NFT deployed to: ", nft.address);
}

async function verify() {
  await hre.run("verify:verify", {
    address: "0x6d0E7094a385396F78399b5c679be09d8702555B",
    network: "ftm",
  });
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
