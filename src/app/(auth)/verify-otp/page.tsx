/* eslint-disable react-hooks/incompatible-library */
'use client';

import { Suspense, useState } from 'react';
import { useForm } from 'react-hook-form';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import OtpInputField from '@/components/dashboard/Fields/OtpInputField/OtpInputField';
// import {
//     useForgotPasswordMutation,
//     useVerifyOtpMutation,
// } from '@/redux/features/auth/auth.api';
// import { catchAsyncMutation } from '@/utils/apiReqRes.utils';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
// import { useRouter, useSearchParams } from 'next/navigation';

interface VerifyOtpForm {
  otp: string;
}

function VerifyOtpContent() {
  // const searchParams = useSearchParams();
  // const email = searchParams.get('email');

  // const router = useRouter();

  // const [verifyOtp] = useVerifyOtpMutation();
  // const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<VerifyOtpForm>({
    defaultValues: {
      otp: '',
    },
  });

  const [otpError, setOtpError] = useState(false);

  const otp = watch('otp');

  const onOtpComplete = (value: string) => {
    setOtpError(false);

    setValue('otp', value, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit = async (data: VerifyOtpForm) => {
    console.log(data);
    // if (!email) {
    //     toast.error('Email is missing.');
    //     return;
    // }

    // const payload = {
    //     email,
    //     otpCode: data.otp,
    // };

    // await catchAsyncMutation(
    //     verifyOtp(payload).unwrap(),
    //     async (res) => {
    //         toast.success(res?.message || 'OTP verified successfully.');

    //         setTimeout(() => {
    //             router.push(`/reset-password?email=${email}&otp=${data.otp}`);
    //         }, 1000);
    //     },
    // );
  };

  const resendOTP = async () => {
    // if (!email) {
    //     toast.error('Email is missing.');
    //     return;
    // }
    // await catchAsyncMutation(
    //     forgotPassword({ email }).unwrap(),
    //     async (res) => {
    //         toast.success(res?.message || 'OTP sent to your email. Please check.');
    //     },
    // );
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 sm:p-6">
      <div className="bg-card border-border w-full max-w-md rounded-lg border p-6 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-primary-text text-2xl font-semibold">Verify OTP</h1>

          <p className="text-secondary-text mt-2 text-sm">Enter the 6-digit verification code.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <OtpInputField
            length={6}
            error={otpError}
            disabled={isSubmitting}
            onComplete={onOtpComplete}
          />

          {(otpError || errors.otp) && (
            <p className="text-danger text-center text-sm">Invalid verification code.</p>
          )}

          <DynamicActionButton
            type="submit"
            label="Verify OTP"
            isLoading={isSubmitting}
            disabled={otp.length !== 6}
            className="w-full"
          />
        </form>

        <p className="mt-5 flex items-center justify-center gap-2 text-center text-sm">
          <span>OTP expired?</span>

          <button
            type="button"
            onClick={resendOTP}
            // disabled={isLoading}
            className="text-primary cursor-pointer font-medium transition-colors hover:underline disabled:cursor-not-allowed disabled:opacity-60"
          >
            Resend OTP
          </button>

          {/* {isLoading && <Loader2 className="h-4 w-4 animate-spin" />} */}
        </p>
        <div className="mt-6 flex justify-center text-sm">
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

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="text-primary h-6 w-6 animate-spin" />
        </div>
      }
    >
      <VerifyOtpContent />
    </Suspense>
  );
}
