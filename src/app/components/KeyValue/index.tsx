/**
 *
 * KeyValue
 *
 */
import React from 'react';
import { styled } from '@mui/system';
import { Grid, Tooltip, Typography } from '@mui/material';
import './keyValue.css';

export const KV = styled('div')({
  color: '#212b36',
  display: 'flex',
  flexDirection: 'column',
});

export const Row = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  margin: '12px 0',
});

export const RowJustifyBetween = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '14px 0',
  borderBottom: '1px solid #E7E7E7',
});

export const Key = styled('p')({
  fontWeight: 'bold',
  width: 200,
  flexShrink: 0,
});

export const Value = (props: { children: React.ReactNode }) => (
  <Typography className={'keyValue'}> {props.children}</Typography>
);

export const SubRow = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '12px 0',
});

export const SubKey = styled('p')({
  fontWeight: 700,
  width: 200,
  flexShrink: 0,
  display: 'flex',
  justifyContent: 'space-between',
  color: '#000000',
  lineHeight: '20px',
});

export const SubValue = (props: {
  children: React.ReactNode;
  hideTooltip?: boolean;
}) => {
  if (props.hideTooltip) {
    return (
      <Typography
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          textAlign: 'end',
          width: 200,
        }}
      >
        {props.children}
      </Typography>
    );
  } else {
    return (
      <Tooltip title={props.children || ''}>
        <Typography
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'end',
            width: 200,
          }}
        >
          {props.children}
        </Typography>
      </Tooltip>
    );
  }
};
