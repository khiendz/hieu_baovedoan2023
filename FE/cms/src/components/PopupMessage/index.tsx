import React, { useEffect, useState } from "react";
import classNames from "classnames";

import IcoClose from "./images/close.svg";
import IcoSuccess from "./images/success.svg";
import IcoError from "./images/error.svg";

import styles from "./style.module.scss";

export default function PopupMessage(props: any) {
  const { status, title, message, duration = 5, onClose } = props;
  const isMobile = process.env.IS_MOBILE;
  const [popupStatus, setPopupStatus] = useState("error");
  const [popupTitle, setPopupTitle] = useState<any>();
  const [popupMessage, setPopupMessage] = useState<any>();

  useEffect(() => {
    if (message) {
      setPopupStatus(status ?? "error");
      setPopupTitle(title ?? null);
      setPopupMessage(message ?? null);

      setTimeout(() => {
        onClose();
      }, duration * 1000);
    }
  }, [message]);

  return (
    <div
      className={classNames(styles["popup-message"], styles[popupStatus], {
        [styles["mobile"]]: isMobile,
        [styles["active"]]: message,
      })}
    >
      <>
        <button
          type={"button"}
          className={styles["popup-message__close"]}
          onClick={onClose}
        >
          <IcoClose width={32} height={32} aria-hidden={true} />
        </button>
        {popupStatus === "success" ? (
          <IcoSuccess
            className={styles["popup-message__status"]}
            width={24}
            height={24}
            aria-hidden={true}
          />
        ) : (
          <IcoError
            className={styles["popup-message__status"]}
            width={24}
            height={24}
            aria-hidden={true}
          />
        )}
        <div
          className={styles["popup-message__title"]}
          dangerouslySetInnerHTML={{ __html: popupTitle }}
        ></div>
        <div
          className={styles["popup-message__content"]}
          dangerouslySetInnerHTML={{ __html: popupMessage }}
        ></div>
        {message ? (
          <div
            className={classNames(
              styles["popup-message__time"],
              styles[popupStatus]
            )}
            style={
              duration > 0
                ? {
                    WebkitAnimationDuration: duration + "s",
                    animationDuration: duration + "s",
                  }
                : {}
            }
          ></div>
        ) : null}
      </>
    </div>
  );
}
