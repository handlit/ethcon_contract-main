// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./imports/ERC1155.sol";

contract CardSocialToken is ERC1155 {
    event InitToken(uint256 indexed tokenId);
    event Mint(uint256 indexed tokenId);
    event Burn(uint256 indexed tokenId);

    address public owner;

    uint256 public tokenId;
    mapping(uint256 => address) private _tokenOwners;
    mapping(address => uint256[]) private _ownedTokens;
    mapping(uint256 => string) private _tokenURIs;

    constructor() {
        tokenId = 0;
        owner = msg.sender;
    }

    function isOwner() private view {
        require(owner == msg.sender, "OnlyOwner");
    }

    // External Or Public -----------------------------------------------------------
    function initMint(address _to, string memory _uri) external {
        isOwner();
        uint256 newId = ++tokenId;

        _setTokenURI(newId, _uri);
        _tokenOwners[newId] = _to;
        _ownedTokens[_to].push(newId);

        emit InitToken(newId);
    }
    function mint(uint256 _tokenId, address _to) external {
        isOwner();

        _mint(_to, _tokenId, "");

        emit Mint(_tokenId);
    }

    function burn(uint256 _tokenId, uint256 _amount) external {
        require(
            balanceOf(msg.sender, _tokenId) >= _amount,
            "ERC1155: caller is not owner nor approved"
        );
        _burn(msg.sender, _tokenId, _amount);
        _tokenOwners[_tokenId] = address(0);
        delete _tokenURIs[_tokenId];
        delete _ownedTokens[msg.sender][_tokenId];

        emit Burn(_tokenId);
    }

    // Internal Or Private -----------------------------------------------------------
    function _setTokenURI(uint256 _tokenId, string memory _tokenURI) private {
        _tokenURIs[_tokenId] = _tokenURI;
    }

    // View -----------------------------------------------------------
    function uri(
        uint256 _tokenId
    ) public view virtual override returns (string memory) {
        return _tokenURIs[_tokenId];
    }

    function ownerOf(uint256 _tokenId) external view returns (address) {
        return _tokenOwners[_tokenId];
    }
    function tokenOfOwnerByIndex(
        address _owner,
        uint256 _index
    ) external view returns (uint256) {
        return _ownedTokens[_owner][_index];
    }

    function tokenOfOwner(address _owner) external view returns (uint256[] memory) {
        return _ownedTokens[_owner];
    }
}
