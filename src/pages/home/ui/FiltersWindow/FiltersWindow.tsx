import { getTags } from "@/src/entities";
import { CustomModalWindow, CustomSwitch } from "@/src/shared/ui";
import { useQuery } from "@tanstack/react-query";
import { Button, Form, Select, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import type { Filters } from "../../model/useAllEvents";
import "./FiltersWindow.scss";
interface FiltersWindowProps {
  open: boolean;
  setIsOpen: (value: boolean) => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const FiltersWindow = ({
  open,
  setIsOpen,
  filters,
  onFiltersChange,
}: FiltersWindowProps) => {
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

  const [initialValues, setInitialValues] = useState(filters);

  useEffect(() => {
    setInitialValues(filters);
  }, [filters]);

  const [form] = useForm<Filters>();

  const handleFormFinish = (values: Filters) => {
    onFiltersChange(values);
  };
  return (
    <CustomModalWindow open={open} setIsOpen={setIsOpen}>
      <Typography.Title level={1} className="filters-window__title">
        Фильтры
      </Typography.Title>
      <Form
        form={form}
        labelWrap
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleFormFinish}
        styles={{
          root: {
            marginBottom: "0px !important",
            margin: "0px !important",
          },
        }}
      >
        <Form.Item<Filters>
          name="favorites"
          className="filters-window__form-item"
        >
          <CustomSwitch title="Избранное" />
        </Form.Item>
        <Form.Item<Filters> name="active" className="filters-window__form-item">
          <CustomSwitch title="Активные" />
        </Form.Item>
        <Form.Item<Filters>
          name="decliningRating"
          className="filters-window__form-item"
        >
          <CustomSwitch title="По убыванию рейтинга" />
        </Form.Item>
        <Form.Item<Filters> name="tags" label="Теги">
          <Select
            mode="multiple"
            options={tags}
            optionRender={(option) => (
              <Typography.Paragraph className="filters-form__tag-list-option">
                {option.data.label}
              </Typography.Paragraph>
            )}
            className="filters-form__select-tag"
            classNames={{
              itemRemove: "filters-form__remove-tag-btn",
              popup: {
                listItem: "filters-form__tag-list-item",
              },
            }}
          />
        </Form.Item>
        <Form.Item className="filters-window__submit-btn-wrapper">
          <Button htmlType="submit" className="filters-window__submit-btn">
            Применить
          </Button>
        </Form.Item>
      </Form>
    </CustomModalWindow>
  );
};

export default FiltersWindow;
