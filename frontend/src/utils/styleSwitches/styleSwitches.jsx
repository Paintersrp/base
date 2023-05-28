export const shadowSwitch = (value) => {
  switch (value) {
    case 1:
      return "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)";
    case 2:
      return "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)";
    case 3:
      return "0px 3px 3px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.24)";
    case 4:
      return "0px 2px 4px rgba(0, 0, 0, 0.12), 0px 4px 4px rgba(0, 0, 0, 0.24)";
    case 5:
      return "0px 3px 5px rgba(0, 0, 0, 0.12), 0px 6px 10px rgba(0, 0, 0, 0.24)";
    case 6:
      return "0px 5px 5px rgba(0, 0, 0, 0.12), 0px 12px 16px rgba(0, 0, 0, 0.24)";
    case 7:
      return "0px 6px 6px rgba(0, 0, 0, 0.12), 0px 16px 24px rgba(0, 0, 0, 0.24)";
    case 8:
      return "0px 8px 8px rgba(0, 0, 0, 0.12), 0px 24px 32px rgba(0, 0, 0, 0.24)";
    case 9:
      return "0px 12px 12px rgba(0, 0, 0, 0.12), 0px 32px 48px rgba(0, 0, 0, 0.24)";
    default:
      return "none";
  }
};
