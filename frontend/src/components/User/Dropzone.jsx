import React from 'react';
import {useDropzone} from 'react-dropzone';
import '../../static/scss/User/NewRequest.scss'

function Dropzone(props) {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="newRequest-dropzone">
      <div {...getRootProps({className: 'newRequest-dropzone-drop'})}>
        <input {...getInputProps()} />
        <p>Upload your files here</p>
      </div>
      <aside className='newRequest-dropzone-files'>
        <h4>Files</h4>
        {files.length ? <ul>{files}</ul> : <p>No files attatched</p>}
      </aside>
    </section>
  );
}

export default Dropzone 