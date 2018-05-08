const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    name: { type: String, required: true },
    keywords: [ { type: String } ],
    cards: [
        {
            front: { type: String, required: true },
            back: { type: String, required: true },
        }
    ]
}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;