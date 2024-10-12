import { UserName } from "@/types/user";
import { UserOutlined } from "@ant-design/icons";
import { Form, Input, InputProps } from "antd";
import { Controller, useFormContext } from "react-hook-form";

interface NameInputProps extends InputProps {
  minimal?: boolean;
}

const NameInput = ({ minimal, ...inputProps }: NameInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<UserName>();

  return (
    <Form.Item
      label={!minimal ? "Imię" : undefined}
      validateStatus={errors.name ? "error" : ""}
      layout="vertical"
      help={errors.name ? errors.name.message : ""}
      required
    >
      <Controller
        control={control}
        name="name"
        rules={{
          required: "To pole jest wymagane",
        }}
        render={({ field }) => (
          <Input
            {...field}
            {...inputProps}
            prefix={minimal ? <UserOutlined /> : undefined}
            placeholder={minimal ? "Imię i nazwisko" : undefined}
          />
        )}
      />
    </Form.Item>
  );
};

export default NameInput;
