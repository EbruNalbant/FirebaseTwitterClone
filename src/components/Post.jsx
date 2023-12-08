import moment from "moment";
import { auth, db } from "../firebase/config";
import { AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { FcLike } from "react-icons/fc";
import { GiConfirmed } from "react-icons/gi";
import { MdOutlineCancel } from "react-icons/md";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import DropdownMenu from "./DropdownMenu";

const Post = ({ tweet }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const date = moment(tweet.createdAt?.toDate()).fromNow();

  // kullanıcının tweet'i beğenip/beğenmediğini belirleme
  useEffect(() => {
    const found = tweet.likes.find((userId) => userId === auth.currentUser.uid);
    setIsLiked(found);
  }, [tweet]);

  // tweet'i silme
  const handleDelete = async () => {
    if (confirm("Do you agree to delete the tweet?")) {
      // silmek istenilen belgenin referansını alma
      const docRef = doc(db, "tweets", tweet.id);
      // dökümanı silme
      await deleteDoc(docRef);
    }
  };

  // like atma & geri çekme
  const toogleLike = async () => {
    // dökümanın referansını alma
    const docRef = doc(db, "tweets", tweet.id);

    await updateDoc(docRef, {
      likes: isLiked
        ? // diziden aktif kullanıcının id'sini kaldırma
          arrayRemove(auth.currentUser.uid)
        : // diziye tweet'i like'layan kullanıcının id'sini ekleme
          arrayUnion(auth.currentUser.uid),
    });
  };

  // tweeti güncelleme
  const handleSave = (e) => {
    e.preventDefault();

    const tweetRef = doc(db, "tweets", tweet.id);

    updateDoc(tweetRef, {
      isEdited: true,
      textContent: e.target[0].value,
    });

    setIsEditMode(false);
  };
  return (
    <div className="flex gap-3 p-3 border-b-[1px] border-gray-600">
      <img
        className="w-14 h-14 rounded-full"
        src={tweet.user.photo}
        alt="user_photo"
      />

      <div className="w-full">
        {/* top part > user informations */}
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <p className="font-bold">{tweet.user.name}</p>
            <p className="text-gray-400">@{tweet.user.name}</p>
            <p className="text-gray-400">{date}</p>
          </div>
          {tweet.user.id === auth.currentUser.uid && (
            <DropdownMenu
              handleDelete={handleDelete}
              handleEdit={() => setIsEditMode(true)}
            />
          )}
        </div>
        {/* middle part > tweet content */}
        <div className="my-3">
          {isEditMode ? (
            <form onSubmit={handleSave} className="flex gap-2 items-center">
              <input
                className=" bg-black text-white outline-none border-2 border-gray-600 rounded-lg p-2"
                type="text"
                defaultValue={tweet.textContent}
              />
              <button
                className="bg-red-900 rounded-full h-8 w-8 flex items-center  justify-center"
                type="button"
                onClick={() => setIsEditMode(false)}
              >
                <span className="text-xl">
                  {" "}
                  <MdOutlineCancel />
                </span>
              </button>

              <button
                className="bg-[#0980097d] rounded-full h-8 w-8 flex items-center justify-center"
                type="submit"
              >
                <span className="text-xl">
                  {" "}
                  <GiConfirmed />
                </span>
              </button>
            </form>
          ) : (
            <p>{tweet?.textContent}</p>
          )}
          {tweet?.imageContent && (
            <img
              className="w-full object-contain max-h-[300px] mt-3 rounded-lg"
              src={tweet.imageContent}
            />
          )}
        </div>
        {/* bottom part > buttons */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#00a2ff6a] ">
            {" "}
            <BiMessageRounded />
            <span>{Math.round(Math.random() * 900)}</span>
          </div>
          <div className="flex gap-1 items-center p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#1eff0034] ">
            {" "}
            <FaRetweet />
            <span>{Math.round(Math.random() * 900)}</span>
          </div>
          <div
            onClick={toogleLike}
            className="flex gap-1 items-center p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#ff26003e] "
          >
            {isLiked ? <FcLike /> : <AiOutlineHeart />}
            <span>{tweet.likes.length}</span>
          </div>
          <div className="flex gap-1 items-center p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#4a515c3c] ">
            {" "}
            <FiShare2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
