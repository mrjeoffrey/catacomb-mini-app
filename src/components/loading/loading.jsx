import ScaleLoader from "react-spinners/ScaleLoader";

export const LoadingPanel = () => {
  return (
    <div className="loading-panel">
      <div className="loading-panel__spinner">
        <ScaleLoader color="white" height={30} width={5} margin={1.5} />
      </div>
    </div>
  );
};
