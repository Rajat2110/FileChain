import React, { useState } from 'react'

function Display({account, contract}) {

  const [preview, setPreview] = useState(null);

  const getData = async (e) => {
    e.preventDefault();
    let dataArray;
    const otherAddress = document.querySelector(".address").value;
    try {
      if(otherAddress) {
        dataArray = await contract.display(otherAddress);
        console.log(dataArray);
      }else {
        dataArray = await contract.display(account);
        console.log(dataArray);
      }
    } catch (error) {
      alert(error); 
    }

    const isEmpty = Object.keys(dataArray).length===0;
    if(!isEmpty) {
      const images = dataArray.map((item, i) => {
        return (
          <a href={item} key={`a-${i}`} target='_blank' rel='noopener noreferrer'>
          <img className='w-64 h-64 p-4' key={`img-${i}`}
              src={item}
              alt='img'/>
          </a>
        )}
      )
      setPreview(images);
    }else {
      alert("Nothing to show")
    }
  }

  return (
    <div className='my-12'>
      <h2 className='text-2xl text-center my-2'>Get stored files</h2>
      <form className='flex flex-col items-center justify-center gap-4' onSubmit={getData}>
          <input className='address min-w-96 px-1 py-0.5 bg-gray-700 border-2 border-cyan-600' type='text' placeholder='Enter Address' />
          <button className='w-24 p-1 rounded-md text-white font-bold bg-cyan-600' type='submit'>Get Data</button>
      </form>
      <div className='grid grid-cols-6 mx-8 mt-4'>{preview}</div>
    </div>
  )
}

export default Display