import { ethers } from 'ethers'
import { rpcUrl} from '../config'
import { trying} from './ConnectionService'
import { NetworkConfiguration } from '../config';
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";
import { NotificationManager } from 'react-notifications';
import axios from 'axios'

export const owned = async () => {
    const {success, provider, signer} = trying();
    if(!success)
        NotificationManager.warning('', "network not right!", 6000);
  
    const address = await signer.getAddress();
   
    const nft = new ethers.Contract(NetworkConfiguration.nftAddress, NFT.abi, provider);
   
  
    const count = await nft.balanceOf(address)
 
}
export const totalsupply = async () => {
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl());

    const nft = new ethers.Contract(NetworkConfiguration.nftAddress, NFT.abi, provider);
   const total = await nft.totalSupply();
  return total;
}

export const mintNFT = async (url) => {
    const {success, provider, signer} = trying();
    if(!success)
        NotificationManager.warning('', "network not right!", 6000);
        
   
    let nft = new ethers.Contract(NetworkConfiguration.nftAddress, NFT.abi, signer);
    const address = await signer.getAddress();
    let transaction = await nft.connect(signer).mint(address, url, {value: 100000000000});
    let tx = await transaction.wait();
    debugger
    let event = tx.events[0];
    let value = event.args[2];
    console.log(value);
    let tokenId = value.toNumber();
}