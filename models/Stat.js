const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statSchema = new Schema({
       card: {
        type: Schema.Types.ObjectId
        },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: "Group"
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: "Subject"
    },

    rating: { type: Number, enum: [0, 1, 2, 3, 4, 5], default: 0 },
    seen: { type: Number, default: 0 }



}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Stat = mongoose.model('Stat', statSchema);
module.exports = Stat;