import React from "react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import UploadFile from "./components/UploadFile";
import Display from "./components/Display";
import Share from "./components/Share";
import Hero from "./components/Hero";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import logo from "./images/blockchain.png";

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [windowOpen, setWindowOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const wallet = async () => {
      if(provider){
        window.ethereum.on("chainChanged", () => {
          window.location.reload()
        })

        window.ethereum.on("accountsChanged", () => {
          window.location.reload()
        })

        await provider.send("eth_requestAccounts", [])

        const signer = await provider.getSigner()
        const address = (await signer).getAddress()
        .then((value) => {
          setAccount(value)
        }).catch(err => {
          console.log(err)
        })

        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        )
        console.log(contract)
        setContract(contract)
        setProvider(provider)
      } else {
        alert("Please install metamask to continue")
      }
    }

    try {
      provider && wallet()
    } catch (error) {
      alert(error)
    }
  }, [])

  return (
    <>
      <div className="flex justify-between px-12 py-4 font-sans dark:bg-gray-950 dark:text-white">
        <div className="flex gap-2">
          <img className="size-9" src={ logo } />
          <h1 className="text-2xl font-bold font-sharp">FileChain</h1>
        </div>
        <p className="text-lg">
          Account: {account}
        </p>
      </div>

      <section>
          <Hero />
      </section>

      <section id="upload">
        <div className="dark:bg-gray-950 dark:text-white">
          <div className="h-screen">
            { !windowOpen ? 
              <div className="flex justify-end pt-8 pr-14 dark:bg-gray-950">
                <button className="w-24 p-1 rounded-md text-white font-bold bg-cyan-600 hover:bg-cyan-500" onClick={() => setWindowOpen(true)}>Share</button>
              </div>
              : 
              <Share setWindowOpen={setWindowOpen} contract={contract}/>
            }
            <UploadFile account={account} contract={contract} provider={provider} />
          </div>
          <div className="h-screen">
            <Display account={account} contract={contract} />
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
