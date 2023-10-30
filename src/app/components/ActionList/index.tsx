import { Stack, IconButton, Tooltip } from '@mui/material';
import { Icon } from '@iconify/react';

interface Props {
  items: {
    icon: string;
    action: (id: number) => void;
    id: number;
    title: string;
  }[];
}

export const ActionList = (props: Props) => {
  return (
    <Stack direction="row" justifyContent="flex-start">
      {props?.items?.map((item, index) => (
        <Tooltip key={index} title={item.title}>
          <div onClick={() => item.action(item.id)}>
            <IconButton>
              <Icon icon={item.icon} color="#05AC54" width={20} height={20} />
            </IconButton>
          </div>
        </Tooltip>
      ))}
    </Stack>
  );
};
