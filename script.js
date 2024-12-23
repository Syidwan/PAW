document.addEventListener("DOMContentLoaded", () => {
    const createButton = document.getElementById("createButton");
    const createBoards = document.getElementById("createBoards");
    const createBoardCard = document.getElementById("createBoardCard");
    const closeCardButton = document.getElementById("closeCardButton");
    const boardTitleInput = document.getElementById("boardTitle");
    const submitCreateButton = document.getElementById("submitCreateButton");
    const errorText = document.getElementById("errorText");
    const profileButton = document.getElementById('profileButton');
    const profileDropdown = document.getElementById('profileDropdown');
    const logoutButton = document.getElementById('logoutButton');
    const logoutCard = document.getElementById('logoutCard');
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');

// Show the create board card
  createButton.addEventListener("click", () => {
    createBoardCard.classList.remove("hidden");
  });
  createBoards.addEventListener("click", () => {
    createBoardCard.classList.remove("hidden");
  });

  // Close the create board card
  closeCardButton.addEventListener("click", () => {
    createBoardCard.classList.add("hidden");
    resetForm();
  });

  // Enable/Disable Create button based on input
  boardTitleInput.addEventListener("input", () => {
    if (boardTitleInput.value.trim() === "") {
      submitCreateButton.disabled = true;
      submitCreateButton.classList.add("bg-gray-300", "cursor-not-allowed");
      submitCreateButton.classList.remove("bg-[#266CA9]", "hover:bg-[#70C3FF]");
      errorText.classList.remove("hidden");
    } else {
      submitCreateButton.disabled = false;
      submitCreateButton.classList.remove("bg-gray-300", "cursor-not-allowed");
      submitCreateButton.classList.add("bg-[#266CA9]", "hover:bg-[#70C3FF]");
      errorText.classList.add("hidden");
    }
  });

  // Close the card on create button click if valid
  submitCreateButton.addEventListener("click", () => {
    if (!submitCreateButton.disabled) {
      createBoardCard.classList.add("hidden");
      resetForm();
    }
  });
  

  // Reset form fields and button states
  function resetForm() {
    boardTitleInput.value = "";
    submitCreateButton.disabled = true;
    submitCreateButton.classList.add("bg-gray-300", "cursor-not-allowed");
    submitCreateButton.classList.remove("bg-blue-500", "hover:bg-blue-600");
    errorText.classList.add("hidden");
  }
});
// Menampilkan/Menyembunyikan Dropdown
profileButton.addEventListener('click', (e) => {
  e.stopPropagation();
  profileDropdown.classList.toggle('hidden');
});

// Menutup Dropdown Jika Klik di Luar
document.addEventListener('click', () => {
  if (!profileDropdown.classList.contains('hidden')) {
    profileDropdown.classList.add('hidden');
  }
});

// Show Logout Confirmation
logoutButton.addEventListener('click', () => {
    logoutCard.classList.remove('hidden');
  });
  
  // Handle "Yes" Button Click
  yesButton.addEventListener('click', () => {
    window.location.href = 'app/(home)/home.html'; // Redirect to landing page
  });
  
  // Handle "No" Button Click
  noButton.addEventListener('click', () => {
    logoutCard.classList.add('hidden'); // Close the confirmation card
  });
