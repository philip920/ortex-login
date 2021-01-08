import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import ortexLogo from "../../assets/ortex_logo_turquoise.svg"
import whiteCross from "../../assets/white_cross.svg"
import ReactModal from 'react-modal';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function Login() {
  const [showResetPassword, setShowResetPassword] = useState(false)
  const [loginCredentials, setLoginCredentials] = useState({username: "", password: ""})
  const [data, setData] = useState()
  
  const websocket = new WebSocket("ws://stream.tradingeconomics.com/?client=guest:guest");

  websocket.onopen = () => websocket.send('{"topic": "subscribe", "to": "EURUSD:CUR"}')
  

  websocket.onmessage = (event) => {
    const wsData = JSON.parse(event.data)
    console.log("wsData:", wsData);
    console.log("wsData.dt:", wsData.dt);
    const date = new Date(wsData.dt)
    const dateArray = date.toString().split(' ')
    console.log("dateArray", dateArray)
    // const britishDate = `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()} - ${dateArray[4]}`
    const britishDate = `${dateArray[0]} ${dateArray[1]} ${dateArray[2]} ${dateArray[3]} ${dateArray[4]}`
    const time = `${date.getHours()}:${date.getMinutes()}`

    if (wsData.price && date) {

      console.log("date",date)
      console.log("britishDate",britishDate)
      console.log("time",time)
      setData({ date: britishDate, price: wsData.price})
    }
  }

  useEffect(() => {
    console.log("data:", data)
  },[data] )
  
  

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
    console.log("logged In")
  }

  return (
    <>
    <div className={styles.container}>
      <div className={styles.loginWrapper}>
        <img className={styles.logo} src={ortexLogo}/>
        <form onSubmit={handleSubmit} >
          <input className={styles.input} type="text" placeholder="Enter Username" value={loginCredentials.username} onChange={handleUsernameChange} />
          <input className={styles.input} type="password" placeholder="Enter Password" value={loginCredentials.password} onChange={handlePasswordChange} />
          <input className={styles.button} type="submit" value="LOGIN" />
        </form>
        <div className={styles.textWrapper}>
          <p><a onClick={onOpenModal} className={styles.link}>Forgot your password?</a></p>
          <p><a className={styles.link} href="mailto:support@ortex.com">Contact us - support@ortex.com</a></p>
        </div>
      </div> 
      {data ?
        <div>
          <p className={styles.dataFirstLine}>{data.date}</p>
          <p className={styles.dataSecondLine}>EUR/USD: {data.price}</p>
        </div>
      :
      <p className={styles.dataSecondLine}>Loading...</p>
      }
    </div>
    <ReactModal
        isOpen={showResetPassword}
        className={styles.customModal}
        overlayClassName={styles.overlay}
        onRequestClose={onCloseModal}
      >
        <div className={styles.closeButtonWrapper}>
          <input className={styles.closeButton} onClick={onCloseModal}  type="image" alt="Close" src={whiteCross}/>
        </div>
        <h2 className={styles.modalHeader}>Reset Password</h2>
        <p className={styles.modalInstruction}>Enter your email address to get reset instructions sent to you.</p>
        <form>
          <input className={styles.input} type="email" placeholder="Enter Email" />
          <input className={styles.button} type="submit" value="SUBMIT" />
        </form>
        <div className={styles.modalAssistanceWrapper} >
          <p className={styles.modalAssistance}>If you need any assistance please contact us on</p>
          <p><a className={styles.link} href="mailto:support@ortex.com">support@ortex.com</a></p>
        </div>
      </ReactModal>
      </>
  )
}