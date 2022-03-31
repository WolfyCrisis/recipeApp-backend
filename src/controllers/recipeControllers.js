import mongoose from "mongoose"
import asyncHandler from 'express-async-handler'

import Recipe from '../models/recipeModels.js'
import User from '../models/userModels.js'

import {
    nullValidator,
    ownerValidator
} from '../validators/index.js'

export const addRecipe = asyncHandler(async(req, res) => {
    const { name, type, desc, ingredients, methods } = req.body

    if (nullValidator(name, type, desc, ingredients, methods)) {
        const recipe = await Recipe.create({
            _id: mongoose.Types.ObjectId(),
            name: name,
            type: type,
            desc: desc,
            ingredients: ingredients,
            methods: methods,
            author: {
                _id: req.user._id,
                name: req.user.name
            }
        })

        const user = await User.updateOne({ _id: req.user._id },
            { $addToSet: {
                createdRecipes: {
                    _id: recipe._id,
                    name: recipe.name
                }
            }})

        if (recipe) {
            res.status(200).json('Recipe Created.')
        } else {
            res.status(400).json('Recipe unable to create.')
        }
    } else {
        res.status(404).json('Some data not inputted.')
    }
})

export const removeRecipe = asyncHandler(async(req, res) => {
    const { recipeID } = req.body

    const recipe = await Recipe.findOne({ _id: recipeID })
    const user = await User.findOne({ _id: req.user._id })

    if (ownerValidator(recipe.author._id, user._id)) {
        const recipeRemove = await Recipe.deleteOne({ _id: recipeID })
        res.status(200).json('Recipe Deleted.')
    } else {
        res.status(401).json('Recipe can\'t be deleted by not Owner')
    }
})

export const getRecipeDetail = asyncHandler(async(req, res) => {
    const { recipeID } = req.body

    const recipe = await Recipe.findOne({ _id: recipeID })

    if (recipe) {
        res.status(200).json({
            recipe: {
                recipeID: recipe._id,
                name: recipe.name,
                type: recipe.type,
                desc: recipe.desc,
                ingredients: recipe.ingredients,
                methods: recipe.methods
            }
        })
    } else {
        res.status(404).json('Recipe not found.')
    }
})

export const searchRecipe = asyncHandler(async(req, res) => {
    const recipeName = req.query.name
    const recipeType = req.query.type
    let recipes = []

    if (nullValidator(recipeName, recipeType)) {
        const cursor = await Recipe.find(
            { $and: 
                [
                    { name: { $regex: new RegExp(`${recipeName}`, 'i')}},
                    { type: { $regex: new RegExp(`^${recipeType}$`, 'i')}}
                ]
            }
        )

        cursor.forEach(doc => recipes.push(doc))

        res.status(200).json(recipes)
    } else {
        res.status(400).json('Search Error.')
    }
})
