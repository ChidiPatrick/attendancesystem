import { useDispatch } from "react-redux";

// Page navigation handler ///
const handleNavigation = (navigate, page) => {
  navigate(`/${page}`);
};

/// Toggle menu /////
const toggleMenu = (dispatch, toggleFunction) => {
  dispatch(toggleFunction());
};

export { handleNavigation, toggleMenu };
