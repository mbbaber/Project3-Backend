const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: { type: String, required: true },
    admin: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    subjects: [{
        type: Schema.Types.ObjectId,
        ref: "Subject",
    }]
}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;