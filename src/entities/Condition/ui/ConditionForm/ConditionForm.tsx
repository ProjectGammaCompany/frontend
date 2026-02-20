import { CustomSwitch } from "@/src/shared/ui";
import { useQuery } from "@tanstack/react-query";
import { Button, Form, InputNumber, Select, Typography } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";
import type { ConditionData } from "../../api/createCondition";
import { getBlocksOptions } from "../../api/getBlocksOptions";
import { mapBlockOptionsToSelectOption } from "../../model/mapBlockOptionsToSelectOption";
import { useFormSubmit } from "../../model/useFormSubmit";
import "./ConditionForm.scss";

interface ConditionFormProps<TResponse> {
  eventId: string;
  initialData?: ConditionData;
  onSuccessFn?: (response: TResponse, variables: ConditionData) => void;
  mutationFn: (values: ConditionData) => Promise<TResponse>;
  submitBtnText: string;
  onSuccessText?: string;
}

const ConditionForm = <TResponse,>({
  eventId,
  initialData,
  onSuccessFn,
  mutationFn,
  submitBtnText,
  onSuccessText,
}: ConditionFormProps<TResponse>) => {
  const SELECT_TYPE_ERROR_MESSAGE =
    "Выберите хотя бы одно из правил для условия";

  const [form] = useForm<ConditionData>();

  const max = useWatch("max", form);
  const min = useWatch("min", form);

  const [showSuccessText, setShowSuccessText] = useState(false);

  const {
    data: blockOptions,
    isPending,
    isError,
  } = useQuery({
    queryKey: [],
    queryFn: () => getBlocksOptions(eventId),
    select: (data) => data.data.blocks,
  });

  const handleSuccessSubmit = (
    response: TResponse,
    variables: ConditionData,
  ) => {
    setShowSuccessText(true);
    onSuccessFn?.(response, variables);
  };

  const submitMutation = useFormSubmit(mutationFn, handleSuccessSubmit);

  const handleFinish = (values: ConditionData) => {
    submitMutation.mutate(values);
  };

  useEffect(() => {
    if (!initialData) {
      form.setFieldsValue({ ...form.getFieldsValue, max: -1, min: -1 });
      return;
    }
    if (initialData && blockOptions) {
      form.setFieldsValue(initialData);
    }
  }, [blockOptions, form, initialData]);

  return (
    <Form
      initialValues={initialData}
      form={form}
      onFinish={handleFinish}
      labelWrap
      layout="vertical"
      requiredMark={false}
      className="condition-form"
    >
      <FormItem<ConditionData> className="condition-form__item">
        <FormItem<ConditionData>>
          <Form.Item
            name="min"
            noStyle
            rules={[
              {
                validator(_, value) {
                  if (value === -1 && form.getFieldValue("max") === -1) {
                    return Promise.reject(new Error(SELECT_TYPE_ERROR_MESSAGE));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <CustomSwitch
              checked={min != -1}
              onChange={(checked) => {
                form.setFieldValue("min", checked ? 0 : -1);
              }}
              title="Набрано не менее заданного количества баллов (&gt; или =)"
            />
          </Form.Item>
        </FormItem>
        <Form.Item
          noStyle
          shouldUpdate={
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            (prev, cur) => prev.min !== cur.min
          }
        >
          {({ getFieldValue }) =>
            getFieldValue("min") !== -1 ? (
              <Form.Item
                name="min"
                label="Введите число"
                className="condition-form__item"
              >
                <InputNumber min={0} />
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <FormItem<ConditionData>
          name="max"
          noStyle
          rules={[
            {
              validator(_, value) {
                if (value === -1 && form.getFieldValue("min") === -1) {
                  return Promise.reject(new Error(SELECT_TYPE_ERROR_MESSAGE));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <CustomSwitch
            checked={max != -1}
            onChange={(checked) => {
              form.setFieldValue("max", checked ? 0 : -1);
            }}
            title="Набрано менее заданного количества баллов (&lt;)"
          />
        </FormItem>
      </FormItem>
      <Form.Item
        noStyle
        shouldUpdate={
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          (prev, cur) => prev.max !== cur.max || prev.min !== cur.min
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("max") !== -1 ? (
            <Form.Item
              name="max"
              label="Введите число"
              className="condition-form__item"
            >
              <InputNumber min={0} />
            </Form.Item>
          ) : null
        }
      </Form.Item>

      <FormItem<ConditionData>
        name="blockId"
        label="Выберите блок, куда направится участник события при выполнении условия"
        className="condition-form__block-select-wrapper"
        rules={[{ required: true }]}
      >
        {!isError ? (
          <Select
            loading={isPending}
            options={
              blockOptions
                ? mapBlockOptionsToSelectOption(blockOptions)
                : undefined
            }
          />
        ) : (
          <Typography.Text>Произошла ошибка, попробуйте позже</Typography.Text>
        )}
      </FormItem>

      {showSuccessText && onSuccessText && (
        <FormItem noStyle>
          <Typography.Text>{onSuccessText}</Typography.Text>
        </FormItem>
      )}
      <FormItem noStyle>
        <Button htmlType="submit">{submitBtnText}</Button>
      </FormItem>
    </Form>
  );
};

export default ConditionForm;
