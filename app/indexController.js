var app = angular.module('app');

app.controller("indexCtrl", function ($scope) {

    $scope.userID;
    $scope.userPassword;

    var ip = "localhost";

    sessionStorage.removeItem("Eid");

    $scope.sendData = function (userID, userPassword) {
        axios.post("http://" + ip + ":8080/ServerCampusTec/rest/path/logUsuario", {
            id: userID,
            pin: userPassword
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {


                //console.log(response.data.confirmacion);
                //console.log(response.data.rol);
                if (response.data.confirmacion == "1") { //0 = datos incorrectos, 1 = datos correctos, 2 = no existe
                    sessionStorage.setItem("Eid", userID);
                    //console.log(response.data);
                    if (response.data.rol == "1") { //Estudiante
                        location.href = "MenuEstudiante.html";
                    }
                    else if (response.data.rol == "2") { //Profesor
                        location.href = "MenuProfesor.html";
                    }
                    else if (response.data.rol == "3") { //Admin
                        location.href = "MenuAdmin.html";
                    }
                }
                else if (response.data.confirmacion == "0") {
                    alert("Los datos ingresados son incorrectos");
                }
                else if (response.data.confirmacion == "2") {
                    alert("El usuario ingresado no existe en el sistema");
                }


            }, (error) => {
                console.log(error);
            });

    }


});