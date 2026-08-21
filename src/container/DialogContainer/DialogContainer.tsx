'use client';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useDialog } from '@/context/DialogContext';
import { VisuallyHidden } from 'radix-ui';
import { DIALOG_COMPONENTS } from './dialog-mapping';

export const DialogContainer = () => {
  const { isOpen, view, title, description, mode, closeDialog } = useDialog();

  if (!isOpen || view === 'NONE') return null;

  if (mode === 'dialog') {
    return (
      <Dialog open={isOpen} onOpenChange={closeDialog}>
        <DialogContent className="max-w-137.5 gap-0 p-4">
          {!title && (
            <VisuallyHidden.Root>
              <DialogTitle>Modal Dialog</DialogTitle>
            </VisuallyHidden.Root>
          )}

          {/* Visible Header Section */}
          {(title || description) && (
            <div className="mb-4 flex flex-col space-y-1">
              {title && (
                <DialogTitle className="text-xl font-semibold tracking-tight">{title}</DialogTitle>
              )}

              {description && (
                <DialogDescription className="text-gary text-sm leading-relaxed">
                  {description}
                </DialogDescription>
              )}
            </div>
          )}

          {/* Content Section */}
          <div className="w-full">{DIALOG_COMPONENTS[view]}</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
      <SheetContent
        side="right"
        className="custom-scrollbar w-full max-w-md overflow-y-auto md:max-w-xl"
      >
        <SheetHeader className="border-border gap-0.5 border-b">
          {title && <SheetTitle className="text-primary">{title}</SheetTitle>}
          {description && (
            <SheetDescription className="text-secondary">{description}</SheetDescription>
          )}
        </SheetHeader>
        <div className="px-5 pb-5">{DIALOG_COMPONENTS[view]}</div>
      </SheetContent>
    </Sheet>
  );
};

export default DialogContainer;
