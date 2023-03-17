import firebase from '@/firebase';

const auth = firebase.auth();

const handleLogout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error(error);
  }
}

function LogoutButton() {
  return (
    <button type="button" onClick={handleLogout}>로그아웃</button>
  )
};

export default LogoutButton;