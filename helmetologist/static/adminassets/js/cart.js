var updateBtns = document.getElementsByClassName("update-cart");

for (var i = 0; i < updateBtns.length; i++) {
  updateBtns[i].addEventListener("click", function () {
    var productId = this.dataset.product;
    var action = this.dataset.action;
    var productQuantity = parseInt(this.dataset.quantity, 10);
    console.log("productId:", productId, "action:", action, "quantity:", productQuantity);

    if (productId && action) {
      if (productQuantity > 0) {
        this.disabled = true;

        updateUserOrder(productId, action, this);
      } else {
        console.error("Product is out of stock!");
        Swal.fire({
          icon: 'error',
          title: 'Out of Stock',
          text: 'This product is out of stock and cannot be added to the cart.',
          confirmButtonText: 'OK'
        });
      }
    } else {
      console.error("Missing productId or action!");
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Missing productId or action!',
        confirmButtonText: 'OK'
      });
    }
  });
}

async function updateUserOrder(productId, action, btn) {
  console.log("User is logged in, sending data");
  var url = "/update_item/";
  
  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ productId: productId, action: action }),
    });

    if (!response.ok) {
     
      let errorData = await response.json();
      
     
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorData.error || 'An unknown error occurred',
        confirmButtonText: 'OK'
      });

      throw new Error(errorData.error || 'An unknown error occurred');
    }

    let data = await response.json();
    console.log("data:", data);

    location.reload();
  } catch (error) {
    console.error("Error:", error);

  
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message,
      confirmButtonText: 'OK'
    });
  } finally {
    btn.disabled = false;
  }
}
