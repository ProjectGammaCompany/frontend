import type { BlockSettings, UpdateBlockData } from "@/src/entities";
import type { ChangeTypeOfKeys } from "@/src/shared/lib";
import { Button, Form, Switch, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";
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
  points: "Показ очков",
  rightAnswers: "Показ правильных очков",
};

const BlockSettingsForm = ({
  eventId,
  blockId,
  initialData,
}: BlockSettingsFormProps) => {
  const [form] = useForm();

  const [showSuccessText, setShowSuccessText] = useState(false);

  const handleSuccessSubmit = () => {
    setShowSuccessText(true);
    setTimeout(() => {
      setShowSuccessText(false);
    }, 4000);
  };

  const submitMutation = useFormSubmit(eventId, blockId, handleSuccessSubmit);

  const handleSubmit = (data: UpdateBlockData) => {
    console.log(data);
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
      requiredMark={false}
      initialValues={initialData}
      onFinish={(data) => handleSubmit(data as BlockSettings)}
    >
      {Object.entries(formInputs).map(([key, label]) => {
        return (
          <Form.Item key={key} className="block-settings-form__switch-wrapper">
            <FormItem<UpdateBlockData>
              noStyle
              name={key as keyof UpdateBlockData}
              initialValue={false}
            >
              <Switch />
            </FormItem>
            <Typography.Text>{label}</Typography.Text>
          </Form.Item>
        );
      })}
      {showSuccessText && (
        <FormItem>
          <Typography.Text>Настройки сохранены</Typography.Text>
        </FormItem>
      )}
      <FormItem>
        <Button htmlType="submit">Сохранить</Button>
      </FormItem>
    </Form>
  );
};

export default BlockSettingsForm;
