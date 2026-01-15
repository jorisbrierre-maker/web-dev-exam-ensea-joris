// ============================================
// IMPORTS - Modules nécessaires
// ============================================
import { getOneRecipe, deletOneRecipe } from "./api.js"
import { renderRecipeCard, renderSingleRecipe, clearRecipesList } from "./ui.js"

const loadRecipe = async (recipeId) => {
	try {
		// Appeler l'API pour récupérer la recette par son ID
		const recipe = await getOneRecipe(recipeId)

		// Afficher la recette dans la grid
		displaySingleRecipe(recipe)

		// Configure delete button with current recipe ID
		const deleteButton = document.getElementById("delete-recipe-btn")
		if (deleteButton) {
			deleteButton.onclick = async () => {
				if (confirm("Êtes-vous sûr de vouloir supprimer cette recette ?")) {
					try {
						await deletOneRecipe(recipeId)
						alert("Recette supprimée avec succès")
						window.location.href = "index.html"
					} catch (error) {
						console.error("Erreur suppression:", error)
						alert("Erreur lors de la suppression")
					}
				}
			}
		}
	} catch (error) {
		console.error("Erreur lors du chargement de la recette:", error.message)
		alert(
			"Impossible de charger la recette. Vérifiez que le serveur est demarré."
		)
	}
}

// ============================================
// INITIALISATION DE L'APPLICATION
// ============================================
// Cette fonction est appelée automatiquement au chargement de la page
// Elle charge et affiche toutes les recettes

const setupEventListeners = () => {
	const loader = document.getElementById("loading-spinner")
	const recipeDetail = document.getElementById("recipe-detail")
	const deleteButton = document.getElementById("delete-recipe-btn")

	if (loader) {
		loader.classList.add("d-none")
	}
	if (recipeDetail) {
		recipeDetail.classList.remove("d-none")
	}

	if (deleteButton) {
		deleteButton.addEventListener("click", () => {
			alert("Fonction de suppression non implémentée.")
		})
	}
}

document.addEventListener("DOMContentLoaded", () => {
	// receive recipe id from url
	const urlParams = new URLSearchParams(window.location.search)
	const recipeId = urlParams.get("id")
	console.log("API recipeData:", recipeId)
	loadRecipe(recipeId)
	setupEventListeners()
})

// ============================================
// AFFICHER LES RECETTES DANS LA GRID
// ============================================
// Fonction fournie - génère le HTML pour toutes les recettes

const displaySingleRecipe = (recipe) => {
	// Récupérer le conteneur où afficher les recettes
	const recipesDetails = document.getElementById("recipe-detail")

	// Vider le conteneur avant d'ajouter les nouvelles recettes
	clearRecipesList(recipesDetails)

	// Si il n'y a pas de recette, afficher un message
	if (!recipe) {
		recipesDetails.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info text-center" role="alert">
                    Recette non-disponible. Veuillez revenir plus tard !
                </div>
            </div>
        `
		return
	}

	recipesDetails.innerHTML = renderSingleRecipe(recipe)
}
