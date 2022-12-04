import styles from './NftMintor.module.css'
import {useState} from "react"
import { create as ipfsHttpClient } from "ipfs-http-client";
import React from 'react';
import { mintNFT } from '../service/nft-service';
import { useRouter } from 'next/router';
const ipfs = ipfsHttpClient({ host: '127.0.0.1', 'api-path': '/ipfs/api/v0/', protocol: 'http', port: '5001' });

function NftMinter() {
    const router = useRouter();
    const [meta, updateMeta] = useState({name:"", description:""})
    const [uri, setUri] = useState("")
    const onChange = async (e) => {
        const image = e.target.files[0]
      alert(e.target.files[0])
      const added = await ipfs.add(image)
      const cid = added.path
      const imageUri = "http://127.0.0.1:8080/ipfs/" + cid;
      setUri(imageUri);
    }

    const mint = async () => {
        const data = {...meta, imageUri: uri}
        const json = JSON.stringify(data);
        const added = await ipfs.add(json)
        alert(added.path)
        const tokenUri = "http://127.0.0.1:8080/ipfs/" + added.path;
        const {success, tokenId} = await mintNFT(tokenUri);
        if(success){
            alert(tokenId)
            router.push("/mynft")
        }

    }

    return (
        <div className={styles.CreatorWrapper}>
            <div className={styles.CreatorContainer}>

                <input
                    placeholder="Asset Name"
                    className={styles.NftField}
                    onChange={(e)=>updateMeta({...meta, name: e.target.value})}
                   
                />
                <textarea
                    placeholder="Asset Description"
                    className={styles.NftField}
                    onChange={(e)=>{updateMeta({...meta, description: e.target.value})}}
                />
              
                <input
                    type='file'
                    placeholder="Asset Image"
                    className="my-4"
                   onChange={onChange}
                />

                <img  width="350" className={styles.NftImage} />


                <button
                    className="mt-8 bg-blue-500 text-white rounded p-4"
                    onClick={mint}
                    >Create Item</button>

            </div>

        </div>
    )
}

export default NftMinter