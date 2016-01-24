/**
 * ChoreController
 *
 * @description :: Server-side logic for managing Chores
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getChores: function (req, res) {
        ChoreService.getChores(req.body, function (chores) {
            res.json(chores);
        });
    },
    addChore: function (req, res) {
        console.log("chore controller addChore req.body", req.body);
        var choreName = (req.body.name) ? req.body.name : undefined
        console.log("chore controller addChore choreVal", choreName);
        ChoreService.addChore(req.body, function (success) {
            console.log("chore controller addChore success", success);
            res.json(success);
        });
    },
    updateChore: function (req, res) {
        console.log("chore controller updateChore req.body", req.body);
        ChoreService.updateChore(req.body[0], req.body[1], function (success) {
            console.log("chore controller updateChore success", success);
            res.json(success);
        });
    },
    removeChore: function (req, res) {
        console.log("chore controller removeChore req.body", req.body);
        console.log("chore controller removeChore req.body.id", req.body.id);
        var choreName = (req.body.name) ? req.body.name : undefined
        ChoreService.removeChore(req.body, function (success) {
            res.json(success);
        });
    }
};
