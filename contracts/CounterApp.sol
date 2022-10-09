// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CounterApp is ERC721URIStorage {

    // Versions of the app
    using Counters for Counters.Counter;
    Counters.Counter public versions;

    // Owner of the app
    address public appOwner;
    // Builds tokenURI
    mapping(uint256 => string) public builds; 

    // Events
    // Mint event
    event Minted(address indexed from, address indexed to, uint256 version);

    constructor(string memory _tokenURI) ERC721("CounterApp", "CAS") {
        appOwner = msg.sender;
        mint(_tokenURI);
    }

    function mint(string memory _tokenURI) private returns(uint256) {
        versions.increment();
        uint256 tokenId = 1;
        uint256 currentVersion = versions.current();
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);

        builds[currentVersion] = _tokenURI;

        emit Minted(msg.sender, address(this), currentVersion);

        return tokenId;
    }

    function getPrevioudBuild(uint256 versionNumber) public view returns(string memory) {
        return builds[versionNumber];
    }

    function updateApp(string memory _tokenURI) public {
        require(msg.sender == appOwner, "Only owner can update app");
        uint256 currentVersion = versions.current();
        _setTokenURI(1, _tokenURI);
        builds[currentVersion+1] = _tokenURI;
        versions.increment();
    }
}