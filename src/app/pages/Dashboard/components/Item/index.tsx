// material
import { Grid, Typography } from '@mui/material';
import styled from 'styled-components';
import { numberWithCommas } from 'utils/commonFunction';
import _ from 'lodash';
export interface ItemProps {
  backgroundColor: string;
  icon: string;
  iconColor: string;
  value?: number;
  title: string;
  color: string;
}

interface ContainerProps {
  backgroundColor: string;
  color: string;
  iconColor: string;
}

const Container = styled.div<ContainerProps>`
  min-width: 200px;
  padding: 40px 10px 44px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  & .value {
    margin-top: 24px;
    line-height: 2em;
  }
  & .title {
    opacity: 0.72;
    font-weight: bold;
  }
  & .icon-wrapper {
    padding: 17px;
    border-radius: 50%;
    background: ${props => props.iconColor};
    & img {
      border-radius: 50%;
      width: 29px;
      height: 29px;
    }
  }
`;

export default function Item(props: ItemProps) {
  const { icon, backgroundColor, value, title, color, iconColor } = props;

  return (
    <Grid item md={3} xs={6}>
      <Container
        backgroundColor={backgroundColor}
        color={color}
        iconColor={iconColor}
      >
        <div className="icon-wrapper">
          <img src={icon} alt="" />
        </div>
        <Typography variant="h5" noWrap className="value">
          {_.isNumber(value) ? numberWithCommas(value) : '-'}
        </Typography>
        <Typography variant="body2" noWrap className="title">
          {title}
        </Typography>
      </Container>
    </Grid>
  );
}
