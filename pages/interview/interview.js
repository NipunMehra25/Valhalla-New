document.addEventListener("DOMContentLoaded", () => {
  // Company filter functionality
  const companyBtns = document.querySelectorAll(".company-btn")
  const questionItems = document.querySelectorAll(".question-item")

  companyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedCompany = btn.dataset.company

      // Update active button
      companyBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      // Filter questions
      questionItems.forEach((item) => {
        if (selectedCompany === "all" || item.dataset.company === selectedCompany) {
          item.style.display = "flex"
        } else {
          item.style.display = "none"
        }
      })
    })
  })

  // Difficulty and topic filters
  const difficultyFilter = document.getElementById("difficulty-filter")
  const topicFilter = document.getElementById("topic-filter")

  function filterQuestions() {
    const selectedDifficulty = difficultyFilter.value
    const selectedTopic = topicFilter.value
    const selectedCompany = document.querySelector(".company-btn.active").dataset.company

    questionItems.forEach((item) => {
      const matchesCompany = selectedCompany === "all" || item.dataset.company === selectedCompany
      const matchesDifficulty = selectedDifficulty === "all" || item.dataset.difficulty === selectedDifficulty
      const matchesTopic = selectedTopic === "all" || item.dataset.topic === selectedTopic

      if (matchesCompany && matchesDifficulty && matchesTopic) {
        item.style.display = "flex"
      } else {
        item.style.display = "none"
      }
    })
  }

  difficultyFilter.addEventListener("change", filterQuestions)
  topicFilter.addEventListener("change", filterQuestions)

  // Mobile navigation
  const navToggle = document.querySelector(".nav-toggle")
  const navMenu = document.querySelector(".nav-menu")

  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
  })

  // Question item hover effects
  questionItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.transform = "translateX(10px) scale(1.02)"
    })

    item.addEventListener("mouseleave", () => {
      item.style.transform = "translateX(0) scale(1)"
    })
  })

  // Mock interview button
  const mockInterviewBtn = document.querySelector(".btn-primary.large")
  mockInterviewBtn.addEventListener("click", () => {
    alert("Mock Interview feature coming soon! This will launch an AI-powered interview simulation.")
  })
})
