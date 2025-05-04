export const SuspenseFallback = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      <p className="mt-4 text-base text-base-black">Loading...</p>
    </div>
  );
};
