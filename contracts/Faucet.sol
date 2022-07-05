// SPDX-License-Identifier: MIT

pragma solidity >= 0.8.14;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { InitializableOwnable } from "./InitializableOwnable.sol";

contract Faucet is InitializableOwnable  {
     
    mapping(address => uint) public lastTimestampList;
    uint public interval = 86400;
    ERC20 token;

    constructor( ) {
        initOwner(msg.sender);
    }

    // Sends the amount of token to the caller.
    function send() external {
        uint amount = 200 * token.decimals();
        
        require(token.balanceOf(address(this)) > amount,"FaucetError: Empty");
        require(block.timestamp - lastTimestampList[msg.sender] > interval, "FaucetError: Try again later");
    
        lastTimestampList[msg.sender] = block.timestamp;
        
        token.transfer(msg.sender, amount);
    }  

    // Updates the underlying token address
    function setTokenAddress(address _tokenAddr) external onlyOwner {
        token = ERC20(_tokenAddr);
    } 

     // Updates the interval
    function setFaucetInterval(uint256 _amount) external onlyOwner {
        interval = _amount;
    }  

    // Allows the owner to withdraw tokens from the contract.
    function withdrawTokens(address _receiver, uint256 _amount) external onlyOwner {
        require(token.balanceOf(address(this)) >= _amount,"FaucetError: Insufficient funds");
        token.transfer(_receiver,_amount);
    }    
}