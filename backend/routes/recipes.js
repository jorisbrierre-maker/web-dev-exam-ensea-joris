import { Router } from "express"
import {
    getRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    searchRecipes,
} from "../controllers/recipesController.js"

const router = Router()

router.get("/", getRecipes)
router.post("/", createRecipe)
router.get("/search", searchRecipes)
router.get("/:id", getRecipeById)
router.put("/:id", updateRecipe)
router.delete("/:id", deleteRecipe)

export default router
