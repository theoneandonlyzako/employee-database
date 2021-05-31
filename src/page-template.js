// creates Manager card
const generateManager = function (manager) {
    return `
        <div class="card employee-card">
          <div class="card-header">
              <h2 class="card-title">${manager.name}</h2>
              <h3 class="card-title">Manager</h3>
              <i class="material-icons">content_paste</i>
          </div>
          <div class="card-body">
              <p class="id">ID: ${manager.id}</p>
              <p class="email">Email: <a href="mailto:${manager.email}">${manager.email}</a></p>
              <p class="office">Office Number: ${manager.officeNumber}</p>
          </div>
      </div>
  `;
}

// creates Engineer card
const generateEngineer = function (engineer) {
    return `
      <div class="card employee-card">
          <div class="card-header">
              <h2 class="card-title">${engineer.name}</h2>
              <h3 class="card-title">Engineer</h3>
              <i class="material-icons">laptop_mac</i>
          </div>
          <div class="card-body">
              <p class="id">ID: ${engineer.id}</p>
              <p class="email">Email: <a href="mailto:${engineer.email}">${engineer.email}</a></p>
              <p class="github">Github: <a href="https://github.com/${engineer.github}">${engineer.github}</a></p>
          </div>
      </div>
  `
}

// creates Intern card 
const generateIntern = function (intern) {
    return `
        <div class="card employee-card">
          <div class="card-header">
              <h2>${intern.name}</h2>
              <h3>Intern</h3>
              <i class="material-icons">assignment_ind</i>
          </div>
          <div class="card-body">
              <p class="id">ID: ${intern.id}</p>
              <p class="email">Email: <a href="mailto:${intern.email}">${intern.email}</a></p>
              <p class="school">School: ${intern.school}</p>
          </div>
        </div>
  `
};

// pushes team array to html 
generateHTML = (data) => {

    // array for cards 
    pageArray = [];

    for (let i = 0; i < data.length; i++) {
        const employee = data[i];
        const role = employee.getRole();


        // call manager function
        if (role === 'Manager') {
            const managerCard = generateManager(employee);

            pageArray.push(managerCard);
        }

        // call engineer function
        if (role === 'Engineer') {
            const engineerCard = generateEngineer(employee);

            pageArray.push(engineerCard);
        }

        // call intern function 
        if (role === 'Intern') {
            const internCard = generateIntern(employee);

            pageArray.push(internCard);
        }

    }

    // joining strings 
    const employeeCards = pageArray.join('')

    // return to generated page
    const generateTeam = generateTeamPage(employeeCards);
    return generateTeam;

}

// generate html page 
const generateTeamPage = function (employeeCards) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Roster</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
    <link href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
    <div class="container-fluid">
    <div class="row">
        <div class="col-12 jumbotron mb-4 team-heading">
            <h1 class="text-center">Team Roster</h1>
        </div>
    </div>
</div>
    </header>
    <main>
        <div class="container">
            <div class="row">
                <div class="team-area col-12 d-flex flex-wrap justify-content-center" id="team-cards">
                    <!--Team Cards-->
                    ${employeeCards}
                </div>
            </div>
        </div>
    </main>
    
</body>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
</html>
`;
}

// export to index
module.exports = generateHTML;