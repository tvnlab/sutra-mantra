import InputField from "@app/components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { Routes } from "@app/utils/routes";

// Handle form
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import message from "@library/api/utils/message";
import useRegisterStore from "@app/hooks/stores/useRegisterStore";
import { useRouter } from "next/navigation";
import { toastGlobal } from "@app/layouts/main";

const schema = yup
  .object({
    name: yup.string().required(message.error.require("Name")),
    email: yup.string().required(message.error.require("Email")),
    password: yup.string().required(message.error.require("Password")),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

interface IFormInput {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function SignUp() {
  const router = useRouter();
  const { control, handleSubmit, formState } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { registerAccount, error, isLoading } = useRegisterStore();

  const { errors } = formState;

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await registerAccount(data.name, data.email, data.password);
      toastGlobal({
        description: "We've created your account for you.",
        status: "success",
        onCloseComplete() {
          router.push(Routes.LOGIN);
        },
      });
    } catch (error) {
      toastGlobal({
        description: `We cannot create your account cause some reason. 
          Please send a email to us. We will support you as soon as possible!. 
          Thank you`,
        status: "error",
      });
    }
  };
  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10">
      {/* Sign in section */}
      <form
        className="w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign Up
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your info to sign up!
        </p>
        <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">
            Sign Up with Google
          </h5>
        </div>
        <div className="mb-6 flex items-center  gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white"> or </p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>
        {/* Display Name */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              variant="auth"
              extra="mb-3"
              label="Your Name*"
              placeholder="Buddha Amitabha..."
              id="name"
              type="text"
              state={errors?.name ? "error" : undefined}
              helpText={errors?.name?.message}
            />
          )}
        />

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

        {/* Confirm Password */}
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              variant="auth"
              extra="mb-3"
              label="Confirm Password*"
              placeholder="Min. 8 characters"
              id="confirmPassword"
              type="password"
              state={errors?.confirmPassword ? "error" : undefined}
              helpText={errors?.confirmPassword?.message}
            />
          )}
        />

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
            Already have an account?
          </span>
          <Link
            href={Routes.LOGIN}
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Login Now!
          </Link>
        </div>
      </form>
    </div>
  );
}
