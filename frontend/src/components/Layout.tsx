import { ReactNode, useEffect } from "react";
import { Alert, Navbar } from ".";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { verifyAuth } from "../redux/features/authSlice";

interface Props {
  children: ReactNode;
}

const Layout = (props: Props) => {
  const { message, alertType } = useAppSelector((state) => state.alert);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      dispatch(verifyAuth());
    }
  }, [localStorage.getItem("token")]);

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
