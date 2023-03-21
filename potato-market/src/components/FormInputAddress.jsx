import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

import { FormInputLocation } from './FormInput';

const FormInputAddress = ({location, setLocation}) => {

  const [openPostcode, setOpenPostcode] = useState(false);

  const selectAddress = (data) => {

    // 주소 api에서 받아온 data를 location 객체로 삽입하기
    setLocation((prev)=>(
      {
        ...prev,
        sido : data.sido,
        sigungu : data.sigungu,
        bname : data.bname,
      }
    ))
    
    // 확인코드 (동작 x)
    console.log(location);

    // 주소 창 다시 닫기
    setOpenPostcode(false);
    }
  
  return(
    <>
      <FormInputLocation 
        fullAddress={`${location.sido} ${location.sigungu} ${location.bname}`}
        setOpenPostcode={setOpenPostcode}
      />
      {openPostcode && 
        <DaumPostcode 
          autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
          defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어 
          onComplete={selectAddress}  // 값을 선택할 경우 실행되는 이벤트
        />
      }
    </>
  )
};

export default FormInputAddress;