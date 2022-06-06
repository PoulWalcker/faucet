// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import { InitializableOwnable } from "./InitializableOwnable.sol";
import { ERC721A } from "erc721a/contracts/ERC721A.sol";

contract GTONMemorableNFT is ERC721A, InitializableOwnable {

  mapping (uint256 => string) private _tokenURIs;
  
  constructor() ERC721A("GTON Memorable NFT", "GTONMEM") {
    initOwner(msg.sender);
  }

  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
      if (!_exists(tokenId)) revert URIQueryForNonexistentToken();

      return string(
          abi.encodePacked(
            'https://nft.gton.capital/memorable/metadata/1.json'
          )
      );
  }

  function mint(address to, uint256 quantity) external onlyAdminOrOwner {
    _mint(to, quantity);
  }
}
