import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTweet, requestUsers } from "../../redux/actions";
import * as style from "./style.module.css";

export default function AddTweet() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [contentDirty, setContentDirty] = useState(false);
  const [imageDirty, setImageDirty] = useState(false);
  const [errorContentMessage, setErrorContentMessage] = useState(
    "Поле не может быть пустым"
  );
  const [errorImageMessage, setErrorImageMessage] = useState(
    "Поле не может быть пустым"
  );
  const [fieldBorderColor, setFieldBorderColor] = useState(null);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (errorContentMessage || errorImageMessage) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [errorContentMessage, errorImageMessage]);

  const validShema = {
    content: "(?:[A-zА-я][- ]?){3}",
    image: `(http)s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))`, //eslint-disable-line
  };

  const contentHandler = (event) => {
    var regex = new RegExp(validShema[event.target.name]);
    setContent(event.target.value);
    if (!regex.test(event.target.value)) {
      setErrorContentMessage("Минимум 3 символа");
      setFieldBorderColor({ content: "red" });
    } else {
      setErrorContentMessage("");
      setFieldBorderColor({ content: "green" });
    }
  };

  const imageHandler = (event) => {
    var regex = new RegExp(validShema[event.target.name]);
    setImage(event.target.value);
    if (!regex.test(event.target.value)) {
      setErrorImageMessage("Не корректный URL");
      setFieldBorderColor({ image: "red" });
    } else {
      setErrorImageMessage("");
      setFieldBorderColor({ image: "green" });
    }
  };

  useEffect(() => {
    dispatch(requestUsers());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData(event.target);
    let formObject = Object.fromEntries(data.entries());
    dispatch(
      createTweet({
        userId: Number(formObject.user),
        content: formObject.content,
        image: formObject.image,
      })
    );
    setContent("");
    setImage("");
  };

  const handleBlur = (event) => {
    // eslint-disable-next-line default-case
    switch (event.target.name) {
      case "content": {
        setContentDirty(true);
        break;
      }
      case "image": {
        setImageDirty(true);
        break;
      }
    }
  };

  return (
    <div className={style.page}>
      <form className={style.pageForm} onSubmit={handleSubmit}>
        <h3 className={style.pageFormTitle}>Add Tweet</h3>
        <select name="user" className={style.pageFormField}>
          {users.length &&
            users.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
        </select>
        {contentDirty && errorContentMessage && (
          <p className={style.error}>{errorContentMessage}</p>
        )}
        <input
          className={style.pageFormField}
          style={{ borderColor: fieldBorderColor && fieldBorderColor.content }}
          type="text"
          placeholder="Message"
          name="content"
          onChange={(e) => contentHandler(e)}
          onBlur={(e) => handleBlur(e)}
          value={content}
        />
        {imageDirty && errorImageMessage && (
          <p className={style.error}>{errorImageMessage}</p>
        )}
        <input
          className={style.pageFormField}
          style={{ borderColor: fieldBorderColor && fieldBorderColor.image }}
          type="text"
          placeholder="Image URL..."
          name="image"
          onChange={(e) => imageHandler(e)}
          onBlur={(e) => handleBlur(e)}
          value={image}
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
