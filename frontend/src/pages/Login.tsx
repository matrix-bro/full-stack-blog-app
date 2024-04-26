import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="lg:w-1/3 md:w-1/2 my-6 mx-auto p-6 bg-gray-100 rounded-xl">
        <h1 className="mb-6 text-3xl text-center font-bold tracking-wide">
          Log In
        </h1>
        <form className="bg-gray-100 mt-4 rounded-xl px-5 py-4">
          <div className="py-2">
            <label className="text-xl font-semibold">Email</label>
            <br />
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              className="border py-2 px-2 w-full"
            />
          </div>
          <div className="py-2">
            <label className="text-xl font-semibold">Password</label>
            <br />
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              className="border py-2 px-2 w-full"
            />
          </div>

          <button className="py-3 px-8 text-lg bg-blue-500 hover:bg-blue-700 rounded-xl text-white">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
