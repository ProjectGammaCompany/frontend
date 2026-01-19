import { getTags } from "@/src/entities";
import {
  getFullFileUrl,
  useFileUpload,
  type ChangeTypeOfKeys,
} from "@/src/shared/lib";
import { CustomDatePicker } from "@/src/shared/ui";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Select,
  Switch,
  Typography,
  Upload,
} from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { Dayjs } from "dayjs";
import { type ReactNode } from "react";
import "./EventForm.scss";
export interface BaseEventFormData {
  title: string;
  description: string;
  cover?: string;
  tags: string[];
  startDate?: Dayjs;
  endDate?: Dayjs;
  private: boolean;
  password?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type EventFormData<T extends object = {}> = BaseEventFormData & T;

interface EventFormProps<TData extends EventFormData, TResponse> {
  defaultData?: TData;
  submitBtnText: string;
  mutationFn: (
    data: ChangeTypeOfKeys<TData, "startDate" | "endDate", string>,
  ) => Promise<TResponse>;
  children?: ReactNode;
  onSuccessFn?: (
    data: TResponse,
    variables: ChangeTypeOfKeys<TData, "startDate" | "endDate", string>,
  ) => void;
}

export const EventForm = <TData extends EventFormData, TResponse>({
  mutationFn,
  onSuccessFn,
  defaultData,
  submitBtnText,
  children,
}: EventFormProps<TData, TResponse>) => {
  const formMutation = useMutation<
    TResponse,
    Error,
    ChangeTypeOfKeys<TData, "startDate" | "endDate", string>
  >({
    mutationFn: (data) => mutationFn(data),
    onSuccess: onSuccessFn,
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

  const privateValue = Form.useWatch("private", form);

  //TODO fix upload, using TaskForm
  const coverUploadMutation = useFileUpload((data) => {
    //@ts-expect-error форма недостаточно умная у antd
    form.setFieldValue("cover", data.data.url);
  });

  const handleCoverUpload = (cover: File) => {
    coverUploadMutation.mutate(cover);
    return false;
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
                accept="image/*"
                beforeUpload={handleCoverUpload}
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
                    loading={coverUploadMutation.isPending}
                    onClick={() => coverUploadMutation.mutate}
                  >
                    Загрузите обложку
                  </Button>
                )}
              </Upload>
            </Form.Item>
          </ConfigProvider>
          <Form.Item<EventFormData>
            name="title"
            label="Название события:"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </div>
        <Form.Item<EventFormData> name="description" label="Описание события:">
          <Input.TextArea placeholder="Введите текст" />
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
          <Form.Item<EventFormData>
            name="password"
            label="Пароль"
            rules={[{ required: privateValue }]}
          >
            <Input.Password />
          </Form.Item>
        )}
        {children}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {submitBtnText}
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};
