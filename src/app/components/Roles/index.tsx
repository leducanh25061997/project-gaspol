import { List, ListItem } from '@mui/material';

interface Props {
  role?: string;
  titles?: string[];
}

export function Roles(props: Props) {
  const { role, titles } = props;
  return (
    <List>
      <ListItem>{role}</ListItem>
      {/* {titles?.map(
        value =>
          role &&
          value !== role && (
            <ListItem sx={{ color: '#8E8D8D' }}>{value}</ListItem>
          ),
      )} */}
    </List>
  );
}
