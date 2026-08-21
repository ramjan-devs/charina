'use client';

import DynamicActionButton from '@/components/dashboard/DynamicActionButton/DynamicActionButton';
import InputField from '@/components/dashboard/Fields/InputField/InputField';
// import { useForgotPasswordMutation } from '@/redux/features/auth/auth.api';
// import { catchAsyncMutation } from '@/utils/apiReqRes.utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const forgotPasswordSchema = z.object({
  email: z.email('Invalid email address').min(1, 'Email is required'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  // const router = useRouter();
  // const [isLoading, setIsLoading] = useState(false);
  // const [forgotPassword] = useForgotPasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    console.log(data);
    // await catchAsyncMutation(
    //   forgotPassword(data).unwrap(),
    //   // onSuccess
    //   async (res) => {
    //     toast.success(res?.message || 'OTP sent to your email. Please check.');
    //     setTimeout(() => {
    //       router.push(`/verify-otp/?email=${data.email}`);
    //     }, 1000);
    //   },
    // );
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md space-y-7">
        <div className="space-y-2 text-left">
          <h1 className="text-primary-text text-2xl font-semibold sm:text-3xl">Forgot password?</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            No worries, we&apos;ll send you reset instructions.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <InputField
              control={control}
              name="email"
              label="Admin Email"
              type="email"
              placeholder="admin@mycdlclass.com"
              error={errors.email?.message}
              required
            />
          </div>

          <DynamicActionButton
            type="submit"
            label="Reset Password"
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
