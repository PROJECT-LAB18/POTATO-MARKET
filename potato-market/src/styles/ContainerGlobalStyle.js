import { createGlobalStyle } from 'styled-components';

export const ContainerGlobalStyle = createGlobalStyle`
  .wrapper{
    width: 980px;
    margin: 70px auto 120px auto;
    @media (max-width: 767px){
      width: 480px
    }
    @media (min-width:768px) and (max-width: 1023px){
      width: 760px
    }
  }
  h2.articleTitle{
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 45px;
  }


`