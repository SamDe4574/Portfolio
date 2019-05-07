// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBeqfuFcWyHdcQYZWP-DEAfcL2yIcZkGwI",
  authDomain: "hussam-de.firebaseapp.com",
  databaseURL: "https://hussam-de.firebaseio.com",
  projectId: "hussam-de",
  storageBucket: "hussam-de.appspot.com",
  messagingSenderId: "236653110251",
  appId: "1:236653110251:web:5d399827767f94aa"
}; // Initialize Firebase

firebase.initializeApp(firebaseConfig);
var commentsAppReference = firebase.database();
$(() => {
  var $commentElement = $("#comments");
  $("#comment_form").submit(function (event) {
    // by default a form submit reloads the DOM which will subsequently reload all our JS
    // to avoid this we preventDefault()
    event.preventDefault(); // grab user message input

    let name = $("#name").val();
    let email = $("#email").val();
    let commentType = $("input[type='radio']:checked").val();
    let comment = $("#comment").val(); // clear message input (for UX purposes)

    $("#name").val("");
    $("#email").val("");
    $("#comment").val(""); // create a section for messages data in your db

    let commentsReference = commentsAppReference.ref("Comments"); // use the set method to save data to the messages

    commentsReference.push({
      name: name,
      email: email,
      commentType: commentType,
      comment: comment,
      votes: 0
    });
  });

  function getComments() {
    // retrieve messages data when .on() initially executes
    // and when its data updates
    commentsAppReference.ref("Comments").on("value", function (results) {
      // remove lis to avoid dupes
      $commentElement.empty(); // TODO : Solve the problem in here only the last comment work.

      let allComments = results.val(); // iterate through results coming from database call; messages

      for (let com in allComments) {
        // create message element
        let $listElement = $("<div class= 'col-lg-3  com' />");
        let $toolbox = $(`<div class='col toolbox' id=${com}/>`); // create delete element

        var $delete = $('<i class="fa fa-trash pull-right"></i>');
        $delete.on("click", function (e) {
          let id = e.target.parentNode.id;
          commentsAppReference.ref(`Comments/${id}`).remove().catch(error => {
            console.log("Remove failed: " + error.message);
          });
        }); // create up vote element

        var $upVote = $('<i class="fa fa-thumbs-up pull-right"></i>');
        $upVote.on("click", function (e) {
          let id = e.target.parentNode.id;
          let updatedUpvotes = votes + 1;
          commentsAppReference.ref(`Comments/${id}/`).update({
            votes: updatedUpvotes
          }).catch(error => {
            console.log("Update failed: " + error.message);
          });
        }); // create down vote element

        var $downVote = $('<i class="fa fa-thumbs-down pull-right"></i>');
        $downVote.on("click", function (e) {
          let id = e.target.parentNode.id;
          let updatedDownVotes = votes - 1;
          commentsAppReference.ref(`Comments/${id}/`).update({
            votes: updatedDownVotes
          }).catch(error => {
            console.log("Update failed: " + error.message);
          });
        }); // get method is supposed to represent HTTP GET method

        let votes = allComments[com].votes;
        let commentType = allComments[com].commentType;

        switch (commentType) {
          case "1":
            commentType = "Issue";
            break;

          case "2":
            commentType = "Suggestion";
            break;

          case "3":
            commentType = "Complaint";
            break;

          default:
            commentType = "No Type";
        }

        $toolbox.append($delete).append($upVote).append($downVote).append(votes);
        $listElement.append(`<p>${allComments[com].name} - ${allComments[com].email}</p>`).append(`<p>${commentType} </p>`).append(`<h3>${allComments[com].comment}</h4>`).append($toolbox);
        $commentElement.append($listElement);
      }
    });
  } // on initialization of app (when document is ready) get fan messages


  getComments();
});
//# sourceMappingURL=firebase.js.map
