// SPDX-License-Identifier: MIT

pragma solidity >= 0.8.15;

import { InitializableOwnable } from "./InitializableOwnable.sol";

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function decimals() external view returns (uint8);
}

contract Faucet is InitializableOwnable  {
     
    mapping(address => mapping(IERC20  => uint)) public lastTimestampList;
    uint public interval = 86400;

    constructor() {
        initOwner(msg.sender);
    }

    // Sends the amount of token to the caller.
    function send(IERC20 _token) external {
        uint amount = 200 * (10 ** _token.decimals());
        
        require(_token.balanceOf(address(this)) > amount, "FaucetError: Empty");
        require(block.timestamp - lastTimestampList[msg.sender][_token] > interval, "FaucetError: Try again later");
    
        lastTimestampList[msg.sender][_token] = block.timestamp;
        
        require(_token.transfer(msg.sender, amount));
    }  

    // Check withdraw status for caller.
    function canIWithdraw(address _user, IERC20 _token) external view returns(bool) {
        uint timeStamp = block.timestamp;
        return timeStamp - lastTimestampList[_user][_token] > interval;
    }

     // Updates the interval
    function setFaucetInterval(uint256 _interval) external onlyOwner {
        interval = _interval;
    }  

    // Allows the owner to withdraw tokens from the contract.
    function withdrawToken(IERC20 tokenToWithdraw, address to, uint amount) external onlyOwner {
        require(tokenToWithdraw.transfer(to, amount));
    }
}
