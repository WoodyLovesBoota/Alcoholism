import { useForm, useFieldArray } from "react-hook-form";
import styled from "styled-components";
import NavigationBar from "../Components/NavigationBar";
import DBHandler from "../firebase/DBHandler";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { enrolledCocktailState } from "../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const Enroll = () => {
  const { register, control, handleSubmit, setValue } = useForm<IForm>({
    defaultValues: {
      ingredients: [{ ingredient: "", measure: "" }],
    },
  });

  const [enrolled, setEnrolled] = useRecoilState(enrolledCocktailState);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const onValid = (data: IForm) => {
    setEnrolled((current) => {
      let target = [...current.cocktails];
      let newArr =
        target[0].strDrink === ""
          ? [
              {
                idDrink: "enrolled" + target.length,
                strDrink: data.name,
                strDrinkAlternate: "",
                strCategory: data.category,
                strAlcoholic: "",
                strGlass: data.glass,
                strInstructions: data.desc,
                strDrinkThumb: data.image,
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

                strImageSource: data.image,
                strImageAttribution: "",
              },
            ]
          : [
              ...target,
              {
                idDrink: "enrolled" + target.length,
                strDrink: data.name,
                strDrinkAlternate: "",
                strCategory: data.category,
                strAlcoholic: "",
                strGlass: data.glass,
                strInstructions: data.desc,
                strDrinkThumb: data.image,
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

                strImageSource: data.image,
                strImageAttribution: "",
              },
            ];
      return { ...current, ["cocktails"]: newArr };
    });
    setValue("name", "");
    setValue("category", "");
    setValue("ingredients", [{ ingredient: "", measure: "" }]);
    setValue("image", "");
    setValue("glass", "");
    setValue("desc", "");

    alert("등록이 완료되었습니다");
  };

  // useEffect(() => {
  //   DBHandler.addUserInfoPost("cocktails", "enrolled", enrolled);
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
              <Input {...register("category", { required: true })} autoComplete="off" />
            </InputBox>
          </InputCol>
          <InputCol>
            <InputBox>
              <InputTitle>IMAGE</InputTitle>
              <Input {...register("image", { required: true })} autoComplete="off" />
            </InputBox>
            <InputBox>
              <InputTitle>GLASS</InputTitle>
              <Input {...register("glass", { required: true })} autoComplete="off" />
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
  padding-bottom: 120px;
`;

const Title = styled.h2`
  font-size: 56px;
  font-weight: 700;
  color: ${(props) => props.theme.accent};
  margin-bottom: 36px;
`;

const Description = styled.h2`
  font-size: 24px;
  font-weight: 500;
  width: 50%;
  margin-bottom: 80px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 100px;
  padding-bottom: 50px;
  border-radius: 20px;
  box-shadow: 0 -4px 8px 0 ${(props) => props.theme.snow};
`;

const UpperRow = styled.div`
  display: flex;
`;

const InputBox = styled.div`
  margin-bottom: 50px;
  width: 100%;
`;

const InputTitle = styled.h2`
  margin-right: 20px;
  font-size: 24px;
  font-weight: 500;
`;

const Input = styled.input`
  border: 2px solid white;
  background-color: transparent;
  padding: 10px;
  font-size: 18px;
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
  width: 50%;
  margin-right: 50px;
`;

const IngredientBox = styled.div`
  margin-top: 30px;
`;

const IngredientRow = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: flex-end;
`;

const IngredientCol = styled.div`
  margin-right: 50px;
  width: 50%;
`;

const IngredientTitle = styled.h2`
  margin-right: 20px;
  font-size: 18px;
  font-weight: 500;
  width: 200px;
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
`;

const DeleteRowButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  margin-bottom: 5px;
`;

const BoxTitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  width: 100%;
  border-bottom: 2px solid white;
  padding-bottom: 10px;
`;

const Ingredient = styled.input`
  border: 2px solid white;
  background-color: transparent;
  padding: 10px;
  font-size: 18px;
  font-weight: 500;
  width: 100%;
  border-radius: 8px;
  &:focus {
    outline: none;
    border: 2px solid ${(props) => props.theme.accent};
  }
`;

const DescriptionBox = styled.div`
  margin-right: 50px;
`;

const CocktailDescription = styled.textarea`
  border: 2px solid white;
  background-color: transparent;
  padding: 10px;
  font-size: 18px;
  font-weight: 500;
  border-radius: 8px;
  width: 100%;
  min-height: 200px;
  &:focus {
    outline: none;
    border: 2px solid ${(props) => props.theme.accent};
  }
`;

const Button = styled.button`
  color: black;
  background-color: ${(props) => props.theme.accent};
  padding: 20px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 24px;
  margin-top: 80px;
  cursor: pointer;
`;

interface IForm {
  name: string;
  category: string;
  ingredients: { ingredient: string; measure: string }[];
  glass: string;
  image: string;
  desc: string;
}
