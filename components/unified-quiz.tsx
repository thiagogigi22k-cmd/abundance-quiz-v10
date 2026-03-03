"use client"
// RESTORED VERSION FROM COMMIT 8f20ef5
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Check, Star, Sparkles } from "lucide-react"

// Step types
type StepType = "continue" | "journey" | "unlocked" | "question" | "unlock-screen" | "motivational" | "final"

interface QuestionStep {
  type: "question"
  question: string
  options: string[]
  badge: string
  progress: number
}

interface UnlockStep {
  type: "unlock-screen"
  title: string
  description: string
  image: string
  buttonText?: string
}

interface MotivationalStep {
  type: "motivational"
  title: string
  description: string
  image: string
  buttonText: string
  addToBalance?: number
}

// All steps data
const quizSteps: Array<{ type: StepType } & Partial<QuestionStep> & Partial<UnlockStep> & Partial<MotivationalStep>> = [
  { type: "continue" },
  { type: "journey" },
  { type: "unlocked" },
  {
    type: "question",
    question: "{name}, do you feel like you're living the life God dreamed for you?",
    options: ["Yes, but I know I can live more", "No, I feel I'm far from it", "Sometimes I wonder about this..."],
    badge: "Financial Awakening",
    progress: 10,
  },
  {
    type: "question",
    question: "How often do you feel an emptiness in your chest... as if something is missing?",
    options: ["Every day", "A few times a week", "Rarely"],
    badge: "Financial Awakening",
    progress: 14,
  },
  {
    type: "question",
    question: "Do you feel stuck in the same negative cycles for years?",
    options: ["Yes, it feels like a loop", "Sometimes I feel this", "I'm not sure"],
    badge: "Financial Awakening",
    progress: 19,
  },
  {
    type: "question",
    question: "If the life you live today was the direct result of your own choices... would you be satisfied?",
    options: ["No, I want to change", "More or less", "Yes, but I want more"],
    badge: "Financial Awakening",
    progress: 24,
  },
  {
    type: "unlock-screen",
    title: "I Choose My Future",
    description: "The power to change your life is in your hands!",
    image: "/images/man-silhouette-stars.jpg",
  },
  {
    type: "question",
    question: "How many times have you asked God for a sign to change your life?",
    options: ["Many times", "A few times", "I don't usually ask for signs", "This is my first time"],
    badge: "Faith & Spiritual Purpose",
    progress: 29,
  },
  {
    type: "question",
    question: "{name}, if today were your final faith test... what would you do right now?",
    options: [
      "I would take action like someone who believes in miracles",
      "I'd take a small, scared step... but still take a step",
      "I'd stay frozen... one more time... just like the other times I gave up",
    ],
    badge: "Faith & Spiritual Purpose",
    progress: 33,
  },
  {
    type: "question",
    question: "Do you believe God can transform your life with just one single decision from you?",
    options: ["Yes, absolutely", "I have doubts", "I don't know"],
    badge: "Faith & Spiritual Purpose",
    progress: 38,
  },
  {
    type: "question",
    question: "Are you willing to make TODAY your day of faith and responsibility for your new life?",
    options: ["Yes, I'm ready", "I need a clearer sign", "No"],
    badge: "Faith & Spiritual Purpose",
    progress: 43,
  },
  {
    type: "unlock-screen",
    title: "Faith Decision",
    description: "Your Faith Will Move Mountains",
    image: "/images/praying-hands.jpg",
  },
  {
    type: "question",
    question: "If God gave you the chance to win your dream home... what would it look like?",
    options: ["Large, with several rooms", "A modern apartment", "A simple house, but full of peace", "I don't think much about it"],
    badge: "Future Visualization",
    progress: 48,
  },
  {
    type: "unlock-screen",
    title: "Dream Home",
    description: "Your Dream Home Is on Its Way",
    image: "/images/dream-home.jpg",
  },
  {
    type: "question",
    question: "What car do you imagine parked in front of your ideal home?",
    options: ["A luxury SUV", "A comfortable sedan", "A simple but reliable car", "I don't care about cars"],
    badge: "Future Visualization",
    progress: 52,
  },
  {
    type: "unlock-screen",
    title: "Dream Car",
    description: "Your Dream Car Is Reserved",
    image: "/images/dream-car.jpg",
  },
  {
    type: "question",
    question: "What is your family life like today?",
    options: [
      "I feel there's a lack of unity",
      "I miss someone special",
      "I have a good family, but we can be happier",
      "I don't think much about it",
    ],
    badge: "Future Visualization",
    progress: 57,
  },
  {
    type: "unlock-screen",
    title: "Happy Family",
    description: "The Happy Family You Deserve",
    image: "/images/happy-family.jpg",
  },
  {
    type: "question",
    question: "If you could wake up tomorrow with perfect health... what would be different?",
    options: [
      "More energy to chase my dreams",
      "Being able to play sports without pain",
      "Feeling good about my body",
      "My health is good, but I want more vitality",
    ],
    badge: "Future Visualization",
    progress: 62,
  },
  {
    type: "unlock-screen",
    title: "Perfect Health",
    description: "Your Perfect Health Is Activated",
    image: "/images/perfect-health.jpg",
  },
  {
    type: "question",
    question: "If you received a large sum of money today... what would you do first?",
    options: ["Pay off my debts", "Buy a house", "Fulfill my family's dream", "Invest in my future"],
    badge: "Future Visualization",
    progress: 67,
  },
  {
    type: "unlock-screen",
    title: "Abundance",
    description: "Imagine... $277,000 being deposited into your account right now!",
    image: "/images/abundance.jpg",
    buttonText: "YES! I believe, I receive!",
  },
  {
    type: "motivational",
    title: "{name}",
    description: "Your manifestation potential depends on your choice, think big to manifest big things, you are the size of your courage.",
    image: "/images/abundance.jpg",
    buttonText: "Continue Journey",
    addToBalance: 2000000,
  },
  {
    type: "question",
    question: "Imagine that 30 days from now, your life is 100% transformed. Which of these images represents your future?",
    options: [
      "Luxury home and financial freedom",
      "Perfect health and vitality",
      "Happy family and love",
      "Travel and new experiences",
    ],
    badge: "Future Visualization",
    progress: 71,
  },
  {
    type: "unlock-screen",
    title: "100x Boost",
    description: "Your Manifestation Power Just Multiplied by 100x",
    image: "/images/100x-boost.jpg",
  },
  {
    type: "question",
    question: "Do you feel there's something spiritual or emotional blocking you?",
    options: ["Yes, a weight I can't explain", "Sometimes I feel this", "No"],
    badge: "Breaking Blocks",
    progress: 76,
  },
  {
    type: "question",
    question: "Which of these statements best describes you?",
    options: [
      "I feel cursed, nothing ever works out for me",
      "My life has never been easy",
      "I don't feel worthy",
      "I lack energy and motivation",
    ],
    badge: "Breaking Blocks",
    progress: 81,
  },
  {
    type: "unlock-screen",
    title: "Blocks Broken",
    description: "All Mental Blocks Have Been Removed",
    image: "/images/blocks-broken.jpg",
  },
  {
    type: "question",
    question: "Do you accept to be part of a group of people who decided to create their dream life through the power of faith?",
    options: ["Yes, I accept", "I'm not sure", "I need to think about it"],
    badge: "Final Choice",
    progress: 86,
  },
  {
    type: "question",
    question: "If you could change just one thing right now... what would it be?",
    options: ["My financial situation", "My relationships", "My health", "My purpose in life"],
    badge: "Final Choice",
    progress: 90,
  },
  {
    type: "question",
    question: "If God gave you the chance to start over today... would you accept?",
    options: ["Yes, without hesitation", "Yes, but with some fear", "I'm not ready"],
    badge: "Final Choice",
    progress: 95,
  },
  {
    type: "question",
    question: 'To finish... complete this sentence:\n"From today onwards..."',
    options: [
      "I choose to live in abundance",
      "I accept the destiny God has reserved for me",
      "I free myself from everything that was blocking me",
    ],
    badge: "Final Choice",
    progress: 100,
  },
  { type: "final" },
]

