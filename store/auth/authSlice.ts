import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAuthState, ISignUpData, IUserData, TypeLoadingStatus, } from 'interfaces';
import {
  auth, getRegistrationCode,
  login,
  registration,
  sendConfirmationCode,
  sendEmailForRecoveryPassword, sendRegistrationCode,
  setNewPassword
} from './authThunk';

export const initialState: IAuthState = {
  userData: {} as IUserData,
  temporaryUserData: {} as ISignUpData,
  loading: TypeLoadingStatus.IS_RESOLVED,
  signInModalOpen: false,
  signUpModalOpen: false,
  recoveryPasswordModalOpen: false,
  closeAllModals: true,
  setReceivedCodeModalOpen: false,
  setReceivedCodeForRegistrationModalOpen: false,
  setNewPasswordModalOpen: false,
  recoveryPasswordIsSuccessModalOpen: false,
  registrationIsSuccessModalOpen: false,
  emailForRecoveryPassword: '',
  addYachtModalOpen: false,
  error: ''
};

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInModalIsOpen: (state) => {
      state.signInModalOpen = !state.signInModalOpen;
      state.error = '';
    },
    signUpModalIsOpen: (state) => {
      state.signUpModalOpen = !state.signUpModalOpen;
      state.error = '';
    },
    recoveryPasswordModalIsOpen: (state) => {
      state.recoveryPasswordModalOpen = !state.recoveryPasswordModalOpen;
    },
    closeAllModals: (state) => {
      state.signInModalOpen = false;
      state.signUpModalOpen = false;
      state.recoveryPasswordModalOpen = false;
      state.setReceivedCodeModalOpen = false;
      state.setReceivedCodeForRegistrationModalOpen = false;
      state.setNewPasswordModalOpen = false;
      state.recoveryPasswordIsSuccessModalOpen = false;
      state.registrationIsSuccessModalOpen = false;
      state.addYachtModalOpen = false;
    },
    resetPasswordModalIsOpen: (state) => {
      state.setReceivedCodeModalOpen = !state.setReceivedCodeModalOpen;
    },
    confirmRegistrationUserModalIsOpen: (state) => {
      state.setReceivedCodeForRegistrationModalOpen = !state.setReceivedCodeForRegistrationModalOpen;
    },
    setNewPasswordModalIsOpen: (state) => {
      state.setNewPasswordModalOpen = !state.setNewPasswordModalOpen;
    },
    recoveryPasswordIsSuccessModalIsOpen: (state) => {
      state.recoveryPasswordIsSuccessModalOpen = !state.recoveryPasswordIsSuccessModalOpen;
    },
    registrationIsSuccessModalIsOpen: (state) => {
      state.registrationIsSuccessModalOpen = !state.registrationIsSuccessModalOpen;
    },
    addYachtModalIsOpen: (state) => {
      state.addYachtModalOpen = !state.addYachtModalOpen;
    },
    isError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(auth.pending, (state) => {
          state.loading = TypeLoadingStatus.IS_PENDING;
        })
        .addCase(
            auth.fulfilled.type,
            (state, action: PayloadAction<IUserData>) => {
              state.userData = action.payload;
              state.loading = TypeLoadingStatus.IS_RESOLVED;
            }
        )
        .addCase(auth.rejected, (state) => {
          state.loading = TypeLoadingStatus.IS_REJECTED;
        })
        .addCase(getRegistrationCode.pending, (state) => {
          state.loading = TypeLoadingStatus.IS_PENDING;
        })
        .addCase(
            getRegistrationCode.fulfilled.type,
            (state, action: PayloadAction<ISignUpData>) => {
              state.temporaryUserData = action.payload;
              state.loading = TypeLoadingStatus.IS_RESOLVED;
              state.error = '';
              state.signUpModalOpen = false;
              state.setReceivedCodeForRegistrationModalOpen = true;
            }
        )
        .addCase(getRegistrationCode.rejected.type, (state, action: PayloadAction<string>) => {
          state.loading = TypeLoadingStatus.IS_REJECTED;
          state.error = action.payload;
        })
        .addCase(registration.pending, (state) => {
          state.loading = TypeLoadingStatus.IS_PENDING;
        })
        .addCase(
            registration.fulfilled.type,
            (state, action: PayloadAction<IUserData>) => {
              state.userData = action.payload;
              state.temporaryUserData = {} as ISignUpData;
              state.loading = TypeLoadingStatus.IS_RESOLVED;
              state.error = '';
            }
        )
        .addCase(registration.rejected.type, (state, action: PayloadAction<string>) => {
          state.loading = TypeLoadingStatus.IS_REJECTED;
          state.error = action.payload;
        })
        .addCase(sendRegistrationCode.pending, (state) => {
          state.loading = TypeLoadingStatus.IS_PENDING;
        })
        .addCase(
            sendRegistrationCode.fulfilled.type,
            (state) => {
              state.loading = TypeLoadingStatus.IS_RESOLVED;
              state.setReceivedCodeForRegistrationModalOpen = false;
              state.registrationIsSuccessModalOpen = true;
              state.error = '';
            }
        )
        .addCase(sendRegistrationCode.rejected.type, (state, action: PayloadAction<string>) => {
          state.loading = TypeLoadingStatus.IS_REJECTED;
          state.error = action.payload;
        })
        .addCase(login.pending, (state) => {
          state.loading = TypeLoadingStatus.IS_PENDING;
        })
        .addCase(
            login.fulfilled.type,
            (state, action: PayloadAction<IUserData>) => {
              state.userData = action.payload;
              state.loading = TypeLoadingStatus.IS_RESOLVED;
              state.error = '';
              state.signInModalOpen = false;
            }
        )
        .addCase(login.rejected.type, (state, action: PayloadAction<string>) => {
          state.loading = TypeLoadingStatus.IS_REJECTED;
          state.error = action.payload;
        })
        .addCase(sendEmailForRecoveryPassword.pending, (state) => {
          state.loading = TypeLoadingStatus.IS_PENDING;
        })
        .addCase(
            sendEmailForRecoveryPassword.fulfilled.type,
            (state, action: PayloadAction<string>) => {
              state.loading = TypeLoadingStatus.IS_RESOLVED;
              state.emailForRecoveryPassword = action.payload;
              state.recoveryPasswordModalOpen = false;
              state.error = '';
            }
        )
        .addCase(sendEmailForRecoveryPassword.rejected.type, (state, action: PayloadAction<string>) => {
          state.loading = TypeLoadingStatus.IS_REJECTED;
          state.error = action.payload;
        })
        .addCase(sendConfirmationCode.pending, (state) => {
          state.loading = TypeLoadingStatus.IS_PENDING;
        })
        .addCase(
            sendConfirmationCode.fulfilled.type,
            (state) => {
              state.loading = TypeLoadingStatus.IS_RESOLVED;
              state.setReceivedCodeModalOpen = false;
              state.setNewPasswordModalOpen = true;
              state.error = '';
            }
        )
        .addCase(sendConfirmationCode.rejected.type, (state, action: PayloadAction<string>) => {
          state.loading = TypeLoadingStatus.IS_REJECTED;
          state.error = action.payload;
        })
        .addCase(setNewPassword.pending, (state) => {
          state.loading = TypeLoadingStatus.IS_PENDING;
        })
        .addCase(
            setNewPassword.fulfilled.type,
            (state) => {
              state.loading = TypeLoadingStatus.IS_RESOLVED;
              state.setNewPasswordModalOpen = false;
              state.recoveryPasswordIsSuccessModalOpen = true;
              state.error = '';
            }
        )
        .addCase(setNewPassword.rejected.type, (state, action: PayloadAction<string>) => {
          state.loading = TypeLoadingStatus.IS_REJECTED;
          state.error = action.payload;
        });
  },
});

export const {
  signInModalIsOpen,
  signUpModalIsOpen,
  isError,
  closeAllModals,
  recoveryPasswordModalIsOpen,
  confirmRegistrationUserModalIsOpen,
  setNewPasswordModalIsOpen,
  resetPasswordModalIsOpen,
  addYachtModalIsOpen
} = authReducer.actions;