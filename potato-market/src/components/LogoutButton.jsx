import styled from 'styled-components';

import firebase from '@/firebase';

const auth = firebase.auth();

const Button = styled.button`
  background-color: transparent;
  font-size: 1.125rem;
	font-weight: 700;
  border: 0;
  color: #212325;
  padding: 0;
  cursor: pointer;
`

function LogoutButton() {
 
  const handleLogout = () => {
		try {
			auth.signOut();
			console.log('clicked');
		} catch (error) {
			console.error(error);
		}
	}
  
  return (
   <Button onClick={handleLogout}>로그아웃</Button>
  )
};



export default LogoutButton;