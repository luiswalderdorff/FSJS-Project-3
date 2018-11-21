// Variables

// Set focus on the first text field
$("#name").focus();

// ”Job Role” section
// Hide other-title input field on page load (progressive enhancement)
$("#other-title").hide();

$("#title").on("change", function () {
  // Show input if other is selected
  if ($("#title option:last").is(":selected")) {
    $("#other-title").show();
  // Remove input if other is deselected
  } else {
    $("#other-title").hide();
  }
});

// ”T-Shirt Info”
// When you select the design, only show fitting colors

//Hide color section until design selection is made
$("#colors-js-puns").hide();


$("#design").on("change", function () {
  if ($(this).val() === "js puns") {
    // Show and hide colors
    $("#color option[value='cornflowerblue']").show();
    $("#color option[value='darkslategrey']").show();
    $("#color option[value='gold']").show();
    $("#color option[value='tomato']").hide();
    $("#color option[value='steelblue']").hide();
    $("#color option[value='dimgrey']").hide();
    // Make sure the #color input field is updated
    $("#color").val("cornflowerblue");
  } else if ($(this).val() === "heart js") {
    $("#color option[value='cornflowerblue']").hide();
    $("#color option[value='darkslategrey']").hide();
    $("#color option[value='gold']").hide();
    $("#color option[value='tomato']").show();
    $("#color option[value='steelblue']").show();
    $("#color option[value='dimgrey']").show();
    $("#color").val("tomato");
  } else {
    $("#color option[value='cornflowerblue']").show();
    $("#color option[value='darkslategrey']").show();
    $("#color option[value='gold']").show();
    $("#color option[value='tomato']").show();
    $("#color option[value='steelblue']").show();
    $("#color option[value='dimgrey']").show();
    $("#color").val("cornflowerblue");
  }
  //Hide color section until design selection is made
  if ($("#design").val() === "Select Theme") {
    $("#colors-js-puns").hide();
  } else {
    $("#colors-js-puns").show();
  }
})

// Function to disable the checkboxes with the same time (could improve it, by splitting after "-" and popping it and comparing these strings)
function disableSameTime (name, name2) {
  if ($(`input[name=${name}]`).is(":checked")) {
    $(`input[name=${name2}]`).attr("disabled", true);
    $(`input[name=${name2}]`).parent().css("color", "grey");
  } else {
    $(`input[name=${name2}]`).removeAttr("disabled");
    $(`input[name=${name2}]`).parent().css("color", "black");
  }
}

$("input[name='js-frameworks']").change(function () {
  disableSameTime("js-frameworks", "express")
});

$("input[name='express']").change(function () {
  disableSameTime("express", "js-frameworks")
});

$("input[name='js-libs']").change(function () {
  disableSameTime("js-libs", "node")
});

$("input[name='node']").change(function () {
  disableSameTime("node", "js-libs")
});

// (could improve it by taking last three digits of string and parseInting them)

//Make code more DRY? Only difference is cost. Save function, add parameter?
let cost = 0;
// Add costs
$(".activities").change(function (event) {
  if ($(event.target).attr("name") === "all") {
    // Cost of Main conference
    if ($(event.target).is(":checked")){
      //append new element
      if($(".activities p").length === 0) {
        cost += 200;
        $(".activities").append(`<p>Total Cost: $${cost}</p>`)
      //if element exists, just change text
      } else if ($(".activities p").length > 0) {
        cost += 200;
        $(".activities p").text(`Total Cost: $${cost}`);
      }
      //Remove cost if deselected
    } else {
      cost -= 200;
      $(".activities p").text(`Total Cost: $${cost}`);
    }
    // Cost for all other events
  } else if ($(event.target).attr("type") === "checkbox") {
    if ($(event.target).is(":checked")){
      if($(".activities p").length === 0) {
        cost += 100;
        $(".activities").append(`<p>Total Cost: $${cost}</p>`)
      } else if ($(".activities p").length > 0) {
        cost += 100;
        $(".activities p").text(`Total Cost: $${cost}`);
      }
    } else {
      cost -= 100;
      $(".activities p").text(`Total Cost: $${cost}`);
    }
  }
  // Remove cost <p> element if cost is zero
  if (cost === 0) {
   $(".activities p").remove();
  }
});


// "Payment Info" section

$("#payment").val("credit card");


$("option[value='select_method']").hide();

$("#credit-card").next().hide();
$("#credit-card").next().next().hide();

$("#payment").change(function () {
  if ($(this).val() === "credit card") {
    $("#credit-card").next().next().hide();
    $("#credit-card").next().hide();
    $("#credit-card").show();
  } else if ($(this).val() === "paypal") {
    $("#credit-card").next().next().hide();
    $("#credit-card").next().show();
    $("#credit-card").hide();
  } else if ($(this).val() === "bitcoin") {
    $("#credit-card").next().next().show();
    $("#credit-card").next().hide();
    $("#credit-card").hide();
  }
})

