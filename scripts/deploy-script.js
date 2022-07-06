async function main() {
  let tokenAddress = "0xbc10a04b76a5cd6bf2908e1237fb2d557482cf48";

  const FaucetFactory = await hre.ethers.getContractFactory("Faucet");
  const faucet = await FaucetFactory.deploy();
  await faucet.deployed();
  console.log("Faucet deployed to: ", faucet.address);

  await delay(20000);
  await hre.run("verify:verify", {
    address: faucet.address,
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
