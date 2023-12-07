import { atom } from "recoil";
import { ICocktailDetail } from "./api";

export const cockTailState = atom<ICocktailDetail>({
  key: "currentCocktail",
  default: {
    drinks: [
      {
        idDrink: "",
        strDrink: "",
        strDrinkAlternate: "",
        strCategory: "",
        strAlcoholic: "",
        strGlass: "",
        strInstructions: "",
        strDrinkThumb: "",
        strIngredient1: "",
        strIngredient2: "",
        strIngredient3: "",
        strIngredient4: "",
        strIngredient5: "",

        strMeasure1: "",
        strMeasure2: "",
        strMeasure3: "",
        strMeasure4: "",
        strMeasure5: "",

        strImageSource: "",
        strImageAttribution: "",
      },
    ],
  },
});
