const fantomAddress = "0x6d0E7094a385396F78399b5c679be09d8702555B";
const rinkebyAddress = "0x834eB4A15bA4671ead8B67F46161E864F27C892A";
const ropstenAddress = "0x834eB4A15bA4671ead8B67F46161E864F27C892A";
const deployAddress = ropstenAddress;

async function main() {
  const NFT = await hre.ethers.getContractFactory("GTONMemorableNFT");
  const nft = await NFT.deploy();
  await nft.deployed();
  console.log("NFT deployed to: ", nft.address);

  await delay(20000);
  await verify(nft.address);
}

async function verify(address) {
  await hre.run("verify:verify", {
    address: address,
    network: hre.network,
  });
}

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
