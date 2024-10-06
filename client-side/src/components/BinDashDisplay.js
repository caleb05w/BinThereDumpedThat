export const BinDashDisplay = ({
  location,
  binStatus,
  binType,
  binColor,
  isHeading,
}) => {
  return (
    <div
      className={`flex flex-row ${
        isHeading ? "bg-black h-16 " : "bg-gray-100 h-40"
      } items-center justify-between text-sm w-full py-4 px-4 lg:px-10 overflow-hidden`}
    >
      <h1
        className={`${
          isHeading ? "poppins-semibold text-white" : "poppins-regular"
        } capitalize text-left text-sm w-2/5`}
      >
        {location}
      </h1>
      <h1
        className={`${binColor} ${
          isHeading ? "poppins-semibold  text-white" : "poppins-regular"
        } capitalize text-left text-sm w-1/5`}
      >
        {binStatus}
      </h1>
      <h1
        className={`${
          isHeading ? "poppins-semibold text-white  " : "poppins-regular"
        } capitalize text-left text-sm w-1/4`}
      >
        {binType}
      </h1>
    </div>
  );
};
