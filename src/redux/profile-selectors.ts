import { createSelectorHook } from "react-redux";
import { createSelector } from "reselect";
import { AppStateType } from "./redux-store";

export const getUserProfile = (state: AppStateType) => {
  return state.profilePage.userProfile;
};

export const getProfileStatus = (state: AppStateType) => {
  return state.profilePage.status;
};
