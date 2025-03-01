export interface IRecipe { // Interface
    id: number;
    title: string;
    description: string;
    duration: number;
    difficulty: string;
    instruction: string;
    image: string;
    movie_id: number;
    created_at: string;
    updated_at: string;
    Ingredients: IIngredients[];
    Diets?: IDiets[];
    user: {first_name: string};
    category: ICategory
    category_id: number;
    movie: IMovie;
    user_id: number;
    validated: boolean;
    deleted_at: string;
  };

  export interface IIngredients {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    recipe_ingredient_assignation: {
      quantity: number;
      unit: string;
    }
  };

  export interface IDiets {
    id: number;
    name: string;
    color: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
  };

  export interface ICategory {
    id: number;
    name: string;
    color: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
  };

  export interface IMovie {
    id: number,
    title: string,
    description: string,
    director: string,
    actors: string,
    year: number,
    image: string,
    funfact: string,
    category: string,
    created_at: string;
    updated_at: string;
    deleted_at: string;    
  };

    
  export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    is_admin: boolean;
    created_at: string;
  }

  export interface IRecipeData {
    title: string;
    description: string;
    duration: number;
    difficulty: string;
    instruction: string;
    image: string;
    movie_id?: number;
    category_id?: number;
    user_id?: number;
    diets?: number[];
    ingredients: IIngredientsList[];
  }


  export interface IIngredientsList {
      ingredient_id: number,
      //name: string,
      quantity: number,
      unit: string;
      //updated_at: string;
      //deleted_at: string;
  }

  export enum DashboardAdminVue {
    RECIPES_LIST,
    RECIPES_FORM,
    MOVIES_LIST,
    MOVIES_FORM,
    MOVIES_CREATE,
    CATEGORIES_LIST,
    CATEGORIES_FORM,
    CATEGORIES_CREATE,
    DIETS_LIST,
    DIETS_FORM,
    DIETS_CREATE,
    INGREDIENTS_LIST,
    USER_LIST,
    USER_FORM,
  }

  export interface IRecipeDataUpdate {
    title?: string;
    description?: string;
    duration?: number;
    difficulty?: string;
    instruction?: string;
    image?: string;
    movie_id?: number;
    category_id?: number;
    user_id?: number;
    diets?: number[];
    validated?: boolean;
    ingredients?: {
      ingredient_id: number;
      quantity: number;
      unit: string;
    }[];
  }

  export enum adminStatusTitleContent {
    RECIPES_LIST = "Liste des recettes",
    RECIPES_FORM = "Formulaire d'une recette",
    MOVIES_LIST = "Liste des films",
    MOVIES_FORM = "Formulaire d'un film",
    MOVIES_CREATE = "Créer un film",
    CATEGORIES_LIST = "Liste des catégories",
    CATEGORIES_FORM = "Formulaire d'une catégorie",
    CATEGORIES_CREATE = "Créer une catégorie",
    DIETS_LIST = "Liste des régimes",
    DIETS_FORM = "Formulaire d'un régime",
    DIETS_CREATE = "Créer un régime",
    INGREDIENTS_LIST = "Liste des ingrédients",
    USER_LIST = "Liste des utilisateurs",
    USER_FORM = "Formulaire d'un utilisateur",
  }