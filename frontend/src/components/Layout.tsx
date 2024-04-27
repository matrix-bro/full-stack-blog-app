import { ReactNode } from "react";
import { Alert, Navbar } from ".";
import { useAppSelector } from "../redux/hooks";

interface Props {
  children: ReactNode;
}

const Layout = (props: Props) => {
  const { message, alertType } = useAppSelector((state) => state.alert);

  return (
    <>
      <Navbar />
      {message && alertType && (
        <Alert message={message} alertType={alertType} />
      )}
      <div className="relative mx-auto mt-[7rem] min-h-screen max-w-screen-xl px-6 lg:px-0">
        {props.children}
      </div>
    </>
  );
};

export default Layout;
