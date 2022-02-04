/* ***************************
  JWD JavaScript Assessment
  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.
    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers
      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.
      3. Add 2 more questions to the app (each question must have 4 options).
      4. Reload the page when the reset button is clicked (hint: search window.location)
      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener('DOMContentLoaded', () => {
    const start = document.querySelector('#start');
    start.addEventListener('click', function (e) {
      document.querySelector('#quizBlock').style.display = 'block';
      start.style.display = 'none';
    });
    // quizArray QUESTIONS & ANSWERS
    // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
    // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
    const quizArray = [
      {
        q: 'Which is the third planet from the sun?',
        o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
        a: 1, // array index 1 - so Earth is the correct answer here
      },
      {
        q: 'Which is the largest ocean on Earth?',
        o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        a: 3,
      },
      {
        q: 'What is the capital of Australia',
        o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
        a: 1,
      },
      {
        q: 'What is the person who complies a dictionary called?',
        o: ['Editor', 'Lexicographer', 'Compiler', 'Director'],
        a: 2,
      },
      {
        q: 'What is the driver of a Train called?',
        o: ['Pilot', 'Train Driver', 'Locopilot', 'Captain'],
        a: 3,
      },
    ];
  
    // function to Display the quiz questions and answers from the object
    const displayQuiz = () => {
      const quizWrap = document.querySelector('#quizWrap');
      let quizDisplay = '';
      quizArray.map((quizItem, index) => {
        quizDisplay += `<ul class="list-group">
                     Q - ${quizItem.q}
                      <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                      <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                      <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                      <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                      </ul>
                      <div>&nbsp;</div>`;
        quizWrap.innerHTML = quizDisplay;
      });
    };
  
    // Calculate the score
    const calculateScore = () => {
      let score = 0;
      quizArray.map((quizItem, index) => {
        for (let i = 0; i < 4; i++) {
          //highlight the li if it is the correct answer
          let li = `li_${index}_${i}`;
          let r = `radio_${index}_${i}`;
          liElement = document.querySelector('#' + li);
          radioElement = document.querySelector('#' + r);
  
          if (quizItem.a == i) {
            //change background color of li element here
          }
  
          if (radioElement.checked) {
            // code for task 1 goes here

                    function displayQuiz(){
                        // variable to store the HTML output
                        const output = [];

                        // for each question...
                        quizArray.forEach(
                          (currentQuestion, questionNumber) => {

                            // variable to store the list of possible answers
                            const o = [];

                            // and for each available answer...
                            for(letter in currentQuestion.o){

                              // ...add an HTML radio button
                              o.push(
                                `<label>
                                  <input type="radio" name="q${questionNumber}" value="${letter}">
                                  ${letter} :
                                  ${currentQuestion.o[letter]}
                                </label>`
                              );
                            }

                            // add this question and its answers to the output
                            output.push(
                              `<div class="q"> ${currentQuestion.q} </div>
                              <div class="o"> ${o.join('')} </div>`
                            );
                          }
                        );

                        // finally combine our output list into one string of HTML and put it on the page
                        quizContainer.innerHTML = output.join('');
                      }

                      function showResults(){

                        // gather answer containers from our quiz
                        const answerContainers = quizContainer.querySelectorAll('.o');

                        // keep track of user's answers
                        let numCorrect = 0;

                        // for each question...
                        quizArray.forEach( (currentQuestion, questionNumber) => {

                          // find selected answer
                          const answerContainer = answerContainers[questionNumber];
                          const selector = `input[name=q${questionNumber}]:checked`;
                          const userAnswer = (answerContainer.querySelector(selector) || {}).value;

                          // if answer is correct
                          if(userAnswer === currentQuestion.a){
                            // add to the number of correct answers
                            numCorrect++;

                            // color the answers green
                            answerContainers[questionNumber].style.color = 'lightgreen';
                          }
                          // if answer is wrong or blank
                          else{
                            // color the answers red
                            answerContainers[questionNumber].style.color = 'red';
                          }
                        });

                        // show number of correct answers out of total
                        resultsContainer.innerHTML = `${numCorrect} out of ${quizArray.length}`;
                      }

                      const quizContainer = document.getElementById('quizWrap');
                      const resultsContainer = document.getElementById('Score');
                      const submitButton = document.getElementById('submit');

                                submitButton.addEventListener('click', showResults);
        
            
          }
        }
      });
    };
  
    // call the displayQuiz function
    displayQuiz();
  }); 

  /* 
// (A2) HTML ELEMENTS
              hWrap: null, // HTML quiz container
              hQn: null, // HTML question wrapper
              hAns: null, // HTML answers wrapper

              // (A3) GAME FLAGS
              now: 0, // current question
              score: 0, // current score

              // (B) INIT QUIZ HTML
              init: () => {
                // (B1) WRAPPER
                quiz.hWrap = document.getElementById("quizWrap");

                // (B2) QUESTIONS SECTION
                quiz.hQn = document.createElement("div");
                quiz.hQn.id = "quizQn";
                quiz.hWrap.appendChild(quiz.hQn);

                // (B3) ANSWERS SECTION
                quiz.hAns = document.createElement("div");
                quiz.hAns.id = "quizAns";
                quiz.hWrap.appendChild(quiz.hAns);

                // (B4) GO!
                quiz.draw();
              },

              // (C) DRAW QUESTION
              draw: () => {
                // (C1) QUESTION
                quiz.hQn.innerHTML = quiz.data[quiz.now].q;

                // (C2) OPTIONS
                quiz.hAns.innerHTML = "";
                for (let i in quiz.data[quiz.now].o) {
                  let radio = document.createElement("input");
                  radio.type = "radio";
                  radio.name = "quiz";
                  radio.id = "quizo" + i;
                  quiz.hAns.appendChild(radio);
                  let label = document.createElement("label");
                  label.innerHTML = quiz.data[quiz.now].o[i];
                  label.setAttribute("for", "quizo" + i);
                  label.dataset.idx = i;
                  label.addEventListener("click", () => { quiz.select(label); });
                  quiz.hAns.appendChild(label);
                }
              },

              // (D) OPTION SELECTED
              select: (option) => {
                // (D1) DETACH ALL ONCLICK
                let all = quiz.hAns.getElementsByTagName("label");
                for (let label of all) {
                  label.removeEventListener("click", quiz.select);
                }

                // (D2) CHECK IF CORRECT
                let correct = option.dataset.idx == quiz.data[quiz.now].a;
                if (correct) {
                  quiz.score++;
                  option.classList.add("correct");
                } else {
                  option.classList.add("wrong");
                }

                // (D3) NEXT QUESTION OR END GAME
                quiz.now++;
                setTimeout(() => {
                  if (quiz.now < quiz.data.length) { quiz.draw(); }
                  else {
                    quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
                    quiz.hAns.innerHTML = "";
                  }
                }, 1000);
              },

              // (E) RESTART QUIZ
              reset : () => {
                quiz.now = 0;
                quiz.score = 0;
                quiz.draw();
              }
            };
            window.addEventListener("load", quiz.init);

*/