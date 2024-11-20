import { useCallback, useEffect, useState } from 'react';
function App() {
  const [length, SetLength] = useState(8);
  const [isNumberEnable, SetisNumberEnable] = useState(false);
  const [isSpacialCharEnable, SetisSpacialCharEnable] = useState(false);
  const [password , SetPassword] = useState("")

  useEffect(()=>{
    generatePassword()
  },[length,isNumberEnable,isSpacialCharEnable,SetPassword])

const generatePassword = useCallback(()=>{
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "0123456789";
    let splChar = "@#$%^&_!?/}{][~`";
    let pass = ""
    if(isNumberEnable) str+= num
    if(isSpacialCharEnable) str+= splChar

    for(let i = 1; i<= length; i++){
      let char = Math.floor(Math.random() * str.length);      
      pass+= str.charAt(char);
    }

    SetPassword(pass)
},[length,isNumberEnable,isSpacialCharEnable,SetPassword])


const copypasswordToClipboard = () =>{
  if(password){
    navigator.clipboard.writeText(password).then(()=>alert("Password copied to clipboard!")).catch((error)=>alert("Failed to copy the password. Please try again."))
  } else {
    alert("No password to copy!");
  }
}

  return (
    <div className="container">
  <h1>New Password Generator</h1>
  <input type="text" placeholder="password" readOnly value={password} />
  <button id="copyButton" onClick={copypasswordToClipboard}>Copy Password</button>
  <label>Set Password length ({length})</label>
  <input type="range" min={6} max={99} value={length} onChange={(event) => SetLength(event.target.value)} />
  <label>
    <input type="checkbox" defaultChecked={isNumberEnable} onChange={() => SetisNumberEnable((checked) => !checked)} />
    Enable Numbers
  </label>
  <label>
    <input type="checkbox" defaultChecked={isSpacialCharEnable} onChange={() => SetisSpacialCharEnable((checked) => !checked)} />
    Enable Special Characters
  </label>
</div>

  );
}

export default App;
