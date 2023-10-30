import { Grid, Paper } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { numberWithCommas } from 'utils/commonFunction';
import { Star } from 'app/components/Star';
import _ from 'lodash';

interface Props {
  title: string;
  value?: number;
  star?: number;
  icon?: string;
}

const RootContainer = styled(Paper)`
  padding: 13px;
  box-shadow: 0px 4px 15px 3px #eaeaea;
  .content-container {
    .value {
      color: #212b36;
    }

    .title {
      color: #637381;
    }
  }

  .icon-container {
    padding: 12px;
    background: #f7f7f7;

    img {
      width: 36px;
      height: 36px;
    }
  }
`;

export default function Card(props: Props) {
  const { value, icon, title, star } = props;

  return (
    <Grid item xs={6} md={4}>
      <RootContainer
        elevation={3}
        className="flex y-center x-between rounded-15"
      >
        <div className="content-container flex-column">
          <span className="value fw-700 fs-24 lh-48 mb-8">
            {_.isNumber(value) ? numberWithCommas(value) : '-'}
          </span>
          <div className="flex flex-row y-center">
            <span className="title fw-600 fs-14 lh-22 mr-8">{title}</span>
            {star ? <Star numberStar={star} /> : ''}
          </div>
        </div>
        {icon ? (
          <div className="icon-container rounded-full no-shrink">
            <img src={icon} alt="" />
          </div>
        ) : null}
      </RootContainer>
    </Grid>
  );
}
