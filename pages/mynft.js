import { useEffect, useState } from "react"
import NftBrowser from "../src/components/NftBrowser"
import { owned } from "../src/service/nft-service"
function MyNft() {
  const [nfts, setNfts] = useState([])

  useEffect(() => {
    loadNfts();

  }, []);

  const loadNfts = async () => {
    const ns = await owned();
    if (ns.success)
      setNfts(ns.data)
    console.log("mounted!")
  }
  return (
    <div className="main">
      <NftBrowser nfts={nfts} />
    </div>
  )
}
export default MyNft