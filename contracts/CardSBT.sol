// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./imports/ERC721Enumerable.sol";

contract CardSBT is ERC721Enumerable {
    event Mint(uint256 indexed tokenId);
    event Burn(uint256 indexed tokenId);

    address public owner;

    uint256 private _tokenId;
    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => uint256) private _socialTokenIds;

    constructor() ERC721("CardSBT", "CBT") {
        _tokenId = 0;
        owner = msg.sender;
    }

    function isOwner() private view {
        require(owner == msg.sender, "OnlyOwner");
    }

    // External Or Public -----------------------------------------------------------
    function mint(address _to, string memory _uri) external {
        isOwner();
        uint256 newId = ++_tokenId;

        _setTokenURI(newId, _uri);
        _safeMint(_to, newId);

        emit Mint(newId);
    }

    function burn(uint256 tokenId) external {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721Burnable: caller is not owner nor approved"
        );
        _burn(tokenId);

        emit Burn(tokenId);
    }

    // Internal Or Private -----------------------------------------------------------
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) private {
        _tokenURIs[tokenId] = _tokenURI;
    }

    // View -----------------------------------------------------------
    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return _tokenURIs[tokenId];
    }
}
