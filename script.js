/* jshint esversion: 6 */

$(document).ready(function() {

  /// ADD TASK TO THE LIST FUNCTION
  function addTaskToList() {

    // Text from the input
    let todoText = $('input').val();

    // Separate the first letter, make it Uppercase
    let firstLetter = todoText.slice(0, 1).toUpperCase();
    // Rest of lettersT
    let restOfLetters = todoText.slice(1, todoText.length);
    // Join the new sentence
    todoText = firstLetter + restOfLetters;

    let $emptyInput = $('input').val().replace(/^\s+|\s+$/g, "");

    // If input is empty:
    if ($emptyInput.length !== 0) {

      // Append new task to the list
      $('ol').append(`
    <li>
      <span class="task"> ${todoText} </span> 
      <span class="trash"   contenteditable="false" title="Click to remove this task from the list"> <i class="fas fa-trash fa-lg">      </i></span>
      <span class="edit"    contenteditable="false" title="Click to edit this task">                 <i class="fas fa-pencil-alt fa-lg"> </i></span>
      <span class="checked" contenteditable="false" title="Click to mark this task as completed">    <i class="far fa-square fa-lg">     </i></span>
    </li>`);
      // Clear the input after new task is inserted
      $('input').val('');

    }
  }

  // Add the task to the list when (+) button is pressed and when input is not empty
  $('.wrapper').on('click', '#plus', addTaskToList);

  // Add the task to the list when keyboard ENTER (keycode: 13) is pressed && when input is not empty
  function addToTaskListKeypress(event) {
    if (event.keyCode === 13) {
      addTaskToList();
    }
  }

  // Add task to the list if a click happens anywhere else on the document and when keyboard ENTER is pressed
  $(document, 'input').on('keypress', addToTaskListKeypress);

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

  let $plusIcon = $('.fa-plus');

  // Hide the (+) icon as default
  $plusIcon.hide();

  // Show the (+) icon when: input is pressed and is empty
  $('.wrapper').on('focus', 'input', function() {
    $plusIcon.show();
  });

  // Hide the (+) icon when a click happens outside of the input and input is empty
  $('input').focusout(function() {

    if ($('input').val().replace(/^\s+|\s+$/g, "").length === 0) {
      $plusIcon.hide();
    }
  });

  /*
   ██████  ██████  ███    ███ ██████  ██      ███████ ████████ ███████
  ██      ██    ██ ████  ████ ██   ██ ██      ██         ██    ██
  ██      ██    ██ ██ ████ ██ ██████  ██      █████      ██    █████
  ██      ██    ██ ██  ██  ██ ██      ██      ██         ██    ██
   ██████  ██████  ██      ██ ██      ███████ ███████    ██    ███████
  */

  /// COMPLETE TASK ICON
  $('ol').on('click', 'span.checked', function() {

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
  function finishEditTask() {
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
    $(this).parent().fadeTo(1000, 0.05).fadeOut(10, function() {

      // After the fadeout, the task is removed
      $(this).remove();

    });

    // Prevent bubbling
    event.stopPropagation();
  });

  /// End of Document
});