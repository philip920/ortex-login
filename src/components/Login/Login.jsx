import React, { useState } from "react";
import styles from "./login.module.css";
import commonStyles from "../common.module.css"
import ortexLogo from "../../assets/ortex_logo_turquoise.svg"
import { Modal } from "../Modal/Modal"

export function Login() {

  const [showResetPassword, setShowResetPassword] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({username: "", password: ""});
  const [data, setData] = useState();
  
  const websocket = new WebSocket("ws://stream.tradingeconomics.com/?client=guest:guest");

  websocket.onopen = () => websocket.send('{"topic": "subscribe", "to": "EURUSD:CUR"}');
  
  websocket.onmessage = (event) => {
    const wsData = JSON.parse(event.data)
    const date = new Date(wsData.dt)
    const dateArray = date.toString().split(' ')
    const formattedDate = `${dateArray[0]} ${dateArray[1]} ${dateArray[2]} ${dateArray[3]} ${dateArray[4]}`
    if (wsData.price && date) {
      setData({ date: formattedDate, price: wsData.price})
    }
  }
  
  const onOpenModal = () => setShowResetPassword(true);
  const onCloseModal = () => setShowResetPassword(false);

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
    alert("logged In");
  }

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
        <img className={styles.logo} src={ortexLogo}/>
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
        <form onSubmit={handleSubmit} >
          <input className={commonStyles.input} type="text" placeholder="Enter Username" value={loginCredentials.username} onChange={handleUsernameChange} />
          <input className={commonStyles.input} type="password" placeholder="Enter Password" value={loginCredentials.password} onChange={handlePasswordChange} />
          <input className={commonStyles.button} type="submit" value="LOGIN" />
        </form>
        <div className={styles.textWrapper}>
          <p><a onClick={onOpenModal} className={commonStyles.link}>Forgot your password?</a></p>
          <p><a className={commonStyles.link} href="mailto:support@ortex.com">Contact us - support@ortex.com</a></p>
        </div>
      </div> 
      <Modal isOpen={showResetPassword} onRequestClose={onCloseModal} />
    </div>
  )
}