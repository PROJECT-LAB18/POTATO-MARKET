import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
// import {
//   RecoilRoot,
//   atom,
//   selector,
//   useRecoilState,
//   useRecoilValue,
// } from 'recoil';

// const textState = atom({
//   key: 'textState', // unique ID (with respect to other atoms/selectors)
//   default: '', // default value (aka initial value)
// });

// const charCountState = selector({
//   key: 'charCountState', // unique ID (with respect to other atoms/selectors)
//   get: ({get}) => {
//     const text = get(textState);

//     return text.length;
//   },
// });

// function CharacterCount() {
//   const count = useRecoilValue(charCountState);

//   return <>Character Count: {count}</>;
// }

// function CharacterCounter() {
//   return (
//     <div>
//       <TextInput />
//       <CharacterCount />
//     </div>
//   );
// }


// function TextInput() {
//   const [text, setText] = useRecoilState(textState);

//   const onChange = (event) => {
//     setText(event.target.value);
//   };

//   return (
//     <div>
//       <input type="text" value={text} onChange={onChange} />
//       <br />
//       Echo: {text}
//     </div>
//   );
// }




// function App() {
//   return (
//     <RecoilRoot>
//       <CharacterCounter />
//     </RecoilRoot>
//   );
// }




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
