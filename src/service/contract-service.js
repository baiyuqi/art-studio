import { ethers } from 'ethers'
import { contractAddresses } from '../../config'
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";
import axios from 'axios'
import {NotificationContainer, NotificationManager} from 'react-notifications';

export const owned = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const wallet = provider.getSigner();
    const { chainId } = await provider.getNetwork()
    const addresses = contractAddresses[chainId.toString()];
    if(addresses === undefined)
    {
        NotificationManager.warning('Warning message', 'No contract addresses for this network', 3000);
       
        return []
    }
    const market = new ethers.Contract(contractAddresses[chainId.toString()].marketAddress, Market.abi, wallet);
    const nft = new ethers.Contract(contractAddresses[chainId.toString()].nftAddress, NFT.abi, wallet);

    const data = await market.ownedByMe();
    const nfts = await extract(data, nft);
    return nfts;
}
export const created = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);

    const wallet = provider.getSigner();
    const { chainId } = await provider.getNetwork()
    const addresses = contractAddresses[chainId.toString()];
    if(addresses === undefined)
    {
        NotificationManager.warning('Warning message', 'No contract addresses for this network', 3000);
       
        return []
    }
    const market = new ethers.Contract(contractAddresses[chainId.toString()].marketAddress, Market.abi, wallet);


    const nft = new ethers.Contract(contractAddresses[chainId.toString()].nftAddress, NFT.abi, wallet);

    const data = await market.createdByMe();
    const nfts = await extract(data, nft);
    return nfts;
}
export const saling = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const wallet = provider.getSigner();
    const { chainId } = await provider.getNetwork()
    const addresses = contractAddresses[chainId.toString()];
    if(addresses === undefined)
    {
        NotificationManager.warning('Warning message', 'No contract addresses for this network', 3000);
       
        return []
    }
    const market = new ethers.Contract(contractAddresses[chainId.toString()].marketAddress, Market.abi, wallet);
    const nft = new ethers.Contract(contractAddresses[chainId.toString()].nftAddress, NFT.abi, wallet);

    const data = await market.unsoldItems();
    const nfts = await extract(data, nft);
    return nfts;
}
async function extract(data, nft) {
    return await Promise.all(data.map(async (item) => {
        const tokenUri = await nft.tokenURI(item.tokenId)
        const meta = await axios.get(tokenUri)
        const price = ethers.utils.formatUnits(item.price.toString(), 'ether')
        const extracted = {
            itemId: item.itemId.toString(),
            tokenId: item.tokenId.toString(),
            tokenUri: tokenUri,
            seller: item.seller,
            owner: item.owner,
            price: price,
            sold: item.sold,
            meta
        }
        return extracted
    }))
}


export const buy = async (nft) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const wallet = provider.getSigner();
    const { chainId } = await provider.getNetwork()
    const addresses = contractAddresses[chainId.toString()];
    if(addresses === undefined)
    {
        NotificationManager.warning('Warning message', 'No contract addresses for this network', 3000);
       
        return []
    }
    const market = new ethers.Contract(contractAddresses[chainId.toString()].marketAddress, Market.abi, wallet);
    const price = ethers.utils.parseEther(nft.price);

    const transaction = await market.connect(wallet).createMarketSale(nft.itemId, { value: price });
    await transaction.wait();



};

export const sale = async (url, priceString) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const wallet = provider.getSigner();
    const { chainId } = await provider.getNetwork()
    const addresses = contractAddresses[chainId.toString()];
    if(addresses === undefined)
    {
        NotificationManager.warning('Warning message', 'No contract addresses for this network', 3000);
        return []
    }
    let nft = new ethers.Contract(contractAddresses[chainId.toString()].nftAddress, NFT.abi, wallet);
    let transaction = await nft.connect(wallet).createToken(url);
    let tx = await transaction.wait();
    debugger
    let event = tx.events[0];
    let value = event.args[2];
    console.log(value);
    let tokenId = value.toNumber();

    const price = ethers.utils.parseEther(priceString);
    let market = new ethers.Contract(contractAddresses[chainId.toString()].marketAddress, Market.abi, wallet);
    let listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString();
    transaction = await market.connect(wallet).createMarketItem(contractAddresses[chainId.toString()].nftAddress, tokenId, price, { value: listingPrice });
    await transaction.wait();

}