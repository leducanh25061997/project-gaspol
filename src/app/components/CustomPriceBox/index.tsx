import { Stack, Box, Typography } from '@mui/material';
import { currencyFormat } from 'utils/helpers/currency';
interface Props {
  price?: number;
  minPrice?: number;
  maxPrice?: number;
  type?: string;
}
export const CustomPriceBox = (props: Props) => {
  const { price, minPrice, maxPrice, type } = props;

  if (type === 'province') {
    return (
      <>
        {price !== undefined && price > 0 ? (
          <>{currencyFormat(Number(price))}</>
        ) : (
          <Typography sx={{ marginLeft: '5px', marginRight: '5px' }}>
            -
          </Typography>
        )}
      </>
    );
  } else {
    return (
      <>
        {minPrice !== undefined && maxPrice !== undefined ? (
          <Stack direction="row">
            <Typography>{currencyFormat(minPrice)}</Typography>
            <Typography sx={{ marginLeft: '5px', marginRight: '5px' }}>
              -
            </Typography>
            <Typography>{currencyFormat(maxPrice)}</Typography>
          </Stack>
        ) : (
          <Typography sx={{ marginLeft: '5px', marginRight: '5px' }}>
            -
          </Typography>
        )}
      </>
    );
  }
};
