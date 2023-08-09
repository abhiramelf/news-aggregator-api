// Gets the NEWS data from external API
const { default: axios } = require("axios");

function getNews(url) {
    return new Promise((resolve, reject) => {
        axios.get(url).then((res) => {
            return resolve(res.data);
        }).catch((err) => {
            return reject(err);
        });
    });
}

module.exports = getNews;