function startApp() {

  const form = document.getElementById("form");
  const getName = document.getElementById("getName");
  const getPassword = document.getElementById("getPassword");
  const getEmail = document.getElementById("getEmail");
	
  form.addEventListener("submit", (e) => {
    e.preventDefault();
		if (validateName(getName)) {
			if(validateEmail(getEmail)) {
				if (validatePass(getPassword)) {
					// sign up new user
					signup(getName.value.trim(), getPassword.value.trim(),getEmail.value.trim());
					login(getName.value.trim(), getPassword.value.trim(),getEmail.value.trim());	
				}
			}
		}
  });
};

  
//validate name field
function validateName (getName) {
	const nameValue = getName.value.trim();
	if (nameValue === ''){
		setErrorFor(getName, 'Field cannot be blank.');
		return false
	}else{
		setSuccessFor(getName, '');
		return true
	};
};

//validate password field
function validatePass (getPassword)  {
	const passwordValue = getPassword.value.trim();
	const containNumber = /[0-9]/g;
	const containUpperCase = /[A-Z]/g;
	
	if (passwordValue === ''){
		setErrorFor(getPassword, 'Field cannot be blank.');
		return false
	}else if (passwordValue.length < 6 ){
		setErrorFor(getPassword, 'Password cannot be less than 6.');
		return false
	}else{
		setSuccessFor(getPassword, '');
	};

	if (!passwordValue.match(containNumber)){
		setErrorFor(getPassword, 'Password must contain atleast one number.');
		return false
	} else if (!passwordValue.match(containUpperCase)){
		setErrorFor(getPassword, 'Password must contain atleast one uppercase letter.');
		return false
	}else{
		setSuccessFor(getPassword, '');
		return true
	};
	
};

//validate Email
function validateEmail(getEmail) {
	const emailValue = getEmail.value.trim();
	const containSign = /@/g;
	const containCom =/.com/g;

	if (emailValue === ''){
		setErrorFor(getEmail, "Field cannot be blank.");
		return false
	}else if ((!emailValue.match(containSign)) || (!emailValue.match(containCom)) ){
		setErrorFor(getEmail, "Email must contain an '@' and '.com'.");
		return false
	}else{
		setSuccessFor(getEmail, '');
		return true
	}
}


//function for error message
function setErrorFor (input, message) {
  const formControl = input.parentElement;
  const errorMsg = formControl.querySelector(".error__msg");
  errorMsg.innerText =  message
  formControl.className = 'input__wrap error';
};

//function for success message
function setSuccessFor (input, message) {
	const formControl = input.parentElement;
	const successMsg = formControl.querySelector(".error__msg");
	successMsg.innerText = message;
	formControl.className = "input__wrap success";
};



let userDetails = []
//signup
function signup(nameValue, passwordValue, emailValue) {
  const lsUserDetails = window.localStorage.getItem("users");
	console.log("lsUserDetails", lsUserDetails);
	if (lsUserDetails) {
	  userDetails = JSON.parse(lsUserDetails);
  }
	
  let findUser = userDetails.filter(user => {
		if (user.name === nameValue && user.email === emailValue && user.password === passwordValue){
      return user
    };
	});
 
  console.log("findUser", findUser)
	
	// if (!findUser) {
  if (findUser.length < 1) {
    const user = {
			"name": nameValue,
			"email": emailValue,
			"password": passwordValue
		}
		userDetails.push(user);
		alert("Sign up complete. Proceed to login.")
		window.localStorage.setItem("users", JSON.stringify(userDetails));
	} else {
		alert("User already exists. Please proceed to login.")
	}
};

	//login
function login (nameValue, passwordValue, emailValue) {
	const lsUserDetails = window.localStorage.getItem("users");
	if (lsUserDetails) {
	  userDetails = JSON.parse(lsUserDetails);
  } 
	
	let findUser = userDetails.filter(user => {
		if (user.name === nameValue && user.email === emailValue && user.password === passwordValue){
			return user
		}
	});
	
	if(findUser === userDetails){
		window.location.href = "index.html"
		return true
		// document.getElementById("displayUsername").innerText = `Welcome ${nameValue}`
	}else{
		alert("User does not exists. Please Sign up.")
		return false
	}
	
};

// Time and Date function
const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");

/** 
 * @param {Date} date 
 */
function formatTime(date){
    const hours12 =date.getHours() % 12 || 12;
    const minutes = date.getMinutes();
    const isAM = date.getHours() < 12;
    return `${hours12.toString().padStart(2, "0")} : ${minutes.toString().padStart(2, "0")} ${isAM ? "AM" : "PM"}`;
}

/** 
 * @param {Date} date 
 */
function formatDate(date){
    const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
}

setInterval(() => {
    const now = new Date();

    timeElement.textContent = formatTime(now);
    dateElement.textContent = formatDate(now);

}, 200);

// ======= DO NOT EDIT ============== //
export default startApp;
// ======= EEND DO NOT EDIT ========= //
