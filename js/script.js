// Variables

const $otherTitle = $("#other-title");
const $activities = $(".activities");
const $creditCard = $("#credit-card")

// Set focus on the first text field
$("#name").focus();

// ”Job Role” section
// Hide other-title input field on page load (progressive enhancement)
$otherTitle.hide();

$("#title").on("change", function () {
  // Show input if other is selected
  if ($("#title option:last").is(":selected")) {
    $otherTitle.show();
  // Remove input if other is deselected
  } else {
    $otherTitle.hide();
  }
});

// ”T-Shirt Info”
// When you select the design, only show fitting colors

//Hide color section until design selection is made
$("#colors-js-puns").hide();


$("#design").on("change", function () {
  const $cornflowerBlue = $("#color option[value='cornflowerblue']");
  const $darkSlateGrey = $("#color option[value='darkslategrey']");
  const $gold = $("#color option[value='gold']");
  const $tomato = $("#color option[value='tomato']");
  const $steelBlue = $("#color option[value='steelblue']");
  const $dimGrey = $("#color option[value='dimgrey']");
  if ($(this).val() === "js puns") {
    // Show and hide colors
    $cornflowerBlue.show();
    $darkSlateGrey.show();
    $gold.show();
    $tomato.hide();
    $steelBlue.hide();
    $dimGrey.hide();
    // Make sure the #color input field is updated
    $("#color").val("cornflowerblue");
  } else if ($(this).val() === "heart js") {
    $cornflowerBlue.hide();
    $darkSlateGrey.hide();
    $gold.hide();
    $tomato.show();
    $steelBlue.show();
    $dimGrey.show();
    $("#color").val("tomato");
  } else {
    $cornflowerBlue.show();
    $darkSlateGrey.show();
    $gold.show();
    $tomato.show();
    $steelBlue.show();
    $dimGrey.show();
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
  const $nameTwo = $(`input[name=${name2}]`);
  if ($(`input[name=${name}]`).is(":checked")) {
    $nameTwo.attr("disabled", true);
    $nameTwo.parent().css("color", "grey");
  } else {
    $nameTwo.removeAttr("disabled");
    $nameTwo.parent().css("color", "black");
  }
}

// Make more DRY?

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

// Adding the activity costs
let cost = 0;
// Add costs
$activities.change(function (event) {
  const $activitiesCost = $(".activities p");
  if ($(event.target).attr("name") === "all") {
    // Cost of Main conference
    if ($(event.target).is(":checked")){
      //append new element
      if($activitiesCost.length === 0) {
        cost += 200;
        $activities.append(`<p>Total Cost: $${cost}</p>`)
      //if element exists, just change text
      } else if ($activitiesCost.length > 0) {
        cost += 200;
        $activitiesCost.text(`Total Cost: $${cost}`);
      }
      //Remove cost if deselected
    } else {
      cost -= 200;
      $activitiesCost.text(`Total Cost: $${cost}`);
    }
    // Cost for all other events
  } else if ($(event.target).attr("type") === "checkbox") {
    if ($(event.target).is(":checked")){
      if($activitiesCost.length === 0) {
        cost += 100;
        $activities.append(`<p>Total Cost: $${cost}</p>`)
      } else if ($activitiesCost.length > 0) {
        cost += 100;
        $activitiesCost.text(`Total Cost: $${cost}`);
      }
    } else {
      cost -= 100;
      $activitiesCost.text(`Total Cost: $${cost}`);
    }
  }
  // Remove cost <p> element if cost is zero
  if (cost === 0) {
   $activitiesCost.remove();
  }
});


// "Payment Info" section

$("#payment").val("credit card");


$("option[value='select_method']").hide();

$creditCard.next().hide();
$creditCard.next().next().hide();

$("#payment").change(function () {
  if ($(this).val() === "credit card") {
    $creditCard.next().next().hide();
    $creditCard.next().hide();
    $creditCard.show();
  } else if ($(this).val() === "paypal") {
    $creditCard.next().next().hide();
    $creditCard.next().show();
    $creditCard.hide();
  } else if ($(this).val() === "bitcoin") {
    $creditCard.next().next().show();
    $creditCard.next().hide();
    $creditCard.hide();
  }
})




// Form validation messages
$("button").click(function (e) {
  // Name Form
  if ($("#name").val() === "") {
    e.preventDefault(); //If input not right, stop submit
    if ($(".name-hint").length === 0) { //Only create new hint message, if it doesn't exist yet
      $("#name").before("<span class='name-hint' style='color:red;'>This field is required</span>");
    }
  } else { //If the input is correct, remove warning message
    $("name-hint").remove();
  }
  // Checkbox Form
  if ($("input[type='checkbox']:checked").length === 0 ) {
    e.preventDefault();
    if ($(".checkbox-hint").length === 0) {
    $(".activities legend").after("<span class='checkbox-hint' style='color:red;'>You have to pick at least one activity.</span>")
  }
  } else {
    $(".checkbox-hint").remove();
  }
  // Email Form
  const emailInput = $("#mail").val();
  if (/^[^@ ]+@[^@. ]+\.[a-z]+$/i.test(emailInput) === false) {
    e.preventDefault();
    if (emailInput === "") { // Conditional Hint: Remove old hint and replace with the right hint
      $(".mail-hint").remove();
      $("#mail").before(`<p class="mail-hint" style='color:red;'>This field is required.</p>`); //If field is empty
    } else {  // All the other ways the input doesn't match the regex
      $(".mail-hint").remove();
      $("#mail").before(`<p class="mail-hint" style='color:red;'>Please enter a valid email adress (ex. person@example.com).</p>`);
    }
  } else {
    $(".mail-hint").remove();
  }
  // Credit Card Form
  const ccInput = $("#cc-num").val();
  if ($("#payment").val() === "credit card") {
    if (/^[0-9]{13,16}$/i.test(ccInput) === false) {
      e.preventDefault();
      if ($(".cc-hint").length === 0) {
        $("#cc-num").after(`<p class="cc-hint" style='color:red;'>Please enter a number that is between 13 and 16 digits long.</p>`);
    }
    } else {
      $(".cc-hint").remove();
    }

    // Zip Form
    const zipInput = $("#zip").val();
    if (/^[0-9]{5}$/i.test(zipInput) === false) {
      e.preventDefault();
       if ($(".zip-hint").length === 0) {
         $("#zip").after(`<p class="zip-hint" style='color:red;'>Please enter a 5 digit number.</p>`);
       }
     } else {
       $(".zip-hint").remove();
   }
   //CVV Form
    const cvvInput = $("#cvv").val();
    if (/^[0-9]{3}$/i.test(cvvInput) === false) {
    e.preventDefault();
      if ($(".cvv-hint").length === 0) {
        $("#cvv").after(`<p class="cvv-hint" style='color:red;'>Please enter a 3 digit number.</p>`);
      }
    } else {
     $(".cvv-hint").remove();
   }
  }
});




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
   if (/^[^@ ]+@[^@. ]+\.[a-z]+$/i.test(emailInput) === true || emailInput === "") {
    $(".mail-hint").remove();
  } else if (/^[^@ ]+@[^@. ]+\.[a-z]+$/i.test(emailInput) === false) {
      if ($(".mail-hint").length === 0) {
        $("#mail").before(`<p class="mail-hint" style='color:red;'>Please enter a valid email adress (ex. person@example.com).</p>`);
      }
   }
});

// Remove activity hint after signup failure
$activities.change( function () {
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
        $("#cc-num").after(`<p class="cc-hint" style='color:red;'>Please enter a number that is between 13 and 16 digits long.</p>`);
     }
   }
});

// Zip Code keyup hint
$("#zip").keyup(function () {
   const zipInput = $("#zip").val();
   if (/^[0-9]{5}$/i.test(zipInput) === true || zipInput === "") {
     $(".zip-hint").remove();
  } else if (/^[0-9]{5}$/i.test(zipInput) === false) {
    if ($(".zip-hint").length === 0) {
      $("#zip").after(`<p class="zip-hint" style='color:red;'>Please enter a 5 digit number.</p>`);
    }
  }
});

// CCV keyup hint
$("#cvv").keyup(function () {
   const cvvInput = $("#cvv").val();
   if (/^[0-9]{3}$/i.test(cvvInput) === true || cvvInput === "") {
     $(".cvv-hint").remove();
   } else if (/^[0-9]{3}$/i.test(cvvInput) === false) {
      if ($(".cvv-hint").length === 0) {
        $("#cvv").after(`<p class="cvv-hint" style='color:red;'>Please enter a 3 digit number.</p>`);
      }
   }
});
