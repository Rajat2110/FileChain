import React, { useEffect } from 'react'

function Share({setWindowOpen, contract}) {
  
  async function share(event) {
    event.preventDefault();
    const address = document.querySelector(".address").value;
    console.log(address);
    await contract.allow(address);
    setWindowOpen(false);
  }
  
  async function revoke() {
    const selectedAddress = document.querySelector(".selected").value;
    const userAddress = selectedAddress;
    console.log("Selected address: ", userAddress);
    await contract.disallow(userAddress);
    setWindowOpen(false);
  }

  useEffect(() => {
    const accessList = async () => {
        const addressList = await contract.shareAccess();
        let select = document.querySelector("#selectNum");
        const options = addressList;

        let addedOptions = {};

        for(let i=0; i<options.length; i++) {
            let option = options[i][0];
            let access = options[i][1];
            //console.log(option);
            if(access===true){
              if(!select.querySelector(`option[value="${option}"]`)){
                let elem = document.createElement("option");
                elem.textContent = option;
                elem.value = option;
                select.appendChild(elem);
              }
            }
        }
    }
    contract && accessList();
  }, [contract])

  return (
    <div className='flex flex-col items-center w-full pt-12 pb-24 font-sans dark:bg-gray-900 dark:text-white'>
        <h1 className='text-2xl mb-4 font-semibold font-sharp'>Share access with others</h1>
        <div>
            <form className='flex flex-col'>
                <div className='mb-12'>
                  <input className='address w-96 h-8 mt-4 p-2 rounded-md  dark:bg-gray-700 border-2 border-cyan-600' type='text' placeholder='Enter an address' />
                  <button className='w-32 ml-4 h-8 rounded-md font-semibold bg-cyan-600 text-white' onClick={share}>Share access</button>
                </div>
                <div>
                  <select className='selected w-96 h-8 mt-6 rounded-md dark:bg-gray-700 border-2 border-cyan-600' id="selectNum">
                      <option className='text-center'>People with access</option>
                  </select>
                  <button className='w-32 h-8  ml-4 rounded-md font-semibold bg-cyan-600 text-white' onClick={revoke}>Revoke access</button>
                </div>
                <div className='flex gap-10 justify-center mt-12'>
                    <button className='w-24 h-8 rounded-md font-semibold bg-cyan-600 text-white' onClick={() => setWindowOpen(false)}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Share