const { getUsersFromFile } = require('../service/user.service');
const { USER_PATH } = require('../config/variable');

module.exports = {
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      const users = await getUsersFromFile(USER_PATH);
      const user = users.find((value) => value.email === email && value.password === password);

      if (user) {
        res.redirect(`/users/${user.id}`);
        // res.status(200).json('user is login')

        return;
      }
      res.status(400).redirect('/register');
    } catch (e) {
      console.log(e);
    }
  },
};
