const {USER_PATH} = require("../config/variable");
const {getUsersFromFile, writeUserInFile} = require("../service/user.service");
module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await getUsersFromFile(USER_PATH);
            res.json(users)
        } catch (e) {
            console.log(e);
        }
    },
    getUserById: async (req, res) => {
        try{
            const {userId} = req.params;
            const users = await getUsersFromFile(USER_PATH);
            const singleUser = users.find((value => value.id === +userId));

            if(!singleUser){
                res.status(404).json('user not found');

                return;
            }
            res.json(singleUser)

        }catch (e){
            console.log(e);
        }

    },
    createUser: async (req, res) => {
        try{
            const {email, password} = req.body;
            const users = await getUsersFromFile(USER_PATH);

            if (!email || !password) {
                res.status(400).end('Bad Request');
                return;
            }
            const isRegister = users.some(value => value.email === email);
            if (isRegister) {
                res.status(400).end('Already exist');
                return;
            }
            const lastId = users[users.length - 1].id;
            const id = lastId+1
            users.push({id, email, password});

            await writeUserInFile(USER_PATH, users);
            res.json('ok')
        } catch (e) {
            console.log(e);
        }


    },
}
