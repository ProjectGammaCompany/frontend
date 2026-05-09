import { useNotify } from "@/shared/lib/notifications";
import { StarSvg } from "@/shared/ui/svg";
import { Button } from "antd";
import classnames from "classnames";
import { useState } from "react";
import { usePutFavoriteState } from "../model/usePutFavoriteState";
import "./ToggleFavoriteEventButton.scss";
interface toggleEventButtonProps {
  defaultState: boolean;
  id: string;
}

const ToggleFavoriteEventButton = ({
  id,
  defaultState,
}: toggleEventButtonProps) => {
  const notify = useNotify();
  const [state, setState] = useState<boolean>(defaultState);

  const handleSuccessToggle = () => {
    setState((prev) => !prev);
  };

  const handleErrorToggle = () => {
    notify.error({
      title: "Не удалось обновить данные",
      description: "Произошла ошибка. Повторите попытку",
    });
  };
  const toggleMutation = usePutFavoriteState(
    id,
    !state,
    handleSuccessToggle,
    handleErrorToggle,
  );

  const className = classnames("toggle-favorite-event-btn", {
    "toggle-favorite-event-btn_active": state,
  });
  return (
    <Button
      icon={<StarSvg />}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMutation.mutate();
      }}
      loading={toggleMutation.isPending}
    />
  );
};

export default ToggleFavoriteEventButton;
