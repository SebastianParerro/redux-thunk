import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestUsers } from "../../redux/actions";
import * as style from "./style.module.css";

export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(requestUsers());
  }, [dispatch]);

  return (
    <div className={style.page}>
      {users.length &&
        users
          .map((user) => {
            return (
              <div className={style.card} key={user.id}>
                <div className={style.avatar}>
                  <img src={user.avatar} alt={user.name} />
                </div>
                <div>{user.name}</div>
                <div>{user.username}</div>
              </div>
            );
          })
          .reverse()}
    </div>
  );
}
