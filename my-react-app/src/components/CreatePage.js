import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../Constants/Url";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  names: yup.string().required("Please enter the Name"),
  Experiences: yup

    .number()
    //.integer()
    .positive()
    .required()
    .min(0, "Minimum 1 Number is required ")
    .max(99.9, "Maximum 2 numbers only required")
    .required("Please enter your Experience"),
  dojs: yup.string().required("please enter Date Of Joining "),
});

function CreatePage() {
  const [names, setnames] = useState("");
  const [Experiences, setExperiences] = useState("");
  const [dojs, setDoJs] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);

  const navigate1 = useNavigate();

  return (
    <form
      className="inputContainer  form-control-sm  "
      onSubmit={handleSubmit(async () => {
        //console.log(data);
        await axios.post(API_URL, {
          names,
          Experiences,
          dojs,
        });
        navigate1("/");
      })}
    >
      {/* for changing or to type something in the textbox, wehave to use "onChange" event function */}

      <input
        class="form-control form-control-sm "
        {...register("names")}
        type="text"
        placeholder="Enetr Name"
        value={names}
        onChange={(event) => setnames(event.target.value)}
      ></input>

      <div className="error">{errors.names?.message} </div>
      <br></br>

      <input
        class="form-control form-control-sm"
        {...register("Experiences")}
        type="text"
        placeholder="Experience in years"
        value={Experiences}
        onChange={(event) => setExperiences(event.target.value)}
      ></input>
      <div className="error">{errors.Experiences?.message} </div>
      <br></br>

      <input
        class="form-control form-control-md"
        {...register("dojs")}
        type="date"
        className="date"
        placeholder="Enter the Date of Joining"
        value={dojs}
        onChange={(event) => setDoJs(event.target.value)}
      ></input>
      <div className="error">{errors.dojs?.message} </div>
      <br></br>
      <br></br>
      <button type="submit" className="addbutton" onClick={handleSubmit}>
        ADD
      </button>
    </form>
  );
}
export default CreatePage;
