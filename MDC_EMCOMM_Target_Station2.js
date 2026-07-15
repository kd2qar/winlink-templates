
/* ***
    Add WiNLINK Items
*/
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('TargetStationSched');
    const schedContainer = document.getElementById('winlink-sched-container');
    const addBtn = document.getElementById('add-winlink-btn');
    let itemCount = 0;
    let subItemCount=0;
    let count=0;

    addBtn.addEventListener('click', addWinlinkItem);

    const monthField = document.getElementById('ExMonth');
    monthField.addEventListener('input',()=>{
         let i=0;
         
        for ( i=1;i<=itemCount;i++){
            let cf = document.getElementById(`winlink-month_${i}`);
            if (cf == null) continue;
            cf.innerHTML=monthField.value;
      }       
    })
    const callsignField =document.getElementById('Callsign');
    callsignField.addEventListener('input',()=>{
        let i=0;
        for ( i=1;i<=itemCount;i++){
            let cf = document.getElementById(`winlink-call-field_${i}`);
            if (cf == null) continue;
            cf.innerHTML=callsignField.value.toUpperCase();
      }  
    })

    function addItem() {
        /*
        Winlink HF Target Station Callsign: <Callsign>
        Mode of Operation: Vara HF P2P (500 or 2300 Hz BW)
        Dial frequency: 30M, 10.142.500 MHz, Operations: <var Day1> <var ExMonth>, 0800-1700 ET
        Dial frequency: 40M, 7.085.000 MHz, Operations: <var Day2> <var ExMonth>, 0800-1700 ET
        Dial frequency: 80M, 3.589.500 MHz, Operations: <var Day1> <var ExMonth> 0000-0600 ET, <var Day1> <var ExMonth> 2000 - <var Day2> <var ExMonth> 0600 ET
        */
        itemCount++;
        const fldigiItemDiv = document.createElement('div');
        fldigiItemDiv.classList.add('fldigi-item');
        let callsign=callsignField.value;
        let month = monthField.value;
        fldigiItemDiv.innerHTML = `
        <p>
            WINLINK ${itemCount}<br>
            Winlink HF Target Station Callsign: <span id="winlinkCallField_${itemCount}">${callsign}</span><BR>
            Mode of Operation: Vara HF P2P
            </p>
            <div style="hidden:true">
            <div class="winlink-frequency-container">
                <!-- Winlink frequencies will go here -->
            </div>
            <button hidden="false" type="button" class="addSubItemBtn">Add Frequency</button>
            <button type="button" class="removeFldigiItemBtn">Remove Item</button>
            </div>
        `;

        // Add event listeners for buttons within the new main item
        fldigiItemDiv.querySelector('.addSubItemBtn').addEventListener('click', () => {
            addSubItem(fldigiItemDiv.querySelector('.sub-items-container'), fldigiItemCount);
        });
        fldigiItemDiv.querySelector('.removeFldigiItemBtn').addEventListener('click', () => {
            fldigiItemDiv.remove();
        });

        fldigiSchedContainer.appendChild(fldigiItemDiv);
    }

    function addSubItem(container, mainIndex) {
        subItemCount++;
        const subItemDiv = document.createElement('div');
        subItemDiv.classList.add('sub-item');
        // Use an array-like naming convention (e.g., items[0][subitems][0]) for easier server-side processing
        const subItemIndex = container.children.length; 
        subItemDiv.innerHTML = `

        /*
            <input type="text" name="items[${mainIndex}][subitems][${subItemIndex}][name]" placeholder="Sub Item Name">
            <input type="number" name="items[${mainIndex}][subitems][${subItemIndex}][qty]" placeholder="Qty">
        */
                   Dial frequency: <input type="text" name="fldigiItemName_${itemCount}" placeholder="ex. ___M, X.xxx.xxx MHz"><br>
            Dates/Hours of operation:
                <select id="fldigiDay_${itemCount}"
                        name="fldigiDay_${fldigiItemCount}">
                        <option value="day1">Thursday</option>
                        <option value="day2">Friday</option>
                        <option value="day3">Saturday</option>
                        <option value="day4">Sunday</option>
                        </select>
                        <span id="fldigiMonth_${itemCount}" >${month}</span>
                        <input type="text" 
                            name="fldigiItemTime_${itemCount}" 
                            placeholder="ex. XXXX-XXXX ET">
            <button type="button" class="removeSubItemBtn">Remove Sub Item</button>

        `;

        subItemDiv.querySelector('.removeSubItemBtn').addEventListener('click', () => {
            subItemDiv.remove();
        });

        container.appendChild(subItemDiv);
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        // At this point, all dynamically added inputs are part of the form
        // You can use FormData or fetch to send the data to the server
        const formData = new FormData(form);
        
        // Example: Log form data to the console for demonstration
        console.log("Form Data Submitted:");
        for (const [name, value] of formData.entries()) {
            console.log(`${name}: ${value}`);
        }
        // You would typically use the fetch() API to send this data to a backend server
    });
});

