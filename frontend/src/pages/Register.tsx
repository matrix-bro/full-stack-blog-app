import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const { first_name, last_name, email, password, confirm_password } = formData;

  const onChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="md:w-1/2 my-6 mx-auto p-6 bg-gray-100 rounded-xl">
        <h1 className="mb-6 text-3xl text-center font-bold tracking-wide">
          Sign Up!
        </h1>
        <form action="" className="bg-gray-100 mt-4 rounded-xl px-5 py-4">
          <div className="py-2">
            <label className="text-xl font-semibold">First Name</label>
            <br />
            <input
              type="text"
              name="first_name"
              value={first_name}
              onChange={onChange}
              required
              className="border py-2 px-2 w-full"
            />
          </div>
          <div className="py-2">
            <label className="text-xl font-semibold">Last Name</label>
            <br />
            <input
              type="text"
              name="last_name"
              value={last_name}
              onChange={onChange}
              required
              className="border py-2 px-2 w-full"
            />
          </div>
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
          <div className="py-2">
            <label className="text-xl font-semibold">Confirm Password</label>
            <br />
            <input
              type="password"
              name="confirm_password"
              value={confirm_password}
              onChange={onChange}
              required
              className="border py-2 px-2 w-full"
            />
          </div>

          <button className="py-3 px-6 text-lg bg-teal-500 hover:bg-teal-700 rounded-xl text-white">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
