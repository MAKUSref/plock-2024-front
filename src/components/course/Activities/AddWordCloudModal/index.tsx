import CrudModal from "@/components/common/CrudModal";
import { useAddWordCloudMutation } from "@/redux/api/wordCloudApi";
import { WordCloud } from "@/types/WordCloud";
import { Form, Input, message, notification } from "antd";
import { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

interface AddCloudWordModalProps {
  open: boolean;
  onClose: () => void;
}

const FORM_ID = "addCloudWordForm";

const AddCloudWordModal = ({ onClose, open }: AddCloudWordModalProps) => {
  const { id } = useParams<{ id: string }>();
  const formMethods = useForm<Pick<WordCloud, "question">>();
  const [addWordCloud, { isLoading }] = useAddWordCloudMutation();

  const handleSave = (wordCloud: Pick<WordCloud, "question">) => {
    addWordCloud({ wordCloud, courseId: id! })
      .unwrap()
      .then(() => {
        message.success("Chmurka słów dodana pomyślnie");
        onClose();
      })
      .catch((error) => {
        notification.error({
          message: "Nie udało się dodać chmurkki",
          description: error.data?.message,
        });
      });
  };

  useEffect(() => {
    formMethods.reset();
  }, [formMethods, open]);

  return (
    <CrudModal
      open={open}
      title="Dodaj pytanie do chmurki słów"
      handleCancel={onClose}
      formId={FORM_ID}
      isLoading={isLoading}
    >
      <FormProvider {...formMethods}>
        <form id={FORM_ID} onSubmit={formMethods.handleSubmit(handleSave)}>
          <div className="mt-2">
            <Form.Item
              label="Pytanie"
              validateStatus={
                formMethods.formState.errors.question ? "error" : ""
              }
              layout="vertical"
              help={
                formMethods.formState.errors.question
                  ? formMethods.formState.errors.question.message
                  : ""
              }
              required
            >
              <Controller
                control={formMethods.control}
                name="question"
                rules={{
                  required: "To pole jest wymagane",
                  maxLength: {
                    value: 100,
                    message: "Pytanie nie może przekraczać 100 znaków",
                  },
                }}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>
          </div>
        </form>
      </FormProvider>
    </CrudModal>
  );
};

export default AddCloudWordModal;
