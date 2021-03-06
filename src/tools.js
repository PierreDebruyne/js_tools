const fs = require("fs")
const axios = require("axios")
const unzipper = require("unzipper")
const rimraf = require("rimraf")

module.exports.download_file = async function (url, dest) {
    console.log("Download file:", url)
    const writer = fs.createWriteStream(dest);
    return axios.get(url, {responseType: 'stream'}).then(response => {
        return new Promise((resolve, reject) => {
            response.data.pipe(writer);
            let error = null;
            writer.on('error', err => {
                error = err;
                writer.close();
                reject(err);
            });
            writer.on('close', () => {
                if (!error) {
                    console.log("Téléchargement terminé")
                    resolve(true);
                } else {
                    reject(error);
                }
            });
        })
    })
}

module.exports.unzip= async function unzip(src, dest) {
    return new Promise((resolve, reject) => {
        console.log("Décompréssion de:", src)
        console.log("Vers:", dest)
        fs.createReadStream(src)
            .pipe(unzipper.Parse())
            .on('entry', function (entry) {
                entry.pipe(fs.createWriteStream(dest + "/" + entry.path));

            })
            .on('finish', () => {
                resolve()
            }).on('error', () => {
            reject()
        });

    });
}

module.exports.rm_rf= async function rm_rf(path) {
    return new Promise((resolve, reject) => {
        rimraf(path, () => {
            resolve();
        })
    })
}


module.exports.make_id= function (length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}