import "./style/UpdateRecipe.css";
import { useEffect, useState, useRef } from "react";
import { getOneRecipe, updateRecipe } from "../services/api-recipe";
import { IRecipe, IIngredients, IRecipeDataUpdate } from "../@types";
import { toast } from "react-toastify";
import { createIngredient } from "../services/api-ingredient";
import { useVar } from "../contexts/var.context";
import { useNavigate, useParams } from "react-router";
import { useModal } from "../contexts/modal.context";
import { deleteFile, uploadNewFile } from "../services/api-upload";
import { useAuthVerification } from "../utils/utils.authVerification";
import ValidateButton from "../components/Button/ValidateButton/ValidateButton";
import ModalUpdateRecipeBox from "../components/ModalUpdateRecipeBox/ModalUpdateRecipeBox";
import { useQuery } from "@tanstack/react-query";

export default function UpdateRecipe() {
  const refContainerInstructions = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { id } = useParams(); // id est une chaîne de caractères
  const { setUpdateTriggerRecipes, categories, diets, ingredients, setUpdateTriggerIngredients } = useVar();
  const [ recipe, setRecipe ] = useState<IRecipe | null>(null);
  const [ tabInstructions, setTabInstructions ] = useState<string[]>([]);
  const [ tabIngredients, setTabIngredients ] = useState<IIngredients[]>([]);
  const { setIsModalUpdateRecipeOpen } = useModal();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const recipeId = id ? parseInt(id, 10) : null; // Convertir en nombre ou mettre null si id est undefined
  
  function handleCategoryChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedCategory = categories.find(category => category.id === parseInt(event.target.value));
    if (selectedCategory) {
      setRecipe(recipe ? {
        ...recipe, 
        category: selectedCategory,
        category_id: selectedCategory.id
      } : null);
    }
  }

  // Gestion des instructions et split dans un tableau
  function instructionSplit(instruction: string) {
    const newInstructions = instruction.split('§');
    const newTabInstructions = newInstructions.filter(instruction => instruction !== '');
    setTabInstructions(newTabInstructions);
  }

  // Gestion des régimes ET des inputs checkbox
  function handleRegimeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const dietsFromRecipe = recipe?.Diets || [];
    const selectedRegime = diets.find(diet => diet.id === parseInt(event.target.id));
    if (selectedRegime) {
      const updatedDiet = dietsFromRecipe.find(diet => diet.id === selectedRegime.id)
      if(updatedDiet) {
        const updatedDiets = dietsFromRecipe?.filter(diet => diet.id !== updatedDiet.id);
        setRecipe(recipe ? {...recipe, Diets: updatedDiets} : null);
        return;
      }
      setRecipe(recipe ? {...recipe, Diets: [...dietsFromRecipe, selectedRegime]} : null);  
    }
  }

  // Utilisation de React Query pour gérer la requête
  const { data, isLoading, error } = useQuery({
    queryKey: ["recipe", recipeId],
    queryFn: () => getOneRecipe(Number(recipeId)),
    retry: 2, // Nombre de tentatives en cas d'échec
  });

  useEffect(() => {
    if( data ) { setRecipe(data) }
  }, [data]);
  
  // Gestion des instructions
  useEffect(() => {
    if (recipe?.instruction) {
      instructionSplit(recipe?.instruction);
    }
  }, [recipe?.instruction]);

  // Gestion des ingrédients
  useEffect(() => {
    if (recipe?.Ingredients) {
      setTabIngredients(recipe.Ingredients);
    }
  }, [recipe?.Ingredients]);

  // Gestion de la suppression d'une instruction
  function handleDeleteInstruction(index: number) {
    const newTabInstructions = tabInstructions.filter((_, i) => i !== index);
    setTabInstructions(newTabInstructions);
  }

  // Gestion de l'ajout d'une instruction
  function handleAddInstruction() {
    setTabInstructions([...tabInstructions, ""]);
    if (refContainerInstructions.current) { // a voir l'utilité de ses lignes
      refContainerInstructions.current.scrollTop = refContainerInstructions.current.scrollHeight;
    }
  }

  // Gestion de l'ajout d'un ingrédient
  function handleAddIngredient() {
    setTabIngredients([...tabIngredients, {
      id: 0, 
      name: "", 
      created_at: "", 
      updated_at: "", 
      deleted_at: "", 
      recipe_ingredient_assignation: {
        quantity: 0, 
        unit: ""
      }
    }]);
  }

  // Gestion de la suppression d'un ingrédient
  function handleDeleteIngredient(index: number) {
    const newTabIngredients = tabIngredients.filter((_, i) => i !== index);
    setTabIngredients(newTabIngredients);
  }

  // Gestion de la soumission du formulaire
  async function handleSubmitRecipe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = recipe?.title;
    const description = recipe?.description;
    const duration = recipe?.duration;
    const difficulty = recipe?.difficulty;
    const instruction = tabInstructions.join("§");
    const image = recipe?.image;
    const movie_id = recipe?.movie_id;
    const category_id = recipe?.category_id;
    const user_id = recipe?.user_id;
    const diets = recipe?.Diets?.map(diet => diet.id);
    const newIngredients = await verifyIngredients(tabIngredients);

    //tableau à envoyer à l'api
    const recipeData : IRecipeDataUpdate = {
      title: title ?? "",
      description: description ?? "",
      duration: duration ?? 0,
      difficulty: difficulty ?? "",
      instruction: instruction ?? "",
      image: image ?? "",
      movie_id: movie_id ?? 0,
      category_id: category_id ?? 0 ,  
      user_id: user_id ?? 0,
      diets: diets ?? [],
      validated: false,
      ingredients: newIngredients ?? [],
    };

    if (!recipeId) {
      console.error("le id de la recette n'existe pas");
      return;
    }
    const updatedRecipe = await updateRecipe(recipeId, recipeData);
    if (!updatedRecipe) {
      setIsModalUpdateRecipeOpen(false)
      toast.error("Erreur lors de la mise à jour de la recette");
      return;
    }
    setIsModalUpdateRecipeOpen(false)

    if (selectedImage && recipe) {
      try {
        setIsUpdating(true); // Indique qu'une mise à jour est en cours
        const deleted = await deleteFile(recipe.id);    
        if (!deleted) {
          toast.error("Problème de suppression des images");
          setIsUpdating(false);
          return;
        }
        const uploadResult = await uploadNewFile(selectedImage, recipe.id);
        if (!uploadResult) {  // Vérifie si l'upload a bien retourné quelque chose
          toast.error("Problème lors de l'upload de la nouvelle image");
          setIsUpdating(false);
          return;
        }
        toast.success("Recette mise à jour avec succès"); 
        setUpdateTriggerRecipes(prev => !prev);  
        navigate("/myRecipes"); // Redirige après l'upload     
      } catch (error) {
        console.error("Erreur lors du remplacement de l'image:", error);
      } finally {
        setIsUpdating(false); // Fin de la mise à jour
      }
    } else {
      toast.success("Recette mise à jour avec succès");
      setUpdateTriggerRecipes(prev => !prev);
      navigate("/myRecipes"); // Redirige immédiatement
    }   
  }

  // Gestion de la vérification des ingrédients
  async function verifyIngredients(recipeIngredients: IIngredients[]) {
    const newTabIngredients : {
      ingredient_id: number;
      quantity: number;
      unit: string;
    }[] = [];
    // mettre le premier caractère en majuscule
    const newTabIngredientsUppercase = recipeIngredients.map(ingredient => ({
      ...ingredient,
      name: ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1)
    }));
    // Vérification de l'existence des ingrédients
    for (const ing of newTabIngredientsUppercase) {
      const ingredientFromApi = ingredients.find(ingredient => ingredient.name === ing.name);
      if (!ingredientFromApi) {
        const newIngredient = await createIngredient(ing);
        if (!newIngredient) {
          toast.error("Erreur lors de la création de l'ingrédient");
          return;
        } 
        newTabIngredients.push({
          ingredient_id: newIngredient.id,
          quantity: ing.recipe_ingredient_assignation.quantity,
          unit: ing.recipe_ingredient_assignation.unit
        });
        setUpdateTriggerIngredients(((prev) => !prev)) // Update de la liste des ingrédients
      } else {
        newTabIngredients.push({
          ingredient_id: ingredientFromApi.id,
          quantity: ing.recipe_ingredient_assignation.quantity,
          unit: ing.recipe_ingredient_assignation.unit
        });
      }
    }
    return newTabIngredients;
  }

  // Input mise en place de l'image
  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  }

  // Vérification de l'authentification
  useAuthVerification("user");
  
  return (
    <>
    {/* Gestion du chargement */}
    {isLoading && <p className="loading_message">Chargement de la recette. Votre séance va commencer...</p>}
    {/* Gestion des erreurs */}
    {error && <p className="error_message">Impossible de charger la recette. Veuillez réessayer plus tard.</p>}
    
    {/* Affichage des recettes si elles sont disponibles */}
    {data && (
    <div className="recipe_update_container section">
      <div className="recipes_update_container_infos">
        <div className="recipes_update_container_infos_title">
          <h2>Modification {recipe?.title}</h2>
          <p>Réalisée par : {recipe?.user.first_name}</p>
          <p>Difficulté : {recipe?.difficulty}</p>
          <p>Durée : {recipe?.duration} minutes</p>
          <p>Film associé : {recipe?.movie.title}</p>
          <time className="recipes_update_container_infos_title_date" dateTime={recipe?.created_at}>
            <p>Créé le : </p>
            {recipe?.created_at && new Date(recipe?.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
          </time>
        </div>
        <div className="recipes_update_container_infos_image">
          <img src={recipe?.image} alt={recipe?.title} />
        </div>
      </div>

      <form className="recipes_update_container_form"  onSubmit={(event) => {
          event.preventDefault();}} >
        <div className="recipes_update_container_title">
           <label htmlFor="title">Titre de la recette</label>
           <input  type="text" id="title" name="title" value={recipe?.title ?? ""} onChange={(e) => setRecipe(recipe ? {...recipe, title: e.target.value} : null)} />  
        </div>
        <div className="recipes_update_container_duration">
          <label htmlFor="duration">Durée en minutes</label>
          <input type="number" id="duration" name="duration" value={recipe?.duration ?? ""} onChange={(e) => setRecipe(recipe ? {...recipe, duration: parseInt(e.target.value)} : null)} />
        </div>
        <div className="recipes_update_container_difficulty">
          <label htmlFor="difficulty">Difficulté</label>
          <select id="difficulty" name="difficulty" value={recipe?.difficulty ?? ""} onChange={(e) => setRecipe(recipe ? {...recipe, difficulty: e.target.value} : null)}>
            <option value="Facile">Facile</option>
            <option value="Moyen">Moyen</option>
            <option value="Difficile">Difficile</option>
          </select>
        </div>
        <div className="recipes_update_container_description  ">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={recipe?.description ?? ""} onChange={(e) => setRecipe(recipe ? {...recipe, description: e.target.value} : null)} />
        </div>
        <div className="recipes_update_container_categories">
          <label htmlFor="categories">Catégories</label>
          <select id="categories" name="categories" value={recipe?.category.id ?? ""} onChange={(e) => handleCategoryChange(e)}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        {/* Gestion des régimes */}
        <div className="recipes_update_container_regime">
          <label> Régime(s) Alimentaire</label>
          {
            diets.map((regime) => (
              <div className="recipes_update_container_regime_inputs" key={regime.id}>
                <input type="checkbox" id={regime.id.toString()} name={regime.name} checked={recipe?.Diets?.some(diet => diet.id === regime.id)} onChange={(e) => handleRegimeChange(e)} />
                <label htmlFor={regime.id.toString()}>{regime.name}</label>
              </div>
            ))
          }
        </div>
        {/* Gestion des instructions */}
        <div className="recipes_update_container_instructions">
          <div className="recipes_update_container_instructions_title">
            <h3>Instructions</h3>
            <button className="recipes_update_container_instructions_button" type="button" onClick={() => handleAddInstruction()}>+</button>
          </div>
          <div ref={refContainerInstructions} className="recipes_update_container_instructions_content">
            {tabInstructions.map((instruction, index) => (
              <div key={index} className="recipes_update_container_instructions_content_input_container">
                <input className="recipes_update_container_instructions_content_input" 
                type="text" id={`instruction-etape-${index}`} 
                name={`instruction-etape-${index}`} 
                value={instruction} 
                onChange={(e) => setTabInstructions(tabInstructions.map((instruction, i) => i === index ? e.target.value : instruction))} />
                <button className="recipes_update_container_instructions_content_button" type="button" onClick={() => handleDeleteInstruction(index)}>🗑️</button>
              </div>
            ))}
          </div>
        </div>
        {/* Gestion des ingrédients */}
        <div className="recipes_update_container_ingredients">
          <div className="recipes_update_container_ingredients_title">
          <h3>Ingrédients</h3>
          <button className="recipes_update_container_ingredients_button" type="button" onClick={() => handleAddIngredient()}>+</button>
          </div>
          <div className="ingredients_container_infos">
              <h6>Ingrédient</h6>
              <h6>Quantité</h6>
              <h6>Unité</h6>   
          </div>
            <div className="recipes_update_container_ingredients_content">
            {tabIngredients.map((ingredient, index) => (
              <div key={index} className="recipes_update_container_ingredients_content_input_container">
                <input type="text" 
                  id={`ingredient-name-${index}`} 
                  name={`ingredient-name-${index}`} 
                  value={ingredient.name ?? ""} 
                  onChange={(e) => setTabIngredients(tabIngredients.map((ingredient, i) => 
                    i === index ? {...ingredient, name: e.target.value} : ingredient
                  ))} 
                />

                <input type="number" 
                id={`ingredient-quantity-${index}`} 
                name={`ingredient-quantity-${index}`} 
                value={ingredient.recipe_ingredient_assignation.quantity ?? ""} 
                onChange={(e) => setTabIngredients(tabIngredients.map((ingredient, i) => i === index ? {...ingredient, recipe_ingredient_assignation: {...ingredient.recipe_ingredient_assignation, quantity: parseInt(e.target.value)}} : ingredient))} />

                <input type="text" 
                id={`ingredient-unit-${index}`} 
                name={`ingredient-unit-${index}`} 
                value={ingredient.recipe_ingredient_assignation.unit ?? ""} 
                onChange={(e) => setTabIngredients(tabIngredients.map((ingredient, i) => i === index ? {...ingredient, recipe_ingredient_assignation: {...ingredient.recipe_ingredient_assignation, unit: e.target.value}} : ingredient))} />
                <button className="recipes_update_container_ingredients_content_button" type="button" onClick={() => handleDeleteIngredient(index)}>🗑️</button>
              </div>
            ))}
          </div>
        </div>
        <div className="recipes_update_container_image">
          <label className="recipes_update_container_image_label" htmlFor="image">Modifier l'image</label>
          <input 
            type="file" 
            id="image" 
            name="image" 
            accept="image/*" 
            onChange={handleImageChange} 
          />
        </div>

        <div className="validate_button_update_recipe">
          <ValidateButton text={isUpdating ? "Mise à jour en cours..." : "Mettre à jour"} type="button" onClick={() => setIsModalUpdateRecipeOpen(true)} />
        </div>
      </form>
      
      {/* film associé */}
      <div className="recipes_update_container_movie">
        <div className="recipes_update_container_movie_infos">
         <h3>Film associé</h3>
         <p>{recipe?.movie.title}</p>
         <p>{recipe?.movie.year}</p>
        </div>
        <div className="recipes_update_container_movie_content">
          <img src={recipe?.movie.image} alt={recipe?.movie.title} />
        </div>
      </div>
       <ModalUpdateRecipeBox title={recipe?.title || ""} onClick={() => handleSubmitRecipe(event as never)}/>
    </div>
      )} 
    </>
  );
}


