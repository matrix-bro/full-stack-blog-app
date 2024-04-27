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
      <div className="relative container mx-auto mt-[7rem] min-h-screen">
        {props.children}
      </div>
    </>
  );
};

export default Layout;
