import React from "react";
import css from "./NotificationSettingsUtil.module.css";

const NotificationSettingsUtil = ({ txt, tag, push, email, whatsapp, onToggle }) => {
  return (
    <div className={css.row}>
      <div className={css.texts}>
        <div className={css.title}>{txt}</div>
        <div className={css.description}>{tag}</div>
      </div>
      <div className={css.toggles}>
        <label className={css.switch}>
          <input type="checkbox" checked={push} onChange={() => onToggle("push")} />
          <span className={css.slider}></span>
        </label>
        <label className={css.switch}>
          <input type="checkbox" checked={email} onChange={() => onToggle("email")} />
          <span className={css.slider}></span>
        </label>
        <label className={css.switch}>
          <input type="checkbox" checked={whatsapp} onChange={() => onToggle("whatsapp")} />
          <span className={css.slider}></span>
        </label>
      </div>
    </div>
  );
};

export default NotificationSettingsUtil;
