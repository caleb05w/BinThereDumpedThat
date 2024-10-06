export const BinDashDisplay = ({
  location,
  binStatus,
  binType,
  binColor,
  isHeading,
}) => {
  return (
    <div
      className={`flex flex-row flex-col ${
        isHeading ? "bg-black h-16" : "bg-gray-100 h-20"
      } lg:items-center w-full py-4 lg:pl-16 overflow-hidden`}
    >
      <h1
        className={`${
          isHeading ? "poppins-semibold text-white" : "poppins-regular"
        } capitalize text-left px-4`}
      >
        {location}
      </h1>
      <h1
        className={`${binColor} ${
          isHeading ? "poppins-semibold text-white" : "poppins-regular"
        } capitalize text-left px-4 lg:ml-20`}
      >
        {binStatus}
      </h1>
      <h1
        className={`${
          isHeading ? "poppins-semibold text-white  " : "poppins-regular"
        } capitalize text-left px-4 lg:ml-20`}
      >
        {binType}
      </h1>
    </div>
  );
};
