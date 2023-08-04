// import Create_1 from "./Create_1";
import * as yup from "yup";

export const userValidation = yup.object().shape({
  name: yup.string().required(),
  //   Experience1: yup.float().required(),
});

// function Validation() {
//   const errors = {};
//   const name_pattern = /^[a-zA-Z]{3}$/;

//   if (.name === "") {
//     errors.name = "Name is not mentioned";
//   }
//   return errors;
// }

// export default Validation;
