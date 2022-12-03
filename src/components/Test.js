import { create as ipfsHttpClient } from "ipfs-http-client";
const ipfs = ipfsHttpClient({ host: '127.0.0.1', 'api-path': '/ipfs/api/v0/', protocol: 'http', port: '5001' });

function Connect({ children }) {
    const connectWallet = async () => {
        const data = {name:"hero", desc:"hello world"}
        const json = JSON.stringify(data);
        const added = await ipfs.add(json)
        alert(added.path)
    }
  return (
    <div>

            <a href="javascript:void(0);" onClick={connectWallet}>
              Test
            </a>


    </div>

  )
}

export default Connect
