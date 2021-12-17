import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/actions";
import * as style from "./style.module.css";

export default function AddUser() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [nameDirty, setNameDirty] = useState(false);
  const [usernameDirty, setUsernameDirty] = useState(false);
  const [avatarDirty, setAvatarDirty] = useState(false);
  const [errorNameMessage, setErrorNameMessage] = useState(
    "Поле не может быть пустым"
  );
  const [errorUsernameMessage, setErrorUsernameMessage] = useState(
    "Поле не может быть пустым"
  );
  const [errorAvatarMessage, setErrorAvatarMessage] = useState(
    "Поле не может быть пустым"
  );
  const [formValid, setFormValid] = useState(false);
  const [fieldBorderColor, setFieldBorderColor] = useState(null);

  useEffect(() => {
    if (errorNameMessage || errorUsernameMessage || errorAvatarMessage) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [errorNameMessage, errorUsernameMessage, errorAvatarMessage]);

  const validShema = {
    name: "(?:[A-zА-я][- ]?){3}",
    username: "(?:[A-zА-я][- ]?){5}",
    avatar: `(http)s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))`, //eslint-disable-line
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData(event.target);
    let formObject = Object.fromEntries(data.entries());
    dispatch(createUser(formObject));
    setName("");
    setUsername("");
    setAvatar("");
  };

  const nameHandler = (event) => {
    var regex = new RegExp(validShema[event.target.name]);
    setName(event.target.value);
    if (!regex.test(event.target.value)) {
      setErrorNameMessage("Минимум 3 символа");
      setFieldBorderColor({ name: "red" });
    } else {
      setErrorNameMessage("");
      setFieldBorderColor({ name: "green" });
    }
  };

  const usernameHandler = (event) => {
    var regex = new RegExp(validShema[event.target.name]);
    setUsername(event.target.value);
    if (username.length > 0 && username[0] !== "@") {
      setUsername(`@${username}`);
    }
    if (!regex.test(event.target.value)) {
      setErrorUsernameMessage("Минимум 5 символа");
      setFieldBorderColor({ username: "red" });
    } else {
      setErrorUsernameMessage("");
      setFieldBorderColor({ username: "green" });
    }
  };

  const avatarHandler = (event) => {
    var regex = new RegExp(validShema[event.target.name]);
    setAvatar(event.target.value);
    if (!regex.test(event.target.value)) {
      setErrorAvatarMessage("Не корректный URL");
      setFieldBorderColor({ avatar: "red" });
    } else {
      setErrorAvatarMessage("");
      setFieldBorderColor({ avatar: "green" });
    }
  };

  const handleBlur = (event) => {
    // eslint-disable-next-line default-case
    switch (event.target.name) {
      case "name": {
        setNameDirty(true);
        break;
      }
      case "username": {
        setUsernameDirty(true);
        break;
      }
      case "avatar": {
        setAvatarDirty(true);
        break;
      }
    }
  };

  return (
    <div className={style.page}>
      <form className={style.pageForm} onSubmit={handleSubmit}>
        <h3 className={style.pageFormTitle}>Add user</h3>
        {nameDirty && errorNameMessage && (
          <p className={style.error}>{errorNameMessage}</p>
        )}
        <input
          className={style.pageFormField}
          style={{ borderColor: fieldBorderColor && fieldBorderColor.name }}
          type="text"
          placeholder="Name..."
          name="name"
          onChange={(e) => nameHandler(e)}
          onBlur={(e) => handleBlur(e)}
          value={name}
        />
        {usernameDirty && errorUsernameMessage && (
          <p className={style.error}>{errorUsernameMessage}</p>
        )}
        <input
          className={style.pageFormField}
          style={{ borderColor: fieldBorderColor && fieldBorderColor.username }}
          type="text"
          placeholder="Username..."
          name="username"
          onChange={(e) => usernameHandler(e)}
          onBlur={(e) => handleBlur(e)}
          value={username}
        />
        {avatarDirty && errorAvatarMessage && (
          <p className={style.error}>{errorAvatarMessage}</p>
        )}
        <input
          className={style.pageFormField}
          style={{ borderColor: fieldBorderColor && fieldBorderColor.avatar }}
          type="text"
          placeholder="Avatar..."
          name="avatar"
          onChange={(e) => avatarHandler(e)}
          onBlur={(e) => handleBlur(e)}
          value={avatar}
        />
        <input
          className={style.pageFormField}
          type="submit"
          value="Добавить"
          disabled={!formValid}
        />
      </form>
    </div>
  );
}
