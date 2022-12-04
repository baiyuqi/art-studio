import { useEffect, useState } from "react"
import NftCard from "../src/components/NftCard"
import { owned } from "../src/service/nft-service"
function MyNft() {
    const [nfts, setNfts] = useState([])


    
  useEffect(() => {
    loadNfts();
   
  }, []);

  const loadNfts = async () => {
    const ns = await owned();
        if(ns.success)
            setNfts(ns.data)
        console.log("mounted!")
  }
  return (
    <div className="main">
      {
        nfts.map((nft, i) => {
          return (
            <NftCard nft={nft}/>
          );
        })

      }
    </div>
  )
}
export default MyNft