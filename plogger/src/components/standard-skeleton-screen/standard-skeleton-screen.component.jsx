import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const StandardSkeletonScreen = () => {
  return (
    <div>
      <Stack spacing={1}>
        <Skeleton variant="rectangular" width={290} height={60} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      </Stack>
    </div>
  );
};

export default StandardSkeletonScreen;
