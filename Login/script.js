const form=document.getElementsByTagName('form')[0];

var userArray=[];

const message=document.getElementById('message');

// if(localStorage.getItem('currentUser')){
//     message.style.display='inline';
//     message.setAttribute('class','green');
//     message.innerText='Login Sucessfully';
// }

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    console.log("submit event occured");

    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;

    if(!email || !password){
        console.log("Checking if any input is empty");
        message.style.display='inline';
        message.setAttribute('class','red');
        message.innerText='Error : All Fields are Mandatory!!';
        return;
    }

    let flag=false;
    let currentUser;

    if(localStorage.getItem('userArray')){
        userArray=JSON.parse(localStorage.getItem('userArray'));
        
        userArray.forEach(user => {
            if(user.email==email){
                flag=true;
                user.token=generateToken();
                currentUser=user;
                localStorage.setItem('currentUser',JSON.stringify(user));
            }
        });

    }


    if(!flag){
        message.style.display='inline';
        message.setAttribute('class','red');
        message.innerText='User does not Exist.';
        return;
    }

    if(flag && password!=currentUser.password){
        //user exits but wrong password
        message.style.display='inline';
        message.setAttribute('class','red');
        message.innerText='Please Enter Correct Password';
        return;
    }

 
    message.style.display='inline';
    message.setAttribute('class','green');
    message.innerText='Login Sucessfully';

    //remove message after 2 sec
    // setTimeout(() => {
    //     message.remove();
    // }, 2000);

    form.reset();

})

function generateToken(){
    let token='';
    for(let i=0;i<16;i++){
        token+=String.fromCharCode(Math.floor(Math.random()*256));
    }
    return btoa(token);
}