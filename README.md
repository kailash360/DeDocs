# DeDocs

**DeDocs** is a decentralized document management system that keeps the tracks of the documents using the on-chain history and keeps the documents in encrypted form which provides safety and security. 

![image](https://user-images.githubusercontent.com/75155230/182626625-ad6eef26-c26a-48bc-a672-f1af85a636ac.png)


## How it works

DeDocs allows the uers to request for the adminstrators of some selected departments to issue a new document or modify the existing documents. All of the actions are performed on-chain. This keeps the integrity of the entire process and prevents any third party influence. Users acan also manage their documents in the application by downloading it and so on.

The basic workflow is
- User registers on the application and makes a request of the concerned to issue a new document or modify an existing one. The user needs to provide a subject and description of the request he/she is making. Supporting documents can also be attached as a part of the request. The request is then added to the blockchain.
- Admin has to register on the applciation from his/her corresponding department. All the requests will now be accessible to the admin based on the department of the requests. 
- Admin can verify the documents manually and take a verdict on the request. If there is any mistake in the request or supporting documents, the request is rejected with remarks from the admin. Otherwise, the admin goes on to issue or modify the document, and upload the correct one on the platform.
- When the document is issued, the user can access it and see the content in it. The history of the document is also visible i.e the time when it was issued, when it was modified.

## Tech Stack

#### Frontend

- ReactJS + Material UI
- Web3.js

#### Backend
- Solidity
- IPFS
- Truffle



