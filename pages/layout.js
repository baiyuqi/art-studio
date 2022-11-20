
import { useRouter } from "next/router";
import { ethers } from "ethers";
import MyErc721 from "../artifacts/contracts/NFT.sol/MyErc721.json";
import Connect from "../src/components/Connect";

function Layout({ children }) {
 
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
  const router = useRouter();
const myFunction = async ()=>{
  debugger
 
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
  return (
    <div class="container">

      <nav class="topnav" id="myTopnav">
        
            <a href="/" >
              Home
            </a>
          
            <a href="/create-item"  >
              Sell Digital Asset
            </a>
         
            <a href="/my-assets"  >
              My Digital Asset
            </a>
         
            <a href="/creator-dashboard"  >
              Creator Dashboard
           </a>
           <a href="javascript:void(0);" class="icon" onClick={myFunction}>
                ...
            </a>
          <Connect />
      </nav>



      <div>{children}</div>
    </div>

  )
}

export default Layout
