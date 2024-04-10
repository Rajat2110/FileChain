import React, { useState } from 'react'
import axios from 'axios'

function UploadFile({account, contract, provider}) {

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if(file){
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
              "Content-Type": "multipart/form-data",
              pinata_api_key: "1fbb768ec113f1faa809",
              pinata_secret_api_key: "e11d8906f8b19e6b614fbeb4b4d9b9bb4ec966b7855b124607ab9d1c17e76a6c"
          }
        });

        const fileHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        contract.add(account, fileHash);

        alert("File uploaded successfully");
        setFileName("No file Selected");
        setFile(null);

      } catch (error) {
        alert(error);
      }
    }
  }

  function getFile(event) {
    const data = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(event.target.files[0]);
    }
    console.log(event.target.files[0].name);
    setFileName(event.target.files[0].name);
    event.preventDefault();
  }

  return (
    <div className='my-16'>
      <form className='flex justify-center items-center gap-4' onSubmit={handleSubmit}>
        <input className='p-1 w-96 file:rounded-lg file:h-8 file:bg-cyan-600 file:text-white' type='file' id='file-upload' name='file' onChange={getFile} disabled={!account} />
        <button className='w-24 p-1 rounded-md text-white font-bold bg-cyan-600' type='submit' disabled={!file}>Upload</button>
      </form>
    </div>
  )
}

export default UploadFile