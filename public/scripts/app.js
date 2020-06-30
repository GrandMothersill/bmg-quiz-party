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
  let $quizElement = ``
  if (quiz.is_public === true) {
    $quizElement = `
    <article class="quiz">
      <a class="text-reset" href="/quizzes/${quiz.id}">
        <header>
          <h4>${quiz.name}</h4>
        </header>
      </a>
      <a class="text-reset" href="/quizzes/results/${quiz.id}">
        <footer>
          <h6>Results</h6>
        </footer>
      </a>
    </article>
    `;
  } else {
    $quizElement = `
    <article class="quiz" id="quiz-unlisted">
      <a class="text-reset" href="/quizzes/${quiz.id}">
        <header>
          <h4>${quiz.name}</h4>
        </header>
      </a>
      <a class="text-reset" href="/quizzes/results/${quiz.id}">
        <footer>
          <h6>Results</h6>
          <h6 class="quiz_small_text">Unlisted Quiz</h6>
        </footer>
      </a>
    </article>
    `;
  }
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
  console.log("LOAD QUIZZES FIRES");
  $.ajax({
    url: '/quizzes/json',
    method: 'GET',
    dataType: 'JSON'
  }).then(function(response) {
    console.log(response);
    $('#quizzes-container').empty();
    renderQuizzes(response);
  });
};

const loadQuizzesByUser = function() {
  console.log("IN THE LOAD QUIZZES BY USER FUNCTION");
  $.ajax({
    url: '/quizzes/users/:id',
    method: 'GET',
    dataType: 'JSON'
  }).then(function(response) {
    console.log(response);
    $('#quizzes-container').empty();
    renderQuizzes(response);
  });
};


$(document).ready(() => {
  console.log('ready');
  loadQuizzes();

  // SPECIFIC QUIZ RENDER //


  $("#fade").modal({
    fadeDuration: 1000,
    fadeDelay: 1.75 // Will fade in 750ms after the overlay finishes.
  });


  $("#get_all_quizzes").on('click', function() {
    console.log("LOUD N CLEAR ALL");
    $("#get_my_quizzes").css("display", "initial");
    $("#get_all_quizzes").css("display", "none");
    loadQuizzes();
  });

  $("#get_my_quizzes").on('click', function() {
    console.log("LOUD AND CLEAR MY");
    $("#get_my_quizzes").css("display", "none");
    $("#get_all_quizzes").css("display", "initial");
    loadQuizzesByUser();
  });


  /////////////////////////////////

  document.getElementById("quiz-submit").addEventListener("click", function(event) {
    event.preventDefault();
  });
});

