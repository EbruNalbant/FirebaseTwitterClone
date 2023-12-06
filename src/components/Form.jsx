import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { BsCardImage } from "react-icons/bs";
import { toast } from "react-toastify";
import { db } from "../firebase/config";

const Form = ({ user }) => {
  // koleksiyonun referansını alma
  const collectionRef = collection(db, "tweets");
  // twwet atma
  const handleSubmit = async (e) => {
    e.preventDefault();

    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];

    if (!textContent && !imageContent) {
      toast.info("Add tweet content.", { autoClose: 2000 });
      return;
    }
    // tweet'i koleksiyona ekleme
    await addDoc(collectionRef, {
      textContent,
      imageContent: null,
      createdAt: serverTimestamp(),
      user: {
        id: user.uid,
        name: user.displayName,
        photo: user.photoURL,
      },
      likes: [],
      isEdited: false,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 p-4 border-b-[1px] border-gray-700"
    >
      <img
        className="rounded-full h-[55px] md:h-[45px] mt-1"
        src={user?.photoURL}
      />
      <div className="w-full">
        <input
          className="bg-transparent my-2 outline-none text-normal md:text-lg"
          type="text"
          placeholder="What is happening?"
        />
        <div className="flex justify-between items-center">
          <label
            htmlFor="picture"
            className="hover:bg-gray-800 text-lg transition p-4 cursor-pointer rounded-full"
          >
            <BsCardImage />

            <input className="hidden" id="picture" type="file" />
          </label>
          <button className="bg-blue-600 px-4 py-2 rounded-full transition hover:bg-blue-800">
            Post
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
