import { ActivateAccountFormSchema } from "@/types/user";
import { LockOutlined } from "@ant-design/icons";
import { Form, Input, InputProps } from "antd";
import { Controller, useFormContext } from "react-hook-form";

const ConfirmPasswordInput = ({ size }: InputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<Pick<ActivateAccountFormSchema, "confirmPassword">>();

  return (
    <Form.Item
      label={undefined}
      validateStatus={errors.confirmPassword ? "error" : ""}
      layout="vertical"
      help={errors.confirmPassword ? errors.confirmPassword.message : ""}
      required
    >
      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          required: "To pole jest wymagane",
        }}
        render={({ field }) => (
          <Input
            prefix={<LockOutlined />}
            placeholder="Potwierdź hasło"
            {...field}
            type="password"
            size={size}
          />
        )}
      />
    </Form.Item>
  );
};

export default ConfirmPasswordInput;
