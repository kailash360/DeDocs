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
                return { success: false, message: err.emessage }
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
        make_request: async(_department, _subject, _description, _ipfs_hash, _request_category) => {
            try {
                const now = Date.now()
                const request = await state.DeDocs.methods.make_request(_department, _subject, _description, _ipfs_hash, _request_category, now.toString()).send({
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
                    if (request.department == department) requests.push(request)
                }
                return { success: true, data: { requests } }
            } catch (err) {
                console.log('Error in getting admin requests: ', err)
                return { success: false, message: err.message }
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

    return ( <
        ContractContext.Provider value = {
            {...state, ... {
                    updateContract,
                    getUpdatedContracts,
                    Services,
                }
            }
        } > { props.children } <
        /ContractContext.Provider>
    )
}

export default ContractContextProvider