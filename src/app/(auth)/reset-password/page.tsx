'use client';

import { Suspense } from 'react';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import InputField from '@/components/dashboard/Fields/InputField/InputField';
// import { useResetPasswordMutation } from '@/redux/features/auth/auth.api';
// import { catchAsyncMutation } from '@/utils/apiReqRes.utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),

    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

function ResetPasswordContent() {
  // const router = useRouter();

  // const searchParams = useSearchParams();
  // const email = searchParams.get('email');
  // const otp = searchParams.get('otp');

  // const [resetPassword] = useResetPasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    console.log(data);
    // if (!email || !otp) {
    //     toast.error('Invalid reset password link.');
    //     return;
    // }

    // const payload = {
    //     email,
    //     otpCode: otp,
    //     newPassword: data.newPassword,
    // };

    // await catchAsyncMutation(
    //     resetPassword(payload).unwrap(),
    //     async (res) => {
    //         toast.success(res?.message || 'Password reset successfully.');

    //         setTimeout(() => {
    //             router.push('/');
    //         }, 1000);
    //     },
    // );
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md space-y-7">
        <div className="space-y-2 text-left">
          <h1 className="text-primary-text text-2xl font-semibold sm:text-3xl">Reset Password</h1>

          <p className="text-muted-foreground text-sm sm:text-base">
            Enter your new password below.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <InputField
              control={control}
              name="newPassword"
              label="New Password"
              type="password"
              placeholder="Enter your new password"
              error={errors.newPassword?.message}
              required
            />

            <InputField
              control={control}
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              error={errors.confirmPassword?.message}
              required
            />
          </div>

          <DynamicActionButton
            type="submit"
            label="Update Password"
            disabled={!isDirty}
            isLoading={isSubmitting}
            className="w-full"
          />
        </form>

        <div className="flex justify-center text-sm">
          <Link
            href="/"
            className="text-muted-foreground hover:text-primary-text flex items-center gap-2 font-medium transition-colors hover:underline"
          >
            <ArrowLeft size={16} />
            Back to log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="text-primary h-6 w-6 animate-spin" />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
