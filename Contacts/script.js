//All Country API
allUsers();

function allUsers() {
  const tablaHTML = document.getElementById("user-table-body");

  fetch("http://www.raydelto.org/agenda.php")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((user) => showData(user))
    .catch((error) => {
      console.log("There has been an error consiming the API: ", error);
      tablaHTML.textContent =
        "There has been an error: No data has been found. Please try again.";
    });

  const showData = (user) => {
    let body = "";
    for (let i = 0; i < user.length; i++) {
      body += `<tr><td>${user[i].nombre}</td><td>${user[i].apellido}</td><td>${user[i].telefono}</td></tr>`;
    }

    document.getElementById("user-table-body").innerHTML = body;
  };
}

//Botón ocultar formulario
function ocultarFormulario() {
  const formContent = document.getElementById("form-content");
  if (formContent.firstChild) {
    formContent.innerHTML = ""; // Borra el contenido del div
  }
}

//New user
function newUser() {
  const formContent = document.getElementById("form-content");

  if (document.querySelector(".new-form")) {
    return;
  }

  // Crear el formulario dinámicamente
  const form = document.createElement("form");
  form.setAttribute("action", "post");
  form.classList.add("new-form");
  form.innerHTML = `
      <label for="contact-name">Name</label>
      <input name="nombre" type="text" placeholder="Enter name" id="contact-name" />
      <label for="LastName">LastName</label>
      <input name="apellido" type="text" placeholder="Enter last name" id="LastName" />
      <label for="phoneNum">PhoneNumber</label>
      <input name="telefono" type="text" placeholder="Enter phone number" id="phoneNum" />
      <button type="submit" class="action-buttons" id="new-button">Add Contact</button>
      <br />
      <button class="action-buttons" type="button" onclick="ocultarFormulario()">Hide form</button>
      
    `;

  // Insertar el formulario en el contenedor
  formContent.appendChild(form);

  //show new form
  const formelement = document.querySelector(".new-form");

  formelement.addEventListener("submit", (event) => {
    event.preventDefault();

    // Captura los datos del formulario
    const formdata = new FormData(formelement);
    const data = Object.fromEntries(formdata);

    console.log(data);

    fetch("http://www.raydelto.org/agenda.php", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.text();
      })
      .then((textResponse) => {
        alert("Contact has been added successfully.");
        location.reload(); //reload web page
      })
      .catch((error) => {
        console.error("An error occured: API cannot be consumed:", error);
        tablaHTML.innerHTML = "No data found. Please try again.";
      });
  });
}

//show new form
const formelement = document.querySelector(".new-form");

formelement.addEventListener("submit", (event) => {
  event.preventDefault();
});
