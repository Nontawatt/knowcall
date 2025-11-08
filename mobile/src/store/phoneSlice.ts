import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlockedNumber, CallLog } from '@shared/types';

interface PhoneState {
  blockedNumbers: BlockedNumber[];
  callLogs: CallLog[];
  whitelist: string[];
  blacklist: string[];
}

const initialState: PhoneState = {
  blockedNumbers: [],
  callLogs: [],
  whitelist: [],
  blacklist: [],
};

const phoneSlice = createSlice({
  name: 'phone',
  initialState,
  reducers: {
    setBlockedNumbers: (state, action: PayloadAction<BlockedNumber[]>) => {
      state.blockedNumbers = action.payload;
    },
    setCallLogs: (state, action: PayloadAction<CallLog[]>) => {
      state.callLogs = action.payload;
    },
    addToWhitelist: (state, action: PayloadAction<string>) => {
      if (!state.whitelist.includes(action.payload)) {
        state.whitelist.push(action.payload);
      }
    },
    removeFromWhitelist: (state, action: PayloadAction<string>) => {
      state.whitelist = state.whitelist.filter(num => num !== action.payload);
    },
    addToBlacklist: (state, action: PayloadAction<string>) => {
      if (!state.blacklist.includes(action.payload)) {
        state.blacklist.push(action.payload);
      }
    },
    removeFromBlacklist: (state, action: PayloadAction<string>) => {
      state.blacklist = state.blacklist.filter(num => num !== action.payload);
    },
  },
});

export const {
  setBlockedNumbers,
  setCallLogs,
  addToWhitelist,
  removeFromWhitelist,
  addToBlacklist,
  removeFromBlacklist,
} = phoneSlice.actions;

export default phoneSlice.reducer;
