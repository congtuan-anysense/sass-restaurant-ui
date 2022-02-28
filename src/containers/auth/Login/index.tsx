import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { PROTECTED_ROUTES } from "router/helpers/protectedRoutes";
import { validEmail } from "services/utils/validator";
import { authLogin, updateLoginState } from "store/modules/authModule";
import { Wrapper } from "./style";

enum FIELDS {
  EMAIL = "email",
  PASSWORD = "password",
  RESTAURANT = "restaurant",
}

type LoginFormInputs = {
  [FIELDS.EMAIL]: string;
  [FIELDS.PASSWORD]: string;
  [FIELDS.RESTAURANT]: string;
};

const VALIDATIONS = {
  [FIELDS.RESTAURANT]: {
    required: {
      value: true,
      message: "Required",
    },
  },
  [FIELDS.EMAIL]: {
    required: {
      value: true,
      message: "Required",
    },
    validate: validEmail,
  },
  [FIELDS.PASSWORD]: {
    required: {
      value: true,
      message: "Required",
    },
  },
};

const Login: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isSubmiting, setSubmiting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const onLogin = (data) => {
    if (isSubmiting) return;
    setSubmiting(true);
    dispatch(
      authLogin(
        {
          email: data[FIELDS.EMAIL],
          password: data[FIELDS.PASSWORD],
          restaurant: data[FIELDS.RESTAURANT],
        },
        async () => {
          setSubmiting(false);
          await dispatch(updateLoginState(true));
          history.push(PROTECTED_ROUTES.home.path);
        },
        (error) => {
          setError(error.message);
          setSubmiting(false);
        }
      )
    );
  };
  const { control, handleSubmit } = useForm<LoginFormInputs>({
    mode: "onChange",
  });

  return (
    <Wrapper>
      <div className="container">
        <h1 className="text-center">ログインする</h1>
        <div className="form">
          {/* <h2 className="text-center">Me</h2> */}

          <Controller
            control={control}
            name={FIELDS.RESTAURANT}
            defaultValue=""
            rules={VALIDATIONS[FIELDS.RESTAURANT]}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <div className="mb-36">
                <input
                  className="input"
                  type="text"
                  placeholder="飲食店"
                  value={value}
                  onChange={onChange}
                />
                {error?.message && (
                  <p className="text-error">{error?.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name={FIELDS.EMAIL}
            defaultValue=""
            rules={VALIDATIONS[FIELDS.EMAIL]}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <div className="mb-36">
                <input
                  className="input"
                  type="text"
                  placeholder="Eメール"
                  value={value}
                  onChange={onChange}
                />
                {error?.message && (
                  <p className="text-error">{error?.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name={FIELDS.PASSWORD}
            defaultValue=""
            rules={VALIDATIONS[FIELDS.PASSWORD]}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <div className="mb-36">
                <input
                  value={value}
                  onChange={onChange}
                  className="input"
                  type="password"
                  placeholder="パスワード"
                />
                {error?.message && (
                  <p className="text-error">{error?.message}</p>
                )}
              </div>
            )}
          />
          <div className="btn">
            <button disabled={isSubmiting} onClick={handleSubmit(onLogin)}>
              ログイン
            </button>
          </div>
          {error && (
            <div className="mb-10">
              <p className="text-center text-error">{error}</p>
            </div>
          )}
          <div className="mt-10">
            <Link to="/register" className="label">
              またはサインアップを使用しますか？
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;
