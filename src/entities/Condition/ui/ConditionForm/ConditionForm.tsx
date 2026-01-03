import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, InputNumber, Select, Switch, Typography } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import { useEffect } from "react";
import { getBlocksOptions, type BlockOption } from "../../api/getBlocksOptions";
import "./ConditionForm.scss";

interface ConditionFormProps<TResponse> {
  eventId: string;
  initialData?: ConditionFormData;
  onSuccessFn?: (response: TResponse, variables: ConditionFormData) => void;
  mutationFn: (values: ConditionFormData) => Promise<TResponse>;
  submitBtnText: string;
}
interface ConditionFormData {
  min: number;
  max: number;
  group?: string[];
  blockId: string;
}

const ConditionForm = <TResponse,>({
  eventId,
  initialData,
  onSuccessFn,
  mutationFn,
  submitBtnText,
}: ConditionFormProps<TResponse>) => {
  const [form] = useForm<ConditionFormData>();

  const {
    data: blockOptions,
    isPending,
    isError,
  } = useQuery({
    queryKey: [],
    queryFn: () => getBlocksOptions(eventId),
    select: (data) => data.data.blocks,
  });

  const formMutation = useMutation({
    mutationFn: mutationFn,
    onSuccess: onSuccessFn,
  });

  const handleFinish = (values: ConditionFormData) => {
    formMutation.mutate(values);
  };

  const max = useWatch("max", form);
  const min = useWatch("min", form);

  useEffect(() => {
    if (!initialData) {
      form.setFieldsValue({ ...form.getFieldsValue, max: -1, min: -1 });
      return;
    }
    if (initialData && blockOptions) {
      form.setFieldsValue(initialData);
    }
  }, [blockOptions, form, initialData]);

  const mapBlockOptionsToSelectOption = (blocks: BlockOption[]) => {
    return blocks.map((block) => {
      return { value: block.id, label: block.name };
    });
  };

  const selectTypeErrorMessage = "Выберите хотя бы одно из правил для условия";

  return (
    <Form
      initialValues={initialData}
      form={form}
      onFinish={handleFinish}
      labelWrap
      layout="vertical"
      requiredMark={false}
    >
      <FormItem<ConditionFormData>>
        <FormItem<ConditionFormData>
          name="max"
          noStyle
          rules={[
            {
              validator(_, value) {
                if (value === -1 && form.getFieldValue("min") === -1) {
                  return Promise.reject(new Error(selectTypeErrorMessage));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Switch
            checked={max != -1}
            onChange={(checked) => {
              form.setFieldValue("max", checked ? 0 : -1);
            }}
          />
        </FormItem>
        <Typography.Text>
          Набрано менее заданного количества баллов (&lt;)
        </Typography.Text>
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
            <Form.Item name="max" label="Введите число">
              <InputNumber min={0} />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <FormItem<ConditionFormData>>
        <Form.Item
          name="min"
          noStyle
          rules={[
            {
              validator(_, value) {
                if (value === -1 && form.getFieldValue("max") === -1) {
                  return Promise.reject(new Error(selectTypeErrorMessage));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Switch
            checked={min != -1}
            onChange={(checked) => {
              form.setFieldValue("min", checked ? 0 : -1);
            }}
          />
        </Form.Item>
        <Typography.Text>
          Набрано не менее заданного количества баллов (&gt; или =)
        </Typography.Text>
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
            <Form.Item name="min" label="Введите число">
              <InputNumber min={0} />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <FormItem<ConditionFormData>
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

      <FormItem noStyle>
        <Button htmlType="submit">{submitBtnText}</Button>
      </FormItem>
    </Form>
  );
};

export default ConditionForm;
