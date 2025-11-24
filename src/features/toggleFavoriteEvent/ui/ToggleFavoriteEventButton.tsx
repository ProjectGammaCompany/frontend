import { IconButton, StarSvg } from "@/src/shared/ui";
import { useMutation } from "@tanstack/react-query";
import classnames from "classnames";
import { useState } from "react";
import { putFavoriteState } from "../api/putFavoriteState";
import "./ToggleFavoriteEventButton.scss";
interface toggleEventButtonProps {
  defaultState: boolean;
  id: string;
}

const ToggleFavoriteEventButton = ({
  id,
  defaultState,
}: toggleEventButtonProps) => {
  const [state, setState] = useState<boolean>(defaultState);
  const mutation = useMutation({
    mutationFn: () => putFavoriteState(id, !state),
    onSuccess: () => {
      setState(!state);
    },
  });

  const className = classnames("toggle-favorite-event-btn", {
    "toggle-favorite-event-btn_active": state,
  });
  return (
    <IconButton
      icon={<StarSvg />}
      className={className}
      iconWrapperClassname="toggle-favorite-event-btn__icon-wrapper"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        mutation.mutate();
      }}
    ></IconButton>
  );
};

export default ToggleFavoriteEventButton;
