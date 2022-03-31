import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

import User from '../models/userModels.js'

import generateToken from '../utils/generateToken.js'

import {
    emailValidator,
    passwordValidator
} from '../validators/index.js'

export const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email: email })

    if (user && (await user.matchPassword(password))) {
        res.status(200).json({
            accessToken: generateToken(user._id)
        })
    } else {
        res.status(401).json('Invalid Email or Password.')
    }
})

export const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body

    if (emailValidator(email) && passwordValidator(password)) {

        const userExist = await User.findOne({ email: email })

        if (userExist) {
            res.status(400).json('User already exists.')
        } else {
            const user = await User.create({
                _id: mongoose.Types.ObjectId(),
                name: name,
                email: email,
                password: password
            })

            if (user) {
                res.status(201).json({
                    _id: user._id,
                    accessToken: generateToken(user._id)
                })
            } else {
                res.status(400).json('Invalid user data.')
            }
        }
    }

    if (!emailValidator(email)) {
        res.status(400).json('Invalid email format.')
    } else if (!passwordValidator(password)) {
        res.status(400).json('Password too short / long. (6 - 18)')
    }
})

export const verifyToken = asyncHandler(async(req, res) => {
    jwt.verify(req.query.token, process.env.JWT_TOKEN, (err, verifiedJWT) => {
        if (err) {
            res.status(401).json(err)
        } else {
            res.status(200).json('Valid Token.')
        }
    })
})

export const getUserProfile = asyncHandler(async(req, res) => {

    const user = await User.findById(req.user)

    if (user) {
        res.status(200).json({
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400).json('User not found.')
    }
})