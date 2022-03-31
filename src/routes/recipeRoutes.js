import express from 'express'
import {
    addRecipe,
    removeRecipe,
    getRecipeDetail,
    searchRecipe
} from '../controllers/recipeControllers.js'

import protect from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/addRecipe').post(protect, addRecipe)
router.route('/removeRecipe').post(protect, removeRecipe)

router.route('/getRecipeDetail').get(getRecipeDetail)
router.route('/searchRecipe').get(searchRecipe)

export default router