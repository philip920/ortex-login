import React, { useState } from "react";
import styles from "./login.module.css";
import commonStyles from "../Common.module.css"
import ortexLogo from "../../assets/ortex_logo_turquoise.svg"
import { Modal } from "../Modal/Modal"

export function Login() {

  const [showResetPassword, setShowResetPassword] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({ username: "", password: "" });
  const [data, setData] = useState();

  // get EUR/USD exchange rate from tradingeconomics
  const websocket = new WebSocket("ws://stream.tradingeconomics.com/?client=guest:guest");

  websocket.onopen = () => websocket.send('{"topic": "subscribe", "to": "EURUSD:CUR"}');

  websocket.onmessage = (event) => {
    const wsData = JSON.parse(event.data)
    const date = new Date(wsData.dt)
    const dateArray = date.toString().split(' ')
    const formattedDate = `${dateArray[0]} ${dateArray[1]} ${dateArray[2]} ${dateArray[3]} ${dateArray[4]}`
    if (wsData.price && date) {
      setData({ date: formattedDate, price: wsData.price })
    }
  }

  // handle open/close state of modal
  const onOpenModal = () => setShowResetPassword(true);
  const onCloseModal = () => setShowResetPassword(false);

  // handle login credentials
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

  // render login page
  return (
    <div className={styles.container}>
      {data ?
        <div className={styles.desktopDataContainer}>
          <p className={styles.dataFirstLine}>{data.date}</p>
          <p className={styles.dataSecondLine}>EUR/USD: {data.price}</p>
        </div>
        :
        <div className={styles.desktopDataContainer}>
          <p className={styles.dataSecondLine}>Loading...</p>
        </div>
      }
      <div className={styles.loginWrapper}>
        <img alt="logo" className={styles.logo} src={ortexLogo} />
        {data ?
          <div className={styles.mobileDataContainer}>
            <p className={styles.dataFirstLine}>{data.date}</p>
            <p className={styles.dataSecondLine}>EUR/USD: {data.price}</p>
          </div>
          :
          <div className={styles.mobileDataContainer}>
            <p className={styles.dataSecondLine}>Loading...</p>
          </div>
        }
        <form action="/login" method="post">
          <input className={commonStyles.input} id="username" name="username" type="text" placeholder="Enter Username" value={loginCredentials.username} onChange={handleUsernameChange} />
          <input className={commonStyles.input} id="password" name="password" type="password" placeholder="Enter Password" value={loginCredentials.password} onChange={handlePasswordChange} />
          <input className={commonStyles.button} type="submit" value="LOGIN" />
        </form>
        <div className={styles.textWrapper}>
          <button onClick={onOpenModal} className={commonStyles.linkButton}>Forgot your password?</button>
          <p><a className={commonStyles.link} href="mailto:support@ortex.com">Contact us - support@ortex.com</a></p>
        </div>
      </div>
      <Modal isOpen={showResetPassword} onRequestClose={onCloseModal} />
    </div>
  )
}