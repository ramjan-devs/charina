'use client';

import {
  IDialogContextType,
  IDialogState,
  IOpenDialogProps,
  TDialogAction,
} from '@/types/dialog.types';
import { createContext, useContext, useReducer } from 'react';

//Define initial state
const initialState: IDialogState = {
  isOpen: false,
  view: 'NONE',
  data: null,
  title: '',
  description: '',
  mode: 'drawer',
};

//Create Reducer function
const dialogReducer = (state: IDialogState, action: TDialogAction): IDialogState => {
  switch (action.type) {
    case 'OPEN_DIALOG':
      return {
        ...state,
        isOpen: true,
        view: action.payload.view,
        data: action.payload.data || null,
        title: action.payload.title || '',
        description: action.payload.description || '',
        mode: action.payload.mode || 'drawer',
      };
    case 'CLOSE_DIALOG':
      return initialState;
    default:
      return state;
  }
};

//Create context
export const DialogContext = createContext<IDialogContextType | undefined>(undefined);

//Create provider
export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(dialogReducer, initialState);

  //Handle open dialog
  const openDialog = (props: IOpenDialogProps) => {
    dispatch({
      type: 'OPEN_DIALOG',
      payload: props,
    });
  };

  //Handle close dialog
  const closeDialog = () => {
    dispatch({
      type: 'CLOSE_DIALOG',
    });
  };
  return (
    <DialogContext.Provider value={{ ...state, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) throw new Error('useDialog must be used within a DialogProvider');
  return context;
};
