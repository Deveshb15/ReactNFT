// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CounterApp is ERC721URIStorage {

    address public appOwner;

    constructor(string memory _tokenURI) ERC721("CounterApp", "CAS") {
        appOwner = msg.sender;
        mint(_tokenURI);
    }

    function mint(string memory _tokenURI) private returns(uint256) {
        uint256 tokenId = 1;
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);

        return tokenId;
    }
}