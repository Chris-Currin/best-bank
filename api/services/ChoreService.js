module.exports = {
    getChores: function (where, next) {
        if (typeof (where) == 'undefined') {
            where = {};
        }
        Chore.find(
            where
        ).exec(function (err, chores) {
            if (err) {
                throw err;
            }
            next(chores);
        })
    },
    addChore: function (choreBody, next) {
        console.log("backend ChoreService addChore", choreBody);
        Chore.create({
            name: choreBody.name,
            dueDate: choreBody.dueDate,
            reward: choreBody.reward
        }).exec(function (err, chore) {
            if (err) {
                throw err;
            }
            next(chore);
        })
    },
    updateChore: function (criteria, updatedVals, next) {
        console.log("backend ChoreService updateChore", criteria);
        Chore.update(criteria, updatedVals).exec(function (err, chore) {
            if (err) {
                throw err;
            }
            next(chore);
        })
    },
    removeChore: function (choreBody, next) {
        Chore.destroy({
            id: choreBody.id
        }).exec(function (err, chore) {
            if (err) {
                throw err;
            }
            next(chore);
        })
    }
}
