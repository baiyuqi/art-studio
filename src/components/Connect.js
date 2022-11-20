
import { ethers } from "ethers";
import { useState } from "react";
function Connect() {
     const [address, setAddress] = useState("")
    const connect = async () => {
        debugger;
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const chainId = await provider.getNetwork();
      
        setAddress(await signer.getAddress());
    }
    return (
        <>

                <a href="javascript:void(0);"  onClick={connect}>
                    connect
                </a>
            
                  
        </>
    )
}

export default Connect;
