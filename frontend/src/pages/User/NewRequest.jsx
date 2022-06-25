import React from 'react'
import {Grid, Container, InputLabel, TextField, Checkbox, FormControlLabel, Button, CircularProgress} from '@mui/material'
import {LoadingButton} from '@mui/lab'
import Select from 'react-select'
import Constants from '../../Constants'
import '../../static/scss/User/NewRequest.scss'
import Dropzone from '../../components/User/Dropzone'
import { DefaultEditor } from 'react-simple-wysiwyg';
import {ContractContext} from '../../context/ContractContext'
import toast from 'react-hot-toast'

function NewRequest() {

    const departments = Object.keys(Constants.Departments).map( item =>({
        label: Constants.Departments[item].name,
        value: item
        
    }))

    const categories = Object.keys(Constants.REQUEST_CATEGORY).map( item =>({
        label: Constants.REQUEST_CATEGORY[item],
        value: item
    }))

    const {Services} = React.useContext(ContractContext)

    const [department, setDepartment] = React.useState('')
    const [category, setCategory] = React.useState('')
    const [subject, setSubject] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [checked, setChecked] = React.useState(false)

    const [isRequesting, setIsRequesting] = React.useState(false)

    const clearFields = ()=>{
        setDepartment('')
        setCategory('')
        setSubject('')
        setDescription('')
        setChecked(false)
    }

    const handleSubmit = async()=>{
        setIsRequesting(true)
        try{            
            if(!checked){
                toast.error('Please agree to the validity of the information')
                setIsRequesting(false)
                return
            }
            
            const request = await Services.make_request(department,subject, description,'ipfs-here',category)
            console.log({request})
            toast.success('Request made successfully')
            
        }catch(err){
            toast.error(err.message)
        }

        setIsRequesting(false)
    }

  return (
    <Container className='newRequest'>
        <Grid container spacing={3}>
            <Grid item sm={12}>
                <p className='newRequest-heading'>New Request</p>
            </Grid>
            <Grid item sm={12} md={6} className='newRequest-department'>
                <InputLabel required>Department</InputLabel>
                <Select 
                    options={departments} 
                    placeholder='Click here' 
                    className='newRequest-select' 
                    onChange={(dept)=> setDepartment(dept.value)}>
                </Select>
            </Grid>
            <Grid item sm={12} md={6} className='newRequest-category'>
                <InputLabel required>Category</InputLabel>
                <Select 
                    options={categories} 
                    placeholder='Click here' 
                    className='newRequest-select'
                    onChange={(cat)=>setCategory(cat.value)}
                >
                </Select>
            </Grid>
            <Grid item sm={12} className='newRequest-subject'>
                <InputLabel required>Subject</InputLabel>
                <TextField 
                    fullWidth 
                    placeholder="Write here..." 
                    value={subject}
                    onChange={(e)=>{setSubject(e.target.value)}}
                />
            </Grid>
            <Grid item sm={12} className='newRequest-description'>
                <InputLabel>Description</InputLabel>
                <DefaultEditor value={description} onChange={(e)=>setDescription(e.target.value)} />
            </Grid>
            <Grid item sm={12} className='newRequest-media'>
                <InputLabel>Media</InputLabel>
                <Dropzone/>
            </Grid>
            <Grid item sm={12} className='newRequest-media'>
                <FormControlLabel 
                    control={<Checkbox checked={checked} onClick={()=>setChecked(!checked)} />} 
                    label="All the details are valid and correct to my knowledge" 
                />
            </Grid>
            <Grid item sm={12} className='newRequest-buttons'>
                <Button 
                    variant='outlined' 
                    className='newRequest-buttons-clear'
                    onClick={clearFields}
                >
                    Clear All Fields
                </Button>
                <LoadingButton 
                    loading={isRequesting}
                    variant='contained' 
                    className='newRequest-buttons-submit'
                    onClick={handleSubmit}
                >
                    Submit
                </LoadingButton>
            </Grid>
        </Grid>
    </Container>
  )
}

export default NewRequest