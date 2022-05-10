import { NFTStorage, File } from "nft.storage"
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDU0NDUxMzU5RjEwNDE4YjQwMzFkODlDNEFGMTBhNTE4NzQ3ODdhQTkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MTkwODc0MDEyOSwibmFtZSI6ImJjZ1Rlc3QifQ.2c3aZgn5UPKJeHQh-ffIlRFB-oVe6UVX3d3qmt_vCXg'
console.log(API_KEY)
async function storeAsset() {
   const client = new NFTStorage({ token: API_KEY })
   const metadata = await client.store({
       name: 'Respct NFTs',
       description: 'Trying NFT storage to push the NFT data',
       level: '72',
       MMR: '1500',
       average_SLP: '52',
       image: new File(
           [await fs.promises.readFile('assets/testIMG.png')],
           'testIMG.png',
           { type: 'image/png' }
       ),
   })
   console.log("Metadata stored on Filecoin and IPFS with URL:", metadata.url)
}

storeAsset()
   .then(() => process.exit(0))
   .catch((error) => {
    //    console.error(API_KEY)
       console.error(error);
       process.exit(1);
   });