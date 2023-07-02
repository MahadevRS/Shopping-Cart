const form=document.getElementsByTagName('form')[0];

var userArray=[];

form.addEventListener('submit',(event)=>{

    //avoid defalut beheviour
    event.preventDefault();
    console.log("Submit button clicked");

    const fName=document.getElementById('first-name').value;
    const lName=document.getElementById('last-name').value;
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const confirmPassword=document.getElementById('confirm-password').value;

    console.log(fName,lName,email,password,confirmPassword);

    const message=document.getElementById('message');

    //if any of the input field is empty send error
    if(!fName || !lName || !email || !password || !confirmPassword){
        console.log("checking if any empty input exists");
        message.style.display='inline'; //element will be displayed as an inline element, without line break
        message.innerText='Error : All Fields are Mandatory!!';
        // message.classList.add('red');
        message.setAttribute('class','red');
        return;
    }

    //check if password matches confirm password
    if(password!==confirmPassword){
        console.log("checking if password matches confirm password");
        message.style.display='inline';
        message.innerText='Error: Password and Confirm Password Should be Same!!';
        message.classList.add('red');
        // message.setAttribute('class','red');
        return;
    }

    //create an user object
    var user={
        firstName:fName,
        lastName:lName,
        email:email,
        password:password
    }
    console.log(user);

    //check if user already exists by comparing email
    if(localStorage.getItem('userArray')){
        console.log("Checking if user already exists");
        userArray=JSON.parse(localStorage.getItem('userArray'));

    }


    //all clear add current user to the userArray
    userArray.push(user);
    console.log(user);
    console.log(userArray);

    //store/update the userArray in local storage
    localStorage.setItem('userArray',JSON.stringify(userArray));

    //send success message
    message.style.display='inline';
    message.innerText='User Added Successfully';
    message.classList.add('green');

    //clear the form 
    form.reset();

    //redirect to login page after some time
    setTimeout(()=>{
        location.href='../Login/index.html';
    },2000);

    

});