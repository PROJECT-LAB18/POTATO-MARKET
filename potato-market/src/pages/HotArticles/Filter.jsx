import styled from 'styled-components';

import RegionSelect from "./RegionSelect";

import { gray3 } from "@/styles/global";

function Filter(){
  return(
    <FilterContainer>
      <RegionSelect regionTitle="지역을 선택하세요" />
      <RegionSelect regionTitle="동네를 선택하세요" />
    </FilterContainer>
  )
}

const FilterContainer = styled.form`
  display: flex;
  gap: 15px;
  justify-content: end;

  & select{
    width: 200px;
    font-size: 17px;
    background-color: #fff;
    padding: 13px 17px;
    border: 1px solid ${gray3};
    border-radius: 6px;
    box-shadow: 1px 1px 0 1px rgba(0, 0, 0, 0.04);
    appearance: none;
    background: url('../../public/icon-arrow-under.svg') no-repeat;
    background-position: 170px center;
  }
`

export default Filter;