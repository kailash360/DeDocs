import Constants from '../Constants'
import Web3 from 'web3'
const DEDOCS_CONTRACT_BUILD = require('../build/DeDocs.json')
const NETWORK_ID = process.env.REACT_APP_ENV == 'local' ? process.env.REACT_APP_LOCAL_NETWORK_ID : process.env.REACT_APP_TESTNET_NETWORK_ID

export const web3 = new Web3(Constants.RPC_PROVIDER)

const GetContract = () => {
    const CONTRACT_ADDRESS = DEDOCS_CONTRACT_BUILD.networks[NETWORK_ID].address

    const DeDocs = new web3.eth.Contract(DEDOCS_CONTRACT_BUILD.abi, CONTRACT_ADDRESS)
    return { success: true, data: { DeDocs } }
}

export default GetContract