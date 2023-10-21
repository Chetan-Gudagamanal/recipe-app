import { useForm } from "react-hook-form";
import "./AddRecipe.css";
import { Container } from "@material-ui/core";
import { useState } from "react";
import { backend_url } from "../constants";

export default function AddRecipe() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });
  const [btnText, setBtnText] = useState("Add Recipe");
  const [btnColor, setBtnColor] = useState(""); //initial default color

  const onSubmit = async (data) => {
    console.log(data.Recipename);
    console.log(data["Recipe-Image-Url"]);
    let rcpData = {
      name: data["Recipename"],
      url: data["Recipe-Image-Url"],
      description: data["Recipe-Description"],
      details: data["Recipe-Procedure"],
    };
    console.log(rcpData);
    let resp = await fetch(`${backend_url}/add_recipe`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(rcpData),
    }).then((res) => {
      // res.status === 201
      //   ? console.log("success")
      //   : console.log("Sry, could not add, pls try again");
      if (res.status === 200) {
        setBtnText("Recipe Added");
        setBtnColor("green");
        setTimeout(() => {
          setBtnText("ADD Recipe");
          setBtnColor("");
        }, 2000);
      } else {
        setBtnText("Sorry Could not add Recipe");
        setBtnColor("red");

        setTimeout(() => {
          setBtnText("ADD Recipe");
          setBtnColor("");
        }, 2000);
      }
    });
  };

  return (
    <Container>
      <div className="RecipeForm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Add Recipe</h1>
          <CustomInput label="Recipename" register={register} errors={errors} />
          <CustomInput
            label="Recipe-Image-Url"
            register={register}
            errors={errors}
          />
          <CustomTextArea
            label="Recipe-Description"
            register={register}
            errors={errors}
          />
          <CustomTextArea
            label="Recipe-Procedure"
            register={register}
            errors={errors}
          />

          <input
            type="submit"
            value={btnText}
            style={{ backgroundColor: btnColor }}
          />
        </form>
      </div>
    </Container>
  );
}

function CustomInput({ label, register, errors }) {
  return (
    <>
      <label>{label}</label>
      <input
        placeholder={label}
        {...register(label, {
          required: true,
          minLength: 3,
        })}
      />
      {errors[label] && errors[label].type === "required" && (
        <p style={{ color: "red" }}>Please Enter required details to proceed</p>
      )}

      {errors[label] && errors[label].type === "minLength" && (
        <p style={{ color: "red" }}>
          This input should have atleast 3 charecters
        </p>
      )}
    </>
  );
}

function CustomTextArea({ label, register, errors }) {
  return (
    <>
      <label>{label}</label>
      <textarea
        placeholder={label}
        name={label}
        {...register(label, {
          required: true,
          minLength: 10,
        })}
      />
      {errors[label] && errors[label].type === "required" && (
        <p style={{ color: "red" }}>Please Enter required details to proceed</p>
      )}
      {errors[label] && errors[label].type === "minLength" && (
        <p style={{ color: "red" }}>
          This input should have atleast 10 charecters
        </p>
      )}
    </>
  );
}
