import styles from './NftMintor.module.css'
import { useState } from "react"
import { create as ipfsHttpClient } from "ipfs-http-client";
import React from 'react';
import { mintNFT } from '../service/nft-service';
import { addToIpfs } from '../service/Ipfs-service';
import { useRouter } from 'next/router';
import { messageBox } from "../service/message-service"
import {toArweave, imageToArweave} from "../service/arweave-service"
function NftMinter() {

    const router = useRouter();
    const [meta, updateMeta] = useState({ name: "", description: "" })
    const [uri, setUri] = useState("")
    const onChange = async (e) => {
        try {
            const image = e.target.files[0]
            const imageuri = await  imageToArweave(image)//addToIpfs(image)
            messageBox("success", "", imageuri)
            setUri(imageuri);
        } catch (error) {
            messageBox("danger", "", error.message)
        }
    }

    const mint = async () => {
        try {
        const data = { ...meta, uri }
        const json = JSON.stringify(data);
        const metauri = await toArweave(json)//addToIpfs(json)
        messageBox("success", "", metauri)
        const { success, tokenId } = await mintNFT(metauri);
      
        if (success) {
            messageBox("success", "", tokenId)
           
            router.push("/mynft")
        }else{
            messageBox("danger", "","mint failed")
        }
    } catch (error) {
        messageBox("danger", "", error.message)
    }
    }
  

    return (
        <div className={styles.CreatorWrapper}>
            <div className={styles.CreatorContainer}>

                <input
                    placeholder="Asset Name"
                    className={styles.NftField}
                    onChange={(e) => updateMeta({ ...meta, name: e.target.value })}

                />
                <textarea
                    placeholder="Asset Description"
                    className={styles.NftField}
                    onChange={(e) => { updateMeta({ ...meta, description: e.target.value }) }}
                />

                <input
                    type='file'
                    placeholder="Asset Image"
                    className="my-4"
                    onChange={onChange}
                />

                <img width="350" src={uri} className={styles.NftImage} />


                <button
                    className="mt-8 bg-blue-500 text-white rounded p-4"
                    onClick={mint}
                >Create Item</button>

            </div>

        </div>
    )
}

export default NftMinter