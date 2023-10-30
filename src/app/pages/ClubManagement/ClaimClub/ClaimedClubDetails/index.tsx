import { Container, Grid, Typography } from '@mui/material';
import Page from 'app/components/Page';
import path from 'app/routes/path';
import backIcon from 'assets/images/back-icon.svg';
import dropdownArrowIcon from 'assets/images/dropdownArrow-icon.svg';
import moment from 'moment';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import styled from 'styled-components';
import { TitlePage } from 'app/components/Label';

import ActiveClaimClubButton from './components/ActiveClaimClubButton';
import ClaimClubDetailsTable from './components/ClaimClubDetailsTable';
import CommonCard from './components/CommonCard';
import DescriptionCard from './components/DescriptionCard';
import { useClaimClubDetailsSlice } from './slice';
import { selectClaimedClubDetails } from './slice/selectors';

const RootContainer = styled.div`
  .title {
    color: #777777;
  }
  .section-container,
  .card {
    box-shadow: 0 0 2px 0 rgb(145 158 171 / 24%),
      0 16px 32px -4px rgb(145 158 171 / 24%);
    border: 1px solid #ffffff;
  }

  .section-container {
    background: #ffffff;
    overflow: hidden;
  }
  .search {
    min-width: 400px;
  }
  .active-btn {
    background: #00ab55;
  }
`;

