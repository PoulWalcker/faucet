// SPDX-License-Identifier: MIT

pragma solidity >= 0.8.15;

import { InitializableOwnable } from "./InitializableOwnable.sol";

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function decimals() external view returns (uint8);
}

contract Faucet is InitializableOwnable  {
     
    mapping(address => uint) public lastTimestampList;
    uint public paymentAmount = 50;
    uint public interval = 86400;
    address public tokenAddress;

    constructor(
        address _tokenAddress,
        uint _paymentAmount
    ) {
        initOwner(msg.sender);
        tokenAddress = _tokenAddress;
        paymentAmount = _paymentAmount;
    }

    // Sends the amount of token to the caller.
    function getTokens() external {
        IERC20 token = IERC20(tokenAddress);
        uint amount = paymentAmount * (10 ** token.decimals());
        
        require(token.balanceOf(address(this)) > amount, "FaucetError: Empty");
        require(block.timestamp - lastTimestampList[msg.sender] > interval, "FaucetError: Try again later");
    
        lastTimestampList[msg.sender] = block.timestamp;
        
        require(token.transfer(msg.sender, amount));
    }  

    // Updates the underlying token address
    function setTokenAddress(address _tokenAddress) external onlyOwner {
        tokenAddress = _tokenAddress;
    } 

    // Updates the interval
    function setFaucetInterval(uint256 _interval) external onlyOwner {
        interval = _interval;
    }

    // Updates the amount paid
    function setAmount(uint256 _amount) external onlyOwner {
        paymentAmount = _amount;
    }

    // Allows the owner to withdraw tokens from the contract.
    function withdrawToken(IERC20 tokenToWithdraw, address to, uint amount) public onlyOwner {
        require(tokenToWithdraw.transfer(to, amount));
    }
}
