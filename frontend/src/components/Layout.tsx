import { ReactNode } from "react";
import { Navbar } from ".";

interface Props {
  children: ReactNode;
}

const Layout = (props: Props) => {
  return (
    <>
      <Navbar />
      <div className="relative container mx-auto mt-[7rem] min-h-screen">
        {props.children}
      </div>
    </>
  );
};

export default Layout;
