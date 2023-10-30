import DatePicker from 'app/components/DatePicker';
import { SearchBar } from 'app/components/SearchBar';
import React from 'react';
import styled from 'styled-components';

import ProvincePicker from './ProvincePicker';

const RootContainer = styled.div`
  display: flex;
  .search {
    .MuiInputBase-input {
      padding: 0 2px;
    }
    .MuiOutlinedInput-root {
      min-width: 300px;
    }
  }

  .filter-button {
    color: #ffffff;
    min-width: 86px;
  }
  .clear-filter {
    background: #ff6b00;
  }

  .export {
    background: #00ab55;
  }
`;

interface Props {
  className?: string;
}
function FilterBar(props: Props) {
  const { className } = props;
  return (
    <RootContainer className={className}>
      <ProvincePicker />
      <SearchBar
        placeholder="Search by name, KTA number... "
        className="search ml-13"
        keyword=""
        onSearch={() => {
          console.log('search');
        }}
      />
      <DatePicker label="Start date" className="ml-22" />
      <DatePicker label="End date" className="ml-10" />
      <button className="filter-button clear-filter fs-14 fw-600 lh-16 py-12 px-6 ml-20 rounded-10">
        Clear filter
      </button>
      <button className="filter-button export fs-14 fw-600 py-12 px-6 ml-14 rounded-10">
        Export
      </button>
    </RootContainer>
  );
}

export default React.memo(FilterBar);
