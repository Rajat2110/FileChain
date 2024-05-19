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
              pinata_secret_api_key: "your api key here"
          }
        });

        alert("File uploaded successfully. Please complete the transaction to continue");
        setFileName("No file Selected");
        setFile(null);

        const fileHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        contract.add(account, fileHash, fileName);

      } catch (error) {
        alert(error);
      }
    }
  }

  function getFile(event) {
    const data = event.target.files[0];
    setFileName(event.target.files[0].name);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(event.target.files[0]);
    }
    console.log(event.target.files[0].name);
    event.preventDefault();
  }

  return (
    <div className='py-16'>
      <h1 className='text-2xl text-center mb-8 font-sharp font-semibold'>Upload your files here</h1>
      <form className='flex justify-center items-center gap-4' onSubmit={handleSubmit}>
        <input className='p-1 w-96 file:rounded-lg file:h-8 file:bg-cyan-600 file:text-white' type='file' id='file-upload' name='file' onChange={getFile} disabled={!account} />
        <button className='w-24 p-1 rounded-md text-white font-bold bg-cyan-600 hover:bg-cyan-500' type='submit' disabled={!file}>Upload</button>
      </form>
    </div>
  )
}

export default UploadFile
