import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = () => {
  // kullanıcının yetkisinin olup/olmadığına dair state
  const [isAuth, setIsAuth] = useState(null);
  useEffect(() => {
    // altif oturumdaki değişikliği izleme
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);

  //   kullancının yetkisi yoksa logine yönlendirme
  if (isAuth === false) return <Navigate to={"/"} replace />;

  // kullanıcının yetkisi varsa alt roote'u gösterme
  return <Outlet />;
};

export default ProtectedRoute;
