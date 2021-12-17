import { Link } from "react-router-dom";
import * as style from "./style.module.css";

export default function NavBar() {
  return (
    <div className={style.navbar}>
      <Link className={style.menuItem} to="/">
        Пользователи
      </Link>
      <Link className={style.menuItem} to="/addUser">
        Добавить пользователя
      </Link>
      <Link className={style.menuItem} to="/tweets">
        Твиты
      </Link>
      <Link className={style.menuItem} to="/addTweet">
        Добавить Твит
      </Link>
    </div>
  );
}
