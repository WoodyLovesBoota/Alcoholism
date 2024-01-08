import { useForm, useFieldArray } from "react-hook-form";
import styled from "styled-components";
import NavigationBar from "../Components/NavigationBar";
import DBHandler from "../firebase/DBHandler";
import { useEffect, ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { enrolledCocktailState } from "../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { storage } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Enroll = () => {
  const { register, control, handleSubmit, reset } = useForm<IForm>({
    defaultValues: {
      ingredients: [{ ingredient: "", measure: "" }],
    },
  });

  const [enrolled, setEnrolled] = useRecoilState(enrolledCocktailState);

  const [image, setImage] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string>("");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const categories = [
    "Ordinary Drink",
    "Cocktail",
    "Shake",
    "Other / Unknown",
    "Cocoa",
    "Shot",
    "Coffee / Tea",
    "Homemade Liqueur",
    "Punch / Party Drink",
    "Beer",
    "Soft Drink",
  ];

  const glasses = [
    "Highball glass",
    "Cocktail glass",
    "Old-fashioned glass",
    "Whiskey Glass",
    "Collins glass",
    "Pousse cafe glass",
    "Champagne flute",
    "Whiskey sour glass",
    "Cordial glass",
    "Brandy snifter",
    "White wine glass",
    "Nick and Nora Glass",
    "Hurricane glass",
    "Coffee mug",
    "Shot glass",
    "Jar",
    "Irish coffee cup",
    "Punch bowl",
    "Pitcher",
    "Pint glass",
    "Copper Mug",
    "Wine Glass",
    "Beer mug",
    "Margarita/Coupette glass",
    "Beer pilsner",
    "Beer Glass",
    "Parfait glass",
    "Mason jar",
    "Margarita glass",
    "Martini Glass",
    "Balloon Glass",
    "Coupe Glass",
  ];

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const onValid = async (data: IForm) => {
    const imageFile = data.image[0];
    const storageRef = ref(storage, `images/${imageFile.name}`);
    try {
      const snapshot = await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setEnrolled((current) => {
        let target = [...current.cocktails];
        let newArr =
          target[0].strDrink === ""
            ? [
                {
                  idDrink: "enrolled" + 0,
                  strDrink: data.name,
                  strDrinkAlternate: "",
                  strCategory: data.category.toUpperCase(),
                  strAlcoholic: "",
                  strGlass: data.glass,
                  strInstructions: data.desc,
                  strDrinkThumb: downloadURL,
                  strIngredient1: data.ingredients[0] ? data.ingredients[0].ingredient : "",
                  strIngredient2: data.ingredients[1] ? data.ingredients[1].ingredient : "",
                  strIngredient3: data.ingredients[2] ? data.ingredients[2].ingredient : "",
                  strIngredient4: data.ingredients[3] ? data.ingredients[3].ingredient : "",
                  strIngredient5: data.ingredients[4] ? data.ingredients[4].ingredient : "",

                  strMeasure1: data.ingredients[0] ? data.ingredients[0].measure : "",
                  strMeasure2: data.ingredients[1] ? data.ingredients[1].measure : "",
                  strMeasure3: data.ingredients[2] ? data.ingredients[2].measure : "",
                  strMeasure4: data.ingredients[3] ? data.ingredients[3].measure : "",
                  strMeasure5: data.ingredients[4] ? data.ingredients[4].measure : "",

                  strImageSource: downloadURL,
                  strImageAttribution: "",
                },
              ]
            : [
                ...target,
                {
                  idDrink: "enrolled" + target.length,
                  strDrink: data.name,
                  strDrinkAlternate: "",
                  strCategory: data.category.toUpperCase(),
                  strAlcoholic: "",
                  strGlass: data.glass,
                  strInstructions: data.desc,
                  strDrinkThumb: downloadURL,
                  strIngredient1: data.ingredients[0] ? data.ingredients[0].ingredient : "",
                  strIngredient2: data.ingredients[1] ? data.ingredients[1].ingredient : "",
                  strIngredient3: data.ingredients[2] ? data.ingredients[2].ingredient : "",
                  strIngredient4: data.ingredients[3] ? data.ingredients[3].ingredient : "",
                  strIngredient5: data.ingredients[4] ? data.ingredients[4].ingredient : "",

                  strMeasure1: data.ingredients[0] ? data.ingredients[0].measure : "",
                  strMeasure2: data.ingredients[1] ? data.ingredients[1].measure : "",
                  strMeasure3: data.ingredients[2] ? data.ingredients[2].measure : "",
                  strMeasure4: data.ingredients[3] ? data.ingredients[3].measure : "",
                  strMeasure5: data.ingredients[4] ? data.ingredients[4].measure : "",

                  strImageSource: downloadURL,
                  strImageAttribution: "",
                },
              ];
        return { ...current, ["cocktails"]: newArr };
      });
      setUploadProgress("Upload completed");
    } catch (error) {
      alert("오류가 발생했습니다. 잠시 후에 시도해주세요.");
      setUploadProgress("Upload failed");
    }

    reset();

    alert("등록이 완료되었습니다");
  };

  // useEffect(() => {
  //   DBHandler.addUserInfoPost("cocktails", "enrolled", enrolled);
  //   console.log("write");
  // }, [enrolled]);

  return (
    <Wrapper>
      <NavigationBar ishome={false} issticky={false} />
      <Title>Enrollment</Title>
      <Description>
        Post your creative recipes, and share it for a wonderful experience.
      </Description>
      <Form onSubmit={handleSubmit(onValid)}>
        <UpperRow>
          <InputCol>
            <InputBox>
              <InputTitle>NAME</InputTitle>
              <Input {...register("name", { required: true })} autoComplete="off" />
            </InputBox>
            <InputBox>
              <InputTitle>CATEGORY</InputTitle>
              <Select {...register("category", { required: true })} autoComplete="off">
                {categories.map((cate) => (
                  <OptionCategory key={cate} value={cate}>
                    {cate.toUpperCase()}
                  </OptionCategory>
                ))}
              </Select>
            </InputBox>
          </InputCol>
          <InputCol>
            <InputBox>
              <InputTitle>IMAGE</InputTitle>
              <Input type="file" {...register("image", { required: true })} autoComplete="off" />
            </InputBox>
            <InputBox>
              <InputTitle>GLASS</InputTitle>
              <Select {...register("glass", { required: true })} autoComplete="off">
                {glasses.map((glass) => (
                  <OptionCategory key={glass} value={glass}>
                    {glass.toUpperCase()}
                  </OptionCategory>
                ))}
              </Select>
            </InputBox>
          </InputCol>
        </UpperRow>
        <DescriptionBox>
          <InputTitle>HOW TO MAKE</InputTitle>
          <CocktailDescription {...register("desc", { required: true })} autoComplete="off" />
        </DescriptionBox>
        <IngredientBox>
          <BoxTitle>INGREDIENTS</BoxTitle>
          {fields.map((field, index) => (
            <IngredientRow key={field.id}>
              <IngredientCol>
                <IngredientTitle>INGREDIENT {index + 1}</IngredientTitle>
                <Ingredient
                  {...register(`ingredients.${index}.ingredient`, { required: true })}
                  autoComplete="off"
                />
              </IngredientCol>
              <IngredientCol>
                <IngredientTitle>MEASUREMENT {index + 1}</IngredientTitle>
                <Ingredient
                  {...register(`ingredients.${index}.measure`, { required: true })}
                  autoComplete="off"
                />
              </IngredientCol>
              <DeleteRowButton type="button" onClick={() => remove(index)}>
                <IconWrapper>
                  <FontAwesomeIcon icon={faMinus} />
                </IconWrapper>
              </DeleteRowButton>
            </IngredientRow>
          ))}
          <AddRowButton type="button" onClick={() => append({ ingredient: "", measure: "" })}>
            <IconWrapper>
              <FontAwesomeIcon icon={faPlus} />
            </IconWrapper>
          </AddRowButton>
        </IngredientBox>

        <Button type="submit">ENROLL</Button>
      </Form>
    </Wrapper>
  );
};

