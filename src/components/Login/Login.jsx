import React, { useState } from "react";
import styles from "./Login.module.css";
import ortexLogo from "../../assets/ortex_logo_turquoise.svg"

export function Login() {
  const [showResetPassword, setShowResetPassword] = useState(false)
  const [loginCredentials, setLoginCredentials] = useState({username: "", password: ""})

  const handleUsernameChange = (event) => {
    setLoginCredentials((prevState) => ({
      ...prevState,
      username: event.target.value,
    }));
  }

  const handlePasswordChange = (event) => {
    setLoginCredentials((prevState) => ({
      ...prevState,
      password: event.target.value,
    }));
  }

  const handleSubmit = () => {
    console.log("logged In")
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginWrapper}>
        <img className={styles.logo} src={ortexLogo}/>
        <form onSubmit={handleSubmit} >
          <input className={styles.input} type="text" placeholder="Enter Username" value={loginCredentials.username} onChange={handleUsernameChange} />
          <input className={styles.input} type="password" placeholder="Enter Password" value={loginCredentials.password} onChange={handlePasswordChange} />
          <input className={styles.button} type="submit" value="LOGIN" />
        </form>
        <div className={styles.textWrapper}>
          <p><a className={styles.link}>Forgot your password?</a></p>
          <p><a className={styles.link} href="mailto:support@ortex.com">Contact us - support@ortex.com</a></p>
        </div>
        
      </div> 
    </div>
  )
}