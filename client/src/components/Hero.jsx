import React from 'react'
import img1 from "../images/encrypted.png"
import img2 from "../images/blockchain-logo.png"
import img3 from "../images/peer-to-peer.png"

function Hero() {
  return (
    <div className='flex flex-col items-center h-screen dark:bg-gray-950 dark:text-white'>
        <h1 className=" pt-16 text-4xl font-bold leading-snug font-sharp">Elevate Your Data security with Decentralized Storage.</h1>
        <a href='#upload'>
            <button className='min-w-36 h-10 mt-8 rounded-3xl text-white text-lg font-semibold bg-cyan-600 hover:bg-cyan-500'>Get started</button>
        </a>

        <div className='flex justify-center gap-16 mt-16'>
            <div className='max-w-sm p-2 animate-slidein'>
                <img className='w-24 h-24 m-4 ml-20' src={img1} />
                <h2 className='pl-10 mb-4 text-xl font-semibold'>Secure File Storage</h2>
                <p className='pl-10 text-md'>Utilizing advanced blockchain encryption technology, we ensure that your files are stored securely, safeguarding them against unauthorized access and tampering.</p>
            </div>
            <div className='max-w-sm p-2'>
                <img className='w-24 h-24 m-4 mx-auto' src={img2} />
                <h2 className='pl-10 mb-4 text-xl font-semibold'>Decentralized Architecture</h2>
                <p className='pl-10 text-md'>Unlike traditional centralized storage systems, decentralized architecture distributes file storage across a network of nodes, enhancing reliability and resilience.</p>
            </div>
            <div className='max-w-sm p-2'>
                <img className='w-24 h-24 m-4 mx-20' src={img3} />
                <h2 className='pl-10 mb-4 text-xl font-semibold'>Peer-to-Peer Sharing</h2>
                <p className='pl-10 text-md'>Say goodbye to centralized intermediaries. Peer-to-peer sharing feature allows you to directly share files with other users on the platform, eliminating the need for third-party involvement.</p>
            </div>
        </div>
    </div>
  )
}

export default Hero
