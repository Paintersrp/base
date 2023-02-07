export const handleClose = (history, link) => {
  history.push(link.path);
};

export const handleMenu = (setAnchorEl, event) => {
  setAnchorEl(event.currentTarget);
};
