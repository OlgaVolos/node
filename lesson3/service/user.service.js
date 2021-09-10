const fs = require('fs');
const util = require('util');

const readFilePromisify = util.promisify(fs.readFile);
const writeFilePromisify = util.promisify(fs.writeFile);


const getUsersFromFile = async (pathUsers) => {
    try{
        const data = await readFilePromisify(pathUsers);
        return data ?  JSON.parse(data.toString()):[];

    } catch (e) {
        console.log(e);

    }
};

const writeUserInFile = async (pathUsers, users) => {
    try{
        await writeFilePromisify(pathUsers, JSON.stringify(users))
    } catch (e) {
        console.log(e);
    }
};

module.exports = {writeUserInFile, getUsersFromFile}

