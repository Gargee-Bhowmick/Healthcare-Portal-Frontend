// FullPageLoader.jsx
import useLoading from "../Provider/useLoading";
import { CircularProgress, Box } from "@mui/material";

const FullPageLoader = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "rgba(255, 255, 255, 0.7)",
        zIndex: 9999,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default FullPageLoader;
