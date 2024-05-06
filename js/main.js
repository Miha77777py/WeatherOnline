const API = config.API;
let form = document.querySelector(".form");


form.addEventListener("submit", (event) => {
    event.preventDefault();
    let city = document.querySelector(".form__input").value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`)
    .then(response => response.json())
    .then(data => {
        let info = {
            name: data["name"],
            temp: data["main"]["temp"],
            desc: data["weather"][0]["description"]
        };
        if (document.querySelector(".name").innerText == "") {
            document.querySelector(".data").classList.toggle("is-hidden");
        }

        document.querySelector(".main__text").classList.remove("not-find");
        document.querySelector(".main__text").innerText = "";
        document.querySelector(".wrapper").style.height = "350px";
        document.querySelector(".name").innerText = `Name: ${info["name"]}`;
        document.querySelector(".temp").innerText = `Temp: ${info["temp"]}`;
        document.querySelector(".desc").innerText = `Desc: ${info["desc"][0].toUpperCase() + info["desc"].slice(1)}`;
        
        setTimeout(() => Array.from(document.getElementsByClassName("data__text"))
            .forEach(element => {
                element.style.opacity = 1;
            }), 200);
    })
    .catch(() => {
        if (document.querySelector(".form__input").value == "") {
            if (document.querySelector(".name").innerText != "") {
                document.querySelector(".name").innerText = "";
                document.querySelector(".main__text").innerText = ""
                Array.from(document.getElementsByClassName("data__text"))
                    .forEach(element => {
                        element.style.opacity = 0;
                    });
                document.querySelector(".data").classList.toggle("is-hidden");
            }
            document.querySelector(".main__text").classList.remove("not-find");
            document.querySelector(".main__text").innerText = "";
            document.querySelector(".wrapper").style.height = "200px";
        } else {
            if (document.querySelector(".name").innerText != "") {
                document.querySelector(".name").innerText = "";
                Array.from(document.getElementsByClassName("data__text"))
                    .forEach(element => {
                        element.style.opacity = 0;
                    });
                document.querySelector(".data").classList.toggle("is-hidden");
            } 
            document.querySelector(".main__text").innerText = "City undefined!";
            setTimeout(() => document.querySelector(".main__text").classList.add("not-find"), 200);
            document.querySelector(".wrapper").style.height = "350px";
        }
        document.querySelector(".temp").innerText = "";
        document.querySelector(".desc").innerText = "";
    });
});
