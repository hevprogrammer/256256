const content = document.querySelector("#content");
const submit = document.querySelector("#submit");
const update = document.querySelector("#updateBtn");


const employeeData = []
  const recordsPerPage = 10;
  let currentPage = 1;
  function populateTable() {
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const slicedData = employeeData.slice(startIndex, endIndex);
    const tableBody = document.getElementById("employeeData");
    tableBody.innerHTML = ""; // Clear previous content
    //https://apicrudpm-nc9c.onrender.com/api/members
    fetch("http://localhost:5000/api/members", { mode: "cors" })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        //display DOM
        data.forEach((element) => {
            const tableRow = document.createElement("tr");
            tableRow.innerHTML = `
           
              <td>${element.id}</td>
              <td>${element.first_name}</td>
              <td>${element.last_name}</td>
              <td>${element.email}</td>
              <td>${element.gender}</td>
              <td>${element.ip_address}</td>
             
                    <td>
        <button class="btn btn-outline-primary" <a href="javascript:void(0)" onClick="editMember(${element.id})"> Edit </a> </button>
        <button  class="btn btn-outline-danger" <a href="javascript:void(0)" onClick="deleteMember(${element.id})"> 

        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
         </svg>
        
        <i class="fa fa-trash-o"></i>
        </a>Delete</button>
      </td>
      </td>
      

      
      `;
            tableBody.appendChild(tableRow);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  populateTable();
  submit.addEventListener("click", () => {
    let fname = document.querySelector("#fname").value;
    let lname = document.querySelector("#lname").value;
    let email = document.querySelector("#email").value;
    let gender = document.querySelector("#gender").value;
    let ip_address = document.querySelector("#ip_address").value;
    let formData = { fname, lname, email, gender,ip_address };
    fetch("http://localhost:5000/api/members", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => console.log(error));
    //====== add this ======
    alert("Successfully inserted!");
    location.reload();
    //======================
  });
  function deleteMember(id) {
    let text = "Press a button!\nEither OK or Cancel.";
    if (confirm(text) == true) {
      let formData = { id };
      fetch("http://localhost:5000/api/members", {
        method: "DELETE",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.text())
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
  
      fetch("http://localhost:5000/api/members", {
        method: "DELETE",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.text())
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
      //====== add this ======
      alert("Successfully inserted!");
      location.reload();
      //======================
    } else {
      text = "You canceled!";
    }
  }
  
//UPDATE - PUT
function editMember(id) {
    fetch(`http://localhost:5000/api/members/${id}`)
      .then((response) => response.json())
      .then((data) => {
        document.querySelector("#fname").value = data[0].first_name;
        document.querySelector("#lname").value = data[0].last_name;
        document.querySelector("#email").value = data[0].email;
        document.querySelector("#gender").value = data[0].gender;
  
        document.querySelector("#ID").value = data[0].id;
        document.querySelector("#ip_address").value = data[0].ip_address;
      })
      .catch((error) => console.log(error));
  }
  update.addEventListener("click", () => {
    let fname = document.querySelector("#fname").value;
    let lname = document.querySelector("#lname").value;
    let email = document.querySelector("#email").value;
    let gender = document.querySelector("#gender").value;
    let id = document.querySelector("#ID").value;
    let ip_address = document.querySelector("#ip_address").value;

    let formData = { fname, lname, email, gender, id, ip_address };
    fetch("http://localhost:5000/api/members", {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => console.log(error));
  });
  