import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: boolean = true

export const buttonStateSlice = createSlice({
  name: 'buttonState',
  initialState,
  reducers: {
    buttonState: (state, action: PayloadAction<boolean>) =>
      (state = action.payload),
  },
})

export const { buttonState } = buttonStateSlice.actions

export default buttonStateSlice.reducer