const ClaimClubDetails = memo(() => {
  const dispatch = useDispatch();
  const { clubDetails } = useSelector(selectClaimedClubDetails);
  const { actions } = useClaimClubDetailsSlice();
  const { t } = useTranslation();
  const { id } = useParams();
  const { state } = useLocation();
  const [showTable, setShowTable] = useState(true);
  const [renderData, setRenderData] = useState<any>({});

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    dispatch(actions.getClaimedClubDetails(id));
  }, [id]);

  useEffect(() => {
    if (!clubDetails.data) return;
    const { data } = clubDetails;
    setRenderData({
      claimerInformation: [
        { label: t(translations.common.name), value: data.name },
        { label: t(translations.common.ktaNumber), value: data.ktaNumber },
        {
          label: t(translations.common.identificationNumber),
          value: data.identificationNumber,
        },
        {
          label: t(translations.tableClaim.phoneNumber),
          value: data.phone,
        },
      ],
      clubInformation: [
        { label: t(translations.common.name), value: data.clubName },
        {
          label: t(translations.clubManagementConfirm.clubPrivacy),
          value: data.clubPrivacy.toLowerCase(),
        },
        {
          label: t(translations.clubAssociationInformation.clubCategory),
          value: data.clubCategory,
        },
        {
          label: t(translations.tableRequestClub.externalLink),
          value: data.extarnalLink,
        },
      ],
      bankInformation: [
        {
          label: t(translations.clubAssociationInformation.bankName),
          value: data.bankName,
        },
        {
          label: t(translations.clubManagementConfirm.accountNumber),
          value: data.accountNumber,
        },
        {
          label: t(translations.clubManagementConfirm.accountName),
          value: data.accountName,
        },
      ],
      documents: [
        {
          label: t(translations.claimClubList.oldAdART),
          value: data.oldArtDocuments,
          isFile: true,
        },
        {
          label: t(translations.claimClubList.oldCert),
          value: data.oldCertDocuments,
          isFile: true,
        },
        {
          label: t(translations.claimClubList.oldCertNumber),
          value: data.oldCertNumber,
        },
        {
          label: t(translations.claimClubList.oldOtherDocument),
          value: data.oldAdditionalDocuments,
          isFile: true,
        },
      ],
      clubLocation: [
        {
          label: t(translations.common.province),
          value: data.province,
        },
        { label: t(translations.common.city), value: data.city },
        {
          label: t(translations.common.district),
          value: data.district,
        },
        {
          label: t(translations.common.ward),
          value: data.ward,
        },
        {
          label: t(translations.common.fullAddress),
          value: data.address,
        },
        {
          label: t(translations.createNewMemberPage.rtRwNumber),
          value: data.rtRwNumber,
        },
        {
          label: t(translations.common.postalCode),
          value: data.postCode,
        },
      ],
      clubMembershipInformation: [
        { label: t(translations.common.package), value: data.packageName },
        {
          label: t(translations.common.packageStatus),
          value: data.packageStatus,
        },
        {
          label: t(translations.claimClubList.oldClubCode),
          value: data.oldClubCode,
        },
        {
          label: t(translations.claimClubList.newClubCode),
          value: data.newClubCode,
        },
        {
          label: t(translations.editMember.expirationDate),
          value: moment(data.expirationDate).format('DD/MM/YYYY'),
        },
      ],
      description: {
        value: data.description,
      },
    });
  }, [clubDetails]);

  const handleShowTable = () => {
    setShowTable(prev => !prev);
  };

  const handleBackToClaimList = () => {
    navigate(path.claimClubList);
  };

  return (
    <Page title={t(translations.claimClubList.detailsClaimClub)}>
      <Container maxWidth="xl">
        <RootContainer>
          <section className="title-container flex y-center mb-14">
            <button className="mr-22" onClick={handleBackToClaimList}>
              <img src={backIcon} alt="" />
            </button>
            <span className="title fw-700 fs-24 lh-30">
              {t(translations.claimClubList.claimedClubDetails)}
            </span>
          </section>
          {/* <div style={{ display: 'flex', marginBottom: '0.5rem' }}>
            <TitlePage>{t(translations.common.secretNumber)}:</TitlePage>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 700,
                paddingTop: '2px',
                paddingLeft: '0.6rem',
              }}
            >
              {clubDetails?.data?.securityCode || '-'}
            </Typography>
          </div> */}
          <section className="cards-container">
            <Grid container spacing={2}>
              <Grid container item xs={6} className="flex-column">
                <CommonCard
                  className="card rounded-10 mb-16"
                  title={t(translations.claimClubList.claimerInfo)}
                  contentData={renderData.claimerInformation}
                />
                <CommonCard
                  className="card rounded-10 mb-16"
                  title={t(translations.clubInformation.clubInformation)}
                  contentData={renderData.clubInformation}
                />
                <CommonCard
                  className="card rounded-10 mb-16"
                  title={t(
                    translations.clubAssociationInformation.bankInformation,
                  )}
                  contentData={renderData.bankInformation}
                />
                <CommonCard
                  className="card rounded-10"
                  title={t(translations.common.documents)}
                  contentData={renderData.documents}
                />
              </Grid>
              <Grid container item xs={6} className="flex-column">
                <CommonCard
                  className="card rounded-10 mb-16"
                  title={t(translations.common.clubLocation)}
                  contentData={renderData.clubLocation}
                />
                <CommonCard
                  className="card rounded-10 mb-16"
                  title={t(translations.common.clubMembershipInformation)}
                  contentData={renderData.clubMembershipInformation}
                />
                <DescriptionCard
                  className="card rounded-10"
                  description={renderData.description?.value}
                />
              </Grid>
            </Grid>
          </section>
          <section className="section-container mt-33 pt-18 rounded-10">
            <div className="title-container flex y-center mb-17">
              <span className="title fs-16 lh-19 ml-20 mr-12 fw-700">
                {t(translations.common.oldMemberList)}
              </span>
              <button onClick={handleShowTable}>
                <img src={dropdownArrowIcon} alt="" />
              </button>
            </div>
            <ClaimClubDetailsTable
              show={showTable}
              clubDetails={clubDetails?.data}
            />
          </section>
          <section className="flex x-end w-full mt-10">
            {clubDetails?.data && clubDetails?.data?.status === 'PENDING' && (
              <ActiveClaimClubButton />
            )}
          </section>
        </RootContainer>
      </Container>
    </Page>
  );
});
export default ClaimClubDetails;
