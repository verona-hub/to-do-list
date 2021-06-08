/* jshint esversion: 6 */

$(document).ready(function() {

  /// Main funtion to add a task to the list
  const addTaskToList = () => {

    // Text from the input
    let todoText = $('input').val().trim();

    // Take the first task letter and make it Uppercase
    const firstLetter = todoText.slice(0, 1).toUpperCase();
    // Rest of the letters
    const restOfLetters = todoText.slice(1, todoText.length);
    // The input task is now modified
    todoText = firstLetter + restOfLetters;

    // Declare an empty input
    // let $emptyInput = $('input').val().replace(/^\s+|\s+$/g, "");
    let $emptyInput = $('input').val().trim();

    // If input is not empty:
    if ($emptyInput.length !== 0) {

      // Append new task to the list
      $('ol').append(`
        <li>
          <span class="task"> ${todoText} </span> 
          <span class="trash"   contenteditable="false" title="Click to remove this task from the list"> <i class="fas fa-trash fa-lg">      </i></span>
          <span class="edit"    contenteditable="false" title="Click to edit this task">                 <i class="fas fa-pencil-alt fa-lg"> </i></span>
          <span class="checked" contenteditable="false" title="Click to mark this task as completed">    <i class="far fa-square fa-lg">     </i></span>
        </li>`);
      // Clear the input after a new task is submitted
      $('input').val('');
    }
  }

  // Add the task to the list when (+) button is pressed and when input is not empty
  $('.wrapper').on('click', '#plus', addTaskToList);

  // Add the task to the list when keyboard ENTER is pressed and when input is not empty
  const addToTaskListKeypress = event => {
    event.keyCode === 13 && addTaskToList();
  }

  // Add task to the list if the focus goes outside of the input and the keyboard ENTER is pressed
  $(document, 'input').on('keydown', addToTaskListKeypress);

  // Clear the input if the page is refreshed
  $("input").val('');

  /*
  ██████  ██      ██    ██ ███████
  ██   ██ ██      ██    ██ ██
  ██████  ██      ██    ██ ███████
  ██      ██      ██    ██      ██
  ██      ███████  ██████  ███████
  */
  /*
  ██  ██████  ██████  ███    ██
  ██ ██      ██    ██ ████   ██
  ██ ██      ██    ██ ██ ██  ██
  ██ ██      ██    ██ ██  ██ ██
  ██  ██████  ██████  ██   ████
  */

  let $plusIcon = $('#fa-plus');

  // Hide the (+) icon as default
  $plusIcon.hide();

  // Show the (+) icon when: input is pressed and is empty
  $('.wrapper').on('focus', 'input', () => {
    $plusIcon.show();
  });

  // Hide the (+) icon when a click happens outside of an empty input
  $('input').focusout(() => {
    $('input').val().trim().length === 0 && $plusIcon.hide();
  });

  /*
   ██████  ██████  ███    ███ ██████  ██      ███████ ████████ ███████
  ██      ██    ██ ████  ████ ██   ██ ██      ██         ██    ██
  ██      ██    ██ ██ ████ ██ ██████  ██      █████      ██    █████
  ██      ██    ██ ██  ██  ██ ██      ██      ██         ██    ██
   ██████  ██████  ██      ██ ██      ███████ ███████    ██    ███████
  */

  /// Complete task icon
  $('ol').on('click', 'span.checked', () => {
    // The checkbox becomes ticked and green while the icon is replaced with a checked one
    $(this).closest('span').find('i').toggleClass('fa-square fa-check-square green');
    // The task is dimmed and a line goes through the text
    $(this).parent('li').toggleClass('completed');
  });


  /*
  ███████ ██████  ██ ████████
  ██      ██   ██ ██    ██
  █████   ██   ██ ██    ██
  ██      ██   ██ ██    ██
  ███████ ██████  ██    ██
  */

  // Function to Finish Editing the task
  const finishEditTask = () => {
    $(this).closest('li').prop('contenteditable', false);
    $(this).closest('li').find('span.edit').removeClass('orange');
  }

  /// EDIT TASK
  $('ol').on('click', 'span.edit', function() {

    // Start editing the task
    if (!$(this).parent('li').hasClass('completed')) {
      $(this).closest('li').prop('contenteditable', true).focus().val();

      // Pencil icon toggles orange color
      if ($(this).hasClass('orange')) {
        $(this).removeClass('orange');
      } else {
        $(this).addClass('orange');
      }
    }

    // If ENTER is pressed, the edit finishes
    $('ol').on('keypress', 'li', function(event) {
      if (event.keyCode === 13) {
        $(this).closest('li').prop('contenteditable', false);
        $(this).closest('li').find('span.edit').removeClass('orange');
      }
    });

    // If click goes outside of the task list, the edit finishes
    $('li').on('focusout', finishEditTask);

    // When edit button is clicked again, the edit finishes
    $('li').on('click', 'span.edit', function() {
      if ($(this).closest('li').prop('contenteditable') == 'true') {
        $(this).closest('li').prop('contenteditable', false);
        $(this).closest('li').find('span.edit').removeClass('orange');

        return false;
      }
    });

    // if the Complete checkbox is clicked, the edit function finishes
    $('li').on('click', 'span.checked', finishEditTask);

  });

  /*
  ██████  ███████ ██      ███████ ████████ ███████
  ██   ██ ██      ██      ██         ██    ██
  ██   ██ █████   ██      █████      ██    █████
  ██   ██ ██      ██      ██         ██    ██
  ██████  ███████ ███████ ███████    ██    ███████
  */

  /// DELETE TASK ICON
  $('ol').on('click', 'span.trash', function(event) {

    // Fadeout effect before removal
    $(this).parent().fadeTo(1000, 0.05).fadeOut(250, function() {

      // After the fadeout, the task is removed
      $(this).remove();

    });

    // Prevent bubbling
    event.stopPropagation();
  });

  /// End of Document
});