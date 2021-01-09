import React from "react";
import whiteCross from "../../assets/white_cross.svg"
import styles from "./Modal.module.css";
import commonStyles from "../Common.module.css"
import ReactModal from 'react-modal';

// render reset password modal
export function Modal({ isOpen, onRequestClose }) {
  return (
    <ReactModal
      isOpen={isOpen}
      className={styles.customModal}
      overlayClassName={styles.overlay}
      onRequestClose={onRequestClose}
    >
      <div className={styles.closeButtonWrapper}>
        <input className={styles.closeButton} onClick={onRequestClose} type="image" alt="Close" src={whiteCross} />
      </div>
      <h2 className={styles.modalHeader}>Reset Password</h2>
      <p className={styles.modalInstruction}>Enter your email address to get reset instructions sent to you.</p>
      <form>
        <input className={commonStyles.input} type="email" placeholder="Enter Email"/>
        <input className={commonStyles.button} type="submit" value="SUBMIT" />
      </form>
      <div className={styles.modalAssistanceWrapper} >
        <p className={styles.modalAssistance}>If you need any assistance please contact us on</p>
        <p><a className={commonStyles.link} href="mailto:support@ortex.com">support@ortex.com</a></p>
      </div>
    </ReactModal>
  )
}