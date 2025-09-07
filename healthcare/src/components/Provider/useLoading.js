import { useContext } from "react";
import LoadingContext from "./LoadingProvider";

const useLoading = () => useContext(LoadingContext);

export default useLoading;
