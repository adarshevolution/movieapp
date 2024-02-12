import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const SignIn = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
    rememberme: false,
  };
  const dummyCredentials = {
    email: "a@b.com",
    password: "Evolution@123",
  };
  return (
    <>
      <div className="  min-h-screen flex flex-col items-center justify-center  mx-8">
        <div className="mb-10 text-6xl font-semibold ">Sign in</div>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid Email")
              .required("Email is required"),
            password: Yup.string()
              .min(6, "Password must be at least 6 characters")
              .required("Password is required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            if (
              values.email === dummyCredentials.email &&
              values.password === dummyCredentials.password
            ) {
              navigate("/movies");
            } else {
              alert("Invalid Email or Password");
            }
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form
              onSubmit={handleSubmit}
              className=" grid grid-cols-1 w-full md:w-72"
            >
              <div className="mb-6 flex flex-col ">
                <Field
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Email"
                  className={` rounded-[10px]  w-full md:w-72 h-11 bg-input-color focus:bg-white focus:text-black placeholder-white pl-4 ${
                    errors.email && touched.email && "outline-red-500"
                  }`}
                />
                <div className="text-red-500 italic mt-1">
                  <ErrorMessage name="email" components="div" />
                </div>
              </div>
              <div className="mb-6 flex flex-col">
                <Field
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Password"
                  className={` rounded-[10px] w-full md:w-72 h-11 bg-input-color focus:bg-white focus:text-black placeholder-white pl-4 
                  ${
                    errors.password && touched.password ? "outline-red-500" : ""
                  }`}
                />
                <div className="text-red-500 italic mt-1">
                  <ErrorMessage name="password" components="div" />
                </div>
              </div>
              <div className="mb-6 flex items-center justify-center ">
                <label>
                  <Field
                    type="checkbox"
                    name="rememberme"
                    onChange={handleChange}
                    className="font-normal text-sm font-mont accent-input-color "
                  />{" "}
                  Remember me
                </label>
              </div>
              <div className="flex flex-col">
                <button
                  type="submit"
                  className=" rounded-xl w-full md:w-72 h-11 bg-primary font-bold "
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging...." : "Login"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default SignIn;
