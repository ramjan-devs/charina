/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

//Dialog views type
export type TDialogView =
  | 'NONE'
  | 'ADD_SCHEDULE'
  | 'RESCHEDULE_JOB'
  | 'VIEW_EMPLOYEE_JOB_DETAILS';

//Open Dialog Props
export interface IOpenDialogProps {
  view: TDialogView;
  data?: any;
  title?: string;
  description?: string;
  mode?: 'dialog' | 'drawer';
}

//Dialog state interface
export interface IDialogState {
  isOpen: boolean;
  view: TDialogView;
  data: any;
  title: string;
  description: string;
  mode: 'dialog' | 'drawer';
}

//Action types
export type TDialogAction =
  | {
      type: 'OPEN_DIALOG';
      payload: IOpenDialogProps;
    }
  | { type: 'CLOSE_DIALOG' };

export interface IDialogContextType extends IDialogState {
  openDialog: (props: IOpenDialogProps) => void;
  closeDialog: () => void;
}
