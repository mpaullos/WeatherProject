teste = document.getElementById("city")

const sugestions =  document.getElementsByClassName("cities")

Array.from(sugestions).forEach(element => {
    element.addEventListener('click', function ()  {
      console.log('data-wow value is: ' + element.innerHTML);
      teste.value = element.innerHTML
    });
  });