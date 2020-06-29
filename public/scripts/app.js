// const escape = require('./escape.js')

// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/users"
//   }).done((users) => {
//     console.log(users);
//     for (user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });
// });


// MAIN QUIZ CONTAINER FUNCTIONALITY TO LOAD QUIZ CARDS //

const createQuizElement = function(quiz) {
  console.log(quiz);
  const $quizElement = `
    <article id="quiz">
      <header>
        <h4>${quiz.name}</h4>
      </header>

      <footer>
        <h6>Results</h6>
      </footer>
    </article>
  `;
  return $quizElement;
};

const renderQuizzes = function(quizzes) {
  // console.log(quizzes)
  const quizArr = [];
  for (let title in quizzes) {
    const quizObj = quizzes[title];
    for (let quiz of quizObj) {
      console.log(quiz);
      quizArr.push(createQuizElement(quiz));
    }
  }
  $('#quizzes-container').append(quizArr);
};

const loadQuizzes = function() {
  $.ajax({
    url: '/quizzes/json',
    method: 'GET',
    dataType: 'JSON'
  }).then(function(response) {
    console.log(response);
    renderQuizzes(response);
  });
};

$(document).ready(() => {
  console.log('ready');
  loadQuizzes();


  let shown = false;
  $("#create_new_quiz").on('click', function() {
    if (!shown) {
      console.log("WHEE")

      $("#new_quiz_container").slideDown();
      $("#new_quiz_container").css("display", "block");

      shown = true;
    } else {
      console.log("GOODBYE")

      $("#new_quiz_container").slideUp();
      // $("#new_quiz_container").css("display", "none");
      shown = false;
    }
  });
})

  // $.ajax({
  //   method: "GET",
  //   url: "/quizzes/new"
  // }).then(())


  // $.fn.loadNewQuizForm = function() {
  //   $.ajax('/quizzes/new', { method: 'GET' })
  //     .then(function(data) {
  //       // $('#tweets-container').empty();
  //       console.log(data)
  //       $('#new_quiz_container').
  //     });

    // })
    //  POST REQUEST STRUCTURE
    // // $.ajax({
    //   url: '/tweets',
    //   method: 'POST',
    //   data: $(this).serialize(),
    // })
    //   .then(function() {
    //     $('#tweet-text').val('');
    //     $('#char-counter').text(140);
    //     $.fn.loadTweets();
    //   });


// That’s where our jQuery should go for the newQuiz slider for example.
