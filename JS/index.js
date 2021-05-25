
console.log('index.js')
var dropdownState=document.querySelector('.dropdown-state')
var dropdownDistrict=document.querySelector('.dropdown-district')
var tableHead=document.querySelector('.tHead')
var tableBody=document.querySelector('.tBody')

// let content=document.querySelector(".container");
// let content2=document.querySelector(".container2");
// let html='';
// let html2='';

Slot()


// states list fetched and showDistrict function is fired
function Slot(){
    fetch('https://cdn-api.co-vin.in/api/v2/admin/location/states').then(response=> response.json()).then((data)=>{ 
        // console.log(data)               //States list with state id
        let States=data.states;
 
        states.innerHTML+``;
States.forEach((key)=>{
    // console.log(key['state_id'])
    // console.log(key['state_name'])
    let html='';
    html+=`<li class="List" onclick="showDistrict(${key['state_id']})">${key['state_name']}</li>`
    let states=document.getElementById('states')
    states.innerHTML+=html
})

})
}


// district list is fetched respective to selected state and showCentre function is fired
function showDistrict(state){

let url= `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${state}`
fetch(url).then(response=> response.json()).then((data)=>{ 
        console.log(data)       //District list respective to selected state
        let Districts=data.districts;
        districts.innerHTML+=``;
        var html='';
        Districts.forEach((key)=>{
            // console.log(key['district_id'])
            // console.log(key['district_name'])
            
            html+=`<li class="List" onclick=showCentres(${key['district_id']})>${key['district_name']}</li>`
            let districts=document.getElementById('districts')
            districts.innerHTML=html
        })

    })
    console.log('clicked')
    dropdownState.style.display="none"
}




const today = new Date()
// const tomorrow = new Date(today)

    // console.log(datei)
    // tomorrow.setDate(tomorrow.getDate() + 1)
    let date= `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`
    console.log(date)
// console.log(date)


// https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=670&date=25-5-2021
// fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=670&date=${date}`).then(response=> response.json()).then((data)=>{ 
//     // console.log(data)
// })
// console.log(date.getDate(),date.getMonth()+1, date.getFullYear())

function showCentres(districtId){
    dose(districtId);
    fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtId}&date=${date}`).then(response=> response.json()).then((data)=>{ 
        let tHeadHTML=`<th>Centre</th>`
        tableBody.innerHTML=``;             //clear the table after state and district change
        let Centres= data.sessions;
        Centres.forEach((key)=>{
            var tBodyHTML=``
            tBodyHTML+=`<tr>
            <td >${key['name']}</td>`
        //     console.log(key['name']);
        // tomorrow.setDate(tomorrow.getDate());
        for(let i=0; i<6; i++){
            
            // let date= `${tomorrow.getDate()}-${tomorrow.getMonth()+1}-${tomorrow.getFullYear()}`
            
            // fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtId}&date=${date}`).then(response=> response.json()).then((data)=>{
                //     console.log(data.sessions)
                // })
            tBodyHTML+=`<td >dose</td>`
            // console.log(date)
        }
        tBodyHTML+=`</tr>`
        tableBody.innerHTML+=tBodyHTML;
        tBodyHTML=''
    }
    )
    
    
    
    // table heading : Centre and Dates 
    
    const tomorrow = new Date(today)
    for(let i=0; i<6; i++){
        // console.log(datei)

            tomorrow.setDate(tomorrow.getDate())
            tHeadHTML+=`<th>${tomorrow.getDate()} ${getMonthName(tomorrow.getMonth())}</th>`
            // let date= `${tomorrow.getDate()}-${tomorrow.getMonth()+1}-${tomorrow.getFullYear()}`
            // console.log(date)
            tomorrow.setDate(tomorrow.getDate()+1)
        }
        tableHead.innerHTML=tHeadHTML;
        // console.log(data)
    // console.log(districtId);
})
dropdownDistrict.style.display="none"
}





//to toggle state dropdown button
function toggleState(){
    dropdownState.style.display="block"
    console.log('toggle')
    
}

// to toggle district dropdown button
function toggleDistrict(){
    dropdownDistrict.style.display="block"
    console.log('toggle')
    
}

function getMonthName(index){
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sept", "Oct", "Nov", "Dec"
];
return monthNames[index];
}



//get data here
// state id and district id and date

// let DataObj={
//     day1:
//     day2:
//     day3:
//     day4:
//     day5
// }
function dose(districtId){
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate());
        for(let i=0; i<7; i++){
            let date= `${tomorrow.getDate()}-${tomorrow.getMonth()+1}-${tomorrow.getFullYear()}`
            fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtId}&date=${date}`).then(response=> response.json()).then((data)=>{
                console.log(data.sessions)
            })
            // console.log(date)
            tomorrow.setDate(tomorrow.getDate()+1);
         }
}