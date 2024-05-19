import React, { useState } from 'react'
import docimg from "../images/document.png"

function Display({account, contract}) {

  const [preview, setPreview] = useState(null);
  const [filter, setFilter] = useState("all");

  const filters = {
    all: [], // Display all files
    images: ['jpg', 'jpeg', 'png', 'gif', 'webp'], // Display image files
    documents: ['pdf', 'doc', 'docx', 'txt', 'csv', 'xlsx'], // Display document files
  };

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

    const isEmpty = Object.keys(dataArray).length === 0;
    if (!isEmpty) {

      const filteredData = dataArray.filter(item => {
        if (filter === "all") {
          return true; // Display all files if filter is set to "all"
        } else {
          const fileExtension = item[1].split('.').pop();
          return filters[filter].includes(fileExtension);
        }
      });

      const images = filteredData.map((item, i) => {
        const fileType = item[1].split('.').pop();

        return(
          fileType==='pdf' || fileType==='docx' || fileType==='csv' || fileType==='xlsx'?(
            <div key={i} className='flex flex-col items-center'>
            <a href={item[0]} target='_blank' rel='noopener noreferrer'>
              <img className='w-64 h-64 p-4' key={`img-${i}`}
                src={docimg}
                alt={"some image"} />
            </a>
            <p className='text-center dark:text-white'>{item[1]}</p>
            </div>
           ) : (
          <div>
            <a href={item[0]} target='_blank' rel='noopener noreferrer'>
              <img className='w-64 h-64 p-4' key={`img-${i}`}
                src={item[0]}
                alt={"some image"} />
            </a>
            <p className="text-center dark:text-white">{item[1]}</p>
          </div>
          )
        )
      });
      setPreview(images);
    }else {
      alert("Nothing to show")
    }
  }

  const handleFilter = (e) => {
    setFilter(e.target.value);
  }

  return (
    <div className='my-24'>
      <h2 className='text-2xl text-center my-8 font-sharp font-semibold'>Get stored files</h2>
      <form className='flex flex-col items-center justify-center gap-8' onSubmit={getData}>
          <div>
            <label className='text-xl mr-4' htmlFor='address'>Shared with me: </label>
            <input className='address min-w-96 px-1 py-0.5 dark:bg-gray-700 border-2 border-cyan-600' type='text' placeholder='Enter Address' />
            <button className='w-24 p-1 ml-4 rounded-md text-white font-bold bg-cyan-600 hover:bg-cyan-500' type='submit'>Get Files</button>
          </div>
          <div>
            <label className='text-xl mr-4' htmlFor='address'>My Files: </label>
            <button className='w-24 p-1 rounded-md text-white font-bold bg-cyan-600 hover:bg-cyan-500' type='submit'>Get Data</button>
          </div>
      </form>
      <div className='flex items-start gap-8 mx-20 my-8'>
        <p className='text-lg'>Filter</p>
        <select className='min-w-48 px-1 dark:bg-gray-700 border-2 border-cyan-600' onChange={handleFilter} value={filter}>
          <option value="all">All files</option>
          <option value="images">images</option>
          <option value="documents">documents</option>
          <option>other</option>
        </select>
        <button className='w-24 h-7 mx-2 bg-cyan-600 hover:bg-cyan-500 rounded-md text-white' onClick={getData}>Apply</button>
      </div>
      <div className='grid grid-cols-5 mx-20 mt-4'>{preview}</div>
    </div>
  )
}

export default Display