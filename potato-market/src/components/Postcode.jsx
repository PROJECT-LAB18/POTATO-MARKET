import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

const Postcode = () => {

  const [openPostcode, setOpenPostcode] = useState(false);
  
  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode(current => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data) => {
      console.log(`
          시도: ${data.sido},
          시군구: ${data.sigungu},
          읍면동: ${data.bname},
      `)
      setOpenPostcode(false);
    },
  }
  
  return(
    <>
    <button type="button" onClick={handle.clickButton}>주소검색</button>
    {openPostcode && 
    <DaumPostcode 
      autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
      defaultQuery='판교역로 235' // 팝업을 열때 기본적으로 입력되는 검색어 
      onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
    />
    }
    </>
  )
};

export default Postcode;