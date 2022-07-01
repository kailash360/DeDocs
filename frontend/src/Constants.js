const Constants = {
    RPC_PROVIDER: 'http://localhost:7545',
    GAS: 3000000,
    IPFS_PROVIDER: 'https://ipfs.infura.io/ipfs',
    Departments: {
        '0': {
            id: 'UNIQUE_IDENTIFICATION_AUTHORITY_OF_INDIA',
            name: 'Unique Identification Authority of India',
            logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Aadhaar_Logo.svg/375px-Aadhaar_Logo.svg.png'
        },
        '1': {
            id: 'INCOME_TAX',
            name: 'Income Tax Department',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Logo_of_Income_Tax_Department_India.png?20190714131408'
        },
        '2': {
            id: 'MUNICIPAL_CORPORATION',
            name: 'Municipal Corporation',
            logo: 'https://gwaliormunicipalcorporation.org/wp-content/uploads/2020/01/GMC-Logo.png'
        },
        '3': {
            id: 'STATE_TRANSPORT_DEPARTMENT',
            name: 'State Government',
            logo: 'http://www.pngimagesfree.com/LOGO/M/MP-Govt/MP-Govt-Logo-PNG.png'
        }
    },
    ROLES: {
        '0': 'Not Registered',
        '1': 'Admin',
        '2': 'User'
    },
    REQUEST_CATEGORY: {
        '0': 'Issue',
        '1': 'Update',
        '2': 'Rectify'
    },
    REQUEST_STATUS: {
        '0': 'Pending',
        '1': 'Success',
        '2': 'Rejected'
    }
}

export default Constants