import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Grid, Paper } from '@mui/material';
import styled from 'styled-components';
import { numberWithCommas } from 'utils/commonFunction';

interface Props {
  title: string;
  value: number;
  align: 'right' | 'left';
}

const RootContainer = styled(Paper)`
  max-width: 500px;
  box-shadow: 0px 4px 15px 3px #eaeaea;
  .title-container {
    .title {
      color: #637381;
    }
    .value {
      color: #000000;
    }
  }

  .legend-container {
    border-top: 1px solid rgba(145, 158, 171, 0.24);
    color: #212b36;
    .legend-item {
      :last-child {
        margin-left: 27px;
      }
    }

    .dot {
      width: 12px;
      height: 12px;
    }
  }
`;

export default function GraphCard(props: Props) {
  const { title, value, align } = props;
  const series = [70, 30];
  const labels = ['KTA Mobility', 'KTA Pro'];

  const colors = ['#826AF9', '#00AB55'];
  const options: ApexOptions = {
    labels,
    legend: {
      show: false,
    },
    fill: {
      colors,
    },
  };

  return (
    <Grid
      item
      md={6}
      xs={12}
      container
      justifyContent={align}
      className="graph-card"
    >
      <RootContainer
        elevation={3}
        className="w-full flex-column y-center rounded-15"
      >
        <div className="title-container flex x-between w-full fs-14 lh-22 py-19 px-24">
          <span className="title fw-600">{title}</span>
          <span className="value fw-700">{numberWithCommas(value)}</span>
        </div>
        <ReactApexChart options={options} series={series} type="pie" />
        <div className="legend-container w-full py-24 flex x-center fs-13 lh-18 ">
          <div className="legend-item flex y-center">
            <div
              className="dot rounded-full mr-8"
              style={{ background: colors[0] }}
            ></div>
            <span className="item-name">KTA Mobility</span>
          </div>
          <div className="legend-item flex y-center">
            <div
              className="dot rounded-full mr-8"
              style={{ background: colors[1] }}
            ></div>
            <span className="item-name">KTA Pro</span>
          </div>
        </div>
      </RootContainer>
    </Grid>
  );
}
