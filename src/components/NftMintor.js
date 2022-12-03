import styles from './NftMintor.module.css'

import React from 'react';
function NftMinter() {


    const onChange = async (e) => {
      
    }

    const createItem = async () => {
      

    }

    return (
        <div className={styles.CreatorWrapper}>
            <div className={styles.CreatorContainer}>

                <input
                    placeholder="Asset Name"
                    className={styles.NftField}
                   
                />
                <textarea
                    placeholder="Asset Description"
                    className={styles.NftField}
                   
                />
                <input
                    placeholder="Asset Price"
                    className={styles.NftField}
                   
                />

                <input
                    type='file'
                    placeholder="Asset Image"
                    className="my-4"
                   
                />

                <img  width="350" className={styles.NftImage} />


                <button
                    className="mt-8 bg-blue-500 text-white rounded p-4"
                    >Create Item</button>

            </div>

        </div>
    )
}

export default NftMinter