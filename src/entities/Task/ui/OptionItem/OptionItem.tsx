import { useDebounce } from "@/src/shared/lib";
import { TrashSvg } from "@/src/shared/ui";
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
  const [option, setOption] = useState<ClientOption>(initialData);

  const isRightAnswer = option.isCorrect;
  const optionValue = option.value;

  const useRightAnswerDebounce = useDebounce<boolean>(isRightAnswer, 2000);

  const useOptionValueDebounce = useDebounce<string>(optionValue, 2000);

  //todo: изучить затем, нужен ли useAfterUpdate вместо useEffect
  useEffect(() => {
    onRightAnswerToggle?.(useRightAnswerDebounce);
  }, [onRightAnswerToggle, useRightAnswerDebounce]);

  useEffect(() => {
    onInputValueChange?.(useOptionValueDebounce);
  }, [onInputValueChange, useOptionValueDebounce]);

  return (
    <li className="option-item">
      <Button
        className="option-item__right-answer-toggle"
        style={{
          backgroundColor: option.isCorrect ? "green" : "transparent",
        }}
        onClick={() => {
          setOption((prev) => {
            return {
              ...prev,
              isCorrect: !prev.isCorrect,
            };
          });
        }}
      />
      <Input
        placeholder="Введите текст опции"
        value={option.value}
        onChange={(e) => {
          setOption((prev) => {
            return {
              ...prev,
              value: e.target.value,
            };
          });
          onInputValueChange?.(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          onDelete(option.clientId);
        }}
        className="option-item__delete-btn"
      >
        <TrashSvg />
      </Button>
    </li>
  );
};
