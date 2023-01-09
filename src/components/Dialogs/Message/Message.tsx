import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { DialogType, MessageType } from "../../../types/types";
import DialogsCss from "./../Dialogs.module.css";

const Messages: React.FC<PropsTypeMessages> = ({
  messagesData,
  addNewMessage,
}) => {
  const location = useLocation();
  const url = new URLSearchParams(location.pathname);
  const urlId = Number(url.get("userId"));
  let userIndex = messagesData.findIndex((x) => x.id === urlId);

  let arrMessages = messagesData[userIndex].messagesData.map((item, i) => {
    return (
      <div key={i} className={DialogsCss.message}>
        <p>{item.message}</p>
      </div>
    );
  });

  return (
    <div className={DialogsCss.message}>
      {arrMessages}
      <NewMessage addNewMessage={addNewMessage} userIndex={userIndex} />
    </div>
  );
};

export default Messages;

const NewMessage: React.FC<PropsTypeNewMessage> = ({
  addNewMessage,
  userIndex,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    addNewMessage(data.newMessage, userIndex);
    reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea {...register("newMessage")} cols={30} rows={10}></textarea>
        <div>
          <input type="submit" value={"Send"} />
        </div>
      </form>
    </div>
  );
};

type PropsTypeNewMessage = {
  addNewMessage: (newMessage: string, userIndex: number) => void;
  userIndex: number;
};

type FormValues = {
  newMessage: string;
};

type PropsTypeMessages = {
  addNewMessage: (newMessage: string, userIndex: number) => void;
  messagesData: Array<DialogType>;
};
