import { useDebounce } from "@/shared/lib";
import { TrashSvg } from "@/shared/ui";
import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import type { ClientOption } from "../../model/useFormSubmit";
import "./OptionItem.scss";

interface OptionItemProps {
  initialData: ClientOption;
  onInputValueChange?: (value: string) => void;
  onRightAnswerToggle?: (value: boolean) => void;
  onDelete: (clientId: string) => void;
}
export const OptionItem = ({
  initialData,
  onInputValueChange,
  onRightAnswerToggle,
  onDelete,
}: OptionItemProps) => {
  const isRightAnswer = initialData.isCorrect;
  const [optionValue, setOptionValue] = useState(initialData.value);

  const useOptionValueDebounce = useDebounce<string>(optionValue, 2000);

  useEffect(() => {
    onInputValueChange?.(useOptionValueDebounce);
  }, [onInputValueChange, useOptionValueDebounce]);

  return (
    <li className="option-item">
      <Button
        className="option-item__right-answer-toggle"
        style={{
          backgroundColor: isRightAnswer ? "green" : "transparent",
        }}
        onClick={() => {
          onRightAnswerToggle?.(!isRightAnswer);
        }}
      />
      <Input
        placeholder="Введите текст опции"
        value={optionValue}
        onChange={(e) => {
          setOptionValue(e.target.value);
          onInputValueChange?.(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          onDelete(initialData.clientId);
        }}
        className="option-item__delete-btn"
      >
        <TrashSvg />
      </Button>
    </li>
  );
};
