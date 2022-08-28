const userService = require('../../service/user');
const jwt_decode = require("jwt-decode");
const authConstant = require('../../constant/authConstant')

class UserController {

    async getUser(req, res, next) {
        try {
            const user = await userService.getUser({id: req.params.id});
            if (!user) res.json({ "error": true, "message": "User not exist!", "data": null });
            res.json({ "error": false, "message": "User detail found!", "data": user });
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }

    async getAllUser(req, res, next) {
        try {
            const user = await userService.getAllUser();
            if (!user.length) res.json({ "error": true, "message": "User not exist!", "data": null });
            res.json({ "error": false, "message": "User detail found!", "data": user });
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }

    async deleteUser(req, res, next) {
        try {
            var decoded = jwt_decode(req.headers.authorization);
            let uid = decoded.id;
            if (!req.params.id) {
                res.json({ "error": true, "message": "'Insufficient request parameters! id is required.'" })
            }
            const userDetail = await userService.getUser({ "id": req.params.id });
            if (!userDetail) {
                res.json({ "error": true, "message": "User not exist!" })
            }
            let { id, userType } = userDetail;
            if (userType == authConstant.userType.admin) {
                if(id != uid) {
                    res.json({ "error": true, "message": "You not able to delete any other admin user!" });
                }
                const del = await userService.deleteUserByAdmin({id: req.params.id});
                if (!del) res.json({ "error": true, "message": "Issue in user deletion!", "data": null });
                res.json({ "error": false, "message": "User deleted successfully!" });
            }
            const del = await userService.deleteUserByAdmin({id: req.params.id});
            if (!del) res.json({ "error": true, "message": "Issue in user deletion!", "data": null });
            res.json({ "error": false, "message": "User deleted successfully!" });
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }

}

module.exports = new UserController();
