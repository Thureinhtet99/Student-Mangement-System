import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="flex flex-col items-center gap-2">
        <LoaderCircle className="animate-spin h-8 w-8 text-primary" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;