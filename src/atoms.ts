import { atom } from "recoil";
import { ICocktailDetail, ICocktailSingle } from "./api";

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

export const likesState = atom<ICocktailSingle[]>({
  key: "likeCocktail",
  default: [
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

  effects: [
    ({ setSelf, onSet }: any) => {
      const savedValue = localStorage.getItem("likes");
      if (savedValue !== null) setSelf(JSON.parse(savedValue));
      onSet((newValue: any, _: any, isReset: boolean) => {
        isReset ? localStorage.removeItem("likes") : localStorage.setItem("likes", JSON.stringify(newValue));
      });
    },
  ],
});
