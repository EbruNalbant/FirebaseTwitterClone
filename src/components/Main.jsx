import { useEffect, useState } from "react";
import Form from "./Form";
import Post from "./Post";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";
import Loading from "../components/Loading";

const Main = ({ user }) => {
  const tweetsCol = collection(db, "tweets");
  const [tweets, setTweets] = useState(null);
  useEffect(() => {
    // filtreleme ayarları tanımlama
    const options = query(tweetsCol, orderBy("createdAt", "desc"));
    onSnapshot(options, (snapshot) => {
      // tweetlerin geçici olarak tutulduğu dizi
      const tempTweets = [];
      // her bir dökümanının verisine erişip, diziye aktarma
      snapshot.forEach((doc) => {
        tempTweets.push({ ...doc.data(), id: doc.id });
      });
      setTweets(tempTweets);
    });
  }, []);
  return (
    <main className="border border-gray-700 overflow-y-auto">
      <header className="font-bold p-4 border-b-[1px] border-gray-700">
        Home
      </header>
      <Form user={user} />
      {!tweets ? (
        <Loading />
      ) : (
        tweets.map((tweet) => <Post key={tweet.id} tweet={tweet} />)
      )}
    </main>
  );
};

export default Main;