export default Enroll;

const Wrapper = styled.div`
  padding: 0 72px;
  padding-top: 220px;
  padding-bottom: 100px;
  @media screen and (max-width: 1000px) {
    padding: 0 16px;
    padding-top: 120px;
    padding-bottom: 100px;
  }
`;

const Title = styled.h2`
  font-size: 56px;
  font-weight: 700;
  color: ${(props) => props.theme.accent};
  margin-bottom: 36px;
  @media screen and (max-width: 800px) {
    font-size: 36px;
  }
`;

const Description = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 80px;
  @media screen and (max-width: 800px) {
    margin-bottom: 50px;
    font-size: 16px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  width: 850px;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;

const UpperRow = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 800px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const InputBox = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const InputTitle = styled.h2`
  font-size: 18px;
  font-weight: 400;
  line-height: 1;
  @media screen and (max-width: 800px) {
    font-size: 16px;
  }
`;

const Input = styled.input`
  border: 2px solid white;
  background-color: transparent;
  padding: 10px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  width: 100%;
  &:focus {
    outline: none;
    border: 2px solid ${(props) => props.theme.accent};
  }
`;

const InputCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const IngredientBox = styled.div`
  margin-top: 20px;
`;

const IngredientRow = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: flex-end;
  @media screen and (max-width: 580px) {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 10px;
  }
`;

const IngredientCol = styled.div`
  margin-right: 30px;
  width: 50%;
  @media screen and (max-width: 800px) {
    margin-right: 20px;
  }
  @media screen and (max-width: 580px) {
    width: 100%;
    margin-right: 0;
  }
`;

const IngredientTitle = styled.h2`
  margin-right: 20px;
  font-size: 16px;
  font-weight: 400;
  @media screen and (max-width: 580px) {
    margin-right: 0;
    margin-top: 10px;
  }
`;

const AddRowButton = styled.button`
  background-color: transparent;
  margin: 20px 0;
  cursor: pointer;
`;

const IconWrapper = styled.h2`
  font-size: 18px;
  border: 1px solid white;
  border-radius: 100px;
  padding: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    color: ${(props) => props.theme.accent};
    border: 1px solid ${(props) => props.theme.accent};
  }
  @media screen and (max-width: 800px) {
    font-size: 16px;
  }
