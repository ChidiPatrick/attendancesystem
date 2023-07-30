// Page navigation handler ///
const handleNavigation = (navigate, page, dispatch, hideMenu) => {
  dispatch(hideMenu());
  navigate(`/${page}`);
};

/// Toggle menu /////
const toggleMenu = (dispatch, toggleFunction) => {
  dispatch(toggleFunction());
};

export { handleNavigation, toggleMenu };
