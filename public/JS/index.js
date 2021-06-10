
var success = document.querySelector('.success')
var dropdownState = document.querySelector('.dropdown-state')
var dropdownDistrict = document.querySelector('.dropdown-district')
var dropdownCentre = document.querySelector('.dropdown-centre')
var centreName = document.querySelector('.centreName')
var displayName = document.querySelector('.center-name')
var message = document.querySelector('.message')
var content = document.querySelector('.content')
var closeBtn = document.getElementById('closeBtn')
var smsAlert = document.querySelector('.smsAlert')

//alert button event listener
var alertBtn = document.getElementById('alertBtn')
closeBtn.addEventListener('click', () => {
    message.style.display = "none"
})

//welcome message for 30 seconds
function showMessage() {
    message.style.display = "none"
}
setTimeout(showMessage, 30000)

// slot available in the selected centres function
Slot()

// states list fetched and showDistrict function is fired
function Slot() {
    fetch('https://cdn-api.co-vin.in/api/v2/admin/location/states').then(response => response.json()).then((data) => {
        // console.log(data)               //States list with state id
        let States = data.states;

        states.innerHTML + ``;
        States.forEach((key) => {
            // console.log(key['state_id'])
            // console.log(key['state_name'])
            let html = '';
            html += `<li class="List" onclick="showDistrict(${key['state_id']}, '${key['state_name']}')">${key['state_name']}</li>`
            let states = document.getElementById('states')
            states.innerHTML += html
        })

    })
}

function showStateName() {
}
// district list is fetched respective to selected state and showCentre function is fired
function showDistrict(state, name) {
    let stateBtn = document.querySelector('.stateBtn');
    stateBtn.innerHTML = name;
    // fetch districts list of selected state using fetch API from API setu 
    let url = `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${state}`
    fetch(url).then(response => response.json()).then((data) => {
        // console.log(data)                                  //District list respective to selected state
        let Districts = data.districts;
        districts.innerHTML += ``;
        var html = '';
        Districts.forEach((key) => {
            // console.log(key['district_id'])             //check selected district id 
            // console.log(key['district_name'])           //check selected district name
            html += `<li class="List" onclick="showCentres(${key['district_id']}, '${key['district_name']}')">${key['district_name']}</li>`
            let districts = document.getElementById('districts')
            districts.innerHTML = html
        })

    })
    // console.log('clicked')                                  //check showDistrict() is fired successfully
    dropdownState.style.display = "none"
}
// get date in dd-mm-yyyy format
const today = new Date()
const date = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`

// function for centres of selected district
function showCentres(districtId, districtName) {
    let districtBtn = document.querySelector('.districtBtn');
    districtBtn.innerHTML = districtName;

    // fetch centres list of selected district using fetch API from API setu
  
    fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${districtId}&date=${date}`).then(response => response.json()).then((data) => {
        centres.innerHTML = ``;
        let centerData = data.centers;           //clear the table after state and district change
        // console.log(centerData)
        let Centres = centerData;
        let html = ``;
        Centres.forEach((key) => {
            // console.log(key['name'])
            html += `<li class="List" onclick=showSlots(${key['center_id']})>${key['name']}</li>`
            let centres = document.getElementById('centres')
            centres.innerHTML = html
        })

    })
    dropdownDistrict.style.display = "none"
}


function showSlots(centreId) {
    console.log(centreId)
    fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByCenter?center_id=${centreId}&date=${date}`).then(response => response.json()).then((data) => {
        let tableBody = document.querySelector('.tBody')
        tableBody.innerHTML = ``;
       
        let html = ``;
        html = `<thead class="tHead">
        <tr>
          <th>Date</th>
          <th>Dose1</th>
          <th>Dose2</th>
        </tr>
      </thead>
      <tbody class='tBody'>

      </tbody>`

        let slotSession = data.centers
        displayName.innerHTML = `<span>${slotSession['name']}</span><button id="alertBtn" onclick="slotAlert(${centreId})"> Alert</button>`   //center name display
        // centreName.innerHTML = slotSession['name']
        displayName.style.display = "block"
        console.log(slotSession['name'])
        let Slots = slotSession.sessions
        // console.log(Slots)
        Slots.forEach((key) => {
            console.log(key['available_capacity']);
            html += `<tr class="tLine" >
            <td>${key['date']}</td>
            <td>
            ${key['available_capacity_dose1']}
            </td>
            <td>${key['available_capacity_dose2']}</td>
            </tr>`

            tableBody.innerHTML = html;
        }

        )

    })

    dropdownCentre.style.display = "none"

}



//to toggle state dropdown button
function toggleState() {
    dropdownState.style.display = "block"
    console.log('toggle')

}

// to toggle district dropdown button
function toggleDistrict() {
    dropdownDistrict.style.display = "block"
    console.log('toggle')

}
function toggleCentre() {
    dropdownCentre.style.display = "block"
    console.log('toggle')

}

// alertBtn.addEventListener('click', slotAlert())
function slotAlert(centreId) {
    content.style.filter = "blur(1px)";
    
    smsAlert.style.display = 'block'
    const button = document.getElementById('setBtn')
    button.addEventListener('click', checkSlot, false);
    console.log(centreId)
    let count=0;
    function checkSlot(){
        success.style.visibility = 'visible'
        const numberInput = document.getElementById('number')
    const number = numberInput.value.replace(/\D/g, '');
    const text = "Slot available"
        setInterval(() => {
            fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByCenter?center_id=${centreId}&date=${date}`).then(response => response.json()).then((data) => {
                let tableBody = document.querySelector('.tBody')
                tableBody.innerHTML = ``;
                let html = ``;
                html = `<thead class="tHead">
                <tr>
              <th>Date</th>
              <th>Dose1</th>
              <th>Dose2</th>
              </tr>
              </thead>
              <tbody class='tBody'>
              
          </tbody>`
                // console.log(name);
                let slotSession = data.centers
                let Slots = slotSession.sessions
                // console.log(Slots)
                Slots.forEach((key) => {
                    console.log(key['available_capacity']);
                    html += `<tr class="tLine" >
                    <td>${key['date']}</td>
                    <td>
                    ${key['available_capacity_dose1']}
                    </td>
                    <td>${key['available_capacity_dose2']}</td>
                    </tr>`
                    if (`${key['available_capacity_dose1']}` > 0 && count===0) {
                        var audio = new Audio(`http://commondatastorage.googleapis.com/codeskulptor-assets/jump.ogg`);
                        audio.play();
                        // function call to send sms if dose is available in the respective center
                        fetch('./', {
                            method: 'post',
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify({ number: number, text: text })
                            
                        }).then((res) => {
                            console.log(res)
                        }).catch((err) => {
                            console.log(err)
                        })
                        count++;
                        alert(`Book a Slot`)
                    }
                    tableBody.innerHTML = html;
                }
    
                )
    
            })
            console.log(centreId)
        }, 30000)
    
    }
   
    dropdownCentre.style.display = "none"

}


//store number and text information regarding sms
// var number;
// var text;

// function getData(){
    
// }


function closeAlert() {
    console.log('shit ')
    smsAlert.style.display = 'none'
    content.style.filter = "none";
    success.style.visibility = 'hidden'
}