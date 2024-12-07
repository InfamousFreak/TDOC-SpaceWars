// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract SpaceWars {

    struct GameToken {
        uint256 id;
    }

    struct Player {
        address playerAddress;
        string playerName;
    }

    event NewPlayer(address indexed owner, string name);

    mapping(address => uint256) public playerInfo; 
    mapping(address => GameToken) public playerTokenInfo; 

    Player[] public players;

    function isPlayer(address addr) public view returns (bool) {
        return playerInfo[addr] != 0 || (players.length > 0 && players[0].playerAddress == addr);
    }

    function getPlayer(address addr) public view returns (Player memory) {
        require(isPlayer(addr), "Player doesn't exist!");
        return players[playerInfo[addr]];
    }

    function _createRandomNum(uint256 _mod, address _sender) internal view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.timestamp, _sender))) % _mod;
    }

    function _createGameToken(string memory _name) internal returns (GameToken memory) {
        
        uint256 randId = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 100;
        randId = randId % 6;
        if (randId == 0) {
            randId++;
        }

        GameToken memory newGameToken = GameToken(randId);
        playerTokenInfo[msg.sender] = newGameToken; 

        return newGameToken;
    }

    function registerPlayer(string memory _name, string memory _gameTokenName) external {
        require(!isPlayer(msg.sender), "Player already registered"); 

        uint256 _id = players.length;
        players.push(Player(msg.sender, _name)); 
        playerInfo[msg.sender] = _id; 

        createRandomGameToken(_gameTokenName);

        emit NewPlayer(msg.sender, _name); 
    }

    function createRandomGameToken(string memory _name) public {
        require(isPlayer(msg.sender), "Please register player first"); 
        _createGameToken(_name);
    }
}