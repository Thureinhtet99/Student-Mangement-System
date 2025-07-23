import { LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";
import { FormActionButtonType } from "@/types";

const FormActionButton = ({
  form,
  setSelectedItems,
  resetMutation,
  isPending,
  isImageLoading,
  setIsImageLoading,
  type,
  customReset,
}: FormActionButtonType) => {
  const handleReset = () => {
    if (customReset) {
      customReset();
    } else {
      form.reset();
      form.clearErrors();
      if (setSelectedItems) setSelectedItems([]);
      if (setIsImageLoading) setIsImageLoading(false);
      resetMutation();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
      <Button
        variant="outline"
        type="button"
        className="w-full sm:w-auto min-w-[100px] h-10 transition-all duration-200 hover:bg-gray-50 hover:border-gray-300"
        onClick={handleReset}
        disabled={isPending || isImageLoading}
      >
        Reset
      </Button>
      <Button
        type="submit"
        className="w-full sm:w-auto min-w-[120px] h-10 bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isPending || isImageLoading}
      >
        {isPending ? (
          <div className="flex items-center gap-2">
            <LoaderCircle className="animate-spin h-4 w-4" />
            <span className="text-sm font-medium">
              {type === "create" ? "Creating..." : "Updating..."}
            </span>
          </div>
        ) : isImageLoading ? (
          <div className="flex items-center gap-2">
            <LoaderCircle className="animate-spin h-4 w-4" />
            <span className="text-sm font-medium">Loading image...</span>
          </div>
        ) : (
          <span className="text-sm font-medium">
            {type === "create" ? "Create" : "Update"}
          </span>
        )}
      </Button>
    </div>
  );
};

export default FormActionButton;
