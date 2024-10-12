import { Button, Modal } from "antd";
import { PropsWithChildren } from "react";

interface CrudModalProps {
  handleCancel(): void;
  isLoading?: boolean;
  open: boolean;
  title: string;
  formId: string;
  width?: number;
}

const CrudModal = ({
  children,
  handleCancel,
  open,
  isLoading,
  title,
  formId,
  width,
}: PropsWithChildren<CrudModalProps>) => {
  return (
    <Modal
      title={title}
      onCancel={handleCancel}
      open={open}
      width={width}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Anuluj
        </Button>,
        <Button
          loading={isLoading}
          form={formId}
          key="submit"
          htmlType="submit"
          type="primary"
        >
          Zapisz
        </Button>,
      ]}
    >
      {children}
    </Modal>
  );
};

export default CrudModal;
