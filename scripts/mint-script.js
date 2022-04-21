const hre = require("hardhat");
async function main() {
  const NFT = await hre.ethers.getContractFactory("GTONMemorableNFT");
  const URI = ""
  const WALLET_ADDRESS = ""
  const CONTRACT_ADDRESS = ""
  const contract = NFT.attach(CONTRACT_ADDRESS);
  await contract.mint(WALLET_ADDRESS, URI);
  console.log("NFT minted:", contract);
}
main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});