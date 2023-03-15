import githubLogo from "../assets/github-logo-vector.svg" ; 

const Footer = () => {
  return (
    <>
    <ul>
      <li>중고거래</li>
      <li>매물 등록하기</li>
      <li></li>
      <li></li>
      <li></li>
    </ul>

    <figure>
      <figcaption>감자마켓 다운로드</figcaption>
      <img alt="" src={githubLogo}/>
    </figure>
  </>
  )
};

export default Footer;