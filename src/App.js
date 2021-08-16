import "./App.css";
import { Formik, useField, Form } from "formik";
import * as Yup from "yup";
import { Children } from "react";

import { Style } from "./Style.js";

const CustomTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const CustomCheckbox = ({ label, ...props }) => {
  const [field, meta] = useField(props, "checkbox");

  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...field} {...props} />
        {Children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const CustomSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

function App() {
  return (
    <Style>
      <Formik
        initialValues={{
          name: "",
          email: "",
          acceptedTerms: "",
          specialPower: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(3, "Must be at least 3 character")
            .max(15, "must be 15 character or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          acceptedTerms: Yup.boolean()
            .required("Required")
            .oneOf([true], "You must accept terms and conditions"),
          specialPower: Yup.string()
            .oneOf(
              ["flight", "invisibilit", "wealthy bad guy", "other"],
              "Invalid special Power"
            )
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
          }, 3000);
        }}
      >
        {(props) => (
          <Form>
            <h1>Sign up</h1>
            <CustomTextInput
              label="Name"
              namee="name"
              type="text"
              placeholder="Your Name"
            />
            <CustomTextInput
              label="Email"
              namee="email"
              type="email"
              placeholder="Type a Email"
            />
          </Form>
        )}
      </Formik>
    </Style>
  );
}

export default App;
