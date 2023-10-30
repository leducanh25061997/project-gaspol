import { Grid, Typography, styled } from '@mui/material';

import iconStar from 'assets/images/star.svg';

interface Props {
  numberStar?: number;
  isFilter?: boolean;
  className?: string;
}

const StartRoot = styled('div')({
  display: 'inline-flex',
  '& img': {
    marginLeft: 8,
  },
  width: '80px',
});

export function Star(props: Props) {
  const { numberStar, isFilter, className } = props;

  return (
    <StartRoot className={className}>
      {numberStar && numberStar > 0 ? (
        Array.from({
          length: numberStar,
        }).map((item, index) => {
          return (
            <div key={index}>
              <img
                src={iconStar}
                style={index === 0 ? { marginLeft: 0 } : { marginLeft: 8 }}
              />
            </div>
          );
        })
      ) : (
        <div>{isFilter ? 0 : '-'}</div>
      )}
    </StartRoot>
  );
}
