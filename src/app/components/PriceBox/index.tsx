import { Stack, Box, Typography } from '@mui/material';
import { currencyFormat } from 'utils/helpers/currency';
interface Props {
  price?: number;
  minPrice?: number;
  maxPrice?: number;
}
export const PriceBox = (props: Props) => {
  const { price, minPrice, maxPrice } = props;
  return (
    <>
      {minPrice !== undefined &&
      maxPrice !== undefined &&
      price === undefined ? (
        <Stack direction="row">
          <Typography>{currencyFormat(minPrice)}</Typography>
          <Typography sx={{ marginLeft: '5px', marginRight: '5px' }}>
            -
          </Typography>
          <Typography>{currencyFormat(maxPrice)}</Typography>
        </Stack>
      ) : (
        <>{currencyFormat(Number(price))}</>
      )}
    </>
  );
};
