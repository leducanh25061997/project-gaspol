import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import RoundFilterList from '@iconify-icons/mdi/filter-variant';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { Icon } from '@iconify/react';

import { EnrollmentType, MemberType } from 'types/Report';
import { Star } from 'app/components/Star';

interface ValueFilter {
  startDate?: any;
  endDate?: any;
  enrollmentType?: string[];
  memberNo?: string[];
  star?: string[];
}

interface Props {
  onChangeValue: (event: any) => void;
  onApply: () => void;
  filter?: ValueFilter;
}

const starTypes = [
  {
    name: <Star numberStar={4} />,
    value: '4',
  },
  {
    name: <Star numberStar={3} />,
    value: '3',
  },
  {
    name: <Star numberStar={2} />,
    value: '2',
  },
  {
    name: <Star numberStar={1} />,
    value: '1',
  },
];

const Filter = ({ onChangeValue, onApply, filter }: Props) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const enrollmentTypes = [
    {
      name: t(translations.common.newEnroll),
      value: EnrollmentType.NEW_ENROLL,
    },
    { name: t(translations.common.renew), value: EnrollmentType.RENEW },
  ];

  const memberTypes = [
    {
      name: t(translations.clubAssociationInformation.lesstThan15),
      value: MemberType.LESS_THAN_15,
    },
    {
      name: t(translations.clubAssociationInformation.moreThan15),
      value: MemberType.MORE_THAN_15,
    },
  ];

  const listFilter = [
    {
      name: 'star',
      data: starTypes,
      status: filter?.star || [],
      title: t(translations.tableAssociation.star),
    },
    {
      name: 'enrollmentType',
      data: enrollmentTypes,
      status: filter?.enrollmentType || [],
      title: t(translations.common.enrollmentType),
    },
    {
      name: 'member',
      data: memberTypes,
      status: filter?.memberNo || [],
      title: t(translations.common.member),
    },
  ];

  return (
    <div>
      <Button
        ref={ref}
        variant="contained"
        sx={{
          backgroundColor: '#01AB55',
          color: 'white',
          marginLeft: '8px',
          height: '41px',
          width: '100px',
        }}
        onClick={() => setIsOpen(true)}
      >
        <Icon style={{ width: 20, height: 20 }} icon={RoundFilterList} />
        <span style={{ marginLeft: 12 }}>{t(translations.common.filter)}</span>
      </Button>
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => {
          setIsOpen(false);
        }}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {listFilter?.map(item => (
          <FormControl sx={{ marginLeft: '10px' }} key={item.title}>
            <FormLabel
              sx={{
                color: 'black',
                fontWeight: 600,
                fontSize: 20,
              }}
              component="legend"
            >
              {item.title}
            </FormLabel>
            {item.name === 'member'
              ? item.data.map((itemCheckbox: any, index: number) => (
                  <MenuItem
                    sx={{ color: 'text.secondary', padding: '0px' }}
                    key={index}
                  >
                    <ListItemIcon sx={{ padding: '0px' }}>
                      <Checkbox
                        onChange={event => {
                          const newStatus = item?.status;
                          if (event.target.checked) {
                            if (itemCheckbox.value === '') {
                              newStatus &&
                                newStatus.length > 0 &&
                                newStatus.splice(0, newStatus.length);
                            } else {
                              newStatus &&
                                newStatus.length > 0 &&
                                newStatus.indexOf('') > -1 &&
                                newStatus.splice(newStatus.indexOf(''), 1);
                            }
                            newStatus && newStatus.push(itemCheckbox.value);
                          } else {
                            newStatus &&
                              newStatus.indexOf(itemCheckbox.value) > -1 &&
                              newStatus.splice(
                                newStatus.indexOf(itemCheckbox.value),
                                1,
                              );
                          }
                          newStatus &&
                            onChangeValue({
                              memberNo: newStatus,
                            });
                        }}
                        checked={
                          item?.status &&
                          item?.status?.length === 0 &&
                          (itemCheckbox.value === '' ||
                            itemCheckbox.value === 'All')
                            ? true
                            : item?.status?.includes(itemCheckbox.value)
                        }
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ marginLeft: '-1rem' }}
                      primary={itemCheckbox.name}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </MenuItem>
                ))
              : null}
            {item.name === 'enrollmentType'
              ? item.data.map((itemCheckbox: any, index: number) => (
                  <MenuItem
                    sx={{ color: 'text.secondary', padding: '0px' }}
                    key={index}
                  >
                    <ListItemIcon sx={{ padding: '0px' }}>
                      <Checkbox
                        onChange={event => {
                          const newStatus = item?.status;
                          if (event.target.checked) {
                            if (itemCheckbox.value === '') {
                              newStatus &&
                                newStatus.length > 0 &&
                                newStatus.splice(0, newStatus.length);
                            } else {
                              newStatus &&
                                newStatus.length > 0 &&
                                newStatus.indexOf('') > -1 &&
                                newStatus.splice(newStatus.indexOf(''), 1);
                            }
                            newStatus && newStatus.push(itemCheckbox.value);
                          } else {
                            newStatus &&
                              newStatus.indexOf(itemCheckbox.value) > -1 &&
                              newStatus.splice(
                                newStatus.indexOf(itemCheckbox.value),
                                1,
                              );
                          }
                          newStatus &&
                            onChangeValue({
                              enrollmentType: newStatus,
                            });
                        }}
                        checked={
                          item?.status &&
                          item?.status?.length === 0 &&
                          (itemCheckbox.value === '' ||
                            itemCheckbox.value === 'All')
                            ? true
                            : item?.status?.includes(itemCheckbox.value)
                        }
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ marginLeft: '-1rem' }}
                      primary={itemCheckbox.name}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </MenuItem>
                ))
              : null}
            {item.name === 'star' &&
              item.data.map((itemCheckbox: any, index: number) => (
                <MenuItem
                  sx={{ color: 'text.secondary', padding: '0px' }}
                  key={index}
                >
                  <ListItemIcon sx={{ padding: '0px' }}>
                    <Checkbox
                      onChange={event => {
                        const newStatus = item?.status;
                        if (event.target.checked) {
                          if (itemCheckbox.value === '') {
                            newStatus &&
                              newStatus.length > 0 &&
                              newStatus.splice(0, newStatus.length);
                          } else {
                            newStatus &&
                              newStatus.length > 0 &&
                              newStatus.indexOf('') > -1 &&
                              newStatus.splice(newStatus.indexOf(''), 1);
                          }
                          newStatus && newStatus.push(itemCheckbox.value);
                        } else {
                          newStatus &&
                            newStatus.indexOf(itemCheckbox.value) > -1 &&
                            newStatus.splice(
                              newStatus.indexOf(itemCheckbox.value),
                              1,
                            );
                        }
                        newStatus &&
                          onChangeValue({
                            star: newStatus,
                          });
                      }}
                      checked={
                        item?.status &&
                        item?.status?.length === 0 &&
                        (itemCheckbox.value === '' ||
                          itemCheckbox.value === 'All')
                          ? true
                          : item?.status?.includes(itemCheckbox.value)
                      }
                    />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ marginLeft: '-1rem' }}
                    primary={itemCheckbox.name}
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </MenuItem>
              ))}
          </FormControl>
        ))}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginRight: '10px',
            marginTop: '10px',
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#01AB55',
              color: 'white',
              height: '41px',
            }}
            onClick={() => {
              onApply();
              setIsOpen(false);
            }}
          >
            {t(translations.common.apply)}
          </Button>
        </Box>
      </Menu>
    </div>
  );
};

export default Filter;
