// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DeDocs {

  enum ROLE{
    ADMIN,
    USER
  }

  struct Admin{
    address id;
    string name;
  }
  
  struct User{
    address id;
    string name;
  }

  struct Document{
    uint id;
    string name;
    string ipfs_hash;
    string issued_on;
    string last_updated;
    address admin;
    address user;
  }

  event DeDocs_deployed(string message);
  event Document_issued(address user, address admin, uint document_id);
  event Dcoument_modified(uint document_id, string message);

  Document[] public all_documents; //array to store all the documents of the system
  mapping(address => User) public users; // mapping of user address to user data 
  mapping(address => Admin) public admins; //mapping of admin address to admin data
  mapping(address => uint256[]) public documents; // mapping of the user address to their documents
  

  modifier is_admin(){
    require(admins[msg.sender].id != address(0x0),"Only admins can perform this action");
    _;
  }

  modifier is_existent(uint _document_id){
    require(_document_id < all_documents.length, "Document does not exist");
    _;
  }

  modifier is_allowed(uint _document_id){
    require(admins[msg.sender].id != address(0x0) || all_documents[_document_id].user == msg.sender, "You are not allowed to perform this action");
    _;
  }

  constructor()  {
      emit DeDocs_deployed("Contract deployed successfully");
  }

  function register_user(string memory _name) payable public returns (User memory){

    require(users[msg.sender].id == address(0x0),"This address is already registered");

    User memory _user;
    _user.id = msg.sender;
    _user.name = _name;

    users[msg.sender] = _user;

    return _user;
  }

  function register_admin(string memory _name) payable public returns (Admin memory){

    require(admins[msg.sender].id == address(0x0),"This address is already registered");

    Admin memory _admin;
    _admin.id = msg.sender;
    _admin.name = _name;

    admins[msg.sender] = _admin;

    return _admin;
  }

}