/* ***
    Add FLDIGI Items
*/
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('TargetStationSched');
    const fldigiSchedContainer = document.getElementById('fldigi-sched-container');
    const addFldigiBtn = document.getElementById('addFldigiBtn');
    let fldigiItemCount = 0;
    let fldigCount=0;

    addFldigiBtn.addEventListener('click', addFldigiItem);

    const monthField = document.getElementById('ExMonth');
    monthField.addEventListener('input',()=>{
         let i=0;
         
        for ( i=1;i<=fldigiItemCount;i++){
            let cf = document.getElementById(`fldigiMonth_${i}`);
            if (cf == null) continue;
            cf.innerHTML=monthField.value;
      }       
    })
    const callsignField =document.getElementById('Callsign');
    callsignField.addEventListener('input',()=>{
        let i=0;
        for ( i=1;i<=fldigiItemCount;i++){
            let cf = document.getElementById(`fldigiCallField_${i}`);
            if (cf == null) continue;
            cf.innerHTML=callsignField.value.toUpperCase();
      }  
    })



    function addFldigiItem() {
        /*
        FLDIGI
        Fldigi HF Target Station Callsign: <Callsign>
        Mode of Operation: MFSK32
        Dial frequency: 80M, 3.582.000 MHz
        Dates/Hours of operation: <var Day2> <var ExMonth> 1900-2100 ET
        */
        fldigiItemCount++;
        const fldigiItemDiv = document.createElement('div');
        fldigiItemDiv.classList.add('fldigi-item');
        let callsign=callsignField.value;
        let month = monthField.value;
        fldigiItemDiv.innerHTML = `
        <p>
            FLDIGI ${fldigiItemCount}<br>
            Fldigi HF Target Station Callsign: <span id="fldigiCallField_${fldigiItemCount}">${callsign}</span><BR>
            Mode of Operation: MFSK32<br>
            Dial frequency: <input type="text" name="fldigiItemName_${fldigiItemCount}" placeholder="ex. ___M, X.xxx.xxx MHz"><br>
            Dates/Hours of operation:
                <select id="fldigiDay_${fldigiItemCount}"
                        name="fldigiDay_${fldigiItemCount}">
                        <option value="day1">Thursday</option>
                        <option value="day2">Friday</option>
                        <option value="day3">Saturday</option>
                        <option value="day4">Sunday</option>
                        </select>
                        <span id="fldigiMonth_${fldigiItemCount}" >${month}</span>
                        <input type="text" 
                            name="fldigiItemTime_${fldigiItemCount}" 
                            placeholder="ex. XXXX-XXXX ET">
            </p>
            <div style="hidden:true">
            <div class="sub-items-container">
                <!-- Sub-items will go here -->
            </div>
            <button hidden="true" type="button" class="addSubItemBtn">Add Sub Item</button>
            <button type="button" class="removeFldigiItemBtn">Remove Item</button>
            </div>
        `;

        // Add event listeners for buttons within the new main item
        fldigiItemDiv.querySelector('.addSubItemBtn').addEventListener('click', () => {
            addSubItem(fldigiItemDiv.querySelector('.sub-items-container'), fldigiItemCount);
        });
        fldigiItemDiv.querySelector('.removeFldigiItemBtn').addEventListener('click', () => {
            fldigiItemDiv.remove();
        });

        fldigiSchedContainer.appendChild(fldigiItemDiv);
    }

    function addSubItem(container, mainIndex) {
        const subItemDiv = document.createElement('div');
        subItemDiv.classList.add('sub-item');
        // Use an array-like naming convention (e.g., items[0][subitems][0]) for easier server-side processing
        const subItemIndex = container.children.length; 
        subItemDiv.innerHTML = `
            <input type="text" name="items[${mainIndex}][subitems][${subItemIndex}][name]" placeholder="Sub Item Name">
            <input type="number" name="items[${mainIndex}][subitems][${subItemIndex}][qty]" placeholder="Qty">
            <button type="button" class="removeSubItemBtn">Remove Sub Item</button>
        `;

        subItemDiv.querySelector('.removeSubItemBtn').addEventListener('click', () => {
            subItemDiv.remove();
        });

        container.appendChild(subItemDiv);
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        // At this point, all dynamically added inputs are part of the form
        // You can use FormData or fetch to send the data to the server
        const formData = new FormData(form);
        
        // Example: Log form data to the console for demonstration
        console.log("Form Data Submitted:");
        for (const [name, value] of formData.entries()) {
            console.log(`${name}: ${value}`);
        }
        // You would typically use the fetch() API to send this data to a backend server
    });
});
