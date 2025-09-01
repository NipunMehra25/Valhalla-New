document.addEventListener("DOMContentLoaded", () => {
  // Tab functionality
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetTab = btn.dataset.tab

      // Remove active class from all tabs and contents
      tabBtns.forEach((b) => b.classList.remove("active"))
      tabContents.forEach((c) => c.classList.remove("active"))

      // Add active class to clicked tab and corresponding content
      btn.classList.add("active")
      document.getElementById(targetTab)?.classList.add("active")
    })
  })

  // Mobile navigation
  const navToggle = document.querySelector(".nav-toggle")
  const navMenu = document.querySelector(".nav-menu")

  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
  })

  // Contest card interactions
  const contestCards = document.querySelectorAll(".contest-card")
  contestCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) rotateX(5deg)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) rotateX(0)"
    })
  })

  // Simulate live contest timer updates
  const liveTimers = document.querySelectorAll(".contest-card.live .contest-info span:first-child")

  liveTimers.forEach((timer) => {
    setInterval(() => {
      const t = timer.textContent || ""
      if (t.includes("2h 15m")) timer.textContent = "⏱️ 2h 14m left"
      else if (t.includes("45m")) timer.textContent = "⏱️ 44m left"
    }, 60000) // Update every minute
  })
})
