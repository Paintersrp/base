export const TOGGLE_EDITMODE_ON = "TOGGLE_EDITMODE_ON";
export const TOGGLE_EDITMODE_OFF = "TOGGLE_EDITMODE_OFF";

export const toggleEditModeOn = () => ({
  type: "TOGGLE_EDITMODE_ON",
  payload: { data },
});

export const toggleEditModeOff = () => ({
  type: "TOGGLE_EDITMODE_OFF",
  payload: { message },
});
