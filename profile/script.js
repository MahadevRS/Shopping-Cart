const logout=document.getElementById('logout');
const form1=document.getElementsByTagName('form')[0];
const form2=document.getElementsByTagName('form')[1];

if(!localStorage.getItem('currentUser')){
    location.href='../Login/index.html';
}
else{
    let user=JSON.parse(localStorage.getItem('currentUser'));
    document.getElementById('first-name').value=user.firstName;
    document.getElementById('last-name').value=user.lastName;
}

logout.addEventListener('click',(event)=>{
    event.preventDefault();
    console.log("logout event occured");
    
    localStorage.removeItem('currentUser');
    location.href='../Login/index.html';
})

form1.addEventListener('submit',(event)=>{
    event.preventDefault();
    console.log("inside input form 1");

    const fName=document.getElementById('first-name').value;
    const lName=document.getElementById('last-name').value;

    if(!fName || !lName){
        document.getElementById('message1').style.display='inline';
        document.getElementById('message1').setAttribute('class','red')
        document.getElementById('message1').innerText='Error :All Fields are Mandatory.'
        return;
    }

    let user=JSON.parse(localStorage.getItem('currentUser'));

    user.firstName=fName;
    user.lastName=lName;
    let email=user.email;

    localStorage.setItem('currentUser',JSON.stringify(user));

    let userArray=JSON.parse(localStorage.getItem('userArray'));

    let ind;

    console.log('email : ',email);
    console.log('userArray : ',userArray);

    userArray.forEach((ele,i)=>{
        if(ele.email==email){
            user=ele;
            ind=i;
        }
    })

    user.firstName=fName;
    user.lastName=lName;

    userArray[ind]=user;

    localStorage.setItem('userArray',JSON.stringify(userArray));

    document.getElementById('message1').style.display='inline';
    document.getElementById('message1').setAttribute('class','green')
    document.getElementById('message1').innerText='Profile Edited Successfully';

    setTimeout(()=>{
        document.getElementById('message1').style.display='none';
        form1.reset();
    },1500)

})

form2.addEventListener('submit',(event)=>{
    event.preventDefault();
    console.log("inside form input 2");

    const oldPassword=document.getElementById('old-password').value;
    const newPassword=document.getElementById('new-password').value;
    const confirmPassword=document.getElementById('confirm-password').value;

    if(!oldPassword || !newPassword || !confirmPassword){
        document.getElementById('message2').style.display='inline';
        document.getElementById('message2').setAttribute('class','red')
        document.getElementById('message2').innerText='Error :All Fields are Mandatory.'
        return;
    }

    if(newPassword!=confirmPassword){
        document.getElementById('message2').style.display='inline';
        document.getElementById('message2').setAttribute('class','red')
        document.getElementById('message2').innerText='Error :New Password and Confirm New Password are not same.'
        return;
    }

    let user=JSON.parse(localStorage.getItem('currentUser'));
    console.log(user);

    if(oldPassword!=user.password){
        document.getElementById('message2').style.display='inline';
        document.getElementById('message2').setAttribute('class','red')
        document.getElementById('message2').innerText='Error : Wrong Old Password .'
        return;
    }

    user.password=newPassword;
    let email=user.email;

    localStorage.setItem('currentUser',JSON.stringify(user));
    console.log("email: ",email);

    let userArray=JSON.parse(localStorage.getItem('userArray'));

    let ind;

    userArray.forEach((ele,i)=>{
        if(ele.email===email){
            console.log(i);
            user=ele;
            ind=i;
        }
    })

    user.password=newPassword;

    userArray[ind]=user;
    localStorage.setItem('userArray',JSON.stringify(userArray));

    document.getElementById('message2').style.display='inline';
    document.getElementById('message2').setAttribute('class','green')
    document.getElementById('message2').innerText='Password Changed Successfully';

    setTimeout(()=>{
        document.getElementById('message2').style.display='none';
        input2.reset();
    },1500)

})