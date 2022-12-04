import { ethers } from 'ethers'
import { rpcUrl} from '../config'
import { trying} from './ConnectionService'
import { NetworkConfiguration } from '../config';
import NFT from "../../artifacts/contracts/NFT.sol/MyErc721.json";
import { NotificationManager } from 'react-notifications';
import axios from 'axios'

export const owned = async () => {
    const {success, provider, signer} = await trying();
    if(!success){
        NotificationManager.warning('', "network not right!", 6000);
        return {success:false}
    }
  
    const address = await signer.getAddress();
   
    const nft = new ethers.Contract(NetworkConfiguration.nftAddress, NFT.abi, provider);
   
  
    const count = await nft.balanceOf(address)
    const amount = count.toNumber();

    const rst = await Promise.all(
        Array.from({length: amount}, async (v, i)=>{
            debugger
            const tokenId  = await nft.tokenOfOwnerByIndex(address, i)
            const tokenUri = await nft.tokenURI(tokenId)
            const meta = await axios.get(tokenUri)
            return {...meta.data, tokenId, tokenUri};

        })
    )
    return {success:true, data:rst}
 
}
export const totalsupply = async () => {
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl());

    const nft = new ethers.Contract(NetworkConfiguration.nftAddress, NFT.abi, provider);
   const total = await nft.totalSupply();
  return total;
}

export const mintNFT = async (tokenUri) => {
    const {success, provider, signer} = await trying();
    if(!success){
        NotificationManager.warning('', "network not right!", 6000);
        return {success:false};
    }
        
   
    let nft = new ethers.Contract(NetworkConfiguration.nftAddress, NFT.abi, signer);
    const address = await signer.getAddress();
    let transaction = await nft.connect(signer).mint(address, tokenUri, {value: 1000000000});
    let tx = await transaction.wait(1);
    debugger
    let event = tx.events[0];
    let value = event.args[2];
    console.log(value);
    let tokenId = value.toNumber();
    alert(tokenId)
    return {success:true, tokenId};
}