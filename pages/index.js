import Head from 'next/head'
import { ethers } from "ethers";
import MyErc721 from "../artifacts/contracts/NFT.sol/MyErc721.json";
export default function Home() {
  const connect =  async ()=>{
    debugger;
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
  }
  const call_contract =  async ()=>{
    debugger;
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner()//拿到一个账号
    const lock = new ethers.Contract("0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9", MyErc721.abi, signer);
    const feecollector =  await signer.getAddress();
    alert(feecollector)
    const transaction = await lock.mint(feecollector, "https://github.com/baiyuqi/art-studio/releases/tag/course-1",{value:1000000000});
    const txReceipt = await transaction.wait();
    const [transferEvent] = txReceipt.events;
    const { from, to, tokenId } = transferEvent.args;
    alert("Decoded data: from: "+ from.toString() + " to: " + to.toString() + " tokenId:" + tokenId.toString()); 
  }
  return (
    <div className="container">
      <Head>
        <title>艺术家工作室</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>



        <div className="grid">
          <button className="card" onClick={connect}>

             连接钱包
          </button>
          
          <a className="card" onClick={call_contract}>
            <p> 合约调用</p>
          </a>


        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className="logo" />
        </a>
      </footer>

      <style jsx>{`
       
      `}</style>
    </div>
  )
}
