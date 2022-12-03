export const NetworkConfiguration = {
    
    chainId: 0x7A69,
    nftAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",

    params: [{
        chainId: '0x7A69',
        rpcUrls: ["http://127.0.0.1:8545/"],
        chainName: "localhost-testnet",
        nativeCurrency: {
            name: "MYETH",
            symbol: "MYETH",
            decimals: 18
        },
        blockExplorerUrls: ["https://polygonscan.com/"]

    }]

    

}
export const rpcUrl = ()=>{
    return NetworkConfiguration.params[0].rpcUrls[0];
}

