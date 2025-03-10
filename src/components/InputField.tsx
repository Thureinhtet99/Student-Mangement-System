import { FieldError } from "react-hook-form";

type InputFieldProps = {
  label: string;
  htmlFor: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputField = ({
  label,
  htmlFor,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  inputProps,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-2 w-full md:w-1/4">
      <label htmlFor={htmlFor}>{label}</label>
      <input
        type={type}
        id={htmlFor}
        {...register(name)}
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
        {...inputProps}
        defaultValue={defaultValue}
      />
      {error?.message && (
        <p className="text-red-400 text-xs">{error.message.toString()}</p>
      )}
    </div>
  );
};

export default InputField;
