import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import './App.css';
import { numbers, upperLetters, lowerLetters, symbols } from './characters'
import 'react-toastify/dist/ReactToastify.css'
import { COPY_SUCCESS, NONE_SELECTED, NO_PW } from './msg'

function App() {
  const [password, setPassword] = useState('')
  const [passwordLen, setPasswordLen] = useState(20)
  const [incUpper, setIncUpper] = useState(false)
  const [incLower, setIncLower] = useState(false)
  const [incNum, setIncNum] = useState(false)
  const [incSym, setIncSym] = useState(false)

  const handleGenPass = (e) => {
    if (!incUpper && !incLower && !incSym && !incNum) {
      notifyUser(NONE_SELECTED, true)
    }

    let charList = '';

    if (incLower) {
      charList += lowerLetters;
    }

    if (incUpper) {
      charList += upperLetters;
    }

    if (incSym) {
      charList += symbols;
    }

    if (incNum) {
      charList += numbers;
    }

    setPassword(genPassword(charList));
  }

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const genPassword = (charList) => {
    let pw = ''
    let i = 0;
    while (i < passwordLen) {
      let randomInt = getRndInteger(33, 127);
      if (charList.includes(String.fromCharCode(randomInt))) {
        pw += String.fromCharCode(randomInt);
        i += 1;
      }
    }
    return pw;
  }

  const copyToClipboard = () => {
    const newTextArea = document.createElement('textarea');
    newTextArea.innerText = password;
    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand('copy');
    newTextArea.remove();
  }

  const notifyUser = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  const handleCopy = (e) => {
    if (password === '') {
      notifyUser(NO_PW, true);
    } else {
      copyToClipboard();
      notifyUser(COPY_SUCCESS);
    }

  }

  return (
    <div className="App">
      <div className="container">
        <div className="generator">
          <h2 className="generator_header">
            PassGen
          </h2>
          <div className="generator_password">
            <h3>{password}</h3>
            <button onClick={handleCopy} className="copy_button">
              <i className='far fa-clipboard'></i>
            </button>
          </div>

          <div className='form-group'>
            <label htmlFor='password-length'>Password Length</label>
            <input defaultValue={passwordLen} onChange={(e) => setPasswordLen(e.target.value)}
              type="number" id="password-length" name="password-length" max="20" min="8" />
          </div>

          <div className="form-group">
            <label htmlFor="uppercase-letters">Include Uppercase Letters</label>
            <input checked={incUpper} onChange={(e) => setIncUpper(e.target.checked)}
              type="checkbox" id="uppercase-letters" name="uppercase-letters" />
          </div>

          <div className="form-group">
            <label htmlFor="lowercase-letters">Include Lowercase Letters</label>
            <input checked={incLower} onChange={(e) => setIncLower(e.target.checked)}
              type="checkbox" id="lowercase-letters" name="lowercase-letters" />
          </div>

          <div className="form-group">
            <label htmlFor="symbols">Include Symbols</label>
            <input checked={incSym} onChange={(e) => setIncSym(e.target.checked)}
              type="checkbox" id="symbols" name="symbols" />
          </div>

          <div className="form-group">
            <label htmlFor="numbers">Include Numbers</label>
            <input checked={incNum} onChange={(e) => setIncNum(e.target.checked)}
              type="checkbox" id="numbers" name="numbers" />
          </div>
          <br></br>
          <button onClick={handleGenPass} className="generate_button">Generate</button>

          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>

    </div>
  );
}

export default App;
