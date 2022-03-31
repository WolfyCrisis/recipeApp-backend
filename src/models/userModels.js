import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdRecipes: [{
        _id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'recipe'
        },
        name: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, Number(process.env.BCRYPT_SALT))
})

const User = mongoose.model('user', userSchema)

export default User