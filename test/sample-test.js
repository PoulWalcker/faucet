const { expect } = require("chai");
const { hre } = require("hardhat");
const { Big } = require("big.js");

describe("NFT", function () {
  // Factories
  let ERC20Factory;
  let FaucetFactory;

  let faucet;
  let token;
  let tokenDecimals = 6;

  const [wallet, denice] = waffle.provider.getWallets();

  before(async () => {
    await deployToken();
  });

  beforeEach(async () => {});

  async function deployToken() {
    ERC20Factory = await ethers.getContractFactory("MockERC20");
    FaucetFactory = await ethers.getContractFactory("Faucet");

    token = await ERC20Factory.deploy("USDC", "USDC", tokenDecimals);
    faucet = await FaucetFactory.deploy(token.address, 20);

    console.log("Deployer address: " + wallet.address);
    console.log("Faucet address: " + faucet.address);
    console.log("Token address: " + token.address);

    console.log(await token.balanceOf(faucet.address));
  }

  it("Withdraw fails if amount is more than limit", async () => {
    const owner = "0x9Bde0836d9F7386446a455684571e7694F9d909C";

    console.log(await token.balanceOf(faucet.address));
    await expect(
      faucet.connect(wallet).withdrawToken(token.address, owner, 300)
    ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
  });

  it("Withdwaw tokens fail if balance lower than limit", async () => {
    console.log(await token.balanceOf(faucet.address));
    await expect(faucet.connect(wallet).getTokens()).to.be.revertedWith(
      "FaucetError: Empty"
    );
  });

  it("Withdraw works fine if enough tokens are on faucet", async () => {
    const owner = "0x9Bde0836d9F7386446a455684571e7694F9d909C";

    await token.mint(
      faucet.address,
      Big(299).mul(Math.pow(10, tokenDecimals)).toFixed()
    );

    console.log(await token.balanceOf(faucet.address));
    await faucet.connect(wallet).withdrawToken(token.address, owner, 300);
  });

  it("Pays the correct amount", async () => {
    await token.mint(
      faucet.address,
      Big(299).mul(Math.pow(10, tokenDecimals)).toFixed()
    );

    console.log(await token.balanceOf(faucet.address));

    const amount = await faucet.paymentAmount()
    await faucet.connect(denice).getTokens();
    expect(await token.balanceOf(denice.address)).to.be.eq(amount * (10 ** tokenDecimals))
  });
});
