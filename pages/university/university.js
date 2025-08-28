document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const navToggle = document.querySelector(".nav-toggle")
  const navMenu = document.querySelector(".nav-menu")

  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
  })

  // Course card hover effects
  const courseCards = document.querySelectorAll(".course-card")

  courseCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-8px) scale(1.02)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)"
    })
  })

  // Assignment filtering
  const filterSelects = document.querySelectorAll(".filter-select")
  const assignmentItems = document.querySelectorAll(".assignment-item")

  filterSelects.forEach((select) => {
    select.addEventListener("change", filterAssignments)
  })

  function filterAssignments() {
    const courseFilter = filterSelects[0].value
    const statusFilter = filterSelects[1].value

    assignmentItems.forEach((item) => {
      const courseTag = item.querySelector(".course-tag").textContent
      const statusBadge = item.querySelector(".status-badge").textContent.toLowerCase()

      const matchesCourse = courseFilter === "All Courses" || courseTag === courseFilter
      const matchesStatus = statusFilter === "All Status" || statusBadge === statusFilter.toLowerCase()

      if (matchesCourse && matchesStatus) {
        item.style.display = "flex"
      } else {
        item.style.display = "none"
      }
    })
  }

  // Progress bar animations
  const progressBars = document.querySelectorAll(".progress-fill")

  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  }

  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBar = entry.target
        const width = progressBar.style.width
        progressBar.style.width = "0%"
        setTimeout(() => {
          progressBar.style.width = width
        }, 100)
      }
    })
  }, observerOptions)

  progressBars.forEach((bar) => {
    progressObserver.observe(bar)
  })

  // Chart bar animations
  const chartBars = document.querySelectorAll(".chart-bar")

  const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target
        const height = bar.style.height
        bar.style.height = "0%"
        setTimeout(() => {
          bar.style.height = height
        }, 200)
      }
    })
  }, observerOptions)

  chartBars.forEach((bar) => {
    chartObserver.observe(bar)
  })

  // Assignment status updates
  const startButtons = document.querySelectorAll(".assignment-item .btn-primary")

  startButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const assignmentItem = e.target.closest(".assignment-item")
      const statusBadge = assignmentItem.querySelector(".status-badge")

      if (button.textContent === "Start Assignment") {
        statusBadge.textContent = "In Progress"
        statusBadge.className = "status-badge pending"
        button.textContent = "Continue"

        // Simulate progress after 2 seconds
        setTimeout(() => {
          statusBadge.textContent = "Completed"
          statusBadge.className = "status-badge completed"
          button.style.display = "none"

          const gradeSpan = document.createElement("span")
          gradeSpan.className = "grade"
          gradeSpan.textContent = "Grade: A-"
          assignmentItem.querySelector(".assignment-status").appendChild(gradeSpan)
        }, 2000)
      }
    })
  })
})
