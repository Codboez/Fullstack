import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification: (state, action) => action.payload
  }
})

export const createNotification = (message, timeoutSeconds) => {
  return async dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => dispatch(setNotification("")), timeoutSeconds * 1000)
  }
}
  
export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer