import { Box, LinearProgress } from '@mui/material';

const AppProgress = () => {
  return (
    <Box position="fixed" top={0} left={0} right={0} zIndex={9999}>
      <LinearProgress
        color="primary"
        sx={{
          height: 6,
        }}
      />
    </Box>
  );
};

export default AppProgress;
