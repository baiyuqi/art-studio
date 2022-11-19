// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract MyErc721 is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address feeCollector;
    uint fee = 1 gwei;

    constructor(address fc) ERC721("GameItem", "ITM") {
        feeCollector = fc;
    }
    function withdraw(address to)external {
        require(msg.sender == feeCollector, "no permission!");
        (bool suc, bytes memory  data) = to.call{value:address(this).balance}("");
        require(suc, "withdraw failed");
    }

    function mint(address player, string memory tokenURI)
        public payable
        returns (uint256)
    {
        require(msg.value >= fee, "please privide fee!");

        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);

        _tokenIds.increment();
        return newItemId;
    }


}