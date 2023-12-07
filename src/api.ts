import axios from "axios";

const cocktail_proxy = window.location.hostname === "localhost" ? "" : "/cocktail_proxy";
const BASE_URL = "https://www.thecocktaildb.com/api/";

export const getCategoryResult = async (keyword: string | undefined) => {
  return await axios.get(`${BASE_URL}json/v1/1/filter.php?i=${keyword}`).then((res) => res.data);
};

export const getAllCategoryResult = async (keyword: string | undefined) => {
  return await axios.get(`${BASE_URL}json/v1/1/filter.php?c=${keyword}`).then((res) => res.data);
};

export const getCocktailDetail = async (keyword: string | undefined) => {
  return await axios.get(`${BASE_URL}json/v1/1/lookup.php?i=${keyword}`).then((res) => res.data);
};

export const getCocktailSearch = async (keyword: string | null) => {
  return await axios.get(`${BASE_URL}json/v1/1/search.php?s=${keyword}`).then((res) => res.data);
};

export interface ICocktailDetail {
  drinks: ICocktailSingle[];
}

export interface IGetCocktailResult {
  drinks: ICocktail[];
}

export interface ICocktail {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
}

export interface ICocktailSingle {
  idDrink: string | null;
  strDrink: string | null;
  strDrinkAlternate: string | null;
  strCategory: string | null;
  strAlcoholic: string | null;
  strGlass: string | null;
  strInstructions: string | null;
  strDrinkThumb: string | null;
  strIngredient1: string | null;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;

  strMeasure1: string | null;
  strMeasure2: string | null;
  strMeasure3: string | null;
  strMeasure4: string | null;
  strMeasure5: string | null;

  strImageSource: string;
  strImageAttribution: string | null;
}
