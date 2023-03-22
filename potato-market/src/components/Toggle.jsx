import styled from "styled-components";

function Toggle(){
  return (
		<Div>
			<ul>
				<li>로그인</li>
				<li>회원가입</li>
			</ul>
		</Div>
	)
};

const Div = styled.div`
  background-image: url("../assets/header_toggle.svg");
`;

export default Toggle;
