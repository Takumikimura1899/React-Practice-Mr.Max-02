import React, { useState, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    console.log('Effect 走ったよ');
  });

  useEffect(() => {
    // 500秒後に起動する非同期処理
    // そのまま使うと入力の度に console.log('メールかパスワードの入力を検知しました')が発動するので
    //500秒後に全て吐き出される。つまり無駄な処理が発生することになる

    // クリーンアップ関数 clearTimeoutで実行出来るように定数化する
    const identTimer = setTimeout(() => {
      console.log('メールかパスワードの入力を検知しました');
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
      );
    }, 500);
    // 関数を宣言してreturnする。名前付きの関数の場合もある
    // いわゆるクリーンアップ関数
    return () => {
      // 初回レンダリング時は発動せず、入力検知つまり、上のsetTimeoutが実行されるとその処理の前に発動する。
      console.log('クリーンアップ');
      clearTimeout(identTimer);
      console.log('clearTimeoutを実行していますよ');
    };
  }, [enteredEmail, enteredPassword]);

  // このような感じでクリーンアップ関数は使用する。
  // これがもしhttpリクエストなら一度に大量のリクエストを送ることを防げる

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

    setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      event.target.value.trim().length > 6 && enteredEmail.includes('@')
    );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor='email'>E-Mail</label>
          <input
            type='email'
            id='email'
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type='submit' className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
