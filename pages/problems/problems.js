// Sample problems data
const problemsData = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "easy",
    topic: "arrays",
    acceptance: 49.2,
    status: "solved",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: [
      "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].",
    ],
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "medium",
    topic: "linked-lists",
    acceptance: 35.8,
    status: "attempted",
    description: "You are given two non-empty linked lists representing two non-negative integers.",
    examples: ["Input: l1 = [2,4,3], l2 = [5,6,4]\nOutput: [7,0,8]\nExplanation: 342 + 465 = 807."],
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "medium",
    topic: "strings",
    acceptance: 33.1,
    status: "unsolved",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    examples: ['Input: s = "abcabcbb"\nOutput: 3\nExplanation: The answer is "abc", with the length of 3.'],
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "hard",
    topic: "arrays",
    acceptance: 34.2,
    status: "unsolved",
    description:
      "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
    examples: [
      "Input: nums1 = [1,3], nums2 = [2]\nOutput: 2.00000\nExplanation: merged array = [1,2,3] and median is 2.",
    ],
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    difficulty: "medium",
    topic: "strings",
    acceptance: 31.8,
    status: "solved",
    description: "Given a string s, return the longest palindromic substring in s.",
    examples: ['Input: s = "babad"\nOutput: "bab"\nExplanation: "aba" is also a valid answer.'],
  },
  {
    id: 6,
    title: "ZigZag Conversion",
    difficulty: "medium",
    topic: "strings",
    acceptance: 40.1,
    status: "unsolved",
    description: 'The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows.',
    examples: ['Input: s = "PAYPALISHIRING", numRows = 3\nOutput: "PAHNAPLSIIGYIR"'],
  },
  {
    id: 7,
    title: "Reverse Integer",
    difficulty: "medium",
    topic: "arrays",
    acceptance: 26.1,
    status: "attempted",
    description: "Given a signed 32-bit integer x, return x with its digits reversed.",
    examples: ["Input: x = 123\nOutput: 321"],
  },
  {
    id: 8,
    title: "String to Integer (atoi)",
    difficulty: "medium",
    topic: "strings",
    acceptance: 16.4,
    status: "unsolved",
    description: "Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.",
    examples: ['Input: s = "42"\nOutput: 42'],
  },
]

// Generate more problems to reach 1247
function generateMoreProblems() {
  const topics = ["arrays", "strings", "linked-lists", "trees", "graphs", "dynamic-programming", "sorting", "searching"]
  const difficulties = ["easy", "medium", "hard"]
  const statuses = ["solved", "attempted", "unsolved"]

  const additionalProblems = []

  for (let i = 9; i <= 1247; i++) {
    const topic = topics[Math.floor(Math.random() * topics.length)]
    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const acceptance = Math.floor(Math.random() * 70) + 15

    additionalProblems.push({
      id: i,
      title: `Problem ${i}`,
      difficulty,
      topic,
      acceptance,
      status,
      description: `This is the description for problem ${i}. It involves ${topic} and has ${difficulty} difficulty.`,
      examples: [`Example for problem ${i}`],
    })
  }

  return [...problemsData, ...additionalProblems]
}

const allProblems = generateMoreProblems()
let filteredProblems = [...allProblems]
let currentPage = 1
const problemsPerPage = 20

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

// Filter problems
function filterProblems() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase()
  const difficultyFilter = document.querySelector(".filter-btn.active").getAttribute("data-filter")
  const topicFilter = document.getElementById("topicFilter").value
  const statusFilter = document.getElementById("statusFilter").value

  filteredProblems = allProblems.filter((problem) => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm)
    const matchesDifficulty = difficultyFilter === "all" || problem.difficulty === difficultyFilter
    const matchesTopic = topicFilter === "all" || problem.topic === topicFilter
    const matchesStatus = statusFilter === "all" || problem.status === statusFilter

    return matchesSearch && matchesDifficulty && matchesTopic && matchesStatus
  })

  currentPage = 1
  updateProblemCount()
  renderProblems()
  renderPagination()
}

// Sort problems
function sortProblems() {
  const sortBy = document.getElementById("sortBy").value

  filteredProblems.sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title)
      case "difficulty":
        const difficultyOrder = { easy: 1, medium: 2, hard: 3 }
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
      case "acceptance":
        return b.acceptance - a.acceptance
      case "frequency":
        return Math.random() - 0.5 // Random for demo
      default:
        return 0
    }
  })

  renderProblems()
}

// Update problem count
function updateProblemCount() {
  document.getElementById("problemCount").textContent = `(${filteredProblems.length.toLocaleString()})`
}

