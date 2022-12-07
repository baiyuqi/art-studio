
import NftCard from "./NftCard"

function NftBrowser({nfts}) {


  return (

      <div className="main">
        {
          nfts.map((nft, i) => {
            return (
              <NftCard nft={nft} />
            );
          })

        }
    </div>
  )
}
export default NftBrowser