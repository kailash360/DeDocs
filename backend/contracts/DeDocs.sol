// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DeDocs {

  enum ROLE{
    NOT_REGISTERED,
    ADMIN,
    USER
  }

  enum DEPARTMENT{
    UNIQUE_IDENTIFICATION_AUTHORITY_OF_INDIA,
    INCOME_TAX,
    MUNICIPAL_CORPORATION,
    STATE_TRANSPORT_DEPARTMENT
  }

  enum REQUEST_CATEGORY{
    ISSUE,
    UPDATE,
    RECTIFY
  }

  enum REQUEST_STATUS{
    PENDING,
    SUCCESS,
    REJECTED
  }

  struct Admin{
    address id;
    string name;
    DEPARTMENT department;
  }
  
  struct User{
    address id;
    string name;
    string dob;
    string password;    
    string joined;
    uint total_requests;
  }

  struct Request{
    uint id;
    address user_id;
    string subject;
    string description;
    string ipfs_hash;
    string date;
    DEPARTMENT department;
    REQUEST_CATEGORY category;
    REQUEST_STATUS status;
    uint document_id;
    string remarks;
  }

  struct Document{
    uint id;
    uint request_id;
    string name;
    string uid;
    string ipfs_hash;
    string issued_on;
    string last_updated;
    address admin;
    address user;
    DEPARTMENT department;
  }

  event DeDocs_deployed(string message);
  event Request_made(address user, uint request_id, DEPARTMENT department);
  event Document_issued(address user, address admin, uint document_id, string timestamp);
  event Document_modified(uint document_id, Document document, string message, string timestamp);

  uint public total_requests = 0;
  uint public total_users = 0;

  Request[] public all_requests;

  Document[] public all_documents; //array to store all the documents of the system
  mapping(address => User) public users; // mapping of user address to user data 
  mapping(address => Admin) public admins; //mapping of admin address to admin data
  mapping(address => uint256[]) public requests; //mapping of the user addess to all the requests made by that address
  mapping(address => uint256[]) public documents; // mapping of the user address to their documents
  

  modifier is_admin(){
    require(admins[msg.sender].id != address(0x0),"Only admins can perform this action");
    _;
  }

  modifier is_existent(uint _document_id){
    require(_document_id <= all_documents.length, "Document does not exist");
    _;
  }

  modifier is_allowed(uint _document_id){
    require(admins[msg.sender].id != address(0x0) || all_documents[_document_id].user == msg.sender, "You are not allowed to perform this action");
    _;
  }

  constructor()  {
      emit DeDocs_deployed("Contract deployed successfully");
  }

  function register_user(string memory _name, string memory _dob, string memory _password, string memory _joined) payable public returns (User memory){

    require(users[msg.sender].id == address(0x0),"This address is already registered");

    User memory _user;
    _user.id = msg.sender;
    _user.name = _name;
    _user.dob = _dob;
    _user.password = _password;
    _user.joined = _joined;
    _user.total_requests = 0;

    users[msg.sender] = _user;

    total_users++;
    
    return _user;
  }

  function register_admin(string memory _name, DEPARTMENT _department) payable public returns (Admin memory){

    require(admins[msg.sender].id == address(0x0),"This address is already registered");

    Admin memory _admin;
    _admin.id = msg.sender;
    _admin.name = _name;
    _admin.department = _department;

    admins[msg.sender] = _admin;

    return _admin;
  }

  function get_departments() public pure returns(string[4] memory departments){
    string[4] memory _departments = ["UNIQUE IDENTIFICATION AUTHORITY OF INDIA","INCOME TAX","MUNICIPAL CORPORATION","STATE TRANSPORTD EPARTMENT"];
    return _departments;
  }

  function get_role(address _address) public view returns(ROLE role){

    if(users[_address].id != address(0x0)) return ROLE.USER;
    if(admins[_address].id != address(0x0)) return ROLE.ADMIN;

    return ROLE.NOT_REGISTERED;

  }

  function get_all_requests() public view returns(Request[] memory){
    return all_requests;
  }

  function get_all_documents() public view returns(Document[] memory){
    return all_documents;
  }

  function verify_document(uint _document_id, address _address) public view returns(bool, string memory){

    // Check if document exists
    if(_document_id >= all_documents.length) return (false, "Document does not exist");

    //Check if document is by correct user
    if(all_documents[_document_id].user == _address) return (true, "Document verified succesfully           ");
    else return (false,"Document does not belong to this user");


  }

  /***********************************  USER FUNCTIONS  *********************************/

  function get_user_details(address _address) public view returns(User memory user){
    User memory _user = users[_address];
    return _user;
  }

  function get_user_requests() public view returns(uint256[] memory _requests){

    uint256[] memory _my_requests = requests[msg.sender];
    return _my_requests;
    
  }

  function get_user_documents() public view returns(uint256[] memory _documents){

    uint256[] memory _my_documents = documents[msg.sender];
    return _my_documents;
    
  }

  function make_request(DEPARTMENT _department,  string memory _subject, string memory _description, string memory _ipfs_hash, REQUEST_CATEGORY _request_category, string memory _date, uint _document_id) public payable returns(Request memory){

    Request memory request;

    request.id = total_requests;
    request.user_id = msg.sender;
    request.subject = _subject;
    request.description = _description;
    request.ipfs_hash = _ipfs_hash;
    request.date = _date;
    request.department = _department;
    request.category = _request_category;
    request.status = REQUEST_STATUS.PENDING;
    request.document_id = _document_id;

    all_requests.push(request);
    total_requests += 1;

    emit Request_made(msg.sender, request.id, _department);

    return request;
  }


  /********************************ADMIN FUNCTIONS********************************/

  function get_admin_details() public view returns(Admin memory admin){
    Admin memory _admin = admins[msg.sender];
    return _admin;
  }

  function get_document (uint _document_id) is_existent(_document_id) is_allowed(_document_id) public view returns (Document memory){
    Document memory _document = all_documents[_document_id];
    return _document;
  }

  function reject_request(uint _request_id, string memory _remarks) is_admin public payable{
    Request memory _request = all_requests[_request_id];
    _request.status = REQUEST_STATUS.REJECTED;
    _request.remarks = _remarks;
    all_requests[_request_id] = _request;
  }

  function approve_request(uint _request_id) is_admin public payable{
    Request memory _request = all_requests[_request_id];
    _request.status = REQUEST_STATUS.SUCCESS;
    all_requests[_request_id] = _request;
  }

  function issue_document(uint _request_id, address _userAddress, string memory _name, string memory _uid, string memory _ipfs_hash, string memory _issued_on) is_admin public payable returns(Document memory){
    
    //check if user is registered
    require(users[_userAddress].id != address(0x0),"User is not registered");

    //check if no document is already issued for this request
    Request memory _request = all_requests[_request_id];
    require(_request.document_id == 0,"Document has already been issued for this request");

    //create a new document instance
    Document memory _document;
    _document.id = all_documents.length + 1;
    _document.name = _name;
    _document.uid = _uid;
    _document.ipfs_hash = _ipfs_hash;
    _document.issued_on = _issued_on;
    _document.user = _userAddress;
    _document.admin = msg.sender;
    _document.department = _request.department;

    //insert the document to the records
    all_documents.push(_document);
    documents[_userAddress].push(_document.id);

    //update the request
    _request.document_id = _document.id;
    all_requests[_request_id] = _request;

    emit Document_issued(_userAddress, msg.sender, _document.id,_issued_on);

    return _document;
  }


  function modify_document(uint _document_id, string memory _new_hash, string memory _last_updated, string memory _message) is_existent(_document_id) is_admin public payable returns(Document memory){
    
    //Get the current version of the document
    Document memory _document = all_documents[_document_id - 1];

    //update the document
    _document.last_updated = _last_updated;
    _document.ipfs_hash = _new_hash;
    all_documents[_document_id - 1] = _document;

    emit Document_modified(_document_id, _document, _message,_last_updated);

    return _document;
  }

}
