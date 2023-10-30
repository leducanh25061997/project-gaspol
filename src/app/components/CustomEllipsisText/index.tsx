import { Typography } from '@mui/material';
interface Props {
  text: any;
  maxWidth?: number;
  webkitLineClamp?: number;
}
export const CustomEllipsisText = (props: Props) => (
  <Typography
    sx={{
      display: '-webkit-box',
      WebkitLineClamp: props.webkitLineClamp,
      maxWidth: props.maxWidth,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    }}
  >
    {props.text}
  </Typography>
);
