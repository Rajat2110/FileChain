import React, { useEffect } from 'react'

function Share({setWindowOpen, contract}) {
  
  async function share() {
    const address = document.querySelector(".address").value;
    console.log(address);
    await contract.allow(address);
    //setWindowOpen(false);
  }

  useEffect(() => {
    const accessList = async () => {
        const addressList = await contract.shareAccess();
        let select = document.querySelector("#selectNum");
        const options = addressList;
        console.log(options);

        for(let i=0; i<options.length; i++) {
            let option = options[i];
            let elem = document.createElement("option");
            elem.textContent = option;
            elem.value = option;
            select.appendChild(elem)
        }
    }
    contract && accessList();
  }, [contract])

  return (
    <div className='flex flex-col items-center h-screen w-full pt-24 dark:bg-gray-900 dark:text-white'>
        <h1 className='text-2xl font-semibold'>Share access with</h1>
        <div>
            <form className='flex flex-col'>
                <input className='address w-96 h-8 mt-4 p-2 rounded-md  bg-gray-700 border-2 border-cyan-600' type='text' placeholder='Enter an address' />
                <select className='w-96 h-8 mt-6 rounded-md bg-gray-700 border-2 border-cyan-600' id="selectNum">
                    <option className='text-center'>People with access</option>
                </select>
                <div className='flex gap-10 justify-center mt-8'>
                    <button className='w-24 h-8 rounded-md font-semibold bg-cyan-600 text-white' onClick={() => setWindowOpen(false)}>Cancel</button>
                    <button className='w-24 rounded-md font-semibold bg-cyan-600 text-white' onClick={share}>Share</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Share