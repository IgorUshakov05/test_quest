const apiUrl = 'https://order.drcash.sh/v1/order';
const headers = new Headers({
  'Content-Type': 'application/json',
  'Authorization': 'Bearer NWJLZGEWOWETNTGZMS00MZK4LWFIZJUTNJVMOTG0NJQXOTI3',
});

const req = () => {
  const formData = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phoneInput").value,
    sub1: document.getElementById("test").value,
  };
  const orderKey = `${formData.name}_${formData.phone}_${formData.sub1}`;
  localStorage.setItem(orderKey, JSON.stringify(formData));

  window.location.href = 'valid.html';
};

const err = () => {
  window.location.href = 'error.html';
};

function checkPhoneNumber() {
  var phoneNumber = document.getElementById("phoneInput").value;
  var phoneRegex = /^(8|\+7)[\- ]?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

  if (phoneRegex.test(phoneNumber) && document.getElementById('name').value.length >= 3) {
    const formData = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phoneInput").value,
      sub1: document.getElementById("test").value,
    };

    const orderKey = `${formData.name}_${formData.phone}_${formData.sub1}`;
    if (localStorage.getItem(orderKey)) {
    document.getElementById("phoneError").innerHTML = 'Заказ с такими же данными уже существует.';
      console.error('Заказ с такими же данными уже существует.');
      return;
    }

    fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        stream_code: 'iu244',
        client: {
          name: formData.name,
          phone: formData.phone,
        },
        sub1: formData.sub1,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        req();
      })
      .catch(error => {
        console.error('Ошибка:', err());
      });
  } else {
    document.getElementById("phoneError").innerHTML = "Пожалуйста, введите корректный номер телефона.";
  }
}
