
import { useRouter } from "next/router";
import { ethers } from "ethers";
import MyErc721 from "../../artifacts/contracts/NFT.sol/MyErc721.json";
import Connect from "./Connect";
import Test from "./Test";
function Layout({ children }) {
 
  return (
    <div className="container">

      <nav className="topnav" id="myTopnav">
        
            <a href="/" >
              Home
            </a>
          
            <a href="/search"  >
              Sell Digital Asset
            </a>
         
            <a href="/mynft"  >
              My Digital Asset
            </a>
         
            <a href="/mintor"  >
              铸币
           </a>
           <a href="javascript:void(0);" className="icon">
                ...
            </a>
            <Connect  />
            <Test />
           
      </nav>



      <div>{children}</div>
    </div>

  )
}

export default Layout
