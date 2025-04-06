import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../redux/slices/authSlice";
import RegisterForm from "../components/Auth/RegisterForm";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  };

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(
      registerUser({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      })
    )
      .then(() => {
        navigate("/products");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
        </div>
        <RegisterForm
          initialValues={initialValues}
          isLoading={isLoading}
          error={error}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
