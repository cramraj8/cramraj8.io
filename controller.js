
// $(window).load(someFunction);​
// $(document).load(someFunction);​
$( window ).ready(function() {
    // alert("The paragraph was clicked.");
    $("#contactForm").hide();
    $("#entry_form_name").hide();
    $("#logout_btn_id").hide();
    $("#image_upload_div").hide();
    $("#image_visualize_div").hide();


});



firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    document.getElementById("logout_btn_id").style.display = "block";

    var user = firebase.auth().currentUser;
    if(user != null){
      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
    }

  } else {
    // No user is signed in.
    document.getElementById("user_div").style.display = "none";
    document.getElementById("image_upload_div").style.display = "none";
    document.getElementById("contactForm").style.display = "none";
    document.getElementById("login_div").style.display = "block";
  }
});

function login(){
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error : " + errorMessage);
    // ...
  });

}
function logout(){
  firebase.auth().signOut();
  document.getElementById("logout_btn_id").style.display = "none";
  document.getElementById("image_visualize_div").style.display = "none";
}



// ================================================================


$("#user_entry_btn").click(function(){
    // e.preventDefault();
    // alert("The paragrap h was clicked.");
    document.getElementById("user_div").style.display = "none";
    document.getElementById("contactForm").style.display = "block";
    document.getElementById("image_upload_div").style.display = "block";
});

// ================================================================

// function prepare_VisualWindow(argument) {
//     // body...
//     document.getElementById("user_div").style.display = "none";
//     // document.getElementById("contactForm").style.display = "block";

//     // $("#contactForm div:visible");
//     // $( "input[name='first_name']" );
//     // $("#contactForm input[name='patient_id']:visible");
//     // $("#contactForm.'primary_input :visible");
//     // $("#contactForm.primary_input");.show();
//     // $("#contactForm primary_input").show();
//     // $("#contactForm").find("#primary_input").show();
//     // $("#contactForm > p:eq(0)").show();
//     // $("#contactForm input[name=patient_id]").show();
//     // document.getElementById("primary_key").style.display = "block";
//     $("#contactForm").show();
//     // $('#contactForm div:not(#primary_key)').show();
//     // $( "#contactForm" ).show(function() {
//     //       // $( "#primary_key" ).hide(function() {
//     //       //   alert( "Animation complete." );
//     //       // });
//     //       $( "#primary_key" ).hide();
//     // });

// }

// $("#data_vis_btn").click(function(){
//     // e.preventDefault();
//     // alert("The paragraph was clicked.");
//     prepare_VisualWindow()
// });


// ================================================================

// $("#pull_visuals_btn").click(function(){
//     // e.preventDefault();
//     document.getElementById("user_div").style.display = "none";
//     // document.getElementById("visualization").style.display = "block";

// });


// ================================================================
// ================================================================
// Below is for image uploader and progress bar


fileButton.addEventListener('change', function(e) {

        var patient_id = document.getElementById('patient_id');


        if (patient_id.value.length < 1){
            console.log('null patient_id');
            alert('null patient_id');
            return;
        }else{
            // get file
            var file = e.target.files[0];
            // create a storage ref
            var storageRef = firebase.storage().ref('Patients/'
                             + patient_id.value + '/RGBImage/' + file.name);
            // upload file
            var task = storageRef.put(file);
            // update progress bar
            task.on('state_changed',

                function progr(snapshot) {
                    var percentage = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
                    uploader.value = percentage;
                },

                function error(err) {
                    // body...
                },

                function complete() {
                    // body...
                    var postKey = firebase.database().ref('Patients/'
                                      + patient_id.value + '/RGB_meta/').push().keys;
                    var downloadURL = task.snapshot.downloadURL;

                    var updates = {};
                    var postData = {
                            url: downloadURL,
                            caption: "RGB image"
                    };
                    updates['Patients/' + patient_id.value
                                  + '/RGB_meta/' + postKey] = postData;
                    firebase.database().ref().update(updates);
                }
            );

        }

        alert('this is beacuse it skipped break');

});


// ================================================================
// ================================================================


// function showimage() {
pull_visuals_btn.addEventListener('click', function(e) {
    e.preventDefault();

    var patient_id = document.getElementById('patient_id');
    if (patient_id.value.length < 1){
            console.log('null patient_id');
            alert('null patient_id');
            return;
    }


    console.log(patient_id.value);

    $("#image_upload_div").hide();
    $("#contactForm").hide();


    document.getElementById("image_visualize_div").style.display = "block";

// 1122
// 'Patients/' + patient_id.value + '/RGBImage/' + file.name

    var storageRef = firebase.storage().ref();
    var spaceRef = storageRef.child('Patients/' + patient_id.value
                                        + '/RGBImage/' + 'test1.png');
    storageRef.child('Patients/' + patient_id.value
                    + '/RGBImage/' + 'test1.png').getDownloadURL().then(function(url) {
               var test = url;
               console.log(test);
               alert(url);
               document.querySelector('img').src = test;

    }).catch(function(error) {
    });
}


);
