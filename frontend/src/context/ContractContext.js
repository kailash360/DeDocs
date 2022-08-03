import Web3 from 'web3'
import { useEffect } from 'react'
import { createContext, useState, useContext } from 'react'
import { AuthContext } from './AuthContext'
import Connect from '../utils/Connect'
import GetContract from '../utils/GetContract'
import Constants from '../Constants'

export const ContractContext = createContext()

function ContractContextProvider(props) {

    const { account, updateAuth, authenticate, department } = useContext(AuthContext)

    const [state, setState] = useState({
        DeDocs: null
    })

    const getUpdatedContracts = () => state

    const updateContract = (data) => {
        setState({...state, ...data })
    }

    const Services = {
        get_role: async(_account) => {
            try {
                const registeredResponse = await state.DeDocs.methods.get_role(_account).call()
                console.log({ registeredResponse })
                return { success: true, data: { role: Constants.ROLES[registeredResponse] } }
            } catch (err) {
                console.log('Error in getting the role ', err)
                return { success: false, message: err.message }
            }
        },
        register_user: async(_name, _dob, _password) => {
            try {
                const now = Date.now();
                const userRegistrationResponse = await state.DeDocs.methods.register_user(_name, _dob, _password, now.toString()).send({
                    from: account,
                    gas: Constants.GAS
                })
                return { success: true, data: { userRegistrationResponse } }
            } catch (err) {
                console.log('Error in registering the user ', err)
                return { success: false, message: err.message }
            }
        },
        register_admin: async(_name, _department) => {
            try {
                const adminRegistrationResponse = await state.DeDocs.methods.register_admin(_name, _department).send({
                    from: account,
                    gas: Constants.GAS
                })
                return { success: true, data: { adminRegistrationResponse } }
            } catch (err) {
                console.log('Error in registering as Admin: ', err)
                return { success: false, message: err.message }
            }

        },
        get_user_details: async(_account) => {
            try {
                const userDetailsResponse = await state.DeDocs.methods.get_user_details(_account).call()

                if (!userDetailsResponse.name) throw new Error('User is not registered')

                return { success: true, data: { user: userDetailsResponse } }
            } catch (err) {
                console.log('Error in getting the user details: ', err)
                return { success: false, message: err }
            }
        },
        get_admin_details: async() => {
            try {
                const adminDetailsResponse = await state.DeDocs.methods.get_admin_details().call({
                    from: account
                })
                console.log(adminDetailsResponse)
                if (!adminDetailsResponse.name) throw new Error('Admin is not registered')

                return { success: true, data: { admin: adminDetailsResponse } }
            } catch (err) {
                console.log('Error in getting the admin details: ', err)
                return { success: false, message: err }
            }
        },
        make_request: async(_department, _subject, _description, _ipfs_hash, _request_category, _document_id) => {
            try {
                const now = Date.now()
                const request = await state.DeDocs.methods.make_request(_department, _subject, _description, _ipfs_hash, _request_category, now.toString(),_document_id).send({
                    from: account,
                    gas: Constants.GAS
                })

                return { success: true, data: { request } }
            } catch (err) {
                console.log('Error in making request: ', err)
                return { success: false, message: err.message }
            }
        },
        get_requests: async() => {
            try {
                let requests = []

                if (!state.DeDocs) return { success: true, data: { requests } }

                const allRequests = await state.DeDocs.methods.get_all_requests().call()

                for (let request of allRequests) {
                    if (request.user_id.toLowerCase() == account.toLowerCase()) requests.push(request)
                }
                return { success: true, data: { requests } }

            } catch (err) {
                console.log('Error in getting user requests: ', err)
                return { success: false, message: err.message }
            }
        },
        get_admin_requests: async() => {
            console.log({department})
            try {
                let requests = []

                if (!state.DeDocs) return { success: true, data: { requests } }

                const allRequests = await state.DeDocs.methods.get_all_requests().call({from: account})

                console.log({allRequests})
                for (let request of allRequests) {
                    if (request.department == department) {
                        
                        const userResponse = await Services.get_user_details(request.user_id)
                        if(!userResponse.success) throw userResponse.message

                        let modifiedRequest = {...request,...{user: userResponse.data.user}}
                        requests.push(modifiedRequest)
                    }
                }
                return { success: true, data: { requests } }
            } catch (err) {
                console.log('Error in getting admin requests: ', err)
                return { success: false, message: err.message }
            }
        },
        get_request: async(_id)=>{
            try{
                if(!state.DeDocs) return {success: true, data:{}}

                const request = await state.DeDocs.methods.all_requests(Number(_id)).call()
                const userResponse = await Services.get_user_details(request.user_id)
                
                return {success: true, data:{request, user: userResponse.data.user}}

            }catch(err){
                console.log('Error in getting request: ', err)
                return {success: false, message: err.message}
            }
        },
        reject_request: async(_id, _remarks)=>{
            try{
                const rejectResponse = await state.DeDocs.methods.reject_request(Number(_id), _remarks).send({
                    from: account,
                    gas: Constants.GAS
                })
                return {success: true, data: {rejectResponse}}
            }catch(err){
                console.log('Error in rejecting the request: ', err)
                return {success: false, message: err.message}
            }
        },
        approve_request: async(_id)=>{
            try{
                const approveResponse = await state.DeDocs.methods.approve_request(Number(_id)).send({
                    from: account,
                    gas: Constants.GAS
                })
                return {success: true, data: {approveResponse}}
            }catch(err){
                console.log('Error in approving the request: ', err)
                return {success: false, message: err.message}
            }
        },
        issue_document: async(_request_id, _user_id, _name, _uid, _ipfs_hash )=>{
            try{
                const date = Date.now()
                const issueResponse = await state.DeDocs.methods.issue_document(_request_id, _user_id, _name, _uid, _ipfs_hash, date.toString()).send({
                    from: account,
                    gas: Constants.GAS
                })
                return {success: true, data:{issueResponse}}
            }catch(err){
                console.log('Error in issuing document: ', err)
                return {success: false, message: err.message}
            }
        },
        modify_document: async(_document_id,_ipfs_hash,_message)=>{
            try{
                const date = Date.now()
                const modifyResponse = await state.DeDocs.methods.modify_document(Number(_document_id), _ipfs_hash, date.toString(), _message).send({
                    from: account,
                    gas: Constants.GAS
                })
                return {success: true, data:{modifyResponse}}
            }catch(err){
                console.log('Error in issuing document: ', err)
                return {success: false, message: err.message}
            }
        },
        get_my_documents: async()=> {
            try{
                if(!state.DeDocs) return { success: true, data: {documents:[]}}

                let documents = []
                const myDocumentsIds = await state.DeDocs.methods.get_user_documents().call({
                    from: account
                });
                
                for(let id of myDocumentsIds){
                    const document = await state.DeDocs.methods.all_documents(Number(id) - 1).call()
                    documents.push(document)
                }

                return {success: true, data: {documents}}
            }catch(err){
                console.log('Error in getting documents: ', err)
                return {success: false, message: err.message}
            }
        },
        get_document: async(_id)=>{
            try{
                if(!state.DeDocs) return {success: true, data: {}}

                const document = await state.DeDocs.methods.all_documents(Number(_id)-1).call()
                return {success: true, data: {document}}
            }catch(err){
                console.log('Error in getting document: ', err)
                return {success: false, message: err.message}
            }
        },
        get_history: async(_id)=>{
            try{
                if(!state.DeDocs) return {success: true, data: {}}

                const allEvents = await state.DeDocs.getPastEvents('allEvents',{
                    fromBlock: 0,
                    toBlock: 'latest'
                })
                console.log({allEvents})

                const events = allEvents.filter(event => event.returnValues.document_id == _id.toString())
                return {success: true, data:{events}}
                
            }catch(err){
                console.log('Error in getting past events: ',err)
                return {success: false, message: err.message}
            }

        },
        get_admin_documents: async(_department_id)=>{
            try{
                let documents = []
                if(!state.DeDocs) return {success: true, data: {documents}}

                const allDocuments = await state.DeDocs.methods.get_all_documents().call({
                    from: account
                })

                for(let _document of allDocuments){
                    if(_document.department == _department_id) documents.push(_document)
                }

                return {success: true, data:{documents}}

            }catch (err) {
                console.log('Error in getting documents for department: ',err)
                return {success: false, message: err.message}
            }
        },
        get_dashboard_stats: async(_department_id)=>{
            try{    
                let stats = {}
                if(!state.DeDocs) return {success: true, data: {stats}}
                const total_users = await state.DeDocs.methods.total_users().call()
                const documentsResponse = await Services.get_admin_documents(_department_id)
                const total_requests = await state.DeDocs.methods.total_requests().call()

                stats = {
                    total_users, 
                    total_documents: documentsResponse.data.documents.length, 
                    total_requests
                }

                return {success: true, data: {stats}}

            }catch(err){
                console.log('Error in gettinf dashboard stats: ',err)
                return {success: false, message: err.message}
            }
        }

    }



    const getAccount = async() => {
        //Get the info from the contracts
        const contractResult = GetContract()
        updateContract(contractResult.data)

        // Get the account of the user
        const accountResponse = await Connect()
        updateAuth({ account: accountResponse.data.account, })
    }

    const redirect = async() => {
        if (!account) return

        const userResponse = await Services.get_role(account)
        if (userResponse.success) {
            authenticate(account)
            
            //get department is role is admin
            if(userResponse.data.role === Constants.ROLES[1]){
                const adminDetailsResponse = await Services.get_admin_details({from: account})
                console.log({adminDetailsResponse})
                updateAuth({role: userResponse.data.role, department: adminDetailsResponse.data.admin.department})
            }else{
                updateAuth({ role: userResponse.data.role })
            }

            if (userResponse.data.role === Constants.ROLES[0] && window.location.pathname !== '/') window.location.href = '/'
            if (userResponse.data.role === Constants.ROLES[1] && window.location.pathname === '/') window.location.href = '/admin/dashboard'
            if (userResponse.data.role === Constants.ROLES[2] && window.location.pathname === '/') window.location.href = '/user/dashboard'
        } else {
            if (window.location.pathname !== "/") window.location.href = "/"
        }
    }

    useEffect(() => {
        getAccount()
    }, [])

    useEffect(() => {
        redirect()
    }, [account])

    return ( <ContractContext.Provider value = {
            {...state, ... {
                    updateContract,
                    getUpdatedContracts,
                    Services,
                }
            }
        } > 
        { props.children } 
        </ContractContext.Provider>
    )
}

export default ContractContextProvider