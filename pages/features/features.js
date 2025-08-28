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
