const Notification = ({ message, isSuccesful }) => {
  if (message === null) {
    return <></>;
  }
  if (isSuccesful) {
    return <div className="success">{message}</div>;
  } else {
    return <div className="fail">{message}</div>;
  }
};
export default Notification;
