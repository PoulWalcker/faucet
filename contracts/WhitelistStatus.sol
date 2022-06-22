// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WhitelistStatus is Ownable {

    bytes32 public merkleRoot;

    mapping(address => bool) public whitelistClaimed;

    function setMerkleRoot(bytes32 root) onlyOwner public {
        merkleRoot = root;
    }

    function amIWhitelisted(bytes32[] calldata _merkleProof) public view returns (bool whitelisted) {
        // Check if claim already happened
        require(!whitelistClaimed[msg.sender], "Address already claimed" );
        // Create leaf node with user's address
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        // Check if proof is valid
        require(MerkleProof.verify(_merkleProof, merkleRoot, leaf), "Invalid Merkle Proof");

        return true;
    }

    function whitelistMint(bytes32[] calldata _merkleProof) public {
        require(amIWhitelisted(_merkleProof));

        whitelistClaimed[msg.sender] = true;
    }
}
