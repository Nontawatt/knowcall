import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  blockHiddenNumbers: boolean;
  blockInternational: boolean;
  blockUnknown: boolean;
  autoMuteSpam: boolean;
  enableNotifications: boolean;
  language: 'th' | 'en';
}

const initialState: SettingsState = {
  blockHiddenNumbers: true,
  blockInternational: false,
  blockUnknown: true,
  autoMuteSpam: true,
  enableNotifications: true,
  language: 'th',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings: (state, action: PayloadAction<Partial<SettingsState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
