const hre = require("hardhat");

const fantomAddress = "0x6d0E7094a385396F78399b5c679be09d8702555B"
const ropstenAddress = "0x834eB4A15bA4671ead8B67F46161E864F27C892A"
const address = ropstenAddress

async function main() {
  const NFT = await hre.ethers.getContractFactory("GTONMemorableNFT")
  const signer = await hre.ethers.getSigner()
  const contractAddress = address
  const contract = NFT.attach(contractAddress)
  let nftMint = await contract.mint(signer.address)
  nftMint.wait()
  console.log("NFT minted: ", nftId)
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error)
  process.exit(1)
})