`;

const DeleteRowButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  margin-bottom: 5px;
  @media screen and (max-width: 580px) {
    margin-bottom: 0px;
    margin-top: 10px;
  }
`;

const BoxTitle = styled.h2`
  font-size: 18px;
  font-weight: 400;
`;

const Ingredient = styled.input`
  border: 2px solid white;
  background-color: transparent;
  padding: 10px;
  font-size: 16px;
  font-weight: 500;
  width: 100%;
  border-radius: 8px;
  &:focus {
    outline: none;
    border: 2px solid ${(props) => props.theme.accent};
  }
`;

const DescriptionBox = styled.div``;

const CocktailDescription = styled.textarea`
  border: 2px solid white;
  background-color: transparent;
  padding: 10px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  width: 100%;
  min-height: 150px;
  &:focus {
    outline: none;
    border: 2px solid ${(props) => props.theme.accent};
  }
`;

const Select = styled.select`
  border: 2px solid white;
  background-color: transparent;
  padding: 10px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  width: 100%;
  color: white;
  cursor: pointer;
  &:focus {
    outline: none;
    border: 2px solid ${(props) => props.theme.accent};
  }
`;

const OptionCategory = styled.option``;

const Button = styled.button`
  color: black;
  background-color: ${(props) => props.theme.accent};
  padding: 10px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 24px;
  margin-top: 50px;
  cursor: pointer;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.5);
`;

interface IForm {
  name: string;
  category: string;
  ingredients: { ingredient: string; measure: string }[];
  glass: string;
  image: FileList;
  desc: string;
}
