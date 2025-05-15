
export const LoadingSpinner = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-indigo-600 animate-spin"></div>
      <span>Processing...</span>
    </div>
  );
};
