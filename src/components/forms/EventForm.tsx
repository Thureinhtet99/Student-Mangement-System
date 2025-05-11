"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";
import { ArrowUpFromLine } from "lucide-react";

const schema = z.object({
  username: z.string().min(3, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phone: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
  birthday: z.date().optional(),
  gender: z.enum(["male", "female"], { message: "Gender is required" }),
  image: z.instanceof(File).optional(),
});

// Schema type
type Inputs = z.infer<typeof schema>;

const EventForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  // onSubmit
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      {type === "create" ? (
        <h1 className="text-xl font-semibold">Create a new announcement</h1>
      ) : (
        <h1 className="text-xl font-semibold">Update announcement</h1>
      )}
      <span className="text-sm text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Username"
          name="username"
          htmlFor="username"
          defaultValue={data?.username}
          register={register}
          error={errors?.username}
        />
        <InputField
          label="Email"
          name="email"
          htmlFor="email"
          type="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Password"
          name="password"
          htmlFor="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors?.password}
        />
      </div>
      <span className="text-sm text-gray-400 font-medium">
        Personal Information
      </span>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="First name"
          name="firstName"
          htmlFor="firstName"
          defaultValue={data?.firstName}
          register={register}
          error={errors?.firstName}
        />
        <InputField
          label="Last name"
          name="lastName"
          htmlFor="lastName"
          defaultValue={data?.lastName}
          register={register}
          error={errors?.lastName}
        />
        <InputField
          label="Phone"
          name="phone"
          htmlFor="phone"
          type="number"
          defaultValue={data?.phone}
          register={register}
        />
        <InputField
          label="Address"
          name="address"
          htmlFor="address"
          defaultValue={data?.address}
          register={register}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            {...register("gender")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            defaultValue={data?.gender}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender?.message && (
            <p className="text-red-400 text-xs">
              {errors.gender.message.toString()}
            </p>
          )}
        </div>
        <InputField
          label="Birthday"
          name="birthday"
          htmlFor="birthday"
          type="date"
          defaultValue={data?.birthday}
          register={register}
        />
        <div className="flex flex-col gap-2 justify-center rounded-md p-2 w-full md:w-1/4">
          <label
            htmlFor="image"
            className="text-sm text-gray-500 flex items-center gap-2 cursor-pointer"
          >
            <ArrowUpFromLine />
            <span>Upload a photo</span>
          </label>
          <input
            type="file"
            id="image"
            {...register("image")}
            className="hidden"
          />
        </div>
      </div>

      <button className="bg-blue-500 text-white p-2 rounded-md" type="submit">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default EventForm;
