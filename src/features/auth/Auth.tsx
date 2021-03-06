import React, { FC, useEffect, useState } from "react";
import styles from "./Auth.module.css";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import {
  toggleMode,
  fetchAsyncLogin,
  selectIsLoginView,
  fetchAsyncRegister,
  selectResponseErorrMessage,
} from "./authSlice";
import Header from "../../app/Organisms/Header";
import "../../app/css/Auth.css";

const useStyles = makeStyles((theme: Theme) => ({
  auth__root: {},
  button: {
    margin: "24px",
  },
  message: {
    color: "#ee5b5b",
  },
}));

export const Auth: FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const isLoginView = useSelector(selectIsLoginView);
  const error = useSelector(selectResponseErorrMessage);
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const [name, Setname] = useState("");
  const [Emailmessage, SetEmailmessage] = useState("");
  const [Passmessage, SetPassmessage] = useState("");

  useEffect(() => {
    localStorage.removeItem("token");
    Setemail("");
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      SetEmailmessage("");
    }
    if (email.match(/""/)) {
      SetEmailmessage("※正しい形式でメールアドレスを入力してください");
    }
    Setemail(value);
  };

  const handleInputChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    Setpassword(value);
  };
  const handleInputChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    Setname(value);
  };

  const login = () => {
    if (!email) {
      SetEmailmessage("※メールアドレスを入力してください");
      return;
    }
    const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!regex.test(email)) {
      SetEmailmessage("※正しい形式でメールアドレスを入力してください");
      return;
    }
    if (password.length < 6) {
      SetPassmessage("※パスワードは６文字以上で入力してください");
      return;
    }
    if (isLoginView) {
      const data = { email: email, password: password };
      dispatch(fetchAsyncLogin(data));
    } else {
      const data = { email: email, password: password, name: name };
      dispatch(fetchAsyncRegister(data));
      // if (fetchAsyncRegister.fulfilled.match(result)) {
      //   await dispatch(fetchAsyncLogin(data));
      // }
    }
  };

  return (
    <div>
      <Header></Header>
      <div className="test">
        <div className="test2"></div>
      </div>
      <div className={styles.auth__root}>
        <h1>{isLoginView ? "ログイン" : "新規会員登録"}</h1>
        <br />
        <div className={classes.message}>{error}</div>
        {Emailmessage}
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          label="メールアドレス"
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
        />
        <br />
        {Passmessage}
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          label="パスワード"
          type="password"
          name="password"
          onChange={handleInputChange2}
        />
        <br />
        <div>
          {!isLoginView ? (
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              label="名前"
              type="text"
              name="name"
              onChange={handleInputChange3}
            />
          ) : (
            <div></div>
          )}
        </div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          onClick={login}
        >
          {isLoginView ? "Login" : "Register"}
        </Button>
        <span onClick={() => dispatch(toggleMode())}>
          {isLoginView ? "Create new account ?" : "Back to Login"}
        </span>
      </div>
    </div>
  );
};
