import type { ChangeTypeOfKeys } from "@/src/shared/lib";
import { Form, Switch, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import { useEffect } from "react";
import "./BlockSettingsForm.scss";
interface BlockSettingsFormProps {
  eventId: string;
  blockId: string;
  initialData?: BlockSettingsFormData;
}

export interface BlockSettingsFormData {
  isParallel: boolean;
  points: boolean;
  rightAnswers: boolean;
  partialPoints: boolean;
}

const formInputs: ChangeTypeOfKeys<
  BlockSettingsFormData,
  keyof BlockSettingsFormData,
  string
> = {
  isParallel: "Параллельность",
  points: "Показ очков",
  rightAnswers: "Показ правильных очков",
  partialPoints: "Выдача частичных баллов в множественном выборе",
};

//todo: добавить отправку запроса при дестрое на изменения
const BlockSettingsForm = ({ initialData }: BlockSettingsFormProps) => {
  const [form] = useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    }
  }, [form, initialData]);
  return (
    <Form form={form} requiredMark={false} initialValues={initialData}>
      {Object.entries(formInputs).map(([key, label]) => {
        return (
          <Form.Item key={key} className="block-settings-form__switch-wrapper">
            <FormItem<BlockSettingsFormData>
              noStyle
              name={key as keyof BlockSettingsFormData}
            >
              <Switch />
            </FormItem>
            <Typography.Text>{label}</Typography.Text>
          </Form.Item>
        );
      })}
    </Form>
  );
};

export default BlockSettingsForm;
