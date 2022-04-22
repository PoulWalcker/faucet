const hre = require("hardhat");

async function main() {
  const NFT = await hre.ethers.getContractFactory("GTONMemorableNFT");
  const signer = await hre.ethers.getSigner();
  const contractAddress = "";
  const contract = NFT.attach(contractAddress);
  let nftId = await contract.mint(signer.address);
  console.log("NFT minted: ", nftId);
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
