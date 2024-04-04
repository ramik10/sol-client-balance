import * as web3 from '@solana/web3.js'
import { useState } from 'react';


export default function Home() {
  const [address, setAddress] = useState("")
  const [balance, setBalance] = useState(0)
  const submitHandler = async (address : string)=> {
    try {
    console.log("hello")
    const key = new web3.PublicKey(address)
    setAddress(key.toBase58())
    const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
    const balance = await connection.getBalance(key)
    console.log(balance)
    setBalance(balance/web3.LAMPORTS_PER_SOL)
    } catch (error) {
      setAddress('')
      setBalance(0)
      alert(error)
    }
  }
  return (
      <div className='flex justify-center items-center h-full'>
        <div>
        <div>
        <input onChange={(e)=> setAddress(e.target.value)} placeholder='walletAddress' className="text-black"/>
        <button onClick={()=>submitHandler(address)} className="bg-purple-600 ml-2 p-1 rounded-xl">submit</button>
        <div>Enter the Wallet Address above</div>
        </div>
        <div>
          Sol balance in the wallet : {balance} SOL
        </div>
        </div>
      </div>
  );
}
