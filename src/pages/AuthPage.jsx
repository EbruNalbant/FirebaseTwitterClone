import { auth, provider } from "./../firebase/config";
import {
  signInWithRedirect,
  getRedirectResult,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthPage = () => {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const [mail, setMail] = useState("");

  //   kullanıcının hesabı daha önceden açıksa
  useEffect(() => {
    if (auth.currentUser) {
      navigate("/feed");
    }
  }, []);

  //   formun gönderilme olayı
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    setMail(email);
    const pass = e.target[1].value;

    if (signUp) {
      // yeni bir hesap oluşturma
      createUserWithEmailAndPassword(auth, email, pass)
        .then((res) => {
          navigate("/feed");
          toast.success("Your account has been created.");
        })
        .catch((err) => {
          toast.error(`Sorry, an error occured. ${err.code} `);
        });
    } else {
      // var olan hesaba giriş yapma
      signInWithEmailAndPassword(auth, email, pass)
        .then((res) => {
          navigate("/feed");
          toast.success("The account has been logged.");
        })
        .catch((err) => {
          // şifre yanlışsa state'i true'ya çekme
          if (err.code === "auth/invalid-login-credentials") {
            setShowErr(true);
          }
          toast.error(`Sorry, an error occured. ${err.code} `);
        });
    }
  };

  // google ile giriş
  const handleGoogle = async () => {
    try {
      const res = signInWithPopup(auth, provider);
      toast.success("Google hesabınız ile giriş yapıldı.");
      navigate("/feed");
    } catch (err) {
      console.log(err);
    }
  };

  //   şifre sıfırlama epostası gönderme
  const handleReset = () => {
    sendPasswordResetEmail(auth, mail)
      .then(() => {
        toast.info(`${mail} a reset email has been sen to your email.`);
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(`Sorry, an error occured: ${errorCode}`);
      });
  };

  return (
    <section className=" h-screen grid place-items-center">
      <div className="bg-black flex flex-col gap-10 py-16 px-32 rounded-lg">
        <div className="flex justify-center">
          <img className="h-[60px]" src="/x-logoo.webp" alt="twitter-logo" />
        </div>
        <h1 className="text-center font-bold text-xl">Log in to Twitter</h1>
        {/* google button */}
        <div
          onClick={handleGoogle}
          className="flex items-center bg-white py-2 px-10 rounded-full cursor-pointer gap-3 text-black hover:bg-gray-300"
        >
          <img className="h-[20px]" src="/google-logoo.svg" alt="google-icon" />
          <span className="whitespace-nowrap">Log in with Google</span>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col ">
          <label>Email: </label>
          <input
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="email"
            required
          />
          <label className="mt-5">Password: </label>
          <input
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="password"
            required
          />
          <button className="bg-white text-black mt-10 rounded-full p-1 font-bold transition hover:bg-gray-300">
            {signUp ? "Sign Up" : "Log In"}
          </button>
          <p className="mt-5 flex gap-4 ">
            <span className="text-gray-500">
              {signUp ? "Do have a account" : "Don't have an account"}
            </span>
            <span
              onClick={() => setSignUp(!signUp)}
              className="cursor-pointer text-blue-400"
            >
              {signUp ? "Log In" : "Sign Up"}
            </span>
          </p>
        </form>
        {/* şifreden kaynaklı hata varsa gösterilir*/}
        {showErr && (
          <p
            onClick={handleReset}
            className="text-red-400 cursor-pointer text-center"
          >
            Forgot password?
          </p>
        )}
      </div>
    </section>
  );
};

export default AuthPage;
