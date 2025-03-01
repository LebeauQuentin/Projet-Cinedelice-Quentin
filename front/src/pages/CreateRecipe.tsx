import "./style/CreateRecipe.css"
import { useCallback, useEffect, useRef, useState} from "react";
import { useVar } from "../contexts/var.context";
import { IIngredientsList } from "../@types";
import { createRecipe, updateRecipe } from "../services/api-recipe";
import { createIngredient } from "../services/api-ingredient";
import { useAuth } from "../contexts/auth.context";
import { createMovie } from "../services/api-movie";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { uploadNewFile } from "../services/api-upload";
import MovieCreateForm from "../components/MovieCreateForm/MovieCreateForm";
import ValidateButton from "../components/Button/ValidateButton/ValidateButton";
import { useAuthVerification } from "../utils/utils.authVerification";

export default function RecipeCreateForm () {
  // Définition du logo (O'clock Présente sur HomePage / Cinedelices sur les autres)
  const { setHeaderLogo } = useVar()

  useEffect(() => {
    setHeaderLogo("CineDelices");
  }, [setHeaderLogo]);

  // Données du Context et Redirection
  const navigate = useNavigate();
  const { ingredients, setUpdateTriggerIngredients, 
          categories, diets,
          setUpdateTriggerRecipes, setUpdateTriggerMovies } = useVar();
  const { user } = useAuth();

  // ================================
  // ====== Gestion Ingrédients =====
  // ================================
  const [ingredient, setIngredient] = useState(""); // je stock la valeur de l'input des ingredients
  const [ingredientList, setIngredientList] = useState<IIngredientsList[]>([]); //je stock l'ensemble des ingredients
  const [currentQuantity, setCurrentQuantity] = useState("")
  const [currentUnit, setCurrentUnit] = useState("")
  // Fonction AddIngredient qui ajoute l'ingredient à une liste et créé un nouvel input
  const handleAddIngredient = async (
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault(); // Empêche le comportement par défaut (formulaires)
  
    if (ingredient.trim() && currentQuantity && currentUnit) {
      const ingredientObject = ingredients.find(
        (ing) => ing.name.toLowerCase() === ingredient.trim().toLowerCase()
      );
  
      if (ingredientObject) {
        const newIngredient = {
          ingredient_id: ingredientObject.id,
          quantity: Number.parseFloat(currentQuantity),
          unit: currentUnit,
        };
        setIngredientList((prev) => [...prev, newIngredient]);
      } else {
        try {
          const formattedIngredient =
            ingredient.trim().charAt(0).toUpperCase() + ingredient.trim().slice(1).toLowerCase();
  
          const ingredientData = { name: formattedIngredient };
  
          const createdIngredient = await createIngredient(ingredientData);
          if (createdIngredient) {
            setUpdateTriggerIngredients((prev) => !prev);
          }
  
          const newIngredient = {
            ingredient_id: createdIngredient.id,
            quantity: Number.parseFloat(currentQuantity),
            unit: currentUnit,
          };
  
          setIngredientList((prev) => [...prev, newIngredient]);
        } catch (error) {
          console.error("Erreur lors de la création de l'ingrédient :", error);
        }
    }

    // Réinitialisation des champs
    setIngredient("");
    setCurrentQuantity("");
    setCurrentUnit("");
  }
  };
  const handleKeyDownIngredient = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddIngredient(event);
    }
  };
  //Fonction DeleteIngredient qui efface l'ingredient auquel le bouton est associé
  const handleRemoveIngredient = (index: number, event: React.MouseEvent) => {
  event.preventDefault()
  setIngredientList(ingredientList.filter((_, i) => i !== index)); // Filtrer pour enlever l'élément
  }

  // ========================
  // ====== INSTRUCTION =====
  // ========================
  {/*Ajout et suppression des instructions pour la recette*/}
  const [instruction, setInstruction] = useState(""); // je stock la valeur de l'input des ingredients
  const [instructionsList, setInstructionsList] = useState<string[]>([]); //je stock l'ensemble des ingredients
  //Faire une fonction AddInstruction qui ajoute l'ingredient à une liste et créé un nouvel input
  const handleAddInstruction = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
    //Bloquer de l'ajout d'un string vide
      if(instruction.trim()) {
    // On rajoute l'ingredient à la suite de la liste
    setInstructionsList([...instructionsList, instruction.trim()])
    //On reinitialise l'input ingredient
    setInstruction("")
    } 
  }
  const handleKeyDownInstruction = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
    event.preventDefault()
    setInstructionsList([...instructionsList, instruction.trim()])
    //On reinitialise l'input ingredient
    setInstruction("") 
    }
  }
   //Fonction pour supprimer une instruction
   const handleRemoveInstruction = (index: number, event: React.MouseEvent) => {
    event.preventDefault()
    setInstructionsList(instructionsList.filter((_, i) => i !== index)); // Filtrer pour enlever l'élément
  }

  // ==================
  // ===== Régime =====
  // ==================
  // Je stock la valeur des checkboxes cochées sous forme d'une string
  const [dietList, setDietList] = useState<number[]>([]);
  //Fonction pour ajouter une diet à dietList
  const handleAddDiet = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    // On convertit en nombre car event.target par default est une string
    const dietId = Number(value); 
    setDietList((prev) =>
      checked ? [...prev, dietId] : prev.filter((diet) => diet !== dietId));
  }
  
  // ================
  // ===== Film =====
  // ================
  const [movieId, setMovieId] = useState(0); // Nouvel état pour gérer l'ID du film
  // Utilisation de la variable en sécu, si le film est créer et pas la recette, dans le nouveau film est selectionné.
  const [movieIsCreated, setMovieIsCreated] = useState(0)// le 0 se transformera en id du film

  // ===================
  // ===== Recette =====
  // ===================
  const [description, setDescription] = useState("");
  const [pendingRecipe, setPendingRecipe] = useState<FormData | null>(null);

  // ==========================
  // ===== Fichier Upload =====
  // ==========================
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };
    const handleRemoveFile = () => {
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Réinitialise le champ file
      }
    };

  // ======================================
  // ====== Soummission du Formulaire =====
  // ======================================
  // Fonction pour recuperer les données du formulaire
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setMovieIsCreated(0)
  
    const isValidate = validateForm(formData)

    // Valider le formulaire
    if (!isValidate) {
      toast.error("Veuillez corriger les erreurs du formulaire.");
      return;
    }

    // MOVIE
      // On reformate le titre
      const titleFromMovieInput = formData.get("movieTitle") as string;
    
    if (movieId === 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const movieData: Record<string, any> = {
        title: titleFromMovieInput.charAt(0).toUpperCase() + titleFromMovieInput.slice(1).toLowerCase(),
        year: formData.get("year")?.toString().trim() ? Number(formData.get("year")) : null,
        category: formData.get("movieCategory")?.toString().trim(),
        director: formData.get("director")?.toString().trim(),
        actors: formData.get("actors")?.toString().trim(),
        description: formData.get("movieDescription")?.toString().trim(),
        funfact: formData.get("anecdote")?.toString().trim(),
        image: "http://localhost:3000/images-recettes/crime_scene.jpg",
      };
      // Suppression des données vide sur les inputs non required (les laisser générait un crash)
      Object.keys(movieData).forEach((key) => {
        if (!movieData[key]) delete movieData[key];
      });
      // Création du film
      const createdMovie = await createMovie(movieData);
      if (createdMovie) {
        toast.success("Film créé avec succès !");
        setMovieId(createdMovie.id);
        setPendingRecipe(formData); // Stocke les données de la recette en attente
        setUpdateTriggerMovies(((prev) => !prev)) // Update de la liste des films
        setMovieIsCreated(createdMovie.id)
        return;
      } else {
        return toast.error("La création de film a échoué.");
      }
    }
    if (!movieId) {
      return toast.error("Associez un film à la recette");
    }
    submitRecipe(formData);
  }

  // Fonction Callback pour envoyer le formulaire de recette
  const submitRecipe = useCallback(async (formData: FormData) => {
    // On reformatte le titre
    const titleFromInput = formData.get("title") as string;

    const title = titleFromInput.charAt(0).toUpperCase() + titleFromInput.slice(1).toLowerCase();
    const description = formData.get("description") as string;
    const duration = Number(formData.get("duration"));
    const difficulty = formData.get("difficulty") as string;
    const ingredients = ingredientList;
    const instruction = instructionsList.map(inst => `§${inst}`).join(", ");
    const diets = dietList.map(Number);
    const category_id = Number(formData.get("category"));
    const movie_id = movieId;
    const user_id = Number(user?.id);
    const imageRecipeFile = "http://localhost:3000/images-recettes/crime_scene.jpg" // Lien random avant d'avoir l'id de la recette
    // Création de la recette
    const createdRecipe = await createRecipe(
      title,
      description,
      duration,
      difficulty,
      ingredients,
      instruction,
      diets,
      category_id,
      movie_id,
      user_id,
      imageRecipeFile
    );

    if(createdRecipe){
      // On envoit l'image, la convertie, la renomme et met à jour le lien de l'image de la recette
      const file = formData.get("image") as File;
      const idToSend = createdRecipe.id
      const sendNewFile = await uploadNewFile(file, idToSend);
      if (sendNewFile){
        const updatedRecipeData = {
          image: `http://localhost:3000/images-recettes/${idToSend}_normal.webp`,
        }
        const createdRecipeUpdate = await updateRecipe(idToSend, updatedRecipeData)
          if(!createdRecipeUpdate) {
            toast.error("Problème lors de mise à jour de la recette l'image.");
          }
      } else {toast.error("L'envoi d'image a échoué.");}
  
      // La recette est crée !    
      toast.success("Recette créée avec succès !");
        setUpdateTriggerRecipes((prev) => !prev);
        navigate("/MyRecipes");
        setIngredientList([]);
        setInstructionsList([]);
        setCurrentQuantity("");
        setCurrentUnit("");
        setDietList([]);
        setMovieIsCreated(0)
      } else {
        toast.error("La création de recette a échoué.");
      }
  }, [navigate, ingredientList, instructionsList, dietList, movieId, user, setUpdateTriggerRecipes]);

  // Soumission de la recette puis remise à zéro des données du formulaire mis en cache
  useEffect(() => {
    if (movieId !== 0 && pendingRecipe) {
      submitRecipe(pendingRecipe);
      setPendingRecipe(null);
    }
  }, [movieId, pendingRecipe, submitRecipe]);

  // Gestion d'erreur de remplissage du formulaire
  const [errorsForm, setErrorsForm] = useState<Record<string, string>>({});
  const validateForm = (formData: FormData) => {
    const newErrors: Record<string, string> = {};
  
    const recipeTitle = formData.get("title") as string;
    const description = formData.get("description") as string;
    const duration = Number(formData.get("duration"));
    const difficulty = formData.get("difficulty") as string;
    const category_id = Number(formData.get("category"));
    const image = formData.get("image") as File;
    
    if (!instructionsList || instructionsList.length === 0) {
      newErrors.instructionsList = "Instructions Manquante, pensez à valider.";
    }
  
    if (!ingredientList || ingredientList.length === 0) {
      newErrors.ingredientList = "Ingrédients Manquante, pensez à valider.";
    }
  
    if (!recipeTitle || recipeTitle.length < 3) {
      newErrors.recipeTitle = "Le titre doit faire au moins 3 caractères.";
    }
  
    if (!description || description.length < 10) {
      newErrors.description = "La description doit faire au moins 10 caractères.";
    }
  
    if (isNaN(duration) || duration <= 0) {
      newErrors.duration = "La durée doit être un nombre positif.";
    }
  
    if (!difficulty) {
      newErrors.difficulty = "Veuillez sélectionner une difficulté.";
    }
  
    if (isNaN(category_id) || category_id <= 0) {
      newErrors.category = "Veuillez choisir une catégorie valide.";
    }
  
    if (!image) {
      newErrors.image = "Veuillez ajouter une image.";
    }
  
    // Mise à jour des erreurs
    setErrorsForm(newErrors);
  
    // Si aucun message d'erreur, retourner `true`
    return Object.keys(newErrors).length === 0;
  };
  // Vérification de l'authentification de l'utilisateur
  useAuthVerification("user");
  return (
    <div className="recipe_create_container section">
      <h2 className="recipe_create_h2">- Création de recette -</h2>
      <form className="recipe_create_form" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="recipe_create_title">
            <label htmlFor="title">Nom de la recette *</label>
            {errorsForm.recipeTitle && <p className="error_message">{errorsForm.recipeTitle}</p>}
          <input type="text" id="title" name="title" placeholder="Nom de la Recette" required/>
          </div>

          <div className="recipe_create_duration"><label htmlFor="duration">Durée de préparation *</label>
          {errorsForm.duration && <p className="error_message">{errorsForm.duration}</p>}
          <input type="number" id="duration" name="duration" placeholder="Temps en min"required/>
          </div>

          <div className="recipe_create_difficulty">
          {errorsForm.difficulty && <p className="error_message">{errorsForm.difficulty}</p>}
            <label htmlFor="difficulty-select">Difficulté *</label>
            <select name="difficulty" id="difficulty-select" defaultValue={""} required>
              <option value="" disabled>Choisissez une difficulté</option>
              <option value="Facile">Facile</option>
              <option value="Moyen">Moyen</option>
              <option value="Difficile">Difficile</option>
            </select>
          </div>

          <div className="recipe_create_description">
          {errorsForm.description && <p className="error_message">{errorsForm.description}</p>}
            <label htmlFor="description">Description *</label>
            <textarea
              name="description"
              id="description"
              placeholder="10 caractères minimun"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              cols={100}
              rows={5}
              required
            />
          </div>

          <div className="recipe_create_image">
            <label htmlFor="image">Inserer une image *</label>
            
            {errorsForm.image && <p className="error_message">{errorsForm.image}</p>}
            <div className="recipe_create_insert-group">
            <input type="file" name="image" ref={fileInputRef} onChange={handleFileChange} accept=".jpeg,.webp,.svg,.png" required />
          </div>
          {selectedFile && (
                <button type="button" onClick={handleRemoveFile}>
                 supprimer
                </button>
            )}
          </div>

          <div className="recipe_create_ingredient">
            <label>Liste des ingredients *</label>
           {errorsForm.ingredientList && ingredientList.length === 0 && <p className="error_message">{errorsForm.ingredientList}</p>}
            <input type="number" id="quantity" value={currentQuantity || ""} onChange={(e) => setCurrentQuantity(e.target.value)} 
              onKeyDown={handleKeyDownIngredient} placeholder="Quantité" />
            <input type="text" id="unit" value={currentUnit || ""} onChange={(e) => setCurrentUnit(e.target.value)} 
              onKeyDown={handleKeyDownIngredient} placeholder="Unité"/>
            <input type="text" id="ingredient" value={ingredient || ""} onChange={(e) => setIngredient(e.target.value)} 
            onKeyDown={handleKeyDownIngredient} placeholder="Saisir un ingredient" />
            <button  className="recipe_add_ingredients_button" type="button" onClick={handleAddIngredient} disabled={!ingredient.trim() || !currentQuantity || !currentUnit}>+</button>
            <input type="hidden" name="Ingredients" required/>
            <div>{ingredientList.map((ingredient, index) => (
              <div key={index}>
                <button type="button" className="recipe_create_instructions_delete"
                 onClick={(event) => handleRemoveIngredient(index, event)}>🗑️</button>
                Ing {ingredientList.indexOf(ingredient)+1} - 
                <span key={index}> {ingredient.quantity} {ingredient.unit} {ingredients.find(ing => ing.id === ingredient.ingredient_id)?.name} </span>
              </div>
            ))}
          </div>
          </div>
 
          <div className="recipe_create_categories">
            <label htmlFor="category-select">Catégories *</label>
            {errorsForm.category && <p className="error_message">{errorsForm.category}</p>}
            <select name="category" id="category-select" defaultValue="" required>
              <option>Selectionnez une catégorie</option>
              {categories.map((categorie)=> <option key={categorie.id} value={categorie.id}>{categorie.name}</option>)}
            </select>
          </div>

          <div className="recipe_create_diet">
            <label> Régimes Alimentaire </label>
            <div className="recipe_create_diet_inputs">
            <input type="hidden" name="diets" value={JSON.stringify(dietList)}/>
            {diets.map((diet)=> 
              <label key={diet.id}>
                <input type="checkbox" key={diet.id} value={diet.id} id={diet.name} onChange={handleAddDiet}/>
                {diet.name}
              </label>)}
              </div>
          </div>
          
          <div className="recipe_create_instructions">
            <label className="recipe_create_instructions_title">Instructions *</label>
            {errorsForm.instructionsList && instructionsList.length === 0 && <p className="error_message">{errorsForm.instructionsList}</p>}
            <input className="recipe_create_instruction_input" type="text" id="instruction" value={instruction} onChange={(e) => setInstruction(e.target.value)} 
            onKeyDown={handleKeyDownInstruction} placeholder="Saisir une étape"/>
            <button className="recipe_create_instructions_button" type="button" onClick={handleAddInstruction} disabled={!instruction.trim()}>+</button>
            <input type="hidden" name="instruction" value={instructionsList}/>
              <div className="recipe_create_instructions_content">{instructionsList.map((instruction, index) => (
                <div className="recipe_create_instructions_input" key={index}>
                <button className="recipe_create_instructions_delete" type="button" onClick={(event) => handleRemoveInstruction(index, event)}>🗑️</button>
                  Etape n° {index + 1} - 
                  <span key={index}> {instruction} </span>
                </div>
            ))}
            </div>
          </div>
          
          <div className="movie_create_container">
             <MovieCreateForm setMovieId={setMovieId} movieIsCreated={movieIsCreated}/>
          </div>
          <div className="validate_button_create_recipe">
            <ValidateButton text="valider" type="submit"/>
          </div>
      </form>
      <p className="text-required">* : Champs Obligatoire</p>
    </div>
  )
}