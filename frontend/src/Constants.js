const Constants = {
    RPC_PROVIDER: 'http://localhost:7545',
    GAS: 3000000,
    Departments: {
        UIDAI: {
            name: 'Unique Identification Authority of India',
            logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Aadhaar_Logo.svg/375px-Aadhaar_Logo.svg.png'
        },
        IT: {
            name: 'Income Tax Department',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Logo_of_Income_Tax_Department_India.png?20190714131408'
        },
        State_Government: {
            name: 'State Government',
            logo: 'http://www.pngimagesfree.com/LOGO/M/MP-Govt/MP-Govt-Logo-PNG.png'
        },
        Municipal_Corporation: {
            name: 'Municipal Corporation',
            logo: 'https://gwaliormunicipalcorporation.org/wp-content/uploads/2020/01/GMC-Logo.png'
        }
    },
    ROLES: {
        '0': 'Not Registered',
        '1': 'Admin',
        '2': 'User'
    }
}

export default Constants