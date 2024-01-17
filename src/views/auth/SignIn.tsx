import InputField from "@app/components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "@app/components/checkbox";
import Link from "next/link";
import { Routes } from "@app/utils/routes";

// Handle form
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import message from "@library/api/utils/message";
import useAuthStore from "@app/hooks/stores/useAuthStore";
const schema = yup
  .object({
    email: yup
      .string()
      .required(message.error.require("Email"))
      .email("Invalid email"),
    password: yup.string().required(message.error.require("Password")),
  })
  .required();

interface IFormInput {
  email?: string;
  password?: string;
  rememberMe?: boolean;
}
export default function SignIn() {
  const { control, handleSubmit, formState } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { login, error, isLoading } = useAuthStore();

  const { errors } = formState;

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    login(data.email, data.password, data.rememberMe);
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10">
      {/* Sign in section */}
      <form
        className="w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>
        <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">
            Sign In with Google
          </h5>
        </div>
        <div className="mb-6 flex items-center  gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white"> or </p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>
        {/* Email */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              variant="auth"
              extra="mb-3"
              label="Email*"
              placeholder="sutra-mantra@gmail.com"
              id="email"
              type="text"
              state={errors?.email ? "error" : undefined}
              helpText={errors?.email?.message}
            />
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              variant="auth"
              extra="mb-3"
              label="Password*"
              placeholder="Min. 8 characters"
              id="password"
              type="password"
              state={errors?.password ? "error" : undefined}
              helpText={errors?.password?.message}
            />
          )}
        />

        {/* Checkbox */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <Controller
              name="rememberMe"
              control={control}
              render={({ field }) => (
                <Checkbox {...field}>
                    Keep me logged In
                </Checkbox>
              )}
            />
          </div>
          <Link
            className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            href="#"
          >
            Forgot Password?
          </Link>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          disabled={isLoading}
          type="submit"
          className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        >
          Submit
        </button>
        <div className="mt-4 flex justify-center">
          <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
            Not registered yet?
          </span>
          <Link
            href={Routes.REGISTER}
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
}
