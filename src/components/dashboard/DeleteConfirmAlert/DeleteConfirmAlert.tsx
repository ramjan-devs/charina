'use client';

import { useDialog } from '@/context/DialogContext';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import DynamicActionButton from '../DynamicActionButton/DynamicActionButton';

const DeleteConfirmAlert = () => {
  const { data, closeDialog } = useDialog();
  const [isDeleting, setIsDeleting] = useState(false);
  const [reason, setReason] = useState('');

  const displayName = data?.deleteItem || 'this item';
  const requireReason = data?.requireReason;

  const title = data?.title || 'Confirm Deletion';
  const actionLabel = data?.actionLabel || 'Delete Now';
  const reasonLabel = data?.reasonLabel || 'Reason for deletion (Required)';
  const reasonPlaceholder = data?.reasonPlaceholder || 'E.g. Inappropriate content, spam, etc.';

  const handleDelete = async () => {
    if (!data?.onConfirm) return;
    if (requireReason && !reason.trim()) return;

    setIsDeleting(true);
    try {
      await data?.onConfirm(reason);
      closeDialog();
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-4 text-center">
      <div className="relative mb-5">
        <div className="bg-error/10 absolute inset-0 animate-pulse rounded-full" />
        <div className="border-error/20 bg-error/10 text-error relative flex h-16 w-16 items-center justify-center rounded-full border">
          <div className="bg-error/5 flex h-11 w-11 items-center justify-center rounded-full">
            <Trash2 size={22} />
          </div>
        </div>
      </div>

      <h3 className="mb-2 text-lg font-semibold tracking-tight antialiased">{title}</h3>

      <div className="mb-6 w-full px-2">
        <p className="text-text-secondary mb-4 text-sm leading-relaxed font-medium">
          {data?.description ? (
            data.description
          ) : (
            <>
              Are you sure you want to permanently delete
              <span className="text-error mx-1 font-semibold break-all">{`"${displayName}"`}</span>?
              This action cannot be undone.
            </>
          )}
        </p>

        {requireReason && (
          <div className="w-full text-left">
            <label className="text-text-secondary mb-1.5 block text-xs font-semibold">
              {reasonLabel}
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={reasonPlaceholder}
              rows={3}
              className="focus:border-error focus:ring-error/10 w-full rounded-md border border-slate-200 bg-slate-50 p-2.5 text-sm transition-all outline-none focus:ring-4"
            />
          </div>
        )}
      </div>

      <div className="flex w-full gap-3 px-1">
        <DynamicActionButton
          variant="outline"
          label="Cancel"
          onClick={closeDialog}
          className="flex-1"
        />

        <DynamicActionButton
          variant="danger"
          label={isDeleting ? 'Processing...' : actionLabel}
          onClick={handleDelete}
          disabled={isDeleting || (requireReason && !reason.trim())}
          className="flex-1"
        />
      </div>
    </div>
  );
};

export default DeleteConfirmAlert;
