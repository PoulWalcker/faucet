async function main() {
  const FAUCET = await hre.ethers.getContractFactory("Faucet");
  const faucet = await FAUCET.deploy();
  await faucet.deployed();
  console.log("Faucet deployed to: ", faucet.address);

  await delay(20000);
  await verify(faucet.address);
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
