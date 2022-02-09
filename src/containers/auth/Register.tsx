import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { PUBLIC_ROUTES } from "router/routes";
import { validEmail } from "services/utils/validator";
import { authRegister } from "store/modules/authModule";
import styled from "styled-components";

enum FIELDS {
  EMAIL = "owner_email",
  PASSWORD = "owner_password",
  RESTAURANT = "company_name",
  PASSWORD_CONFIRM = "owner_password_confirmation",
  NAME = "owner_name",
}

type RegisterPayload = {
  [FIELDS.EMAIL]: string;
  [FIELDS.PASSWORD]: string;
  [FIELDS.RESTAURANT]: string;
  [FIELDS.PASSWORD_CONFIRM]: string;
  [FIELDS.NAME]: string;
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
  [FIELDS.PASSWORD_CONFIRM]: {
    required: {
      value: true,
      message: "Required",
    },
  },
  [FIELDS.NAME]: {
    required: {
      value: true,
      message: "Required",
    },
  },
};

const Register: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isSubmiting, setSubmiting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const onRegister = (data: RegisterPayload) => {
    if (isSubmiting) return;
    setSubmiting(true);

    dispatch(
      authRegister(
        data,
        () => {
          setSubmiting(false);
          history.push(PUBLIC_ROUTES.login.path);
        },
        (error) => {
          setError(error.message);
          setSubmiting(false);
        }
      )
    );
  };
  const { control, handleSubmit } = useForm<RegisterPayload>({
    mode: "onChange",
  });

  return (
    <Wrapper>
      <div className="container">
        <h1 className="text-center">REGISTER</h1>
        <div className="form">
          {/* <h2 className="text-center">Me</h2> */}

          <Controller
            control={control}
            name={FIELDS.NAME}
            defaultValue=""
            rules={VALIDATIONS[FIELDS.NAME]}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <div className="mb-36">
                <input
                  className="input"
                  type="text"
                  placeholder="name"
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
            name={FIELDS.RESTAURANT}
            defaultValue=""
            rules={VALIDATIONS[FIELDS.RESTAURANT]}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <div className="mb-36">
                <input
                  className="input"
                  type="text"
                  placeholder="restaurant"
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
                  value={value}
                  onChange={onChange}
                  className="input"
                  type="text"
                  placeholder="email"
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
                  placeholder="password"
                />
                {error?.message && (
                  <p className="text-error">{error?.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name={FIELDS.PASSWORD_CONFIRM}
            defaultValue=""
            rules={VALIDATIONS[FIELDS.PASSWORD_CONFIRM]}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <div className="mb-36">
                <input
                  value={value}
                  onChange={onChange}
                  className="input"
                  type="password"
                  placeholder="password confirm"
                />
                {error?.message && (
                  <p className="text-error">{error?.message}</p>
                )}
              </div>
            )}
          />
          <div className="btn">
            <button disabled={isSubmiting} onClick={handleSubmit(onRegister)}>
              ログイン
            </button>
          </div>
          {error && (
            <div className="mb-10">
              <p className="text-center text-error">{error}</p>
            </div>
          )}
          <div className="mt-10">
            <Link to="/login" className="label">
              already registered? Sign in
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  > .container {
    width: 970px;
    margin: 100px auto;
    border-radius: 10px;
    border: 1px solid rgb(212, 212, 212);
    padding: 40px;
  }
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .input {
    width: 100%;
    min-width: 400px;
    border: 1px solid rgb(212, 212, 212);
    border-radius: 0px;
    font-size: 14px;
    outline: none;
    padding: 12px;
  }
  button {
    background-color: rgb(252, 188, 52);
    color: rgb(255, 255, 255);
    border: 1px solid rgb(252, 188, 52);
    width: 199px;
    margin: 0px auto;
    height: 44px;
    border-radius: 4px;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    cursor: pointer;
    &:hover {
      opacity: 0.75;
      trasition: 0.2s;
    }
  }
  .label {
    color: rgb(252, 188, 52);
    font-size: 14px;
    line-height: 25px;
    margin-bottom: -3px;
  }
  .mb-10 {
    margin-bottom: 10px;
  }
  .mb-20 {
    margin-bottom: 20px;
  }
  .text-error {
    color: red;
  }
  .mb-36 {
    margin-bottom: 36px;
  }
  .mt-10 {
    margin-top: 10px;
  }
`;

export default Register;
