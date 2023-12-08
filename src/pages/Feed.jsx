import Aside from "../components/Aside";
import Nav from "../components/Nav";
import Main from "../components/Main";
import { auth } from "./../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const Feed = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    // firebase'den aktif kullanıcının verisini alma & state'e aktarma
    onAuthStateChanged(auth, (res) => {
      setUser(res);
    });
  }, []);
  return (
    <div className="feed h-screen bg-black owerflow-hidden">
      <Nav user={user} />
      <Main user={user} />
      <Aside />
    </div>
  );
};

export default Feed;
