import { Paper } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

const RootContainer = styled(Paper)`
  padding: 12px 15px;
  padding-bottom: 5px;
  height: 249px;
  overflow-y: auto;
  .content {
    word-break: break-word;
  }
`;

interface Props {
  className?: string;
  description: string;
}
export default function DescriptionCard(props: Props) {
  const { description, className } = props;
  const { t } = useTranslation();
  return (
    <RootContainer className={className}>
      <div className="title fs-16 lh-19 fw-700 mb-8">
        {t(translations.common.description)}
      </div>
      <div className="content flex-column lh-24 fs-13">{description}</div>
    </RootContainer>
  );
}
