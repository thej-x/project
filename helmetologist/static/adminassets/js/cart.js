var updateBtns = document.getElementsByClassName("update-cart");

for (var i = 0; i < updateBtns.length; i++) {
  updateBtns[i].addEventListener("click", function () {
    var productId = this.dataset.product;
    var action = this.dataset.action;
    console.log("productId:", productId, "action:", action);

    // Add condition to handle unauthenticated users if needed
          // Ensure that productId and action are not empty
          if (productId && action) {
            updateUserOrder(productId, action);
          

          } else {
            console.error("Missing productId or action!");
          }
  });
}

function updateUserOrder(productId, action) {
  console.log("User is logged in , sending data");
  var url = "/update_item/";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify({ productId : productId, action : action }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text);
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log("data:", data);
      location.reload()
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
