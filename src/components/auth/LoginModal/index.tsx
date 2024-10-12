import EmailInput from "@/components/user/inputs/EmailInput";
import PasswordInput from "@/components/user/inputs/PasswordInput";
import { useLoginMutation } from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setAuthToken } from "@/redux/slice/auth";
import { LoginSchema } from "@/types/user";
import { Alert, Button, Modal } from "antd";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

const FORM_ID = "add-company";

interface LoginModalProps {
  handleClose(): void;
  open: boolean;
}

const LoginModal = ({ open, handleClose }: LoginModalProps) => {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const formMethods = useForm<LoginSchema>();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleLogin = ({ email, password }: LoginSchema) => {
    login({ email, password })
      .unwrap()
      .then(({ accessToken }) => {
        dispatch(setAuthToken(accessToken ?? ""));
        handleClose();
      })
      .catch((error) => {
        setErrorMessage(error.data.message);
      });
  };

  return (
    <Modal
      title={"Zaloguj się"}
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
        <form id={FORM_ID} onSubmit={formMethods.handleSubmit(handleLogin)}>
          <div className="mt-10">
            <EmailInput size="large" minimal={true} />
            <PasswordInput minimal size="large" />
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
              Zaloguj się
            </Button>
            <div className="flex justify-center text-xs items-center gap-1 mt-6">
              <p className="text-slate-600">Nie masz konta?</p>
              <p className="underline hover:cursor-pointer ">Zarejestruj się</p>
            </div>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default LoginModal;
