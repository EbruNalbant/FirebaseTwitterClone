import Form from "./Form";
import Post from "./Post";

const Main = ({ user }) => {
  return (
    <div className="col-span-3 md:col-span-2 xl:col-span-1 border border-gray-700 overflow-y-auto">
      <header className="font-bold p-4 border-b-[1px] border-gray-700">
        Home
      </header>
      <Form user={user} />
      <Post />
    </div>
  );
};

export default Main;
