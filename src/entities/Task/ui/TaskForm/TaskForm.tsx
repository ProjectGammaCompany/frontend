import { getRandomString, useFileUpload } from "@/src/shared/lib";
import { CustomSwitch, TrashSvg } from "@/src/shared/ui";
import { useMutation } from "@tanstack/react-query";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Typography,
  Upload,
  type UploadFile,
  type UploadProps,
} from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import type { DefaultOptionType } from "antd/es/select";
import { useEffect, useState } from "react";
import type { ServerOption } from "../../api/getEditorTaskData";
import "./TaskForm.scss";
interface TaskFormProps<TResponse> {
  initialData?: TaskFormData;
  name: string;
  submitBtnText: string;
  mutationFn: (data: FullTaskData) => Promise<TResponse>;
  onSuccessFn?: (response: TResponse, variables: FullTaskData) => void;
  order: number;
}

export type ClientOption = ServerOption & { clientId: string };

export interface TaskFormData {
  description?: string;
  type: number;
  options?: ClientOption[];
  files: string[];
  points?: number;
  time: number;
  partialPoints?: boolean;
}

export type FullTaskData = TaskFormData & { name: string };

//todo: рефакторинг. Сделать лучше и читабельнее
const TaskForm = <TResponse,>({
  initialData,
  name,
  order,
  onSuccessFn,
  submitBtnText,
  mutationFn,
}: TaskFormProps<TResponse>) => {
  const typeOptions: DefaultOptionType[] = [
    {
      value: 0,
      label: "Информационный сегмент",
    },
    {
      value: 1,
      label: "Один правильный ответ",
    },
    {
      value: 2,
      label: "Множественный выбор",
    },
    {
      value: 3,
      label: "Ввод текстом/Считывание QR-кода",
    },
  ];

  const [form] = useForm<TaskFormData>();

  const taskType = useWatch("type", form);

  const options = useWatch("options", form);

  const uploadMutation = useFileUpload();

  const uploadFile = async (file: File) => {
    const res = await uploadMutation.mutateAsync(file);
    return res.data;
  };

  const formMutation = useMutation<TResponse, Error, FullTaskData>({
    mutationFn: (data) => mutationFn(data),
    onSuccess: onSuccessFn,
  });

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const customRequest: UploadProps["customRequest"] = ({
    file,
    onSuccess,
    onError,
  }) => {
    void (async () => {
      try {
        const data = await uploadFile(file as File);
        onSuccess?.(
          {
            url: data.url,
          },
          file,
        );
      } catch (e) {
        onError?.(e as Error);
      }
    })();
  };

  const mapUrlsToFileList = (urls: string[]): UploadFile[] =>
    urls.map((url, index) => ({
      uid: `${index}`,
      name: url.split("/").pop() ?? `file-${index}`,
      status: "done",
      url,
    }));

  const handleChange: UploadProps["onChange"] = ({ fileList }) => {
    const normalized = fileList.map((file) => {
      if (
        file.response &&
        typeof file.response === "object" &&
        "url" in file.response &&
        typeof (file.response as { url: unknown }).url === "string"
      ) {
        return {
          ...file,
          url: (file.response as { url: string }).url,
        };
      }
      return file;
    });

    setFileList(normalized);

    const urls = normalized
      .filter(
        (file): file is UploadFile & { url: string } =>
          file.status === "done" && !!file.url,
      )
      .map((file) => file.url);
    form.setFieldValue("files", urls);
  };

  //TODO: определение типа 3 или 4 по этому в посыле формы
  const [rightAnswerType, setRightAnswerType] = useState<"qr" | "text">("text");

  const onFinish = (values: TaskFormData) => {
    const taskName = name ?? `Задание ${order}`;
    let type = values.type;
    if (type === 3 && rightAnswerType === "qr") {
      type = 4;
    }
    formMutation.mutate({ ...values, name: taskName, type });
  };

  useEffect(() => {
    if (initialData?.files.length) {
      setFileList(mapUrlsToFileList(initialData.files));
    }
  }, [initialData?.files]);

  //todo: посмотреть правильный вариант
  useEffect(() => {
    const urls = fileList
      .filter((f) => f.status === "done" && f.url)
      .map((f) => f.url!);
    form.setFieldValue("files", urls);
  }, [fileList, form]);

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    }
  }, [form, initialData]);

  return (
    <Form
      initialValues={initialData}
      form={form}
      requiredMark={false}
      scrollToFirstError={{ behavior: "instant", block: "end", focus: true }}
      onFinish={onFinish}
      className="task-form"
    >
      <Form.Item<TaskFormData>
        name="description"
        label="Описание"
        initialValue={""}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item<TaskFormData>
        name="type"
        label="Тип"
        rules={[{ required: true }]}
      >
        <Select
          options={typeOptions}
          onChange={(val: number) => {
            if (
              ![1, 2].includes(val) ||
              ![1, 2].includes(form.getFieldValue("type") as number)
            )
              form.setFieldValue("options", []);
          }}
        />
      </Form.Item>
      {taskType === 3 && (
        <>
          <Form.Item<TaskFormData> name="options" label="Правильный ответ">
            {
              //Todo: доделать позднее
            }
            <div>
              {rightAnswerType === "text" ? (
                <Input value={options?.[0]?.value} />
              ) : (
                <div>{options?.[0]?.value}</div>
              )}
              <Button
                onClick={() => {
                  setRightAnswerType((prev) => {
                    if (prev === "qr") {
                      form.setFieldValue("options", [""]);
                      return "text";
                    }
                    form.setFieldValue("options", [getRandomString(20)]);
                    return "qr";
                  });
                }}
              >
                Н
              </Button>
            </div>
          </Form.Item>
        </>
      )}
      {(taskType === 1 || taskType === 2) && (
        <Form.Item<TaskFormData> label="Опции">
          <Form.Item name="options" noStyle>
            <div />
          </Form.Item>
          <ul className="task-form__options-list">
            {options?.map((option, index) => {
              return (
                <li key={option.clientId} className="task-form__option-item">
                  <Button
                    className="task-form__right-answer-toggle"
                    style={{
                      backgroundColor: option.isCorrect
                        ? "green"
                        : "transparent",
                    }}
                    onClick={() => {
                      const newArray = options.map((opt, i) => {
                        const newValues = !option.isCorrect;
                        if (i === index) {
                          return {
                            ...opt,
                            isCorrect: newValues,
                          };
                        }
                        if (
                          form.getFieldValue("type") == 1 &&
                          newValues &&
                          i != index &&
                          opt.isCorrect
                        ) {
                          return {
                            ...opt,
                            isCorrect: false,
                          };
                        }
                        return opt;
                      });
                      form.setFieldValue("options", newArray);
                    }}
                  ></Button>
                  <Input
                    placeholder="Введите текст опции"
                    value={option.value}
                    onChange={(event) => {
                      event.preventDefault();
                      const newArray = options.map((opt, i) =>
                        i === index
                          ? { ...opt, value: event.target.value }
                          : opt,
                      );
                      form.setFieldValue("options", newArray);
                    }}
                  />
                  <Button
                    onClick={() => {
                      form.setFieldValue(
                        "options",
                        options.filter((el) => el.clientId != option.clientId),
                      );
                    }}
                    className="task-form__delete-btn"
                  >
                    <TrashSvg />
                  </Button>
                </li>
              );
            })}
            <Button
              onClick={() => {
                const newOption: ClientOption = {
                  clientId: crypto.randomUUID(),
                  value: "",
                  isCorrect: false,
                };
                form.setFieldValue(
                  "options",
                  options ? [...options, newOption] : [newOption],
                );
              }}
            >
              Добавить
            </Button>
          </ul>
        </Form.Item>
      )}
      {!!taskType && taskType != 0 && (
        <>
          <Form.Item<TaskFormData> className="task-form__number-input-wrapper">
            <Form.Item<TaskFormData> noStyle name="time">
              <InputNumber
                name="time"
                min={0}
                className="task-form__number-input"
              />
            </Form.Item>
            <Typography.Text>Время на выполнение (в секундах)</Typography.Text>
          </Form.Item>
          <Form.Item<TaskFormData> className="task-form__number-input-wrapper">
            <Form.Item<TaskFormData> name="points" noStyle>
              <InputNumber
                name="points"
                min={0}
                className="task-form__number-input"
              />
            </Form.Item>
            <Typography.Text>Баллы за выполнение</Typography.Text>
          </Form.Item>
        </>
      )}
      {taskType === 2 && (
        <Form.Item<TaskFormData> name="partialPoints" valuePropName="checked">
          <CustomSwitch title="Выдача частичных баллов" />
        </Form.Item>
      )}
      <Form.Item<TaskFormData> name="files">
        <Upload
          listType="picture"
          customRequest={customRequest}
          onChange={handleChange}
          fileList={fileList}
          multiple
        >
          <Button>Добавить файлы</Button>
        </Upload>
      </Form.Item>
      <Form.Item className="task-form__submit-btn-wrapper">
        <Button type="primary" htmlType="submit">
          {submitBtnText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
