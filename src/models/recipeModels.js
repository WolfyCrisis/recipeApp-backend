import mongoose from 'mongoose'

const { Schema } = mongoose

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    ingredients: [{
        type: String,
        required: true
    }],
    methods: [{
        type: String,
        required: true
    }],
    author: {
        _id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'user'
        },
        name: {
            type: String,
            required: true
        }
    }
}, {
    timestamps: true
})

const Recipe = mongoose.model('recipe', recipeSchema)

export default Recipe