// Form validation messages
// Why doesnt submit work?
$("button[type='submit']").submit(function (e) {
  e.preventDefault();
  // Name Form
  if ($("#name").val() === "") {
    $("#name").before("<span class='name-hint' style='color:red;'>This field is required</span>");
  } else {
    $("name-hint").remove();
  }
  // Checkbox Form
  if ($("input[type='checkbox']:checked").length === 0 ) {
    e.preventDefault;
    if ($(".checkbox-hint").length === 0) {
    $(".activities legend").after("<span class='checkbox-hint' style='color:red;'>You have to pick at least one activity.</span>")
  } else {
    $(".checkbox-hint").remove();
  }
  }
  // Email Form
  const emailInput = $("#mail").val();
  if (/^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput) === false) {
     if ($(".mail-hint").length === 0) {
       $("#mail").before(`<p class="mail-hint" style='color:red;'>Please enter a valid email adress (ex. person@example.com).</p>`);
     }
  } else {
    $(".mail-hint").remove();
  }
  // Credit Card Form
  const ccInput = $("#cc-num").val();
  if ($("#payment").val() === "credit card") {
    if (/^[0-9]{13,16}$/i.test(ccInput) === false) {
      if ($(".cc-hint").length === 0) {
        $("#cc-num").after(`<p class="cc-hint" style='color:red;'>Please enter a number that is between 13 and 16 digits long.</p>`);
    }
    } else {
      $(".cc-hint").remove();
    }
  }
  // Zip Form
  const zipInput = $("#zip").val();
  if (/^[0-9]{5}$/i.test(zipInput) === false) {
   if ($(".zip-hint").length === 0) {
     $("#zip").after(`<p class="zip-hint" style='color:red;'>Please enter a 5 digit number.</p>`);
   } else {
     $(".zip-hint").remove();
   }
 }
 //CVV Form
 const cvvInput = $("#cvv").val();
 if (/^[0-9]{3}$/i.test(cvvInput) === false) {
    if ($(".cvv-hint").length === 0) {
      $("#cvv").after(`<p class="cvv-hint" style='color:red;'>Please enter a 3 digit number.</p>`);
    }
 } else {
   $(".cvv-hint").remove();
 }
});

// Not very DRY

// Remove name hint after signup failure

$("#name").keyup(function () {
  if ($("#name").val() !== "") {
    if ($(".name-hint").length !== 0) {
      $(".name-hint").remove();
    }
  }
})

// Email keyup hint
$("#mail").keyup(function () {
   const emailInput = $("#mail").val();
   if (/^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput) === true || emailInput === "") {
    $(".mail-hint").remove();
  } else if (/^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput) === false) {
      if ($(".mail-hint").length === 0) {
        $("#mail").before(`<p class="mail-hint" style='color:red;'>Please enter a valid email adress (ex. person@example.com).</p>`);
      }
   }
});

// Remove activity hint after signup failure

$(".activities").change( function () {
  if ($("input[type='checkbox']:checked").length !== 0 ) {
    if ($(".checkbox-hint").length !== 0) {
      $(".checkbox-hint").remove();
    }
  }
});

// Credit Card keyup hint
$("#cc-num").keyup(function () {
   const ccInput = $("#cc-num").val();
   if (/^[0-9]{13,16}$/i.test(ccInput) === true || ccInput === "") {
     $(".cc-hint").remove();
   } else if (/^[0-9]{13,16}$/i.test(ccInput) === false) {
      if ($(".cc-hint").length === 0) {
        $("#cc-num").after(`<p class="cc-hint style='color:red;'">Please enter a number that is between 13 and 16 digits long.</p>`);
     }
   }
});

// Zip Code keyup warning
$("#zip").keyup(function () {
   const zipInput = $("#zip").val();
   if (/^[0-9]{5}$/i.test(zipInput) === true || zipInput === "") {
     $(".zip-hint").remove();
  } else if (/^[0-9]{5}$/i.test(zipInput) === false) {
    if ($(".zip-hint").length === 0) {
      $("#zip").after(`<p class="zip-hint style='color:red;'">Please enter a 5 digit number.</p>`);
    }
  }
});

// CCV keyup warning
$("#cvv").keyup(function () {
   const cvvInput = $("#cvv").val();
   if (/^[0-9]{3}$/i.test(cvvInput) === true || cvvInput === "") {
     $(".cvv-hint").remove();
   } else if (/^[0-9]{3}$/i.test(cvvInput) === false) {
      if ($(".cvv-hint").length === 0) {
        $("#cvv").after(`<p class="cvv-hint style='color:red;'">Please enter a 3 digit number.</p>`);
      }
   }
});
