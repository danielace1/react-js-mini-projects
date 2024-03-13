import { useState } from "react";
import BackgroundGradient from "../components/BackgroundGradient";
import Switch from "../components/Switch";
import FormInput from "../components/form/FormInput";

const Homepage = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState("");
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumber, setIncludeNumber] = useState(true);
  const [includeSpecialCharacters, setIncludeSpecialCharacters] =
    useState(true);

  const handlePasswordLengthChange = (e) => {
    const value = e.target.value;

    if (value > 30) {
      alert(
        "Hey, slow down! This isn't a novel. Your password should be shorter than 30 characters. Let's keep it snappy!"
      );
    } else {
      setPasswordLength(value);
    }
  };

  const generatePassword = (e) => {
    e.preventDefault();
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialCharacters = "!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?";

    let password = lowercase;

    if (includeUppercase) {
      password += uppercase;
    }
    if (includeNumber) {
      password += numbers;
    }
    if (includeSpecialCharacters) {
      password += specialCharacters;
    }

    let generatePassword = "";

    for (let i = 0; i < passwordLength; i++) {
      const char = Math.floor(Math.random() * password.length);
      generatePassword += password.charAt(char);
    }

    setPassword(generatePassword);
  };

  return (
    <BackgroundGradient
      containerClassName={"max-w-lg mx-auto px-10 py-10 my-3 sm:my-8"}
    >
      <div>
        <form action="" className="space-y-5" onSubmit={generatePassword}>
          <FormInput
            label={"Password Length"}
            name={"passwordlength"}
            type="number"
            placeholder={"8"}
            value={passwordLength}
            handleChange={handlePasswordLengthChange}
          />

          <Switch
            checked={includeUppercase}
            label="Include Uppercase :"
            onChange={() => setIncludeUppercase(!includeUppercase)}
          />
          <Switch
            checked={includeNumber}
            label="Include Numbers :"
            onChange={() => setIncludeNumber(!includeNumber)}
          />
          <Switch
            checked={includeSpecialCharacters}
            label="Include Special Characters :"
            onChange={() =>
              setIncludeSpecialCharacters(!includeSpecialCharacters)
            }
          />

          <div className="!mt-10 py-10 px-5 bg-white text-center text-xl rounded">
            {password ? `${password}` : "See your password here"}
          </div>

          <div className="flex justify-center">
            <button className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 mt-10 text-base font-semibold hover:border-[#fff] cursor-pointer transition">
              Generate Password
            </button>
          </div>
        </form>
      </div>
    </BackgroundGradient>
  );
};

export default Homepage;
