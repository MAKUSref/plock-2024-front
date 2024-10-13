import ConfirmPasswordInput from "@/components/user/inputs/ConfirmPasswordInput";
import EmailInput from "@/components/user/inputs/EmailInput";
import NameInput from "@/components/user/inputs/NameInput";
import PasswordInput from "@/components/user/inputs/PasswordInput";
import { useSignInMutation } from "@/redux/api/authApi";
import { useSignForCourseMutation } from "@/redux/api/courseApi";
import { useAppDispatch } from "@/redux/hooks";
import { setAuthToken } from "@/redux/slice/auth";
import { UserBase } from "@/types/user";
import { Alert, Button, Modal, notification } from "antd";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useParams } from "react-router-dom";

const FORM_ID = "add-company";

interface SignInModalProps {
  handleClose(): void;
  open: boolean;
}

const SignInModal = ({ open, handleClose }: SignInModalProps) => {
  const dispatch = useAppDispatch();
  const formMethods = useForm<UserBase>();
  const { id } = useParams<{ id: string }>();
  const [errorMessage, setErrorMessage] = useState("");

  const [signIn, { isLoading }] = useSignInMutation();
  const [signForCourse] = useSignForCourseMutation();

  const handleSignIn = async (user: UserBase) => {
    const [name, surname] = user.name.split(" ");

    try {
      const { accessToken } = await signIn({
        ...user,
        name,
        surname,
        role: "user",
      }).unwrap();

      dispatch(setAuthToken(accessToken ?? ""));

      await signForCourse(id!).unwrap();
      notification.success({ message: "Zapisałeś się na szkolenie!" });
      handleClose();
    } catch (error) {
      setErrorMessage("Wystąpił błąd podczas rejestracji");
      console.log(error);
    }
  };

  return (
    <Modal
      title={"Zarejestruj się"}
      onCancel={handleClose}
      open={open}
      footer={null}
      loading={isLoading}
    >
      <p className="text-slate-600">
        Uzyskaj dostęp do swoich szkoleń, zgłoś obecność i uczestnicz aktywnie w
        zajęciach!
      </p>

      <FormProvider {...formMethods}>
        <form id={FORM_ID} onSubmit={formMethods.handleSubmit(handleSignIn)}>
          <div className="mt-10">
            <NameInput size="large" minimal={true} />
            <EmailInput size="large" minimal={true} />
            <PasswordInput minimal validate size="large" />
            <ConfirmPasswordInput size="large" />
            {errorMessage && (
              <Alert
                message="Błąd w logowaniu"
                description={errorMessage}
                type="error"
                className="mb-4"
              />
            )}
            <Button
              className="w-full py-6"
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
            >
              Załóż konto i zapisz się na szkolenie
            </Button>
            <div className="flex justify-center text-xs items-center gap-1 mt-6">
              <p className="text-slate-600">Masz już konto?</p>
              <p className="underline hover:cursor-pointer ">Zaloguj się</p>
            </div>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default SignInModal;
