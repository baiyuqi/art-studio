import Arweave from "arweave";
import { messageBox } from "../service/message-service"
const arweave = Arweave.init({
    host: '127.0.0.1',
    port: 1984,
    protocol: 'http'
});

export const  toArweave = async function(entity){
   

    let tx = await arweave.createTransaction({
        data: entity,
    });
    tx.addTag('Content-Type', 'image/jpeg');

    await arweave.transactions.sign(tx);//
    const response = await arweave.transactions.post(tx);

    const myurl = "http://127.0.0.1:1984/" + tx.id;
    messageBox("success", "", myurl)

    return myurl;
}
export const imageToArweave = async function (file) {
    const data = await readImageFile(file)

    const url = toArweave(data);

    return url;
}

const readImageFile = (file) => {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {


        reader.onload = (event) => {
             resolve(event.target.result)
        }
        reader.onerror = (event) => {
             reject(event)
        }

        reader.readAsArrayBuffer(file)
    })
}