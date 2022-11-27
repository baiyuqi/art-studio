import { ethers } from "ethers";

import { NetworkConfiguration } from '../config'
import { NotificationManager } from 'react-notifications';
    export const connectOnce = async () => {
        debugger;
        let provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", []);
        let signer = provider.getSigner();
        let network = await provider.getNetwork();
        let address = await signer.getAddress();
        return{chainId:network.chainId, address: address, provider, signer};
    }
    export const trying = async () => {
        const {chainId, address, provider, signer} = await connectOnce();
        const supported = NetworkConfiguration.chainId.toString();
        if (chainId == supported) {
            NotificationManager.success('', 'chainId: ' + chainId + "      account: " + address.substring(0, 5) + "..", 3000);
            return {success:true, provider, signer};
        }
        NotificationManager.warning('', 'chainId: ' + chainId + "      account: " + address.substring(0, 5) + "..", 3000);
        return {success:false};
    }
    export const connect = async () => {
        let {success} = await trying();
        if(success)
            return;
        
        await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: NetworkConfiguration.params

        });
        await trying();

    }