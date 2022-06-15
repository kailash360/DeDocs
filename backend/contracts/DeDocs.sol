// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DeDocs {

  enum ROLE{
    ADMIN,
    USER
  }

  enum DEPARTMENT{
    UNIQUE_IDENTIFICATION_AUTHORITY_OF_INDIA,
    INCOME_TAX,
    MUNICIPAL_CORPORATION,
    STATE_TRANSPORT_DEPARTMENT
  }

  enum REQUEST_TYPE{
    ISSUE,
    UPDATE,
    RECTIFY
  }

  enum REQUEST_STATUS{
    PENDING,
    SUCCESS
  }

  struct Admin{
    address id;
    string name;
  }
  
  struct User{
    address id;
    string name;
    string dob;
    string password;    
  }

  struct Request{
    uint id;
    address user_id;
    string subject;
    string description;
    string ipfs_hash;
    DEPARTMENT department;
    REQUEST_TYPE request_type;
    REQUEST_STATUS request_status;
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
  event Dcoument_modified(uint document_id, Document old_document, Document new_document, string message);

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

  function issue_document(address _userAddress, string memory _name, string memory _ipfs_hash, string memory _issued_on) is_admin public payable returns(Document memory){
    
    //check if user is registered
    require(users[_userAddress].id != address(0x0),"User is not registered");

    //create a new document instance
    Document memory _document;
    _document.id = all_documents.length;
    _document.name = _name;
    _document.ipfs_hash = _ipfs_hash;
    _document.issued_on = _issued_on;
    _document.user = _userAddress;
    _document.admin = msg.sender;

    //insert the document to the records
    all_documents.push(_document);
    documents[_userAddress].push(_document.id);

    emit Document_issued(_userAddress, msg.sender, _document.id);

    return _document;
  }

  function get_document (uint _document_id) is_existent(_document_id) is_allowed(_document_id) public view returns (Document memory){

    Document memory _document = all_documents[_document_id];
    return _document;

  }

  function modify_document(uint _document_id, Document memory _new_document, string memory _last_updated, string memory _message) is_existent(_document_id) is_admin public payable returns(Document memory){
    
    //Get the current version of the document
    Document memory _old_document = all_documents[_document_id];

    //update the document
    _new_document.last_updated = _last_updated;
    all_documents[_document_id] = _new_document;

    emit Dcoument_modified(_document_id, _old_document, _new_document, _message);

    return _new_document;
  }

}
