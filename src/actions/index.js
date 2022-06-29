export const SAVE_USER_ON_GLOBAL_STORAGE = 'SAVE_USER_ON_GLOBAL_STORAGE';

export const saveUser = (email) => ({
  type: SAVE_USER_ON_GLOBAL_STORAGE,
  payload: email,
});
