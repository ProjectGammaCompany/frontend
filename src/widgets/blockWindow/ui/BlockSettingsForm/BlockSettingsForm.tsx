import type { BlockSettings, UpdateBlockData } from "@/entities";
import type { ChangeTypeOfKeys } from "@/shared/lib";
import { Button, Form, Switch, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { updateBlockSettingsInQuery } from "../../model/updateBlockSettingsInQuery";
import { useFormSubmit } from "../../model/useFormSubmit";
import "./BlockSettingsForm.scss";

interface BlockSettingsFormProps {
  eventId: string;
  blockId: string;
  initialData?: UpdateBlockData;
}

const formInputs: ChangeTypeOfKeys<
  UpdateBlockData,
  keyof UpdateBlockData,
  string
> = {
  isParallel: "Параллельность",
  points: "Показ баллов",
  rightAnswers: "Показ правильных ответов",
};

const BlockSettingsForm = ({
  eventId,
  blockId,
  initialData,
}: BlockSettingsFormProps) => {
  const [form] = useForm();

  const [showSuccessText, setShowSuccessText] = useState(false);

  const [showErrorText, setShowErrorText] = useState(false);

  const handleSuccessSubmit = (variables?: UpdateBlockData) => {
    if (variables) {
      updateBlockSettingsInQuery(eventId, blockId, variables);
    }
    setShowSuccessText(true);
    setTimeout(() => {
      setShowSuccessText(false);
    }, 4000);
  };

  const handleErrorSubmit = () => {
    setShowErrorText(true);
    setTimeout(() => {
      setShowErrorText(false);
    }, 5000);
  };

  const submitMutation = useFormSubmit(
    eventId,
    blockId,
    handleSuccessSubmit,
    handleErrorSubmit,
  );

  const handleSubmit = (data: UpdateBlockData) => {
    submitMutation.mutate(data);
  };

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    }
  }, [form, initialData]);

  return (
    <Form
      form={form}
      onChange={() => {
        if (showErrorText) {
          setShowErrorText(false);
        }
      }}
      requiredMark={false}
      initialValues={initialData}
      onFinish={(data) => handleSubmit(data as BlockSettings)}
    >
      {Object.entries(formInputs).map(([key, label]) => {
        return (
          <Form.Item key={key} className="block-settings-form__switch-wrapper">
            <Form.Item<UpdateBlockData>
              noStyle
              name={key as keyof UpdateBlockData}
              initialValue={false}
            >
              <Switch />
            </Form.Item>
            <Typography.Text>{label}</Typography.Text>
          </Form.Item>
        );
      })}
      <AnimatePresence>
        {showSuccessText && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <Form.Item>
              <Typography.Paragraph
                className="block-settings-form__success-text"
                type="success"
              >
                Настройки сохранены
              </Typography.Paragraph>
            </Form.Item>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showErrorText && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <Form.Item>
              <Typography.Paragraph
                type="danger"
                className="block-settings-form__error-text"
              >
                Произошла ошибка. Повторите попытку позже.
              </Typography.Paragraph>
            </Form.Item>
          </motion.div>
        )}
      </AnimatePresence>
      <Form.Item className="block-settings-form__submit-btn-wrapper">
        <Button htmlType="submit">Сохранить</Button>
      </Form.Item>
    </Form>
  );
};

export default BlockSettingsForm;
