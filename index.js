// import fs from 'fs'

// const main = () => {
//     const baseUrl = 'https://d3alac64utt23z.cloudfront.net/images/cards/SOR/'

//     for (let i = 1; i < 5; i++) {
//         let index = i.toString().padStart(3, '0')
//         let url = baseUrl + index + '.png'
//         let image = fetch(url, {

//         })
//         .then((res) => res.blob())
//         .then((blob) => {
//             console.log(url)
//             fs.createWriteStream('./cards/' + i + '.png', blob, (err) => {
//                 if (err) console.log(err)
//             })
//         })
//     }
// }

// main()

import https from 'https';
import fs from 'fs';

const main = () => {
    const baseUrl = 'https://d3alac64utt23z.cloudfront.net/images/cards/SOR/';

    for (let i = 1; i < 19; i++) {
        let imageName = './cards/' + i.toString().padStart(3, '0') + '-b.png'
        let file = fs.createWriteStream(imageName);
        let url = baseUrl + i.toString().padStart(3, '0') + '-b.png'

        https.get(url, response => {
            response.pipe(file);

            file.on('finish', () => {
                file.close();
                console.log(`Image downloaded as ${imageName}`);
            });
        }).on('error', err => {
            fs.unlink(imageName);
            console.error(`Error downloading image: ${err.message}`);
        });
    }
}

main()