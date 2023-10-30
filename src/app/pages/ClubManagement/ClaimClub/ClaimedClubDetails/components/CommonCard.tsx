import { Paper } from '@mui/material';
import classNames from 'classnames';
import React from 'react';
import styled from 'styled-components';

const RootContainer = styled(Paper)`
  padding: 8.5px 15px;
  min-height: 196px;
  .item:not(:last-child) {
    border-bottom: 1px solid #e7e7e7;
  }
  .value-file {
    color: #00ab55;
    text-decoration: underline;
    cursor: pointer;
    display: inline-block;
  }

  .value {
    max-width: 200px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

interface Props {
  className?: string;
  title: string;
  contentData: {
    label: string;
    value: string;
    isFile?: boolean;
  }[];
}
export default function CommonCard(props: Props) {
  const { title, contentData, className } = props;
  return (
    <RootContainer className={className}>
      <div className="title fs-16 lh-19 fw-700">{title}</div>
      <div className="content flex-column">
        {contentData?.map(item => (
          <div className="item flex x-between w-100 py-18" key={item.label}>
            <span className="label fs-14 lh-16 fw-700">{item.label}</span>
            <a
              className={classNames('value fs-14 lh-16', {
                'value-file': item.isFile,
              })}
              href={item.isFile ? item.value : undefined}
              target="_blank"
              rel="noreferrer"
            >
              {item.value}
            </a>
          </div>
        ))}
      </div>
    </RootContainer>
  );
}
