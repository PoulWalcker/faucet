// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WhitelistStatus is Ownable {

    bytes32 public merkleRoot;
    
    mapping(address => bool) public whitelistClaimed;


    function setMerkleRoot(bytes32 root) onlyOwner public {
        merkleRoot = root;
    }


    function whitelistMint(bytes32[] calldata _merkleProof) public {
        // MAKE SURE ADDRESS NOT CLAIMED
        require(!whitelistClaimed[msg.sender], "Address already claimed" );
        // CREATE LEAF NODE USING ADDRESS
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        // Check for an invalid proof
        require(MerkleProof.verify(_merkleProof, merkleRoot, leaf), "Invalid Merkle Proof.");

        whitelistClaimed[msg.sender] = true;
    }   
}
