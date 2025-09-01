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


// Particle generation
function generateParticles() {
  const container = document.getElementById("particles")
  if (!container) return

  const count = window.innerWidth < 768 ? 30 : 50
  const colors = ["#6e56cf", "#10b981", "#0ea5e9"]

  for (let i = 0; i < count; i++) {
    const size = Math.random() * 4 + 1
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 5}s;
      animation-duration: ${8 + Math.random() * 10}s;
    `
    container.appendChild(particle)
  }
}

// Feature card animations
function initFeatureCards() {
  const cards = document.querySelectorAll(".feature-card")

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) rotateX(5deg)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) rotateX(0)"
    })
  })
}

// Demo tabs functionality
function initDemoTabs() {
  const tabs = document.querySelectorAll(".demo-tab")
  const panels = document.querySelectorAll(".demo-panel")

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs and panels
      tabs.forEach((t) => t.classList.remove("active"))
      panels.forEach((p) => p.classList.remove("active"))

      // Add active class to clicked tab
      tab.classList.add("active")

      // Show corresponding panel
      const demoType = tab.getAttribute("data-demo")
      const panel = document.getElementById(`${demoType}-demo`)
      if (panel) {
        panel.classList.add("active")
      }
    })
  })
}

// Animate progress bars
function animateProgressBars() {
  const bars = document.querySelectorAll(".bar")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target
          const height = bar.style.height
          bar.style.height = "0%"

          setTimeout(() => {
            bar.style.height = height
          }, 100)
        }
      })
    },
    { threshold: 0.5 },
  )

  bars.forEach((bar) => observer.observe(bar))
}

// Simulate code execution
function initCodeDemo() {
  const runBtn = document.querySelector(".run-btn")
  const submitBtn = document.querySelector(".submit-btn")
  const output = document.querySelector(".output-content")

  if (runBtn) {
    runBtn.addEventListener("click", () => {
      output.textContent = "⏳ Running tests..."
      output.style.color = "#fbbf24"

      setTimeout(() => {
        output.textContent = "✅ All test cases passed!"
        output.style.color = "#10b981"
      }, 1500)
    })
  }

  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      output.textContent = "🎉 Solution accepted! Runtime: 52ms"
      output.style.color = "#6e56cf"
    })
  }
}

// Typing animation for AI chat
function initAITyping() {
  const messages = document.querySelectorAll(".chat-message.bot .message-content")

  messages.forEach((message, index) => {
    const text = message.textContent
    message.textContent = ""

    setTimeout(() => {
      let i = 0
      const typeInterval = setInterval(() => {
        message.textContent += text[i]
        i++
        if (i >= text.length) {
          clearInterval(typeInterval)
        }
      }, 30)
    }, index * 2000)
  })
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  generateParticles()
  initFeatureCards()
  initDemoTabs()
  animateProgressBars()
  initCodeDemo()

  // Delay AI typing animation
  setTimeout(initAITyping, 1000)
})

// Handle window resize
window.addEventListener("resize", () => {
  const container = document.getElementById("particles")
  if (container) {
    container.innerHTML = ""
    generateParticles()
  }
})