// Render problems
function renderProblems() {
  const grid = document.getElementById("problemsGrid")
  const startIndex = (currentPage - 1) * problemsPerPage
  const endIndex = startIndex + problemsPerPage
  const pageProblems = filteredProblems.slice(startIndex, endIndex)

  grid.innerHTML = pageProblems
    .map(
      (problem) => `
    <div class="problem-card" data-problem-id="${problem.id}">
      <div class="problem-status ${problem.status}">
        ${problem.status === "solved" ? "✓" : problem.status === "attempted" ? "○" : ""}
      </div>
      <div class="problem-info">
        <div class="problem-title">${problem.title}</div>
        <div class="problem-tags">
          <span class="topic-tag">${problem.topic.replace("-", " ")}</span>
        </div>
      </div>
      <div class="difficulty-badge ${problem.difficulty}">${problem.difficulty}</div>
      <div class="acceptance-rate">${problem.acceptance}%</div>
      <div class="problem-actions">
        <button class="action-btn" title="Bookmark">
          <i class="ri-bookmark-line"></i>
        </button>
        <button class="action-btn" title="Discuss">
          <i class="ri-chat-3-line"></i>
        </button>
      </div>
    </div>
  `,
    )
    .join("")

  // Add click listeners to problem cards
  document.querySelectorAll(".problem-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (!e.target.closest(".action-btn")) {
        const problemId = Number.parseInt(card.getAttribute("data-problem-id"))
        showProblemModal(problemId)
      }
    })
  })
}

// Render pagination
function renderPagination() {
  const totalPages = Math.ceil(filteredProblems.length / problemsPerPage)
  const pageNumbers = document.getElementById("pageNumbers")
  const prevBtn = document.getElementById("prevPage")
  const nextBtn = document.getElementById("nextPage")

  // Update prev/next buttons
  prevBtn.disabled = currentPage === 1
  nextBtn.disabled = currentPage === totalPages

  // Generate page numbers
  let pages = []
  const maxVisiblePages = 5

  if (totalPages <= maxVisiblePages) {
    pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  } else {
    const start = Math.max(1, currentPage - 2)
    const end = Math.min(totalPages, start + maxVisiblePages - 1)
    pages = Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  pageNumbers.innerHTML = pages
    .map(
      (page) => `
    <button class="page-number ${page === currentPage ? "active" : ""}" data-page="${page}">
      ${page}
    </button>
  `,
    )
    .join("")

  // Add click listeners to page numbers
  document.querySelectorAll(".page-number").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentPage = Number.parseInt(btn.getAttribute("data-page"))
      renderProblems()
      renderPagination()
    })
  })
}

// Show problem modal
function showProblemModal(problemId) {
  const problem = allProblems.find((p) => p.id === problemId)
  if (!problem) return

  document.getElementById("modalTitle").textContent = problem.title
  document.getElementById("modalDifficulty").textContent = problem.difficulty
  document.getElementById("modalDifficulty").className = `difficulty-badge ${problem.difficulty}`
  document.getElementById("modalTopic").textContent = problem.topic.replace("-", " ")
  document.getElementById("modalAcceptance").textContent = `${problem.acceptance}%`
  document.getElementById("modalDescription").textContent = problem.description

  const examplesContainer = document.getElementById("modalExamples")
  examplesContainer.innerHTML = problem.examples
    .map(
      (example) => `
    <div class="example">${example}</div>
  `,
    )
    .join("")

  document.getElementById("problemModal").classList.add("active")
}

// Initialize filters
function initFilters() {
  // Search input
  document.getElementById("searchInput").addEventListener("input", filterProblems)

  // Difficulty filter buttons
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")
      filterProblems()
    })
  })

  // Topic and status filters
  document.getElementById("topicFilter").addEventListener("change", filterProblems)
  document.getElementById("statusFilter").addEventListener("change", filterProblems)

  // Sort dropdown
  document.getElementById("sortBy").addEventListener("change", sortProblems)
}

// Initialize pagination
function initPagination() {
  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--
      renderProblems()
      renderPagination()
    }
  })

  document.getElementById("nextPage").addEventListener("click", () => {
    const totalPages = Math.ceil(filteredProblems.length / problemsPerPage)
    if (currentPage < totalPages) {
      currentPage++
      renderProblems()
      renderPagination()
    }
  })
}

// Initialize modal
function initModal() {
  const modal = document.getElementById("problemModal")
  const closeBtn = document.getElementById("closeModal")

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active")
  })

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active")
    }
  })

  // Escape key to close modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      modal.classList.remove("active")
    }
  })
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  generateParticles()
  initFilters()
  initPagination()
  initModal()
  updateProblemCount()
  renderProblems()
  renderPagination()
})

// Handle window resize
window.addEventListener("resize", () => {
  const container = document.getElementById("particles")
  if (container) {
    container.innerHTML = ""
    generateParticles()
  }
})
