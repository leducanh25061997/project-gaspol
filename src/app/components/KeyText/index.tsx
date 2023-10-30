/**
 *
 * KeyValue
 *
 */
import React from 'react';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';

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

export const Key = styled('p')({
  width: 200,
  flexShrink: 0,
  color: '#777777',
});

export const TitleStyle = styled('div')({
  color: '#777777',
});

export const ValueStyle = styled('div')({
  width: '100%',
  textAlignLast: 'right',
});

export const LabelInfo = styled('p')({
  width: 200,
  flexShrink: 0,
  fontWeight: 700,
  alignSelf: 'center',
});

export const RowFooter = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  margin: '12px 0',
});

export const RowInfo = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  margin: '12px 0',
  borderBottom: '1px solid #E7E7E7',
  paddingBottom: '1rem',
});

export const ColInfo = styled('div')({
  flexDirection: 'row',
  alignItems: 'center',
  margin: '12px 0',
  borderBottom: '1px solid #E7E7E7',
  paddingBottom: '1rem',
});

export const Text = (props: { children: React.ReactNode }) => (
  <Key>{props.children}:</Key>
);

const TextStyle = styled('div')({
  width: '100%',
  textAlignLast: 'right',
});

export const Value = (props: { children: React.ReactNode }) => (
  <TextStyle> {props.children}</TextStyle>
);
