/**
 * Chore.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        name: {
            'type': 'text'
        },
        dueDate: {
            'type': 'date'
        },
        reward: {
            'type': 'float'
        },
        done: {
            'type': 'boolean',
            defaultsTo: false
        }
    }
};
