const { expect } = require("chai");
const { hre } = require("hardhat");
const { Big } = require("big.js");

describe("NFT", function () {
  // Factories
  let ERC20Factory;
  let FaucetFactory;

  let faucet;
  let token1;
  let token2;
  let tokenDecimals = 6;

  const [wallet, denice] = waffle.provider.getWallets();

  before(async () => {
    await deployToken();
  });

  beforeEach(async () => {});

  async function deployToken() {
    ERC20Factory = await ethers.getContractFactory("MockERC20");
    FaucetFactory = await ethers.getContractFactory("Faucet");

    token1 = await ERC20Factory.deploy("USDC", "USDC", tokenDecimals);
    token2 = await ERC20Factory.deploy("USDT", "USDT", tokenDecimals);

    faucet = await FaucetFactory.deploy();

    console.log("Deployer address: " + wallet.address);
    console.log("Faucet address: " + faucet.address);
    console.log("Token address: " + token1.address);

    console.log(await token1.balanceOf(faucet.address));
  }

  it("Withdraw fails if amount is more than limit", async () => {
    const owner = "0x9Bde0836d9F7386446a455684571e7694F9d909C";

    console.log(await token1.balanceOf(faucet.address));
    await expect(
      faucet.connect(wallet).withdrawToken(token1.address, owner, 300)
    ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
  });

  it("Withdwaw tokens fail if balance lower than limit", async () => {
    console.log(await token1.balanceOf(faucet.address));
    await expect(
      faucet.connect(wallet).send(token2.address)
    ).to.be.revertedWith("FaucetError: Empty");
    await expect(
      faucet.connect(wallet).send(token1.address)
    ).to.be.revertedWith("FaucetError: Empty");
  });

  it("Withdraw works fine for owner if enough tokens are on faucet", async () => {
    const owner = "0x9Bde0836d9F7386446a455684571e7694F9d909C";

    await token1.mint(
      faucet.address,
      Big(299).mul(Math.pow(10, tokenDecimals)).toFixed()
    );

    await token2.mint(
      faucet.address,
      Big(299).mul(Math.pow(10, tokenDecimals)).toFixed()
    );
    console.log(await token1.balanceOf(faucet.address));
    await faucet.connect(wallet).withdrawToken(token1.address, owner, 300);
    await faucet.connect(wallet).withdrawToken(token2.address, owner, 300);
  });

  it("Withdraw fails if interval less then difference between current time stamp and call`s timestamp", async () => {
    await token1.mint(
      faucet.address,
      Big(600).mul(Math.pow(10, tokenDecimals)).toFixed()
    );

    console.log(await token1.balanceOf(faucet.address));

    await faucet.connect(wallet).send(token1.address);

    console.log(await token1.balanceOf(faucet.address));

    expect(
      await faucet.connect(wallet).canIWithdraw(wallet.address, token1.address)
    ).to.equal(false);
  });

  it("Withdraw works fine for caller if enough tokens are on faucet", async () => {
    console.log(
      "Timestamp for token1 is",
      await faucet.lastTimestampList(wallet.address, token1.address)
    );

    console.log(
      "Timestamp for token2 is",
      await faucet.lastTimestampList(wallet.address, token2.address)
    );

    await faucet.connect(wallet).send(token2.address);
  });
});
