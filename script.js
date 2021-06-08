$(document).ready(function() {

  /// Main funtion to add a task to the list
  const addTask = () => {

    // The input text is taken and trimmed to remove whitespace
    let todoText = $('input').val().trim();
    // Take the first task letter and make it Uppercase
    const firstLetter = todoText.slice(0, 1).toUpperCase();
    // Rest of the letters
    const restOfLetters = todoText.slice(1, todoText.length);
    // The input text is now modified
    todoText = firstLetter + restOfLetters;

    // Declare an empty input
    // let $emptyInput = $('input').val().replace(/^\s+|\s+$/g, "");
    let $emptyInput = $('input').val().trim();

    // If input is not empty:
    if ($emptyInput.length !== 0) {

      // Append the new task to the list
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
    
    // End of addTask function
  };

  // Add the task to the list when (+) button is pressed while input is not empty
  $('.wrapper').on('click', '#plus', addTask);

  // Add the task to the list when keyboard ENTER is pressed while input is not empty
  const addToTaskListKeypress = event => {
    event.keyCode === 13 && addTask();
  }

  // Add the task to the list if the focus goes outside of the input and the keyboard ENTER is pressed
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

  // Show the (+) icon if: input is pressed and input is empty
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

  /// Complete a task by clicking the square icon
  $('ol').on('click', 'span.checked', completeTask);

  // Complete function
  function completeTask() {
    // The checkbox becomes ticked and green while the icon is replaced with a checked one
    $(this).closest('span').find('i').toggleClass('fa-square fa-check-square green');
    // The task is dimmed and a line goes through the text
    $(this).parent('li').toggleClass('completed');
  }

  /*
  ███████ ██████  ██ ████████
  ██      ██   ██ ██    ██
  █████   ██   ██ ██    ██
  ██      ██   ██ ██    ██
  ███████ ██████  ██    ██
  */

  /// Edit a task by clicking the pencil icon
  $('ol').on('click', 'span.edit', editTask);

  // Edit function
  function editTask() {
    // Start editing the task if it is not marked as completed
    if (!$(this).parent('li').hasClass('completed')) {
      // The focus is moved to the task, which can now be edited
      $(this).closest('li').prop('contenteditable', true).focus().val();

      // Pencil icon toggles orange color when edit is active/inactive
      if ($(this).hasClass('orange')) {
        $(this).removeClass('orange');
      } else {
        $(this).addClass('orange');
      }
    }

    // Function to finish editing the task
    function stopEditTask() {
      $(this).closest('li').prop('contenteditable', false);
      $(this).closest('li').find('span.edit').removeClass('orange');
    };

    // If ENTER is pressed during edit, the edit stops
    $('ol').on('keypress', 'li', event => {
      if (event.keyCode === 13) {
        $(this).closest('li').prop('contenteditable', false);
        // As the edit finishes, the orange color is removed
        $(this).closest('li').find('span.edit').removeClass('orange');
      }
    });

    // If during edit a click happens outside the task list, the edit stops
    $('li').on('focusout', stopEditTask);

    // Editception = when the edit button is clicked again during edit, the edit stops
    $('li').on('click', 'span.edit', () => {
      if ($(this).closest('li').prop('contenteditable') == 'true') {
        $(this).closest('li').prop('contenteditable', false);
        $(this).closest('li').find('span.edit').removeClass('orange');

        return false;
      }
    });

    // If the Complete square box is clicked during edit, the edit stops
    $('li').on('click', 'span.checked', stopEditTask);

    // End of editTask function
  }

  /*
  ██████  ███████ ██      ███████ ████████ ███████
  ██   ██ ██      ██      ██         ██    ██
  ██   ██ █████   ██      █████      ██    █████
  ██   ██ ██      ██      ██         ██    ██
  ██████  ███████ ███████ ███████    ██    ███████
  */

  /// Delete a task by clicking the recycle bin icon
  $('ol').on('click', 'span.trash', deleteTask);

  // Delete function
  function deleteTask(event) {
    // Fadeout effect before removal
    $(this).parent().fadeTo(1000, 0.05).fadeOut(250, function() {
      // After the fadeout, the task is removed
      $(this).remove();
    });
    // Prevent bubbling
    event.stopPropagation();
  }

  /// End of Document
});