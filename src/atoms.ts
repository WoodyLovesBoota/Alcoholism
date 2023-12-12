import { atom } from "recoil";
import { ICocktailDetail, ICocktailSingle, ICocktail } from "./api";

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

export const searchState = atom<boolean>({
  key: "searchOpen",
  default: false,
});

export const pcSearchState = atom<boolean>({
  key: "pcSearchOpen",
  default: false,
});

export const menuState = atom<boolean>({
  key: "menuOpen",
  default: false,
});

export const favoriteState = atom<boolean>({
  key: "favoriteOpen",
  default: false,
});

export const currentCateState = atom<number>({
  key: "currentCategory",
  default: 0,
});

export const screenState = atom<number>({
  key: "screenWidth",
  default: 0,
});

export const currentSearchList = atom<ICocktail[]>({
  key: "currentSearchList",
  default: [],
});

export const currentKeywordState = atom<string>({
  key: "currentSearchKeyword",
  default: "",
});
