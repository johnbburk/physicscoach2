import emoji from "react-easy-emoji";

export const GoalProgressIndicator = props => {
  const rating = parseInt(props.rating, 10);

  if (props.format === "emoji") {
    switch (rating) {
      case 2:
        return emoji("🔥🔥");
      case 1:
        return emoji("🔥");
      case -1:
        return emoji("🔻");
      case -2:
        return emoji("🔻🔻");
      default:
        return emoji("✔️");
    }
  } else if (props.format === "text") {
    switch (rating) {
      case 2:
        return "You accomplished much more than your goal";
      case 1:
        return "You accomplished more than your goal";
      case -1:
        return "You accomplished less than your goal";
      case -2:
        return "You accomplished much less than your goal";
      default:
        return "You accomplished your goal";
    }
  }
};
