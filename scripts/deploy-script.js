async function main() {

  let gcdGoerli = "0x1EF834d6D3694a932A2082678EDd543E3Eb3412b"
  let tokenAddress = gcdGoerli

  const FaucetFactory = await hre.ethers.getContractFactory("Faucet");
  const faucet = await FaucetFactory.deploy(
    tokenAddress,
    20
  );
  await faucet.deployed();
  console.log("Faucet deployed to: ", faucet.address);

  await delay(20000);
  await hre.run("verify:verify", {
    address: faucet.address,
    network: hre.network,
    constructorArguments: [
      tokenAddress,
      20
  ]
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