const achievements = [
  { name: "I Choose My Future", image: "/images/man-silhouette-stars.jpg", unlockedAtStep: 7 },
  { name: "Faith Decision", image: "/images/praying-hands.jpg", unlockedAtStep: 12 },
  { name: "Dream Home", image: "/images/dream-home.jpg", unlockedAtStep: 14 },
  { name: "Dream Car", image: "/images/dream-car.jpg", unlockedAtStep: 16 },
  { name: "Happy Family", image: "/images/happy-family.jpg", unlockedAtStep: 18 },
  { name: "Perfect Health", image: "/images/perfect-health.jpg", unlockedAtStep: 20 },
  { name: "Abundance", image: "/images/abundance.jpg", unlockedAtStep: 22 },
  { name: "100x Boost", image: "/images/100x-boost.jpg", unlockedAtStep: 25 },
  { name: "Blocks Broken", image: "/images/blocks-broken.jpg", unlockedAtStep: 28 },
  { name: "100x Multiplication", image: "/images/100x-multiplication.jpg", unlockedAtStep: 2 },
]

const notifications = [
  { emoji: "\u{1F3E0}", text: "Manifesting your dream home in the spiritual realm..." },
  { emoji: "\u{1F697}", text: "Reserving your ideal car..." },
  { emoji: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}", text: "Aligning your family happiness..." },
  { emoji: "\u{1F497}", text: "Activating perfect health protocols..." },
  { emoji: "\u{1F513}", text: "Breaking spiritual and emotional blocks..." },
  { emoji: "\u{1F31F}", text: "Preparing your 100x manifestation boost..." },
  { emoji: "\u{1F4B0}", text: "Unlocking abundance channels..." },
  { emoji: "\u2728", text: "Finalizing your divine script..." },
]

