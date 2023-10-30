import { Typography, Tooltip } from '@mui/material';
interface Props {
  text: any;
  line?: number;
  isFloat?: boolean;
  width?: number;
}
export const EllipsisText = (props: Props) => (
  <Tooltip title={props.text as string}>
    <Typography
      sx={{
        display: '-webkit-box',
        WebkitLineClamp: props.line || 3,
        maxWidth: props.width || 250,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        wordBreak: 'break-all',
        float: props.isFloat ? 'right' : 'unset',
      }}
    >
      {props.text}
    </Typography>
  </Tooltip>
);
