import React from 'react';
import {useDropzone} from 'react-dropzone';
import '../../static/scss/User/NewRequest.scss'
import * as IPFS from 'ipfs-core'
import toast from 'react-hot-toast'
import { StyledDropZone } from 'react-drop-zone'
import 'react-drop-zone/dist/styles.css'

function Dropzone({ipfsHash,setIpfsHash}) {

  let node;

  const [isUploading, setIsUplaoding] = React.useState(false)

  const upload = async(_file)=>{
    setIsUplaoding(true)
    try{
      if(!node) node = await IPFS.create({repo: 'ok' + Math.random()})
      const result = await node.add(_file)
      setIpfsHash(result.path)
      console.log({ipfsHash})
    }catch(err){
      console.log('Error in uploading to IPFS: ',err)
      toast.error(err.message)
    }
    setIsUplaoding(false)
  }
 
  return (
    <section className="newRequest-dropzone">
      <StyledDropZone onDrop={(_file) => upload(_file)}/>
      <aside>
        <h3>Files</h3>
        {ipfsHash? 
          isUploading? 
            'Uploading...':
            <a href={`https://ipfs.io/ipfs/${ipfsHash}`} target="_blank" >{ipfsHash}</a> 
          :'No file attatched'}
      </aside>
    </section>
  );
}

export default Dropzone 