const portals = [
  { name: "I Choose My Future", image: "/images/man-silhouette-stars.jpg" },
  { name: "Faith Decision", image: "/images/praying-hands.jpg" },
  { name: "Dream Home", image: "/images/dream-home.jpg" },
  { name: "Dream Car", image: "/images/dream-car.jpg" },
  { name: "Happy Family", image: "/images/happy-family.jpg" },
  { name: "Perfect Health", image: "/images/perfect-health.jpg" },
  { name: "Abundance", image: "/images/abundance.jpg" },
  { name: "100x Boost", image: "/images/100x-boost.jpg" },
  { name: "Blocks Broken", image: "/images/blocks-broken.jpg" },
  { name: "100x Multiplication", image: "/images/100x-multiplication.jpg" },
]

export default function UnifiedQuiz() {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(0)
  const [name, setName] = useState(searchParams.get("name") || "Friend")
  const [amount, setAmount] = useState("")
  const [balance, setBalance] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState("Starting transformation...")
  const [isComplete, setIsComplete] = useState(false)
  const [visibleNotifications, setVisibleNotifications] = useState<Array<{ id: number; index: number }>>([])
  const [cardAnimationIndex, setCardAnimationIndex] = useState(-1)
  const notificationIdRef = useRef(0)
  const notificationTimerRef = useRef<NodeJS.Timeout | null>(null)

  const currentNotificationIndexRef = useRef(0)
  const [showOffer, setShowOffer] = useState(false)
  const vturbRef = useRef<HTMLDivElement | null>(null)
  const offerRef = useRef<HTMLDivElement | null>(null)
  const secondCardRef = useRef<HTMLDivElement | null>(null)

  const currentDate = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })

  const formatBalance = (value: number) => value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  const stepData = quizSteps[currentStep]

  // Derive visible portals directly from progress (0-100 maps to 1-10 portals)
  const visiblePortalCount = stepData?.type === "final" ? Math.min(portals.length, Math.max(1, Math.ceil((progress / 100) * portals.length))) : 0

  const getUnlockedAchievements = () => achievements.filter((a) => currentStep >= a.unlockedAtStep)

  const goToNextStep = (delay = 0) => {
    if (delay > 0) {
      setIsLoading(true)
      setTimeout(() => { setIsLoading(false); setCurrentStep((prev) => prev + 1); setSelectedOption(null) }, delay)
    } else {
      setCurrentStep((prev) => prev + 1); setSelectedOption(null)
    }
  }

  const handleOptionClick = (index: number) => { setSelectedOption(index); goToNextStep(1000) }
  const handleContinue = () => goToNextStep(0)
  const handleJourneySubmit = () => { if (amount) { setBalance(Number.parseFloat(amount) * 100); goToNextStep(0) } }
  const handleMotivational = (addAmount?: number) => { if (addAmount) setBalance((prev) => prev + addAmount); goToNextStep(0) }

  const replaceNamePlaceholder = (text: string) => text.replace(/{name}/g, name)

  const getProgress = () => {
    if (stepData?.type === "question") return (stepData as QuestionStep).progress
    for (let i = currentStep - 1; i >= 0; i--) { if (quizSteps[i]?.type === "question") return (quizSteps[i] as QuestionStep).progress }
    return 5
  }

  // Preload seed card images from the very start of the quiz
  useEffect(() => {
    const seedImages = ["/images/seed-barren.jpg", "/images/seed-sprout.jpg", "/images/seed-tree.jpg", "/images/seed-golden.jpg", "/images/seed-divine.jpg"]
    seedImages.forEach((src) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.as = "image"
      link.href = src
      document.head.appendChild(link)
    })
  }, [])

  // Final screen progress animation
  useEffect(() => {
    if (stepData?.type !== "final") return
    const duration = 25000; const interval = 100; const increment = 100 / (duration / interval)
    const timer = setInterval(() => {
      setProgress((prev) => {
        const np = prev + increment
        if (np < 20) setStatusText("Starting transformation...")
        else if (np < 40) setStatusText("Analyzing your answers...")
        else if (np < 60) setStatusText("Aligning divine energies...")
        else if (np < 80) setStatusText("Preparing your manifestation...")
        else setStatusText("Finalizing your script...")
        if (np >= 100) {
          clearInterval(timer); setIsComplete(true)
          setTimeout(() => { let idx = 0; const ct = setInterval(() => { setCardAnimationIndex(idx); idx++; if (idx >= portals.length) clearInterval(ct) }, 150) }, 300)
          return 100
        }
        return np
      })
    }, interval)
    return () => clearInterval(timer)
  }, [stepData?.type])

  // Final screen notifications
  useEffect(() => {
    if (stepData?.type !== "final") return
    if (isComplete) { if (notificationTimerRef.current) clearInterval(notificationTimerRef.current); setVisibleNotifications([]); return }
    const startDelay = setTimeout(() => {
      const firstId = notificationIdRef.current++
      setVisibleNotifications([{ id: firstId, index: 0 }]); currentNotificationIndexRef.current = 0
      notificationTimerRef.current = setInterval(() => {
        currentNotificationIndexRef.current = (currentNotificationIndexRef.current + 1) % notifications.length
        const newId = notificationIdRef.current++; const newIndex = currentNotificationIndexRef.current
        setVisibleNotifications((prev) => { const updated = [...prev, { id: newId, index: newIndex }]; return updated.length > 3 ? updated.slice(-3) : updated })
      }, 3000)
    }, 3000)
    return () => { clearTimeout(startDelay); if (notificationTimerRef.current) clearInterval(notificationTimerRef.current) }
  }, [stepData?.type, isComplete])

  // Load Vturb script when final screen completes
  useEffect(() => {
    if (!isComplete) return
    const DELAY_SECONDS = 448 // 7:28
    const timer = setTimeout(() => {
      if (vturbRef.current && !vturbRef.current.querySelector("vturb-smartplayer")) {
        const player = document.createElement("vturb-smartplayer")
        player.id = "vid-69990b836aee4c1df8327a79"
        player.style.cssText = "display: block; margin: 0 auto; width: 100%; max-width: 400px;"
        vturbRef.current.appendChild(player)
        const s = document.createElement("script")
        s.src = "https://scripts.converteai.net/f8e465b5-f483-4d08-be19-bc14de388e59/players/69990b836aee4c1df8327a79/v4/player.js"
        s.async = true
        document.head.appendChild(s)

        // Listen for player ready, then watch video time to show offer at 7:28
        player.addEventListener("player:ready", () => {
          const checkTime = setInterval(() => {
            try {
              const w = window as any
              if (w.smartplayer?.instances?.[0]?.video?.currentTime >= DELAY_SECONDS) {
                setShowOffer(true)
                clearInterval(checkTime)
              }
            } catch {}
          }, 1000)
        })
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [isComplete])

  // Auto-scroll to second card ($17) when offer appears - shows $17 and $27 cards
  useEffect(() => {
    if (showOffer && secondCardRef.current) {
      setTimeout(() => {
        secondCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 200)
    }
  }, [showOffer])

  // Render Continue screen
  const renderContinueScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-[#0d0d1a] via-[#1a1a2e] to-[#0d0d1a] text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md mx-auto flex flex-col items-center">
          <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#F9D423] rounded-full opacity-20 animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-r from-[#D4AF37] to-[#F9D423] rounded-full opacity-40" />
            <div className="absolute inset-4 bg-[#0d0d1a] rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-[#D4AF37]" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-4 text-[#D4AF37]">{name}, before we continue...</h1>
          <div className="bg-[#1a1a2e]/80 rounded-2xl p-6 border border-[#D4AF37]/20 w-full">
            <div className="text-center">
              <p className="text-gray-300 mb-4">Repeat this phrase out loud:</p>
              <p className="text-xl font-semibold text-[#F9D423] mb-4">
                {'"The life of my dreams begins'} {'with my choice."'}
              </p>
              <p className="text-sm text-gray-400">Only click continue after repeating it out loud.</p>
            </div>
          </div>
          <button onClick={handleContinue} className="w-full mt-6 bg-gradient-to-r from-[#D4AF37] to-[#F9D423] text-black font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]">
            Continue Journey
          </button>
        </div>
      </div>
    </div>
  )

  // Render Journey screen
  const renderJourneyScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-[#0d0d1a] via-[#1a1a2e] to-[#0d0d1a] text-white flex flex-col">
      <div className="bg-[#0d0d1a]/90 backdrop-blur-sm border-b border-[#D4AF37]/20 px-4 py-3">
        <div className="max-w-md mx-auto">
          <p className="text-sm text-gray-400">Hello, {name}</p>
          <p className="text-xs text-[#D4AF37]">Your Journey has begun...</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-gray-500">ACCOUNT BALANCE</span>
            <span className="text-lg font-bold text-[#D4AF37]">$0.00</span>
          </div>
          <div className="mt-1">
            <p className="text-xs text-gray-500">Your energy is aligning with the divine...</p>
            <p className="text-xs text-[#D4AF37]">5%</p>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md mx-auto flex flex-col items-center">
          <div className="relative w-20 h-20 mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#F9D423] rounded-full opacity-20 animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-r from-[#D4AF37] to-[#F9D423] rounded-full opacity-40" />
            <div className="absolute inset-4 bg-[#0d0d1a] rounded-full flex items-center justify-center">
              <Star className="w-6 h-6 text-[#D4AF37]" />
            </div>
          </div>
          <span className="text-[#D4AF37] text-sm font-medium mb-4">Financial Awakening</span>
          <p className="text-xl text-center text-white mb-6">{name}, if you looked at your bank account today, how much would you have available?</p>
          <input type="text" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))} className="w-full bg-white border-2 border-[#D4AF37] rounded-lg py-3.5 px-4 text-black text-center placeholder-gray-500 focus:outline-none focus:border-[#F9D423] mb-4" />
          <button onClick={handleJourneySubmit} className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F9D423] text-black font-bold py-4 px-6 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]">Continue</button>
        </div>
      </div>
    </div>
  )

  // Render Unlocked (100x multiplication) screen
  const renderUnlockedScreen = () => {
    const displayBalance = formatBalance(balance)
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0d0d1a] via-[#1a1a2e] to-[#0d0d1a] text-white flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <div className="w-full max-w-md mx-auto flex flex-col items-center">
            <div className="relative w-32 h-32 mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#F9D423] rounded-full opacity-30 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Image src="/images/100x-multiplication.jpg" alt="100x Multiplication" fill className="object-cover rounded-full" />
              </div>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Check className="w-6 h-6 text-green-500" />
              <span className="text-green-500 font-bold text-lg">UNLOCKED!</span>
            </div>
            <div className="bg-[#1a1a2e]/80 rounded-2xl p-6 border border-[#D4AF37]/20 w-full text-center">
              <h2 className="text-2xl font-bold text-[#D4AF37] mb-2">100x Multiplication</h2>
              <p className="text-gray-300 mb-4">{name}, today I{"'"}m adding 100x more to your account {"—"} do you believe?</p>
              <p className="text-3xl font-bold text-[#F9D423]">New Balance: ${displayBalance}</p>
            </div>
            <button onClick={handleContinue} className="w-full mt-6 bg-gradient-to-r from-[#D4AF37] to-[#F9D423] text-black font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]">
              <Sparkles className="w-5 h-5" />
              YES! I receive 100x more!
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Render Question screen
  const renderQuestionScreen = () => {
    const data = stepData as QuestionStep
    const unlockedAchievements = getUnlockedAchievements()
    const totalPortals = portals.length
    const lockedCount = totalPortals - unlockedAchievements.length
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0d0d1a] via-[#1a1a2e] to-[#0d0d1a] text-white flex flex-col">
        <div className="bg-[#0d0d1a]/90 backdrop-blur-sm border-b border-[#D4AF37]/20 px-4 py-3">
          <div className="max-w-md mx-auto">
            <p className="text-sm text-gray-400">Hello, {name}</p>
            <p className="text-xs text-[#D4AF37]">Your Journey has begun...</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-gray-500">ACCOUNT BALANCE</span>
              <span className="text-lg font-bold text-[#D4AF37]">${formatBalance(balance)}</span>
            </div>
            <div className="mt-1">
              <p className="text-xs text-gray-500">Your energy is aligning with the divine...</p>
              <p className="text-xs text-[#D4AF37]">{data.progress}%</p>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 border-b border-[#D4AF37]/10">
          <div className="max-w-md mx-auto">
            <div className="grid grid-cols-5 gap-2">
              {portals.slice(0, Math.ceil(Math.max(unlockedAchievements.length, 1) / 5) * 5).map((portal, i) => {
                const isUnlocked = i < unlockedAchievements.length
                return isUnlocked ? (
                  <div key={i} className="flex flex-col items-center">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#D4AF37]">
                      <Image src={unlockedAchievements[i]?.image || portal.image} alt={portal.name} fill className="object-cover" />
                    </div>
                    <span className="text-[8px] text-center text-[#D4AF37] mt-1 leading-tight">{unlockedAchievements[i]?.name.split(" ").slice(0, 2).join("\n")}</span>
                  </div>
                ) : (
                  <div key={i} className="flex flex-col items-center opacity-40">
                    <div className="w-12 h-12 rounded-full bg-[#1a1a2e] border-2 border-gray-600 flex items-center justify-center">
                      <span className="text-gray-500 text-lg">?</span>
                    </div>
                    <span className="text-[8px] text-center text-gray-500 mt-1">Locked</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <div className="w-full max-w-md mx-auto flex flex-col items-center">
            <span className="text-[#D4AF37] text-sm font-medium mb-4">{data.badge}</span>
            {isLoading ? (
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400">Processing your answer...</p>
              </div>
            ) : (
              <>
                <p className="text-xl text-center text-white mb-6 whitespace-pre-line">{replaceNamePlaceholder(data.question)}</p>
                <div className="w-full space-y-3">
                  {data.options.map((option, index) => (
                    <button key={index} onClick={() => handleOptionClick(index)} className={`w-full bg-[#F9D423] text-black font-medium py-3.5 px-4 rounded-lg text-left transition-all ${selectedOption === index ? "ring-4 ring-[#D4AF37] ring-offset-2 ring-offset-[#0d0d1a] scale-[1.02]" : "hover:bg-[#E5C31F]"}`}>
                      {option}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Render Unlock achievement screen
  const renderUnlockScreen = () => {
    const data = stepData as UnlockStep
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0d0d1a] via-[#1a1a2e] to-[#0d0d1a] text-white flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <div className="w-full max-w-md mx-auto flex flex-col items-center">
            <div className="relative w-32 h-32 mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#F9D423] rounded-full opacity-30 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Image src={data.image} alt={data.title} fill className="object-cover rounded-full" />
              </div>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Check className="w-6 h-6 text-green-500" />
              <span className="text-green-500 font-bold text-lg">UNLOCKED!</span>
            </div>
            <div className="bg-[#1a1a2e]/80 rounded-2xl p-6 border border-[#D4AF37]/20 w-full text-center">
              <h2 className="text-2xl font-bold text-[#D4AF37] mb-2">{data.title}</h2>
              <p className="text-gray-300">{data.description}</p>
            </div>
            <button onClick={handleContinue} className="w-full mt-6 bg-gradient-to-r from-[#D4AF37] to-[#F9D423] text-black font-bold py-4 px-6 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
              {data.buttonText || "Continue Evolution"}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Render Motivational screen
  const renderMotivationalScreen = () => {
    const data = stepData as MotivationalStep
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0d0d1a] via-[#1a1a2e] to-[#0d0d1a] text-white flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <div className="w-full max-w-md mx-auto flex flex-col items-center">
            <div className="relative w-32 h-32 mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#F9D423] rounded-full opacity-30 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Image src={data.image} alt={data.title} fill className="object-cover rounded-full" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">{replaceNamePlaceholder(data.title)}</h2>
            <p className="text-center text-gray-300 mb-6">{data.description}</p>
            <button onClick={() => handleMotivational(data.addToBalance)} className="w-full bg-[#F9D423] hover:bg-[#E5C31F] text-black font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
              <Sparkles className="w-5 h-5" />
              {data.buttonText}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Render Final screen
  const renderFinalScreen = () => {
    if (isComplete) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-[#0d0d1a] via-[#1a1a2e] to-[#0d0d1a] text-white">
          <div className="max-w-md mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-[#D4AF37] mb-4">
                {name.toLowerCase()}, you{"'"}ve made it this far... and that{"'"}s no accident.
              </h1>
              <p className="text-gray-300">
                Today is {currentDate} {"–"} the first day of your new reality.
              </p>
            </div>

            {/* Vturb Video Embed */}
            <p className="text-center text-[#D4AF37] mb-4">Watch the video below to claim your blessing</p>
            <div ref={vturbRef} className="w-full mb-8" />

            {/* Preload offer images hidden */}
            <div className="hidden">
              {["/images/seed-barren.jpg", "/images/seed-sprout.jpg", "/images/seed-tree.jpg", "/images/seed-golden.jpg", "/images/seed-divine.jpg"].map((src) => (
                <Image key={src} src={src} alt="" width={1} height={1} priority />
              ))}
            </div>

            {/* Offer Section - only visible after 7:28 of video */}
            {showOffer && (
              <div ref={offerRef} className="animate-fade-in-offer">
                <h2 className="text-xl font-bold text-[#D4AF37] text-center mb-6">
                  {name}, Make your choice now!
                </h2>

                {/* Seed Cards */}
                <div className="w-full flex flex-col gap-8">
                  {/* First card - $7 */}
                  <div className="w-full flex flex-col items-center">
                    <div className="w-full rounded-2xl overflow-hidden border border-[#D4AF37]/30">
                      <div className="relative w-full aspect-[4/3]">
                        <Image src="/images/seed-sprout.jpg" alt="The life that begins to awaken." fill className="object-cover" priority />
                      </div>
                    </div>
                    <a href="https://ageofabundance.mycartpanda.com/checkout/206468076:1" className="w-full mt-4 bg-[#D4AF37] hover:bg-[#b8962f] text-black font-bold text-lg py-4 rounded-full transition-colors text-center block">
                      This is the life I choose – $7
                    </a>
                  </div>

                  {/* Second card - $17 - scroll target */}
                  <div ref={secondCardRef} className="w-full flex flex-col items-center">
                    <div className="w-full rounded-2xl overflow-hidden border border-[#D4AF37]/30">
                      <div className="relative w-full aspect-[4/3]">
                        <Image src="/images/seed-golden.jpg" alt="The life of full abundance and manifestation." fill className="object-cover" priority />
                      </div>
                    </div>
                    <a href="https://ageofabundance.mycartpanda.com/checkout/206468079:1" className="w-full mt-4 bg-[#D4AF37] hover:bg-[#b8962f] text-black font-bold text-lg py-4 rounded-full transition-colors text-center block">
                      This is the life I choose – $17
                    </a>
                  </div>

                  {/* Third card - $27 */}
                  <div className="w-full flex flex-col items-center">
                    <div className="w-full rounded-2xl overflow-hidden border border-[#D4AF37]/30">
                      <div className="relative w-full aspect-[4/3]">
                        <Image src="/images/seed-divine.jpg" alt="The life of divine overflow and miracles." fill className="object-cover" priority />
                      </div>
                    </div>
                    <a href="https://ageofabundance.mycartpanda.com/checkout/206468082:1" className="w-full mt-4 bg-[#D4AF37] hover:bg-[#b8962f] text-black font-bold text-lg py-4 rounded-full transition-colors text-center block">
                      This is the life I choose – $27
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )
    }

    // Loading state
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0d0d1a] via-[#1a1a2e] to-[#0d0d1a] text-white relative overflow-hidden">
        {visibleNotifications.length > 0 && !isComplete && (
          <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-[280px]">
            {visibleNotifications.map((notif) => (
              <div key={notif.id} className="animate-slide-in-right bg-[#1a1a2e]/95 backdrop-blur-sm border border-[#D4AF37]/30 rounded-lg p-3 shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">{notifications[notif.index].emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-[#D4AF37] font-medium">PROCESSING</p>
                    <p className="text-xs text-gray-300 leading-tight">{notifications[notif.index].text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex-1 flex flex-col items-center justify-center min-h-screen px-4 py-8">
          <div className="w-full max-w-md mx-auto flex flex-col items-center">
            <div className="relative w-24 h-24 mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#F9D423] rounded-full opacity-20 animate-pulse" />
              <div className="absolute inset-2 bg-gradient-to-r from-[#D4AF37] to-[#F9D423] rounded-full opacity-40 animate-spin-slow" />
              <div className="absolute inset-4 bg-[#0d0d1a] rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-[#D4AF37] animate-pulse-gold" />
              </div>
            </div>
            <h1 className="text-xl font-bold text-center text-[#D4AF37] mb-2">{name.toUpperCase()}, your Divine Manifestation Script is being created...</h1>
            <p className="text-gray-400 text-center mb-6">Processing your answers with divine precision</p>
            <div className="w-full bg-[#1a1a2e] rounded-full h-4 mb-4 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F9D423] transition-all duration-300 ease-out rounded-full" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex justify-between w-full text-sm mb-8">
              <span className="text-gray-400">{statusText}</span>
              <span className="text-[#D4AF37] font-bold">{Math.round(progress)}%</span>
            </div>
            {/* Achievements Unlocked - Single Cycling Card */}
            {visiblePortalCount > 0 && (
              <div className="w-full mb-8">
                <p className="text-center text-gray-400 text-sm mb-4">Achievements Unlocked</p>
                <div className="flex justify-center">
                  <div className={`flex flex-col items-center ${cardAnimationIndex >= 0 ? "card-pop" : ""}`}>
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#D4AF37] mb-2">
                      <Image src={portals[Math.min(visiblePortalCount - 1, portals.length - 1)].image} alt={portals[Math.min(visiblePortalCount - 1, portals.length - 1)].name} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/30 to-transparent" />
                    </div>
                    <span className="text-[10px] text-[#D4AF37] font-medium">UNLOCKED</span>
                    <span className="text-xs text-center text-white mt-1 max-w-[80px] leading-tight">
                      {portals[Math.min(visiblePortalCount - 1, portals.length - 1)].name}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <p className="text-center text-gray-500 text-sm italic mb-4">
              {'"We\'re preparing your Divine'} {'Manifestation Script, based'} {'on everything you\'ve told us,'} {name}...{'"'}
            </p>
            <p className="text-center text-[#D4AF37] text-xs">You will be redirected automatically</p>
          </div>
        </div>
      </div>
    )
  }

  // Main render
  return (
    <div>
      {stepData?.type === "continue" && renderContinueScreen()}
      {stepData?.type === "journey" && renderJourneyScreen()}
      {stepData?.type === "unlocked" && renderUnlockedScreen()}
      {stepData?.type === "question" && renderQuestionScreen()}
      {stepData?.type === "unlock-screen" && renderUnlockScreen()}
      {stepData?.type === "motivational" && renderMotivationalScreen()}
      {stepData?.type === "final" && renderFinalScreen()}
      <style jsx>{`
        @keyframes pulseGold { 0%, 100% { color: #d4af37; } 50% { color: #8b7520; } }
        .animate-pulse-gold { animation: pulseGold 1.5s ease-in-out infinite; }
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spinSlow 3s linear infinite; }
        @keyframes pulseSoft { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
        .animate-pulse-soft { animation: pulseSoft 2s ease-in-out infinite; }
        @keyframes cardPop { 0% { opacity: 0; transform: scale(0.5); } 60% { opacity: 1; transform: scale(1.15); } 100% { opacity: 1; transform: scale(1); } }
        .card-pop { animation: cardPop 0.4s ease-out forwards; }
        @keyframes pulseCircle { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.3); } }
        .animate-pulse-circle { animation: pulseCircle 2s ease-in-out infinite; }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(100%); } to { opacity: 1; transform: translateX(0); } }
        .animate-slide-in-right { animation: slideInRight 0.5s ease-out; }
        @keyframes portalEnter {
          0% { opacity: 0; transform: scale(0.8); filter: blur(6px); }
          100% { opacity: 1; transform: scale(1); filter: blur(0px); }
        }
        @keyframes portalExit {
          0% { opacity: 1; transform: scale(1); filter: blur(0px); }
          100% { opacity: 0; transform: scale(1.08); filter: blur(6px); }
        }
        .portal-enter { animation: portalEnter 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .portal-exit { animation: portalExit 0.7s cubic-bezier(0.55, 0, 1, 0.45) forwards; }
        @keyframes fadeInOffer { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-offer { animation: fadeInOffer 0.8s ease-out forwards; }
      `}</style>
    </div>
  )
}
