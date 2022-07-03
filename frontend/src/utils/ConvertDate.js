const convertDate = (_date) => {
    const date = new Date(Number(_date))
    return date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) + '\t\t' + date.toLocaleTimeString()
}

export default convertDate