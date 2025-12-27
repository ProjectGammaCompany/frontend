import type { UploadFileResponse } from "@/src/shared/api";
import { getRandomString, useFileUpload } from "@/src/shared/lib";
import { useMutation } from "@tanstack/react-query";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
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
    uploadMutation.mutate(file as File, {
      onSuccess: (res) => {
        onSuccess?.(res.data);
      },
      onError: (err) => {
        onError?.(err);
      },
    });
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
      if (file.response) {
        file.url = (file.response as UploadFileResponse).url;
      }
      return file;
    });
    setFileList(normalized);
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
                  >
                    У
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
        <div>
          <Form.Item<TaskFormData> noStyle>
            <Form.Item<TaskFormData> name="time">
              <InputNumber name="time" min={0} />
            </Form.Item>
            <Typography.Text>Время на выполнение (в секундах)</Typography.Text>
          </Form.Item>
          <Form.Item<TaskFormData> noStyle>
            <Form.Item<TaskFormData> name="points">
              <InputNumber name="points" min={0} />
            </Form.Item>
            <Typography.Text>Баллы за выполнение</Typography.Text>
          </Form.Item>
        </div>
      )}
      {taskType === 2 && (
        <Form.Item<TaskFormData> noStyle>
          <Form.Item<TaskFormData> name="partialPoints" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Typography.Text>Выдача частичных баллов</Typography.Text>
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
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {submitBtnText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
