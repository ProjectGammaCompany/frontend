import { CustomSwitch } from "@/shared/ui/CustomSwitch";
import { Button, Form, InputNumber, Select, Typography } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { ConditionData } from "../../api/createCondition";
import { useFormSubmit } from "../../model/useFormSubmit";
import "./ConditionForm.scss";

interface SelectOption {
  value: string;
  label: string;
}

interface ConditionFormProps<TResponse> {
  initialData?: ConditionData;
  onSuccessFn?: (response: TResponse, variables: ConditionData) => void;
  mutationFn: (values: ConditionData) => Promise<TResponse>;
  submitBtnText: string;
  onSuccessText?: string;
  groupsLoaded?: boolean;
  groups: SelectOption[] | undefined;
  isGroupsPending: boolean;
  blockOptions: SelectOption[] | undefined;
  isBlockOptionsError: boolean;
  isBlockOptionsPending: boolean;

  groupsError?: boolean;
  onHangingGroups?: (fixedGroups: string[]) => void;
}

const ConditionForm = <TResponse,>({
  initialData,
  onSuccessFn,
  mutationFn,
  groups,
  isGroupsPending,
  submitBtnText,
  onSuccessText,
  onHangingGroups,
  blockOptions,
  isBlockOptionsError,
  isBlockOptionsPending,
  groupsError,
  groupsLoaded,
}: ConditionFormProps<TResponse>) => {
  const SELECT_TYPE_ERROR_MESSAGE =
    "Выберите хотя бы одно из правил для условия";

  const [form] = useForm<ConditionData>();

  const max = useWatch("max", form);
  const min = useWatch("min", form);

  const [showSuccessText, setShowSuccessText] = useState(false);

  const handleSuccessSubmit = (
    response: TResponse,
    variables: ConditionData,
  ) => {
    setShowSuccessText(true);
    setTimeout(() => {
      setShowSuccessText(false);
    }, 5000);
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
      const preparedData = {
        ...initialData,
      };
      if (initialData.group) {
        if (groups) {
          let triggerGroupsUpdate = false;
          const eventGroupIdArray = groups.map((group) => group.value);
          const newGroups: string[] = [];
          initialData.group.forEach((group) => {
            if (!eventGroupIdArray.includes(group)) {
              triggerGroupsUpdate = true;
            } else {
              newGroups.push(group);
            }
          });
          if (triggerGroupsUpdate && !groupsLoaded && !groupsError) {
            onHangingGroups?.(newGroups);
          }
        }
      }
      form.setFieldsValue(preparedData);
    }
  }, [
    blockOptions,
    groups,
    form,
    groupsError,
    groupsLoaded,
    initialData,
    onHangingGroups,
  ]);

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      labelWrap
      initialValues={initialData}
      layout="vertical"
      requiredMark={false}
      className="condition-form"
    >
      <Form.Item<ConditionData>
        name="min"
        rules={[
          {
            validator(_, value) {
              if (
                value === -1 &&
                form.getFieldValue("max") === -1 &&
                !(form.getFieldValue("group") as string[] | undefined)?.length
              ) {
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
          title="За ранее пройденные задания набрано не менее заданного количества баллов (&gt;&nbsp;или&nbsp;=)"
        />
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          (prev, cur) => prev.min !== cur.min || prev.max !== cur.max
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("min") !== -1 ? (
            <Form.Item
              name="min"
              label="Введите число"
              className="condition-form__item condition-form__points-input"
            >
              <InputNumber min={0} />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <FormItem<ConditionData>
        name="max"
        rules={[
          {
            validator(_, value) {
              if (
                value === -1 &&
                form.getFieldValue("min") === -1 &&
                !(form.getFieldValue("group") as string[] | undefined)?.length
              ) {
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
          title="За ранее пройденные задания набрано менее заданного количества баллов (&lt;)"
        />
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
              className="condition-form__item condition-form__points-input"
            >
              <InputNumber min={0} />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      {groups && groups.length > 0 && (
        <Form.Item<ConditionData>
          name="group"
          label="Выберите группы, в одной из которых должен состоять участник события"
          rules={[
            {
              validator(_, value: string[] | undefined) {
                if (
                  !value?.length &&
                  form.getFieldValue("min") === -1 &&
                  form.getFieldValue("max") === -1
                ) {
                  return Promise.reject(new Error(SELECT_TYPE_ERROR_MESSAGE));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Select
            mode="multiple"
            disabled={(groupsError ?? isGroupsPending) || groupsLoaded}
            loading={isGroupsPending || groupsLoaded}
            options={groups}
            optionRender={(option) => (
              <Typography.Paragraph className="condition-form__group-list-option">
                {option.data.label}
              </Typography.Paragraph>
            )}
            className="condition-form__select-group"
            classNames={{
              itemRemove: "condition-form__remove-group-btn",
              popup: {
                listItem: "condition-form__tag-list-item",
              },
            }}
          />
        </Form.Item>
      )}

      <FormItem<ConditionData>
        name="blockId"
        label="Выберите блок, куда направится участник события при выполнении условия"
        className="condition-form__block-select-wrapper"
        rules={[{ required: true }]}
      >
        {!isBlockOptionsError ? (
          <Select loading={isBlockOptionsPending} options={blockOptions} />
        ) : (
          <Typography.Text>Произошла ошибка, попробуйте позже</Typography.Text>
        )}
      </FormItem>

      <AnimatePresence>
        {showSuccessText && onSuccessText && (
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
            <FormItem noStyle>
              <Typography.Paragraph type="success">
                {onSuccessText}
              </Typography.Paragraph>
            </FormItem>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {submitMutation.isError && (
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
            <FormItem noStyle>
              <Typography.Paragraph type="danger">
                Произошла ошибка. Повторите попытку позже.
              </Typography.Paragraph>
            </FormItem>
          </motion.div>
        )}
      </AnimatePresence>
      <FormItem noStyle>
        <Button htmlType="submit" loading={submitMutation.isPending}>
          {submitBtnText}
        </Button>
      </FormItem>
    </Form>
  );
};

export default ConditionForm;
