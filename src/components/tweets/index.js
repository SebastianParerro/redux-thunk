import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestTweets, requestUsers } from "../../redux/actions";
import * as style from "./style.module.css";

export default function Tweets() {
  const dispatch = useDispatch();
  const tweets = useSelector((state) => state.tweets);
  const users = useSelector((state) => state.users);

  const getUser = (userID) => {
    const user = users.find((user) => user.id === userID);
    return user;
  };

  useEffect(() => {
    dispatch(requestTweets());
    dispatch(requestUsers());
  }, [dispatch]);

  return (
    <div className={style.page}>
      {tweets.length &&
        users.length &&
        tweets
          .map((tweet) => {
            return (
              <div className={style.card} key={tweet.id}>
                <div className={style.head}>
                  <div className={style.avatar}>
                    <img
                      src={getUser(tweet.userId).avatar}
                      alt={getUser(tweet.userId).name}
                    />
                  </div>
                  <div className={style.headInfo}>
                    <div className={style.headInfoNames}>
                      <div className={style.headInfoNamesItem}>
                        {getUser(tweet.userId).name}
                      </div>
                      <div className={style.headInfoNamesItem}>
                        {getUser(tweet.userId).username}
                      </div>
                    </div>
                    <div>{tweet.content}</div>
                  </div>
                </div>
                <div
                  className={style.mainImg}
                  style={{ backgroundImage: `url(${tweet.image})` }}
                ></div>
              </div>
            );
          })
          .reverse()}
    </div>
  );
}
