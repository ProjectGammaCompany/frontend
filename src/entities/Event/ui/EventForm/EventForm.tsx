import { getTags, type UseJoinCodeDataResult } from "@/entities";
import {
  getFullFileUrl,
  useFileUpload,
  useMessage,
  type ChangeTypeOfKeys,
} from "@/shared/lib";
import { CustomDatePicker, CustomSwitch, QuestionSvg } from "@/shared/ui";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Select,
  Switch,
  Tooltip,
  Typography,
  Upload,
  type UploadProps,
} from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { Dayjs } from "dayjs";
import { useEffect, useState, type ReactNode } from "react";
import "./EventForm.scss";

//todo добавит switch на показ таблицы всей
export interface BaseEventFormData {
  name: string;
  description: string;
  cover?: string;
  tags: string[];
  startDate?: Dayjs;
  endDate?: Dayjs;
  private: boolean;
  password?: string;
  allowDownloading: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type EventFormData<T extends object = {}> = BaseEventFormData & T;

interface EventFormProps<TData extends EventFormData, TResponse> {
  defaultData?: TData;
  submitBtnText: string;
  joinCode?: UseJoinCodeDataResult;
  isJoinCodePending?: boolean;
  isJoinCodeError?: boolean;
  mutationFn: (
    data: ChangeTypeOfKeys<TData, "startDate" | "endDate", string>,
  ) => Promise<TResponse>;
  children?: ReactNode;
  onSuccessText?: string;
  showSuccessText?: boolean;
  onError: () => void;
  onSuccessFn?: (
    data: TResponse,
    variables: ChangeTypeOfKeys<TData, "startDate" | "endDate", string>,
  ) => void;
}

export const EventForm = <TData extends EventFormData, TResponse>({
  mutationFn,
  onSuccessFn,
  onSuccessText,
  onError,
  showSuccessText,
  defaultData,
  submitBtnText,
  joinCode,
  isJoinCodePending,
  isJoinCodeError,
  children,
}: EventFormProps<TData, TResponse>) => {
  const message = useMessage();

  const formMutation = useMutation<
    TResponse,
    Error,
    ChangeTypeOfKeys<TData, "startDate" | "endDate", string>
  >({
    mutationFn: (data) => mutationFn(data),
    onSuccess: onSuccessFn,
    onError,
  });

  const { data: tags } = useQuery({
    queryKey: ["eventTags"],
    queryFn: getTags,
    select: (data) =>
      data.data.tags.map((tag) => {
        return {
          label: tag.name,
          value: tag.id,
        };
      }),
  });

  const [form] = useForm<TData>();

  const [toolTipOpen, setToolTipOpen] = useState(false);

  const privateValue = Form.useWatch("private", form);

  const fileUploadMutation = useFileUpload();

  const customRequest: UploadProps["customRequest"] = ({
    file,
    onSuccess,
    onError,
  }) => {
    fileUploadMutation.mutate(file as File, {
      onSuccess: (data) => {
        onSuccess?.(data.data);
        //@ts-expect-error форма недостаточно умная
        form.setFieldValue("cover", data.data.url);
      },
      onError: (error) => {
        onError?.(error);
        //@ts-expect-error форма недостаточно умная
        form.setFieldValue("cover", undefined);
      },
    });
  };

  const onFinish = (values: TData) => {
    const preparedValues = {
      ...values,
      startDate: values.startDate?.format("DD.MM.YYYY HH:mm") ?? "",
      endDate: values.endDate?.format("DD.MM.YYYY HH:mm") ?? "",
    } as ChangeTypeOfKeys<TData, "startDate" | "endDate", string>;
    formMutation.mutate(preparedValues);
  };

  const cover = useWatch("cover", form);

  useEffect(() => {
    if (defaultData) {
      // @ts-expect-error проблема с типизацией данных
      form.setFieldsValue(defaultData);
    }
  }, [defaultData, form]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelColonMarginInlineEnd: 0,
            verticalLabelPadding: 0,
          },
        },
      }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        classNames={{
          label: "event-form__label",
        }}
        className="event-form"
        initialValues={defaultData}
        requiredMark={false}
        scrollToFirstError={{ behavior: "instant", block: "end", focus: true }}
      >
        <div className="event-form__main-data-wrapper">
          <ConfigProvider
            theme={{
              components: {
                Upload: {
                  pictureCardSize: 100,
                },
              },
            }}
          >
            <Form.Item<EventFormData> name="cover">
              <Upload
                showUploadList={false}
                listType="picture-card"
                maxCount={1}
                disabled={fileUploadMutation.isPending}
                accept="image/*"
                customRequest={customRequest}
                onPreview={() => null}
                className="event-form__cover-upload"
              >
                {cover ? (
                  <img
                    src={getFullFileUrl(
                      //@ts-expect-error форма недостаточно умная у antd
                      form.getFieldValue("cover") as string,
                    )}
                    className="event-form__cover-img"
                  />
                ) : (
                  <Button
                    className="event-form__cover-upload-btn"
                    loading={fileUploadMutation.isPending}
                  >
                    Загрузите обложку
                  </Button>
                )}
              </Upload>
            </Form.Item>
          </ConfigProvider>
          <Form.Item<EventFormData>
            name="name"
            label="Название события:"
            rules={[{ required: true }]}
            className="event-form__name-item"
          >
            <Input />
          </Form.Item>
        </div>
        <Form.Item<EventFormData> name="description" label="Описание события:">
          <Input.TextArea
            placeholder="Введите текст"
            autoSize={{
              minRows: 3,
            }}
          />
        </Form.Item>
        <Form.Item<EventFormData> name="startDate" label="Время начала">
          <CustomDatePicker showTime />
        </Form.Item>
        <Form.Item<EventFormData> name="endDate" label="Время завершения">
          <CustomDatePicker showTime />
        </Form.Item>
        <Form.Item<EventFormData>
          name="tags"
          label="Теги"
          className="event-form__select-tag-wrapper"
        >
          <Select
            mode="multiple"
            options={tags}
            optionRender={(option) => (
              <Typography.Paragraph className="event-form__tag-list-option">
                {option.data.label}
              </Typography.Paragraph>
            )}
            className="event-form__select-tag"
            classNames={{
              itemRemove: "event-form__remove-tag-btn",
              popup: {
                listItem: "event-form__tag-list-item",
              },
            }}
          />
        </Form.Item>
        <Form.Item<EventFormData> className="event-form__private-form-item">
          <div className="event-form__private-wrapper">
            <Form.Item name="private" valuePropName="checked" noStyle>
              <Switch />
            </Form.Item>
            <Typography>Приватное</Typography>
          </div>
        </Form.Item>
        {privateValue && (
          <>
            <Form.Item<EventFormData>
              name="password"
              label="Пароль"
              rules={[{ required: privateValue }]}
            >
              <Input.Password />
            </Form.Item>
          </>
        )}
        {defaultData?.private && privateValue && (
          <Form.Item
            className="event-form__code-item"
            label="Пригласительный код"
          >
            {joinCode && (
              <Typography.Paragraph className="event-form__code">
                {joinCode.joinCode}
              </Typography.Paragraph>
            )}
            <Button
              loading={isJoinCodePending}
              disabled={isJoinCodeError}
              className="event-form__join-btn"
              onClick={() => {
                if (joinCode) {
                  void navigator.clipboard
                    .writeText(joinCode.joinCode)
                    .then(() => {
                      message.success({
                        content: "Пригласительный код скопирован",
                      });
                    })
                    .catch(() => {
                      message.error({
                        content: "Не удалось скопировать код",
                      });
                    });
                }
              }}
            >
              Скопировать пригласительный код
            </Button>
            {isJoinCodeError && (
              <Typography.Paragraph
                type="danger"
                className="event-form__code-error"
              >
                Произошла ошибка.{<br />}Откройте окно заново.
              </Typography.Paragraph>
            )}
            {joinCode && (
              <Typography.Paragraph className="event-form__code-date">
                Код активен до{" "}
                <b>
                  {joinCode.expiresAt.substring(
                    0,
                    joinCode.expiresAt.length - 4,
                  )}
                </b>
              </Typography.Paragraph>
            )}
          </Form.Item>
        )}
        {children}
        <Form.Item<EventFormData> noStyle>
          <div className="event-form__allow-downloading-form-item">
            <Form.Item<EventFormData> noStyle name="allowDownloading">
              <CustomSwitch title="Разрешить скачивание" />
            </Form.Item>
            <Tooltip
              title="Вместе с заданиями пользователю будут загружены и ответы на них."
              open={toolTipOpen}
            >
              <Button
                icon={<QuestionSvg />}
                onClick={() => setToolTipOpen((prev) => !prev)}
                classNames={{
                  root: "event-form__allow-downloading-tooltip-btn",
                }}
              />
            </Tooltip>
          </div>
        </Form.Item>
        {showSuccessText && onSuccessText && (
          <Form.Item>
            <Typography.Paragraph
              type="success"
              className="event-form__submit-text"
            >
              {onSuccessText}
            </Typography.Paragraph>
          </Form.Item>
        )}
        <Form.Item className="event-form__submit-btn-wrapper">
          <Button
            type="primary"
            htmlType="submit"
            className="event-form__submit-btn"
          >
            {submitBtnText}
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};
