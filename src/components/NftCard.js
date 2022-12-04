function NftCard({nft}){
    return(
        <div class="nftcard">
        <img src={nft.imageUri}
            class="nft-image" />
        <div class="name">{nft.name}</div>
        <div class="desc">{nft.description}</div>
        
        <button class="btn">buy</button>
    </div>
    )
}
export default NftCard