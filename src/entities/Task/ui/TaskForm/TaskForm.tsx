import { getRandomString, handleDownload, useFileUpload } from "@/shared/lib";
import { CustomSwitch, IconButton, QRCodeSvg } from "@/shared/ui";
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
import classnames from "classnames";
import { useEffect, useRef, useState } from "react";
import QRCode from "react-qrcode-logo";
import { v4 as uuidv4 } from "uuid";
import { type ClientOption, type TaskFormData } from "../../api/createTask.ts";
import { getNormalizedFileList } from "../../model/getNormalizedFileList";
import { mapUrlsToFileList } from "../../model/mapUrlsToFileList";
import { TYPE_OPTIONS } from "../../model/typeOptions";
import { useFormSubmit } from "../../model/useFormSubmit";
import { OptionItem } from "../OptionItem/OptionItem";
import "./TaskForm.scss";

interface TaskFormProps<TResponse> {
  initialData?: TaskFormData;
  submitBtnText: string;
  mutationFn: (data: TaskFormData) => Promise<TResponse>;
  onSuccessFn?: (response: TResponse, variables: TaskFormData) => void;
  onSuccessText?: string;
  order: number;
  className?: string;
}

const TaskForm = <TResponse,>({
  initialData,
  order,
  onSuccessFn,
  submitBtnText,
  onSuccessText,
  className,
  mutationFn,
}: TaskFormProps<TResponse>) => {
  const [form] = useForm<TaskFormData>();

  const taskType = useWatch("type", form);

  const options = useWatch("options", form);

  const QRCodeRef = useRef<QRCode | null>(null);

  const uploadMutation = useFileUpload();

  const [showSuccessText, setShowSuccessText] = useState(false);
  const [showErrorText, setShowErrorText] = useState(false);

  const handleSuccessSubmit = (
    response: TResponse,
    variables: TaskFormData,
  ) => {
    setShowSuccessText(true);
    setTimeout(() => {
      setShowSuccessText(false);
    }, 5000);
    onSuccessFn?.(response, variables);
  };

  const handleErrorSubmit = () => {
    setShowErrorText(true);
    setTimeout(() => {
      setShowErrorText(false);
    }, 5000);
  };

  const submitMutation = useFormSubmit<TResponse>(
    mutationFn,
    handleSuccessSubmit,
    handleErrorSubmit,
  );

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [textInputType, setTextInputType] = useState<"qr" | "text">("text");

  const switchQRModeBtnClassName = classnames("task-form__switch-qr-mode-btn", {
    "task-form__switch-qr-mode-btn_active": textInputType === "qr",
  });

  const uploadFile = async (file: File) => {
    const res = await uploadMutation.mutateAsync(file);
    return res.data;
  };

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
            url: data,
          },
          file,
        );
      } catch (e) {
        onError?.(e as Error);
      }
    })();
  };

  const handleFilesChangeChange: UploadProps["onChange"] = ({ fileList }) => {
    const normalized = getNormalizedFileList(fileList);

    setFileList(normalized);

    const files = normalized
      .filter(
        (file): file is UploadFile & { url: string } =>
          file.status === "done" && !!file.url,
      )
      .map((file) => {
        return { url: file.url, name: file.name };
      });
    form.setFieldValue("files", files);
  };

  const handleQRCodeDownloading = () => {
    const filename =
      (form.getFieldValue("name") as string | undefined) ?? "QR-код";
    QRCodeRef.current?.download("png", filename);
  };

  const handleSelectTaskType = (val: number) => {
    if (
      ![1, 2].includes(val) ||
      ![1, 2].includes(form.getFieldValue("type") as number)
    ) {
      if (textInputType === "qr") {
        setTextInputType("text");
      }
      form.setFieldValue("options", []);
    }
  };

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newOption: ClientOption = {
      clientId: uuidv4(),
      isCorrect: true,
      value: e.target.value,
    };
    if (options?.[0]) {
      newOption = {
        ...options[0],
        value: e.target.value,
      };
    }
    const array = [newOption];
    form.setFieldValue("options", array);
  };

  const handleTextInputSwitch = () => {
    setTextInputType((prev) => {
      if (prev === "qr") {
        form.setFieldValue("options", []);
        return "text";
      }
      const rightAnswer: ClientOption = {
        clientId: uuidv4(),
        isCorrect: true,
        value: getRandomString(10),
      };
      form.setFieldValue("options", [rightAnswer]);
      return "qr";
    });
  };

  const handleRightAnswerSwitch = (
    index: number,
    options: ClientOption[],
    value: boolean,
  ) => {
    const newArray = options.map((opt, i) => {
      if (i === index) {
        return {
          ...opt,
          isCorrect: value,
        };
      }
      if (form.getFieldValue("type") == 1 && value && i != index) {
        return {
          ...opt,
          isCorrect: false,
        };
      }
      return opt;
    });
    form.setFieldValue("options", newArray);
  };

  const handleOptionValueChange = (
    index: number,
    options: ClientOption[],
    value: string,
  ) => {
    const newArray = options.map((opt, i) =>
      i === index ? { ...opt, value } : opt,
    );
    form.setFieldValue("options", newArray);
  };

  const handleOptionDelete = (options: ClientOption[], id: string) => {
    form.setFieldValue(
      "options",
      options.filter((el) => el.clientId != id),
    );
  };

  const handleAddOption = (options?: ClientOption[]) => {
    const newOption: ClientOption = {
      clientId: uuidv4(),
      value: "",
      isCorrect: false,
    };
    form.setFieldValue(
      "options",
      options ? [...options, newOption] : [newOption],
    );
  };

  const onFinish = (values: TaskFormData) => {
    const taskName = values.name ?? `Задание ${order}`;
    let type = values.type;
    if (type === 3 && textInputType === "qr") {
      type = 4;
    }
    submitMutation.mutate({ ...values, name: taskName, type });
  };

  const handlePreview = (file: UploadFile<unknown>) => {
    if (file.url) {
      void handleDownload(file.url, file.name);
    }
  };

  useEffect(() => {
    if (initialData?.files.length) {
      setFileList(mapUrlsToFileList(initialData.files));
    }
  }, [initialData?.files]);

  //todo: посмотреть правильный вариант
  useEffect(() => {
    const files = fileList
      .filter((f) => f.status === "done" && f.url)
      .map((f) => {
        return { url: f.url!, name: f.name };
      });
    form.setFieldValue("files", files);
  }, [fileList, form]);

  useEffect(() => {
    let type = initialData?.type;
    if (initialData) {
      if (initialData.type === 4) {
        type = 3;
        setTextInputType("qr");
      }
      form.setFieldsValue({ ...initialData, type });
    }
  }, [form, initialData]);

  //todo: check block error
  return (
    <Form
      initialValues={initialData}
      form={form}
      layout="vertical"
      requiredMark={false}
      scrollToFirstError={{ behavior: "instant", block: "end", focus: true }}
      onFinish={onFinish}
      className={"task-form " + className ? className : ""}
    >
      <Form.Item<TaskFormData>
        name="name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Введите название" />
      </Form.Item>
      <Form.Item<TaskFormData>
        name="description"
        label="Описание"
        initialValue={""}
      >
        <Input.TextArea autoSize={{ minRows: 3 }} />
      </Form.Item>
      <Form.Item name="options" noStyle>
        <div />
      </Form.Item>
      <Form.Item<TaskFormData>
        name="type"
        label="Тип"
        rules={[{ required: true }]}
      >
        <Select
          data-testid="select-type"
          options={TYPE_OPTIONS}
          onChange={handleSelectTaskType}
        />
      </Form.Item>
      {taskType === 3 && (
        <>
          <Form.Item<TaskFormData>
            label={textInputType === "text" ? "Правильный ответ" : undefined}
          >
            <div className="task-form__qr-task-body">
              {textInputType === "text" ? (
                <Input value={options?.[0]?.value} onChange={handleTextInput} />
              ) : (
                <div className="task-form__qr-code-upload">
                  <div className="task-form__qr-code-wrapper">
                    <QRCode
                      ref={QRCodeRef}
                      value={options ? options[0]?.value : ""}
                    />
                  </div>
                  <div className="task-form__qr-code-btn-wrapper">
                    <Button onClick={handleQRCodeDownloading}>
                      Скачать QR-код
                    </Button>
                    <Typography.Paragraph
                      style={{
                        marginBottom: 0,
                      }}
                    >
                      Расшифрованный код:
                      <Typography.Paragraph
                        copyable
                        className="task-form__qr-code-text"
                      >
                        {options?.[0]?.value}
                      </Typography.Paragraph>
                    </Typography.Paragraph>
                  </div>
                </div>
              )}
              <IconButton
                icon={<QRCodeSvg />}
                onClick={handleTextInputSwitch}
                className={switchQRModeBtnClassName}
              ></IconButton>
            </div>
          </Form.Item>
        </>
      )}
      {(taskType === 1 || taskType === 2) && (
        <Form.Item<TaskFormData> label="Опции">
          <ul className="task-form__options-list">
            {options?.map((option, index) => {
              return (
                <OptionItem
                  key={option.clientId}
                  initialData={option}
                  onInputValueChange={(value) => {
                    handleOptionValueChange(index, options, value);
                  }}
                  onRightAnswerToggle={(value) =>
                    handleRightAnswerSwitch(index, options, value)
                  }
                  onDelete={() => handleOptionDelete(options, option.clientId)}
                />
              );
            })}
            <Button onClick={() => handleAddOption(options)}>Добавить</Button>
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
          onChange={handleFilesChangeChange}
          fileList={fileList}
          onPreview={(file) => handlePreview(file)}
          multiple
        >
          <Button>Добавить файлы</Button>
        </Upload>
      </Form.Item>
      {showSuccessText && onSuccessText && (
        <Form.Item<TaskFormData> noStyle>
          <Typography.Paragraph
            type="success"
            className="task-form__success-text"
          >
            {onSuccessText}
          </Typography.Paragraph>
        </Form.Item>
      )}

      {showErrorText && (
        <Form.Item<TaskFormData> noStyle>
          <Typography.Paragraph type="danger" className="task-form__error-text">
            Произошла ошибка. Повторите попытку позже
          </Typography.Paragraph>
        </Form.Item>
      )}
      <Form.Item className="task-form__submit-btn-wrapper">
        <Button
          type="primary"
          htmlType="submit"
          loading={submitMutation.isPending}
        >
          {submitBtnText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
