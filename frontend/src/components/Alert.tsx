interface AlertType {
  message: string;
  alertType: string;
}

const Alert = ({ message, alertType }: AlertType) => {
  const alertColor =
    alertType === "success"
      ? "bg-teal-300"
      : alertType === "error"
      ? "bg-red-300"
      : alertType === "info"
      ? "bg-orange-300"
      : "bg-yellow-300";

  return (
    <>
      <div
        className={`absolute left-1/4 w-1/2 top-20 z-30 text-center py-3 rounded-xl ${alertColor}`}
      >
        {message}
      </div>
    </>
  );
};

export default Alert;
