'use client';

import InputField from '@/components/dashboard/Fields/InputField/InputField';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

// Zod validation schema for login
const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function HomePage() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    toast.success(`Welcome back! Logged in as ${values.email}`);
    // Redirect user to dashboard
    router.push('/dashboard/superadmin/overview');
  };

  return (
    <div className="flex min-h-[85vh] w-full flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md space-y-6">
        {/* Header Section matching Screenshot */}
        <div className="text-center">
          <h1 className="text-primary text-3xl font-extrabold tracking-tight sm:text-4xl">
            Welcome back
          </h1>
          <p className="text-secondary mt-2 text-sm sm:text-base">
            Glad to have you back! Let&apos;s get started.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          {/* Email Input Field */}
          <InputField
            label="Email"
            name="email"
            control={control}
            type="email"
            placeholder="Enter your email"
            required
            error={errors.email?.message}
          />

          {/* Password Input Field */}
          <div>
            <InputField
              label="Password"
              name="password"
              control={control}
              type="password"
              placeholder="Enter your password"
              required
              error={errors.password?.message}
            />

            {/* Forgot Password Link matching Screenshot */}
            <div className="pt-2 text-right">
              <Link
                href="/forgot-password"
                className="hover:text-primary text-xs font-bold text-slate-800 underline transition-colors dark:text-slate-200"
              >
                Forgot Password
              </Link>
            </div>
          </div>

          {/* Login Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer rounded-xl bg-[#0f172a] px-4 py-3.5 text-sm font-bold text-white shadow-xs transition-all hover:bg-[#1e293b] active:scale-[0.99] disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
