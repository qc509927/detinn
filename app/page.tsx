"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Wifi,
  Camera,
  User,
  Heart,
  MapPin,
  MessageCircle,
  Shield,
  AlertTriangle,
  Lock,
  Activity,
  Eye,
  CheckCircle,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { useGeolocation } from "@/hooks/useGeolocation"

type AppStep = "landing" | "form" | "verification" | "preliminary" | "generating" | "result" | "offer"

// Updated sales proof messages without specific cities/states
const SalesProofPopup = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  const [currentMessage, setCurrentMessage] = useState("")

  const salesMessages = [
    "✅ Julia aus Berlin hat vor 12 Minuten einen Bericht freigeschaltet",
    "✅ Sarah hat kürzlich den Gesprächsverlauf angesehen",
    "✅ Michelle hat gerade auf vertrauliche Fotos zugegriffen",
    "✅ Jennifer hat soeben eine vollständige Analyse abgeschlossen",
    "✅ Laura hat vor wenigen Augenblicken Zugriff auf den vertraulichen Bericht erhalten",
    "✅ Hannah hat soeben eine vollständige Verifizierung durchgeführt",
  ]

  useEffect(() => {
    if (show) {
      const randomMessage = salesMessages[Math.floor(Math.random() * salesMessages.length)]
      setCurrentMessage(randomMessage)
    }
  }, [show])

  if (!show) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: -20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 20, x: -20 }}
      className="fixed bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-xs z-50 bg-white border border-gray-200 rounded-xl shadow-2xl p-3 sm:p-4"
      style={{
        fontSize: "13px",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-800 leading-tight">{currentMessage}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 flex-shrink-0"
        >
          <X className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
    </motion.div>
  )
}

// Arrays organizados por gênero e faixa etária
const malePhotos1824 = [
  "https://blobs.vusercontent.net/blob/male-25-34-male-andyreiddvip.jpg-JfW3WQX7spc75NBSfoH1ink8qFF9bg.jpeg", // male-25-34-male-andyreiddvip.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-franchescox.jpg-SSxdBZNDEbogmHbY6WPnSteKDSLnOy.jpeg", // male-25-34-male-franchescox.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-augst_ts.jpg-nu4ttxScgp63AQU9M9uUAQw6ujbhmq.jpeg", // male-25-34-male-augst_ts.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-nanoargentino.jpg-MupFxTgua62ieJ17as9NXcynMYNbgN.jpeg", // male-25-34-male-nanoargentino.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-shyguyishere.jpg-94TD8ArDNT2ZBDw0N2M0G9hJah6UKk.jpeg", // male-25-34-male-shyguyishere.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-carterlander08.jpg-yVyzRYbS0aGVhbvEX0Mjss5h51nySK.jpeg", // male-25-34-male-carterlander08.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-matthewteddy.jpg-gGny9NX0j88eVzP1iJqKZPEVWZ0Ogs.jpeg", // male-25-34-male-matthewteddy.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-tomidiazj.jpg-uuVCkrFp6AHIQkyUkoUnQ4seoDKeL7.jpeg", // male-25-34-male-tomidiazj.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-latinblondarg.jpg-erLXKeyVnCQFjS4QaZLFLFhu1I0yro.jpeg", // male-25-34-male-latinblondarg.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-bushidoboy.jpg-Ye68jGO1s2usgp6AabdJo4bGpnxCTl.jpeg", // male-25-34-male-bushidoboy.jpg
]

const malePhotos2534 = [
  "https://blobs.vusercontent.net/blob/male-25-34-male-andyreiddvip.jpg-JfW3WQX7spc75NBSfoH1ink8qFF9bg.jpeg", // male-25-34-male-andyreiddvip.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-franchescox.jpg-SSxdBZNDEbogmHbY6WPnSteKDSLnOy.jpeg", // male-25-34-male-franchescox.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-augst_ts.jpg-nu4ttxScgp63AQU9M9uUAQw6ujbhmq.jpeg", // male-25-34-male-augst_ts.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-nanoargentino.jpg-MupFxTgua62ieJ17as9NXcynMYNbgN.jpeg", // male-25-34-male-nanoargentino.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-shyguyishere.jpg-94TD8ArDNT2ZBDw0N2M0G9hJah6UKk.jpeg", // male-25-34-male-shyguyishere.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-carterlander08.jpg-yVyzRYbS0aGVhbvEX0Mjss5h51nySK.jpeg", // male-25-34-male-carterlander08.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-matthewteddy.jpg-gGny9NX0j88eVzP1iJqKZPEVWZ0Ogs.jpeg", // male-25-34-male-matthewteddy.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-tomidiazj.jpg-uuVCkrFp6AHIQkyUkoUnQ4seoDKeL7.jpeg", // male-25-34-male-tomidiazj.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-latinblondarg.jpg-erLXKeyVnCQFjS4QaZLFLFhu1I0yro.jpeg", // male-25-34-male-latinblondarg.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-bushidoboy.jpg-Ye68jGO1s2usgp6AabdJo4bGpnxCTl.jpeg", // male-25-34-male-bushidoboy.jpg
]

const malePhotos3544 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-morocholatino87.jpg-bam8DFyuAfzBux5zmL9lscgSfnbJ4w.jpeg", // male-35-44-male-morocholatino87.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-ovalo-sex.jpg-TdxtGZRqBJy2V8x9kVfSml7x6QJpjt.jpeg", // male-35-44-male-ovalo-sex.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-josepbgfeet.jpg-f25HHQX8Dso5oQBIE1uCIP3oC3KYrd.jpeg", // male-35-44-male-josepbgfeet.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-thesuitedboss.jpg-3CFJKVgZyyuzeIPk0klRBy6ixqjsHF.jpeg", // male-35-44-male-thesuitedboss.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-nicoink.jpg-0YCHbmDqw9dWCItx4Of9GbWBbpiZOZ.jpeg", // male-35-44-male-nicoink.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-nicoalpalo22.jpg-bPAd1S83ZoBGkoJyaKZ0BSEveTVHG1.jpeg", // male-35-44-male-nicoalpalo22.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-tunacho.jpg-2wHzLphZ2mKamlOeZmIfo1F09LM6pR.jpeg", // male-35-44-male-tunacho.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-thebigitaliansub.jpg-rcFp57YB2XDXYQ1ObWSzBY0QDTVkcI.jpeg", // male-35-44-male-thebigitaliansub.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-puntogof.jpg-9b6bkanYwTL6acvIqT3AC87dvvnXFZ.jpeg", // male-35-44-male-puntogof.jpg
]

const malePhotos4554 = [
  // Placeholder para quando receber as imagens 45-54
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/3SJBR44DZ9c6pLRVDTA0Ww/public/male/45-54/male-45-54-hombrelatinoarg.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/2xC10Dbr0Yi98WJdnWWgm4/public/male/45-54/male-45-54-petemastersxxx.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/wKcNRFe1QqreA4CfjbJQ7a/public/male/45-54/male-45-54-scorcherb8.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/0TwfWC666HpVosmkj_QPc_/public/male/45-54/male-45-54-coachtennisdad.jpg",
]

const femalePhotos1824 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-bustanutters.jpg-PfzSPm0cPx7xUL939wZRvkH6X4MnMI.jpeg", // female-18-24-female-ScarletBae.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-megnut.jpg-JDM9fK1I9XwHyJHqn36CZyjwv55ycS.jpeg", // female-18-24-female-born2bscene.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-siswet.jpg-5Ovue3nSIBKAMGL74rU3Ct4qf7bpFN.jpeg", // female-18-24-female-liliafourtwenty.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-ThorriandJax.jpg-CZTrwFISinAcSSvxRrAcUWtMDYTaiO.jpeg", // female-18-24-female-louprival.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-juicyjade9.jpg-nOS27Xu6KrOgaCRuu9862Hk73NegAs.jpeg", // female-18-24-female-babygirlmiza.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-ruth_lee.jpg-J5flhVFgEjhvJiSFhj0ZuBY3tGwjRI.jpeg", // female-18-24-female-imjuliequeen.jpg
  "https://blobs.vusercontent.net/blob/female-25-34-female-graciebon1.jpg-kfctbLLp6OUl4Kc0OhSYyglGCLl29f.jpeg", // female-18-24-female-izzybunniesvip.jpg
]

const femalePhotos2534 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-bustanutters.jpg-PfzSPm0cPx7xUL939wZRvkH6X4MnMI.jpeg", // female-25-34-female-bustanutters.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-megnut.jpg-JDM9fK1I9XwHyJHqn36CZyjwv55ycS.jpeg", // female-25-34-female-megnut.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-siswet.jpg-5Ovue3nSIBKAMGL74rU3Ct4qf7bpFN.jpeg", // female-25-34-female-siswet.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-ThorriandJax.jpg-CZTrwFISinAcSSvxRrAcUWtMDYTaiO.jpeg", // female-25-34-female-ThorriandJax.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-juicyjade9.jpg-nOS27Xu6KrOgaCRuu9862Hk73NegAs.jpeg", // female-25-34-female-juicyjade9.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-ruth_lee.jpg-J5flhVFgEjhvJiSFhj0ZuBY3tGwjRI.jpeg", // female-25-34-female-ruth_lee.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-graciebon1.jpg-kfctbLLp6OUl4Kc0OhSYyglGCLl29f.jpeg", // female-25-34-female-graciebon1.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-brujita.roja.jpg-KZxlryBKf0XVbOHRNdGAMBpPQTa82Z.jpeg", // female-25-34-female-brujita.roja.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-toomanypeaches.jpg-6PDRsf3v2Nalrv9eRaku1bX8wh5kOe.jpeg", // female-25-34-female-toomanypeaches.jpg
]

const femalePhotos3544 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-35-44-female-belle_oharaxxx.jpg-Pq9aUAbtUDVI9UrrzZJlkfEC0cxuQv.jpeg", // female-35-44-female-belle_oharaxxx.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-35-44-female-txhotwife84_free.jpg-QV1C6Nj4fbSzTRIyGs7p4kiqtozXCx.jpeg", // female-35-44-female-txhotwife84_free.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-35-44-female-malmalloy.jpg-B7c4Pg36GwUFFIayybP0fiyWqkv51R.jpeg", // female-35-44-female-malmalloy.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-35-44-female-anialisimo.jpg-EcQ66PmaeU25fFT0xV8udt4mMqLwhC.jpeg", // female-35-44-female-anialisimo.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-35-44-female-syrenjaymes.jpg-N4w0IhzPmQNbX0BqZRFeTvdBdGNn3Y.jpeg", // female-35-44-female-syrenjaymes.jpg
]

const femalePhotos4554 = [
  // Placeholder para quando receber as imagens 45-54
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/AEJxds2OT7Gt-B4VLJXv4a/public/female/45-54/female-45-54-annikarose69.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/1BUA6sJloJdt-jvL9MCX_i/public/female/45-54/female-45-54-AvrilShowers.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/ZP3nTnsBf-eH5TZPmJ2Y5l/public/female/45-54/female-45-54-casey_deluxe.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/_JzuRXZpf_Z2oSrQsFwVqy/public/female/45-54/female-45-54-eroticnikki.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/fvveni81HkNN0LrqIB4JXJ/public/female/45-54/female-45-54-goldieblair.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/N2QWnE3U5cy91m0VkVFzLX/public/female/45-54/female-45-54-jemmaluv.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/FJ77Pjm_R4YXKajt4cDFr4/public/female/45-54/female-45-54-lolamaverick.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/0z6995_0sJh478H4DUzkcd/public/female/45-54/female-45-54-MissHawthorn.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/1RCbILUlOe_6Oh3C6E1a9F/public/female/45-54/female-45-54-quiet_winner_76.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/uGH4sQMZaiDPeeyCrYTD2K/public/female/45-54/female-45-54-rileysweetnsexy.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/utg8RGec_BylfuoPKcczJ0/public/female/45-54/female-45-54-rose.curvy.xxx.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/W8GGhX3aDfLrw4OPchlLIa/public/female/45-54/female-45-54-solymx2.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/NpqvlUBeE3bPdFwQAhge5Z/public/female/45-54/female-45-54-stellahere.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/fKgrGvdsa_GC0eLH-l5HTM/public/female/45-54/female-45-54-usapippa.jpg",
]

const maleNames = {
  "18-24": [
    "Leon", "Jonas", "Finn", "Elias", "Paul", "Ben", "Noah", "Luca", "Felix", "Julian",
    "Lukas", "Maximilian", "Tim", "David", "Oskar"
  ],
  "25-34": [
    "Alexander", "Maximilian", "Daniel", "Christian", "Michael", "Sebastian", "Thomas", "Florian", "Philipp", "David",
    "Andreas", "Jan", "Robert", "Martin", "Stefan"
  ],
  "35-44": [
    "Stefan", "Andreas", "Christian", "Michael", "Thomas", "Markus", "Frank", "Matthias", "Jörg", "Martin",
    "Peter", "Jens", "Dirk", "Torsten", "Sven"
  ],
  "45-54": [
    "Michael", "Thomas", "Andreas", "Stefan", "Christian", "Frank", "Peter", "Jörg", "Klaus", "Wolfgang",
    "Manfred", "Bernd", "Uwe", "Ralf", "Helmut"
  ],
}

const femaleNames = {
  "18-24": [
    "Mia", "Hannah", "Emma", "Emilia", "Sophia", "Lena", "Anna", "Lea", "Marie", "Clara",
    "Lina", "Laura", "Sophie", "Lilly", "Charlotte"
  ],
  "25-34": [
    "Julia", "Anna", "Sarah", "Laura", "Christina", "Katharina", "Stefanie", "Vanessa", "Maria", "Lisa",
    "Sandra", "Melanie", "Nicole", "Anja", "Katrin"
  ],
  "35-44": [
    "Nicole", "Katrin", "Anja", "Sandra", "Melanie", "Stefanie", "Julia", "Simone", "Christine", "Sabine",
    "Andrea", "Martina", "Susanne", "Claudia", "Birgit"
  ],
  "45-54": [
    "Sabine", "Susanne", "Petra", "Martina", "Andrea", "Claudia", "Birgit", "Gabriele", "Karin", "Heike",
    "Ingrid", "Monika", "Ursula", "Renate", "Gisela"
  ],
}

export default function SigiloX() {
  const [currentStep, setCurrentStep] = useState<AppStep>("landing")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedGender, setSelectedGender] = useState("")
  const [lastTinderUse, setLastTinderUse] = useState("")
  const [cityChange, setCityChange] = useState("")
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false)
  const [photoError, setPhotoError] = useState("")
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const [isPhotoPrivate, setIsPhotoPrivate] = useState(false)
  const [verificationProgress, setVerificationProgress] = useState(0)
  const [verificationMessage, setVerificationMessage] = useState("Analyse wird gestartet...")
  const [generatingProgress, setGeneratingProgress] = useState(0)
  const [generatingMessage, setGeneratingMessage] = useState("Profilfotos werden analysiert...")
  const [stepCompleted, setStepCompleted] = useState({
    profilePhotos: false,
    conversations: false,
    finalizing: false,
  })
  const [timeLeft, setTimeLeft] = useState(9 * 60 + 50) // 9:50
  const [showSalesPopup, setShowSalesPopup] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showSalesProof, setShowSalesProof] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null)
  const [ageRange, setAgeRange] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [generatedProfiles, setGeneratedProfiles] = useState<any[]>([])
  const [selectedRandomPhoto, setSelectedRandomPhoto] = useState<string | null>(null)

  const [selectedProfile, setSelectedProfile] = useState<any>(null)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  const [selectedCountry, setSelectedCountry] = useState({
    code: "+49",
    name: "Deutschland",
    flag: "🇩🇪",
    placeholder: "1512 3456789",
  })
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [countrySearch, setCountrySearch] = useState("")
    const countries = [
    { code: "+1", name: "Vereinigte Staaten", flag: "🇺🇸", placeholder: "(555) 123-4567" },
    { code: "+1", name: "Kanada", flag: "🇨🇦", placeholder: "(555) 123-4567" },
    { code: "+44", name: "Vereinigtes Königreich", flag: "🇬🇧", placeholder: "7911 123456" },
    { code: "+33", name: "Frankreich", flag: "🇫🇷", placeholder: "6 12 34 56 78" },
    { code: "+49", name: "Deutschland", flag: "🇩🇪", placeholder: "1512 3456789" },
    { code: "+39", name: "Italien", flag: "🇮🇹", placeholder: "312 345 6789" },
    { code: "+34", name: "Spanien", flag: "🇪🇸", placeholder: "612 34 56 78" },
    { code: "+351", name: "Portugal", flag: "🇵🇹", placeholder: "912 345 678" },
    { code: "+52", name: "Mexiko", flag: "🇲🇽", placeholder: "55 1234 5678" },
    { code: "+55", name: "Brasilien", flag: "🇧🇷", placeholder: "(11) 99999-9999" },
    { code: "+54", name: "Argentinien", flag: "🇦🇷", placeholder: "11 1234-5678" },
    { code: "+56", name: "Chile", flag: "🇨🇱", placeholder: "9 1234 5678" },
    { code: "+57", name: "Kolumbien", flag: "🇨🇴", placeholder: "300 1234567" },
    { code: "+51", name: "Peru", flag: "🇵🇪", placeholder: "912 345 678" },
    { code: "+58", name: "Venezuela", flag: "🇻🇪", placeholder: "412-1234567" },
    { code: "+593", name: "Ecuador", flag: "🇪🇨", placeholder: "99 123 4567" },
    { code: "+595", name: "Paraguay", flag: "🇵🇾", placeholder: "961 123456" },
    { code: "+598", name: "Uruguay", flag: "🇺🇾", placeholder: "94 123 456" },
    { code: "+591", name: "Bolivien", flag: "🇧🇴", placeholder: "71234567" },
    { code: "+81", name: "Japan", flag: "🇯🇵", placeholder: "90-1234-5678" },
    { code: "+82", name: "Südkorea", flag: "🇰🇷", placeholder: "10-1234-5678" },
    { code: "+86", name: "China", flag: "🇨🇳", placeholder: "138 0013 8000" },
    { code: "+91", name: "Indien", flag: "🇮🇳", placeholder: "81234 56789" },
    { code: "+61", name: "Australien", flag: "🇦🇺", placeholder: "412 345 678" },
    { code: "+64", name: "Neuseeland", flag: "🇳🇿", placeholder: "21 123 4567" },
    { code: "+27", name: "Südafrika", flag: "🇿🇦", placeholder: "71 123 4567" },
    { code: "+20", name: "Ägypten", flag: "🇪🇬", placeholder: "100 123 4567" },
    { code: "+234", name: "Nigeria", flag: "🇳🇬", placeholder: "802 123 4567" },
    { code: "+254", name: "Kenia", flag: "🇰🇪", placeholder: "712 123456" },
    { code: "+971", name: "Vereinigte Arabische Emirate", flag: "🇦🇪", placeholder: "50 123 4567" },
    { code: "+966", name: "Saudi-Arabien", flag: "🇸🇦", placeholder: "50 123 4567" },
    { code: "+90", name: "Türkei", flag: "🇹🇷", placeholder: "501 234 56 78" },
    { code: "+7", name: "Russland", flag: "🇷🇺", placeholder: "912 345-67-89" },
    { code: "+380", name: "Ukraine", flag: "🇺🇦", placeholder: "50 123 4567" },
    { code: "+48", name: "Polen", flag: "🇵🇱", placeholder: "512 345 678" },
    { code: "+31", name: "Niederlande", flag: "🇳🇱", placeholder: "6 12345678" },
    { code: "+32", name: "Belgien", flag: "🇧🇪", placeholder: "470 12 34 56" },
    { code: "+41", name: "Schweiz", flag: "🇨🇭", placeholder: "78 123 45 67" },
    { code: "+43", name: "Österreich", flag: "🇦🇹", placeholder: "664 123456" },
    { code: "+45", name: "Dänemark", flag: "🇩🇰", placeholder: "20 12 34 56" },
    { code: "+46", name: "Schweden", flag: "🇸🇪", placeholder: "70-123 45 67" },
    { code: "+47", name: "Norwegen", flag: "🇳🇴", placeholder: "406 12 345" },
    { code: "+358", name: "Finnland", flag: "🇫🇮", placeholder: "50 123 4567" },
    { code: "+65", name: "Singapur", flag: "🇸🇬", placeholder: "8123 4567" },
    { code: "+63", name: "Philippinen", flag: "🇵🇭", placeholder: "912 345 6789" },
    { code: "+62", name: "Indonesien", flag: "🇮🇩", placeholder: "0812 3456 789" },
    { code: "+60", name: "Malaysia", flag: "🇲🇾", placeholder: "012-345 6789" },
    { code: "+66", name: "Thailand", flag: "🇹🇭", placeholder: "081 234 5678" },
    { code: "+84", name: "Vietnam", flag: "🇻🇳", placeholder: "091 234 56 78" },
    { code: "+92", name: "Pakistan", flag: "🇵🇰", placeholder: "0300 1234567" },
    { code: "+98", name: "Iran", flag: "🇮🇷", placeholder: "0912 345 6789" },
    { code: "+94", name: "Sri Lanka", flag: "🇱🇰", placeholder: "071 123 4567" },
    { code: "+880", name: "Bangladesch", flag: "🇧🇩", placeholder: "01712 345678" },
    { code: "+855", name: "Kambodscha", flag: "🇰🇭", placeholder: "092 123 456" },
    { code: "+673", name: "Brunei", flag: "🇧🇳", placeholder: "872 1234" },
    { code: "+679", name: "Fidschi", flag: "🇫🇯", placeholder: "920 1234" },
    { code: "+675", name: "Papua-Neuguinea", flag: "🇵🇬", placeholder: "723 45678" },
    { code: "+677", name: "Salomonen", flag: "🇸🇧", placeholder: "742 1234" },
    { code: "+678", name: "Vanuatu", flag: "🇻🇺", placeholder: "778 1234" },
    { code: "+691", name: "Mikronesien", flag: "🇫🇲", placeholder: "920 1234" },
    { code: "+692", name: "Marshallinseln", flag: "🇲🇭", placeholder: "692 1234" },
    { code: "+680", name: "Palau", flag: "🇵🇼", placeholder: "620 1234" },
    { code: "+685", name: "Samoa", flag: "🇼🇸", placeholder: "722 1234" },
    { code: "+676", name: "Tonga", flag: "🇹🇴", placeholder: "771 1234" },
    { code: "+682", name: "Cookinseln", flag: "🇨🇰", placeholder: "722 1234" },
    { code: "+683", name: "Niue", flag: "🇳🇺", placeholder: "811 1234" },
    { code: "+672", name: "Norfolkinsel", flag: "🇳🇫", placeholder: "512 1234" },
    { code: "+670", name: "Timor-Leste", flag: "🇹🇱", placeholder: "771 1234" },
    { code: "+688", name: "Tuvalu", flag: "🇹🇻", placeholder: "771 1234" },
    { code: "+690", name: "Tokelau", flag: "🇹🇰", placeholder: "811 1234" },
    { code: "+239", name: "São Tomé und Príncipe", flag: "🇸🇹", placeholder: "981 1234" },
    { code: "+240", name: "Äquatorialguinea", flag: "🇬🇶", placeholder: "222 123 456" },
    { code: "+241", name: "Gabun", flag: "🇬🇦", placeholder: "06 12 34 56 78" },
    { code: "+242", name: "Republik Kongo", flag: "🇨🇬", placeholder: "06 123 4567" },
    { code: "+243", name: "Demokratische Republik Kongo", flag: "🇨🇩", placeholder: "081 123 4567" },
    { code: "+244", name: "Angola", flag: "🇦🇴", placeholder: "923 123 456" },
    { code: "+245", name: "Guinea-Bissau", flag: "🇬🇼", placeholder: "955 123 456" },
    { code: "+246", name: "Diego Garcia", flag: "🇮🇴", placeholder: "380 1234" },
    { code: "+247", name: "Ascension", flag: "🇦🇨", placeholder: "650 1234" },
    { code: "+248", name: "Seychellen", flag: "🇸🇨", placeholder: "2 510 123" },
    { code: "+249", name: "Sudan", flag: "🇸🇩", placeholder: "091 123 4567" },
    { code: "+250", name: "Ruanda", flag: "🇷🇼", placeholder: "072 123 4567" },
    { code: "+251", name: "Äthiopien", flag: "🇪🇹", placeholder: "091 123 4567" },
    { code: "+252", name: "Somalia", flag: "🇸🇴", placeholder: "61 123 4567" },
    { code: "+253", name: "Dschibuti", flag: "🇩🇯", placeholder: "77 123 456" },
    { code: "+255", name: "Tansania", flag: "🇹🇿", placeholder: "071 123 4567" },
    { code: "+256", name: "Uganda", flag: "🇺🇬", placeholder: "070 123 4567" },
    { code: "+257", name: "Burundi", flag: "🇧🇮", placeholder: "79 123 456" },
    { code: "+258", name: "Mosambik", flag: "🇲🇿", placeholder: "82 123 4567" },
    { code: "+260", name: "Sambia", flag: "🇿🇲", placeholder: "095 123 4567" },
    { code: "+261", name: "Madagaskar", flag: "🇲🇬", placeholder: "032 12 345 67" },
    { code: "+262", name: "Réunion", flag: "🇷🇪", placeholder: "0692 12 34 56" },
    { code: "+263", name: "Simbabwe", flag: "🇿🇼", placeholder: "071 123 456" },
    { code: "+264", name: "Namibia", flag: "🇳🇦", placeholder: "081 123 4567" },
    { code: "+265", name: "Malawi", flag: "🇲🇼", placeholder: "099 123 4567" },
    { code: "+266", name: "Lesotho", flag: "🇱🇸", placeholder: "501 123 456" },
    { code: "+267", name: "Botsuana", flag: "🇧🇼", placeholder: "71 123 456" },
    { code: "+268", name: "Eswatini", flag: "🇸🇿", placeholder: "761 123 456" },
    { code: "+269", name: "Komoren", flag: "🇰🇲", placeholder: "321 1234" },
    { code: "+290", name: "St. Helena", flag: "🇸🇭", placeholder: "659 1234" },
    { code: "+291", name: "Eritrea", flag: "🇪🇷", placeholder: "07 123 456" },
    { code: "+297", name: "Aruba", flag: "🇦🇼", placeholder: "560 1234" },
    { code: "+298", name: "Färöer-Inseln", flag: "🇫🇴", placeholder: "211234" },
    { code: "+299", name: "Grönland", flag: "🇬🇱", placeholder: "221234" },
    { code: "+350", name: "Gibraltar", flag: "🇬🇮", placeholder: "571 12345" },
    { code: "+352", name: "Luxemburg", flag: "🇱🇺", placeholder: "621 123 456" },
    { code: "+353", name: "Irland", flag: "🇮🇪", placeholder: "083 123 4567" },
    { code: "+354", name: "Island", flag: "🇮🇸", placeholder: "611 1234" },
    { code: "+355", name: "Albanien", flag: "🇦🇱", placeholder: "067 123 4567" },
    { code: "+356", name: "Malta", flag: "🇲🇹", placeholder: "799 12345" },
    { code: "+357", name: "Zypern", flag: "🇨🇾", placeholder: "961 12345" },
    { code: "+359", name: "Bulgarien", flag: "🇧🇬", placeholder: "088 123 4567" },
    { code: "+370", name: "Litauen", flag: "🇱🇹", placeholder: "601 12345" },
    { code: "+371", name: "Lettland", flag: "🇱🇻", placeholder: "200 12345" },
    { code: "+372", name: "Estland", flag: "🇪🇪", placeholder: "501 1234" },
    { code: "+373", name: "Moldawien", flag: "🇲🇩", placeholder: "068 123 456" },
    { code: "+374", name: "Armenien", flag: "🇦🇲", placeholder: "091 123 456" },
    { code: "+375", name: "Weißrussland", flag: "🇧🇾", placeholder: "029 123 4567" },
    { code: "+376", name: "Andorra", flag: "🇦🇩", placeholder: "606 123 456" },
    { code: "+377", name: "Monaco", flag: "🇲🇨", placeholder: "06 12 34 56 78" },
    { code: "+378", name: "San Marino", flag: "🇸🇲", placeholder: "333 123456" },
    { code: "+379", name: "Vatikanstadt", flag: "🇻🇦", placeholder: "333 123456" },
    { code: "+381", name: "Serbien", flag: "🇷🇸", placeholder: "061 123 4567" },
    { code: "+382", name: "Montenegro", flag: "🇲🇪", placeholder: "067 123 456" },
    { code: "+383", name: "Kosovo", flag: "🇽🇰", placeholder: "049 123 456" },
    { code: "+385", name: "Kroatien", flag: "🇭🇷", placeholder: "091 123 4567" },
    { code: "+386", name: "Slowenien", flag: "🇸🇮", placeholder: "031 123 456" },
    { code: "+387", name: "Bosnien und Herzegowina", flag: "🇧🇦", placeholder: "061 123 456" },
    { code: "+389", name: "Nordmazedonien", flag: "🇲🇰", placeholder: "070 123 456" },
    { code: "+420", name: "Tschechische Republik", flag: "🇨🇿", placeholder: "601 123 456" },
    { code: "+421", name: "Slowakei", flag: "🇸🇰", placeholder: "0911 123 456" },
    { code: "+423", name: "Liechtenstein", flag: "🇱🇮", placeholder: "660 123 456" },
    { code: "+500", name: "Falklandinseln", flag: "🇫🇰", placeholder: "51234" },
    { code: "+501", name: "Belize", flag: "🇧🇿", placeholder: "622 1234" },
    { code: "+502", name: "Guatemala", flag: "🇬🇹", placeholder: "5512 3456" },
    { code: "+503", name: "El Salvador", flag: "🇸🇻", placeholder: "7012 3456" },
    { code: "+504", name: "Honduras", flag: "🇭🇳", placeholder: "9123 4567" },
    { code: "+505", name: "Nicaragua", flag: "🇳🇮", placeholder: "8712 3456" },
    { code: "+506", name: "Costa Rica", flag: "🇨🇷", placeholder: "8312 3456" },
    { code: "+507", name: "Panama", flag: "🇵🇦", placeholder: "6712 3456" },
    { code: "+508", name: "St. Pierre und Miquelon", flag: "🇵🇲", placeholder: "551 1234" },
    { code: "+509", name: "Haiti", flag: "🇭🇹", placeholder: "3412 3456" },
    { code: "+590", name: "Guadeloupe", flag: "🇬🇵", placeholder: "0690 12 34 56" },
    { code: "+592", name: "Guyana", flag: "🇬🇾", placeholder: "612 3456" },
    { code: "+594", name: "Französisch-Guayana", flag: "🇬🇫", placeholder: "0694 12 34 56" },
    { code: "+596", name: "Martinique", flag: "🇲🇶", placeholder: "0696 12 34 56" },
    { code: "+597", name: "Suriname", flag: "🇸🇷", placeholder: "741 1234" },
    { code: "+599", name: "Curaçao", flag: "🇨🇼", placeholder: "9 561 1234" },
    { code: "+674", name: "Nauru", flag: "🇳🇷", placeholder: "555 1234" },
    { code: "+681", name: "Wallis und Futuna", flag: "🇼🇫", placeholder: "721 1234" },
    { code: "+686", name: "Kiribati", flag: "🇰🇮", placeholder: "720 1234" },
    { code: "+687", name: "Neukaledonien", flag: "🇳🇨", placeholder: "750 1234" },
    { code: "+689", name: "Französisch-Polynesien", flag: "🇵🇫", placeholder: "87 12 34 56" },
    { code: "+850", name: "Nordkorea", flag: "🇰🇵", placeholder: "191 123 4567" },
    { code: "+852", name: "Hongkong", flag: "🇭🇰", placeholder: "6123 4567" },
    { code: "+853", name: "Macau", flag: "🇲🇴", placeholder: "6612 3456" },
    { code: "+856", name: "Laos", flag: "🇱🇦", placeholder: "020 1234 5678" },
    { code: "+886", name: "Taiwan", flag: "🇹🇼", placeholder: "0912 345 678" },
    { code: "+960", name: "Malediven", flag: "🇲🇻", placeholder: "777 1234" },
    { code: "+961", name: "Libanon", flag: "🇱🇧", placeholder: "03 123 456" },
    { code: "+962", name: "Jordanien", flag: "🇯🇴", placeholder: "079 123 4567" },
    { code: "+963", name: "Syrien", flag: "🇸🇾", placeholder: "093 123 456" },
    { code: "+964", name: "Irak", flag: "🇮🇶", placeholder: "0790 123 4567" },
    { code: "+965", name: "Kuwait", flag: "🇰🇼", placeholder: "600 12345" },
    { code: "+967", name: "Jemen", flag: "🇾🇪", placeholder: "711 123 456" },
    { code: "+968", name: "Oman", flag: "🇴🇲", placeholder: "921 12345" },
    { code: "+970", name: "Palästina", flag: "🇵🇸", placeholder: "0599 123 456" },
    { code: "+972", name: "Israel", flag: "🇮🇱", placeholder: "052-123-4567" },
    { code: "+973", name: "Bahrain", flag: "🇧🇭", placeholder: "3600 1234" },
    { code: "+974", name: "Katar", flag: "🇶🇦", placeholder: "3312 3456" },
    { code: "+975", name: "Bhutan", flag: "🇧🇹", placeholder: "17 123 456" },
    { code: "+976", name: "Mongolei", flag: "🇲🇳", placeholder: "8812 3456" },
    { code: "+977", name: "Nepal", flag: "🇳🇵", placeholder: "984 123 4567" },
    { code: "+992", name: "Tadschikistan", flag: "🇹🇯", placeholder: "917 123 456" },
    { code: "+993", name: "Turkmenistan", flag: "🇹🇲", placeholder: "66 123 4567" },
    { code: "+994", name: "Aserbaidschan", flag: "🇦🇿", placeholder: "050 123 45 67" },
    { code: "+995", name: "Georgien", flag: "🇬🇪", placeholder: "555 12 34 56" },
    { code: "+996", name: "Kirgisistan", flag: "🇰🇬", placeholder: "0700 123 456" },
    { code: "+998", name: "Usbekistan", flag: "🇺🇿", placeholder: "90 123 45 67" },
  ]

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(countrySearch.toLowerCase()) || country.code.includes(countrySearch),
  )

  // Geolocation hook
  const { city, loading: geoLoading, error: geoError } = useGeolocation()

  // Matrix effect codes
  const matrixCodes = [
    "4bda7c",
    "x1f801",
    "uSr9ub",
    "r31sw",
    "3cqvt",
    "ebwvi",
    "4qd1tu",
    "str5y4",
    "ect2So",
    "xfnpBj",
    "kqjJu",
    "2v46yn",
    "q619ma",
    "wdtqdo",
    "14mkee",
    "pbb3eu",
    "vbncg8",
    "begaSh",
    "7rq",
    "dcboeu",
    "keyxs",
    "3Qehu",
    "N8135s",
    "nx794n",
    "11aqSi",
    "zBcpp",
    "s1xcBm",
    "u91xnm",
    "1s7mec",
    "Y8fmf",
    "11masu",
    "ye1f2t",
  ]

  // Progress steps for global progress bar
  const getProgressSteps = () => {
    const steps = [
      {
        id: "form",
        label: "Konfig",
        fullLabel: "Konfiguration",
        mobileLabel: "Konfig",
        completed: ["form", "verification", "preliminary", "generating", "result", "offer"].includes(currentStep),
      },
      {
        id: "verification",
        label: "Verif",
        fullLabel: "Verifizierung",
        mobileLabel: "Verif",
        completed: ["verification", "preliminary", "generating", "result", "offer"].includes(currentStep),
      },
      {
        id: "preliminary",
        label: "Ergeb",
        fullLabel: "Ergebnis",
        mobileLabel: "Ergebnis",
        completed: ["preliminary", "generating", "result", "offer"].includes(currentStep),
      },
      {
        id: "generating",
        label: "Bericht",
        fullLabel: "Bericht",
        mobileLabel: "Bericht",
        completed: ["generating", "result", "offer"].includes(currentStep),
      },
      {
        id: "offer",
        label: "Freis",
        fullLabel: "Freischalten",
        mobileLabel: "Zugriff",
        completed: currentStep === "offer",
      },
    ]
    return steps
  }
    // Timer countdown
  useEffect(() => {
    if (currentStep === "result" || currentStep === "offer") {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [currentStep])

  // Verification progress with dynamic messages
  useEffect(() => {
    if (currentStep === "verification") {
      const messages = [
        { progress: 0, message: "Überprüfung der Tinder-Aktivität in Ihrer Nähe..." },
        { progress: 15, message: "Abgleich der Gesichtserkennungsdaten..." },
        { progress: 30, message: "Analyse der letzten Anmeldemuster..." },
        { progress: 45, message: "Scannen von Bumble, Hinge und anderen Plattformen..." },
        { progress: 60, message: "Erkennung verdächtiger Standortaktivitäten..." },
        { progress: 75, message: "Zusammenstellung vertraulicher Beweismittel..." },
        { progress: 90, message: "Fast geschafft - Ihr Bericht wird fertiggestellt..." },
        { progress: 100, message: "Untersuchung erfolgreich abgeschlossen!" },
      ]

      const interval = setInterval(() => {
        setVerificationProgress((prev) => {
          const newProgress = prev + Math.random() * 8 + 2

          const currentMessage = messages.find((m) => newProgress >= m.progress && newProgress < m.progress + 25)
          if (currentMessage) {
            setVerificationMessage(currentMessage.message)
          }

          if (newProgress >= 100) {
            setTimeout(() => setCurrentStep("preliminary"), 1000)
            return 100
          }
          return Math.min(newProgress, 100)
        })
      }, 400)
      return () => clearInterval(interval)
    }
  }, [currentStep])

  // Generating report progress (30 seconds) with geolocation integration
  useEffect(() => {
    if (currentStep === "generating") {
      const baseMessages = [
        { progress: 0, message: "Analyse der Profilfotos..." },
        { progress: 20, message: "Verarbeitung des Nachrichtenverlaufs..." },
        { progress: 40, message: "Überprüfung der zuletzt aufgerufenen Standorte..." },
        { progress: 60, message: "Zusammenstellung der Aktivitätsdaten..." },
        { progress: 80, message: "Verschlüsselung sensibler Informationen..." },
        { progress: 95, message: "Fertigstellung des vollständigen Berichts..." },
        { progress: 100, message: "Bericht erfolgreich erstellt!" },
      ]

      // Add geolocation-specific message if city is available
      const messages = city
        ? [
            ...baseMessages.slice(0, 2),
            { progress: 30, message: `Analyse der letzten Aktivitäten in der Region von ${city}...` },
            ...baseMessages.slice(2),
          ]
        : baseMessages

      const interval = setInterval(() => {
        setGeneratingProgress((prev) => {
          const newProgress = prev + 100 / 75

          if (newProgress >= 33 && !stepCompleted.profilePhotos) {
            setStepCompleted((prev) => ({ ...prev, profilePhotos: true }))
          }
          if (newProgress >= 66 && !stepCompleted.conversations) {
            setStepCompleted((prev) => ({ ...prev, conversations: true }))
          }
          if (newProgress >= 90 && !stepCompleted.finalizing) {
            setStepCompleted((prev) => ({ ...prev, finalizing: true }))
          }

          const currentMessage = messages.find((m) => newProgress >= m.progress && newProgress < m.progress + 20)
          if (currentMessage) {
            setGeneratingMessage(currentMessage.message)
          }

          if (newProgress >= 100) {
            setTimeout(() => {
              if (stepCompleted.profilePhotos && stepCompleted.conversations && stepCompleted.finalizing) {
                setCurrentStep("result")
              }
            }, 1500)
            return 100
          }
          return Math.min(newProgress, 100)
        })
      }, 400)
      return () => clearInterval(interval)
    }
  }, [currentStep, city, stepCompleted])

  // Updated sales proof effect - now includes generating step
  useEffect(() => {
    if (currentStep === "generating" || currentStep === "result" || currentStep === "offer") {
      const showProof = () => {
        if (Math.random() < 0.7) {
          setShowSalesProof(true)
          setTimeout(() => setShowSalesProof(false), 6000)
        }
      }

      const initialTimeout = setTimeout(showProof, 5000)
      const interval = setInterval(showProof, 25000)

      return () => {
        clearTimeout(initialTimeout)
        clearInterval(interval)
      }
    }
  }, [currentStep])

  const fetchWhatsAppPhoto = async (phone: string) => {
    if (phone.length < 10) return

    setIsLoadingPhoto(true)
    setPhotoError("")

    try {
      const response = await fetch("/api/whatsapp-photo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: phone }),
      })

      // --- NEW robust handling (replaces old !response.ok throw) ---
      let data: any = null

      try {
        data = await response.json()
      } catch {
        // if the body is not valid JSON we still want to fall back safely
        data = {}
      }

      // When the API answers with non-200 we still carry on with a safe payload
      if (!response.ok || !data?.success) {
        setProfilePhoto(
          "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
        )
        setIsPhotoPrivate(true)
        setPhotoError("Foto konnte nicht geladen werden")
        return
      }

      // ✅ Successful, public photo
      setProfilePhoto(data.result)
      setIsPhotoPrivate(!!data.is_photo_private)
    } catch (error) {
      console.error("Erro ao buscar foto:", error)
      setProfilePhoto(
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
      )
      setIsPhotoPrivate(true)
      setPhotoError("Fehler beim Laden des Fotos")
    } finally {
      setIsLoadingPhoto(false)
    }
  }

  const handlePhoneChange = (value: string) => {
    // Ensure the value starts with the selected country code
    let formattedValue = value
    if (!value.startsWith(selectedCountry.code)) {
      // If user is typing a number without country code, prepend it
      if (value && !value.startsWith("+")) {
        formattedValue = selectedCountry.code + " " + value
      } else if (value.startsWith("+") && !value.startsWith(selectedCountry.code)) {
        // User typed a different country code, keep it as is
        formattedValue = value
      } else {
        formattedValue = selectedCountry.code + " " + value.replace(selectedCountry.code, "").trim()
      }
    }

    setPhoneNumber(formattedValue)

    // Extract just the numbers for API call
    const cleanPhone = formattedValue.replace(/[^0-9]/g, "")
    if (cleanPhone.length >= 10) {
      fetchWhatsAppPhoto(cleanPhone)
    } else {
      setProfilePhoto(null)
      setIsPhotoPrivate(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCountryDropdown) {
        const target = event.target as Element
        if (!target.closest(".relative")) {
          setShowCountryDropdown(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showCountryDropdown])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }
    // Updated blocked images with new chat screenshots
  const blockedImages = [
    "https://i.ibb.co/PZmmjcxb/CHAT1.png",
    "https://i.ibb.co/20581vtC/CHAT2.png",
    "https://i.ibb.co/LzFZdXXH/CHAT3.png",
    "https://i.ibb.co/kvWFRct/CHAT4.png",
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % blockedImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + blockedImages.length) % blockedImages.length)
  }

  // Auto-scroll do carrossel
  useEffect(() => {
    if (currentStep === "result") {
      const interval = setInterval(nextSlide, 4000)
      return () => clearInterval(interval)
    }
  }, [currentStep])

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedPhoto(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const [shouldUseCustomPhotosNonBinary1824, setShouldUseCustomPhotosNonBinary1824] = useState(false)
  const [shouldUseCustomPhotosNonBinary2534, setShouldUseCustomPhotosNonBinary2534] = useState(false)
  const [shouldUseCustomPhotosNonBinary3544, setShouldUseCustomPhotosNonBinary3544] = useState(false)
  const [shouldUseCustomPhotosNonBinary4554, setShouldUseCustomPhotosNonBinary4554] = useState(false)
  const [shouldUseCustomPhotos1824, setShouldUseCustomPhotos1824] = useState(false)
  const [shouldUseCustomPhotos2534, setShouldUseCustomPhotos2534] = useState(false)
  const [shouldUseCustomPhotos3544, setShouldUseCustomPhotos3544] = useState(false)
  const [shouldUseCustomPhotos4554, setShouldUseCustomPhotos4554] = useState(false)
  const [shouldUseCustomPhotosMale1824, setShouldUseCustomPhotosMale1824] = useState(false)
  const [shouldUseCustomPhotosMale2534, setShouldUseCustomPhotosMale2534] = useState(false)
  const [shouldUseCustomPhotosMale3544, setShouldUseCustomPhotosMale3544] = useState(false)
  const [shouldUseCustomPhotosMale4554, setShouldUseCustomPhotosMale4554] = useState(false)

  const [shuffledPhotoIndices1824, setShuffledPhotoIndices1824] = useState<number[]>([])
  const [shuffledPhotoIndices2534, setShuffledPhotoIndices2534] = useState<number[]>([])
  const [shuffledPhotoIndices3544, setShuffledPhotoIndices3544] = useState<number[]>([])
  const [shuffledPhotoIndices4554, setShuffledPhotoIndices4554] = useState<number[]>([])
  const [shuffledPhotoIndicesMale1824, setShuffledPhotoIndicesMale1824] = useState<number[]>([])
  const [shuffledPhotoIndicesMale2534, setShuffledPhotoIndicesMale2534] = useState<number[]>([])
  const [shuffledPhotoIndicesMale3544, setShuffledPhotoIndicesMale3544] = useState<number[]>([])
  const [shuffledPhotoIndicesMale4554, setShuffledPhotoIndicesMale4554] = useState<number[]>([])

  const [combinedPhotos1824, setCombinedPhotos1824] = useState<string[]>([])
  const [combinedPhotos2534, setCombinedPhotos2534] = useState<string[]>([])
  const [combinedPhotos3544, setCombinedPhotos3544] = useState<string[]>([])
  const [combinedPhotos4554, setCombinedPhotos4554] = useState<string[]>([])

          const generateFakeProfiles = useCallback(() => {
    const profiles: any[] = []
    const usedNames: string[] = []
    const usedImages: string[] = []

    const getUniqueItem = (sourceArray: string[], usedArray: string[]) => {
      if (!sourceArray || sourceArray.length === 0) return "/placeholder.svg";
      const availableItems = sourceArray.filter(item => !usedArray.includes(item));
      if (availableItems.length === 0) {
        return sourceArray[Math.floor(Math.random() * sourceArray.length)];
      }
      const selectedItem = availableItems[Math.floor(Math.random() * availableItems.length)];
      usedArray.push(selectedItem);
      return selectedItem;
    }
    
    let matchLocation = "";
    if (city) {
        matchLocation = city;
    } else {
        const defaultGlobalLocations = ["Berlin", "Hamburg", "München", "Köln"];
        matchLocation = defaultGlobalLocations[Math.floor(Math.random() * defaultGlobalLocations.length)];
    }

    const sampleBios = [
      "Ich bin das, was man bekommt, wenn man einen Komiker mit einem Denker kreuzt. Ich bin aus Versehen witzig und meine Mutter findet mich gutaussehend.",
      "Abenteuersuchender, Kaffeeliebhaber und Hundefan. Suche jemanden, um die Stadt zu erkunden!",
      "Tagsüber Fitness-Enthusiast, nachts Netflix-Binger. Lass uns einen Smoothie trinken und über das Leben reden.",
      "Künstler, Träumer und Teilzeit-Philosoph. Ich glaube an gute Schwingungen und tolle Gespräche.",
      "Teilweise Komiker, teilweise Couch-Potato. Ich bringe die Lacher, du die Snacks – Deal?",
      "Entdecker von neuen Orten und alten Pizzerien. Lass uns das beste Stück der Stadt finden.",
      "Morgens eine Sportskanone, abends ein Taco-Liebhaber. Willst du bei einem von beiden mitmachen?",
      "Träumer mit einer Playlist für jede Stimmung. Teile deinen Lieblingssong und lass uns die Stimmung genießen.",
      "50 % Abenteuer, 50 % Netflix. Suche jemanden, der mich ausgleicht.",
      "Liebhaber von Sonnenuntergängen, Sarkasmus und spontanen Roadtrips. Hast du ein Ziel im Kopf?",
      "Ich glaube an guten Kaffee, tolle Gespräche und daran, jeden Hund zu streicheln, den ich sehe.",
      "Teilzeit-Philosoph, Vollzeit-Snack-Kenner. Lass uns über Pizzabeläge diskutieren.",
      "Immer auf der Jagd nach Sonnenaufgängen und guten Geschichten. Hast du eine zu erzählen?",
      "Mein Leben ist eine Mischung aus Chaos und Entspannung. Begleitest du mich beim entspannten Teil?",
      "Feinschmecker, Wanderer und gelegentlicher Grübler. Lass uns etwas essen und die Rätsel des Lebens lösen.",
      "Ich bin 10 % witziger Schlagabtausch, 90 % der Versuch, meine Pflanzen am Leben zu erhalten. Hilfst du mir?",
      "Musik-Junkie und Sterngucker. Lass uns einen Ort finden, um den Himmel zu beobachten und zu reden.",
      "Ich bringe die schlechten Wortwitze, du das Augenrollen. Perfekte Kombination, oder?",
      "Liebhaber von Büchern, Stränden und Burritos. Lass uns unsere eigene Geschichte schreiben.",
      "Halb Adrenalin-Junkie, halb Liebhaber von Kuscheldecken. Was ist deine Stimmung?",
      "Immer bereit für eine Wanderung oder einen nächtlichen Diner-Besuch. Wähle dein Abenteuer!",
      "Ich bin der Freund, der immer zu spät kommt, aber die besten Playlists mitbringt. Willst du mitjammen?",
      "Das Leben ist zu kurz für schlechten Kaffee oder langweilige Gespräche. Machen wir beides episch.",
      "Teilweise Träumer, teilweise Macher, alles für gute Schwingungen. Bereit, ein paar Erinnerungen zu schaffen?"
];
    const personalityTags = [
      ["Steinbock", "INTJ", "Katze"],
      ["Löwe", "ENFP", "Hund"],
      ["Jungfrau", "ISFJ", "Kaffee"],
      ["Zwillinge", "ENTP", "Reisen"],
      ["Widder", "ESTP", "Abenteuer"],
      ["Stier", "INFJ", "Bücher"],
      ["Skorpion", "INTP", "Musik"],
      ["Waage", "ESFJ", "Kunst"],
      ["Wassermann", "ENFJ", "Sterne beobachten"],
      ["Fische", "INFP", "Träume"],
      ["Krebs", "ISFP", "Strand"],
      ["Schütze", "ENTJ", "Wandern"],
      ["Steinbock", "ISTJ", "Kochen"],
      ["Löwe", "ESFP", "Tanzen"],
      ["Jungfrau", "ISTP", "Gaming"],
      ["Zwillinge", "ENFP", "Fotografie"],
      ["Widder", "ESTJ", "Sport"],
      ["Stier", "INFP", "Natur"],
      ["Skorpion", "INTJ", "Geheimnis"],
      ["Waage", "ENFJ", "Mode"],
      ["Wassermann", "ENTP", "Technik"],
      ["Fische", "ISFJ", "Filme"],
      ["Krebs", "INFJ", "Poesie"],
      ["Schütze", "ESFP", "Partys"]
];
    const interestTags = [
      ["Pro-Choice", "Kaffee", "Black Lives Matter", "Tattoos"],
      ["Yoga", "Nachhaltigkeit", "Fotografie", "Kochen"],
      ["Fitness", "Meditation", "Bücher", "Wein"],
      ["Reisen", "Musik", "Tierrechte", "Wandern"],
      ["Kunst", "Veganismus", "Filme", "Abenteuer"],
      ["Gaming", "Technologie", "Natur", "Handwerk"],
      ["Tanzen", "Soziale Gerechtigkeit", "Podcasts", "Backen"],
      ["Mode", "Umweltschutz", "Poesie", "Camping"],
      ["Sport", "Psychische Gesundheit", "Gartenarbeit", "Schallplatten"],
      ["Schreiben", "Klimaschutz", "Theater", "Cafés"],
      ["Laufen", "Ehrenamt", "Brettspiele", "Street Food"],
      ["Malen", "LGBTQ+-Rechte", "Konzerte", "Secondhand-Läden"],
      ["Radfahren", "Achtsamkeit", "Sci-Fi", "Brauereien"],
      ["Skifahren", "Aktivismus", "Dokumentarfilme", "Sonnenuntergänge"],
      ["Surfen", "Stadterkundung", "Comics", "Craft-Bier"],
      ["Klettern", "Gleichberechtigung", "Jazzmusik", "Oldtimer"],
      ["Skateboarden", "Nachhaltige Mode", "Podcasts", "Foodtrucks"],
      ["Kajakfahren", "Tierschutz", "Fantasy-Bücher", "Sterne beobachten"],
      ["Boxen", "Gemeinnützige Arbeit", "Indie-Filme", "Sushi"],
      ["Wandern", "Grünes Leben", "Live-Musik", "Töpfern"],
      ["Schwimmen", "Feminismus", "Geschichte", "Grillen"],
      ["Fotografie", "Minimalismus", "True Crime", "Road Trips"],
      ["Tanzen", "Wohltätigkeitsarbeit", "Animation", "Cocktails"],
      ["Singen", "Meeresschutz", "Krimis", "Picknicks"]
];
    const orientations = ["Hetero", "Bisexuell", "Pansexuell", "Queer"];

    for (let i = 0; i < 3; i++) {
      let profileGender: 'masculino' | 'feminino';
      let profileAgeRange: keyof typeof maleNames;
      
      if (selectedGender === "nao-binario") {
        // --- INÍCIO: LÓGICA CORRIGIDA PARA GARANTIR CONSISTÊNCIA ---
        
        // 1. Sorteia o GÊNERO para este perfil específico (homem ou mulher)
        profileGender = Math.random() < 0.5 ? "masculino" : "feminino";
        
        // 2. Sorteia a FAIXA ETÁRIA para este perfil específico
        const ageRanges: (keyof typeof maleNames)[] = ["18-24", "25-34", "35-44", "45-54"];
        profileAgeRange = ageRanges[Math.floor(Math.random() * ageRanges.length)];
        // --- FIM: LÓGICA CORRIGIDA ---

      } else {
        // Lógica original para masculino/feminino (mostra o gênero oposto)
        profileGender = selectedGender === "masculino" ? "feminino" : "masculino";
        profileAgeRange = ageRange as keyof typeof maleNames;
      }

      let names: string[];
      let photoArray: string[];

      // 3. AGORA, com o gênero e idade definidos, pega os nomes e fotos corretos
      if (profileGender === 'masculino') {
        names = maleNames[profileAgeRange] || [];
        switch (profileAgeRange) {
          case "18-24": photoArray = malePhotos1824; break;
          case "25-34": photoArray = malePhotos2534; break;
          case "35-44": photoArray = malePhotos3544; break;
          case "45-54": photoArray = malePhotos4554; break;
          default: photoArray = malePhotos2534;
        }
      } else { // feminino
        names = femaleNames[profileAgeRange] || [];
        switch (profileAgeRange) {
          case "18-24": photoArray = femalePhotos1824; break;
          case "25-34": photoArray = femalePhotos2534; break;
          case "35-44": photoArray = femalePhotos3544; break;
          case "45-54": photoArray = femalePhotos4554; break;
          default: photoArray = femalePhotos2534;
        }
      }
      
      const name = getUniqueItem(names, usedNames);
      const profileImage = getUniqueItem(photoArray, usedImages);
      const age = Math.floor(Math.random() * 7) + (parseInt(profileAgeRange.split("-")[0]) || 25);

      profiles.push({
        name,
        age,
        lastSeen: `vor ${Math.floor(Math.random() * 24)} Std.`,
        description: "Aktiver Nutzer, häufig online",
        image: profileImage,
        bio: sampleBios[Math.floor(Math.random() * sampleBios.length)],
        location: `Lebt in ${matchLocation}`,
        distance: `${Math.floor(Math.random() * 15) + 1} km entfernt`,
        orientation: orientations[Math.floor(Math.random() * orientations.length)],
        personality: personalityTags[Math.floor(Math.random() * personalityTags.length)],
        interests: interestTags[Math.floor(Math.random() * interestTags.length)],
        verified: Math.random() > 0.5,
      });
    }

    setGeneratedProfiles(profiles);
    return profiles;
  }, [
    selectedGender,
    ageRange,
    city,
    // As dependências continuam corretas
    femalePhotos1824,
    femalePhotos2534,
    femalePhotos3544,
    femalePhotos4554,
    malePhotos1824,
    malePhotos2534,
    malePhotos3544,
    malePhotos4554,
  ]);

  const openProfileModal = (profile: any) => {
    setSelectedProfile(profile)
    setIsProfileModalOpen(true)
  }

  const closeProfileModal = () => {
    setIsProfileModalOpen(false)
    setSelectedProfile(null)
  }

  useEffect(() => {
    if (currentStep === "result") {
      generateFakeProfiles()
    }
  }, [currentStep, generateFakeProfiles])

  const canVerify =
    phoneNumber.length >= 10 &&
    selectedGender &&
    profilePhoto &&
    lastTinderUse &&
    cityChange &&
    ageRange &&
    userEmail.includes("@")

  // Function to submit email and proceed to verification
  const handleSubmitForm = async () => {
    if (!canVerify) return

    setIsSubmittingEmail(true)
    try {
      await fetch(
        "https://get.flwg.cc/webhook/fcafbda0a8e8960ca91106862bebf2b7529694e76d2c32f43bbc99dd12566347",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tag: "tinder check de - usuario criado",
            evento: "Usuário Criado",
            email: userEmail,
            phone: phoneNumber,
          }),
        },
      )
    } catch (error) {
      console.error("Error submitting email:", error)
    } finally {
      setIsSubmittingEmail(false)
      setCurrentStep("verification")
    }
  }

  return (
    <div className="min-h-screen" style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}>
      {/* Global Progress Bar - Mobile Optimized */}
      {currentStep !== "landing" && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="stepper-container overflow-x-auto px-3 py-3">
            <div className="flex items-center gap-2 min-w-max">
              {getProgressSteps().map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="stepper-step flex items-center gap-2 min-w-[80px] sm:min-w-[100px]">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 flex-shrink-0 ${
                        step.completed
                          ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step.completed ? "✓" : index + 1}
                    </div>
                    <span
                      className={`font-medium transition-colors duration-300 text-xs sm:text-sm whitespace-nowrap ${
                        step.completed
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      <span className="block sm:hidden">{step.mobileLabel}</span>
                      <span className="hidden sm:block">{step.fullLabel}</span>
                    </span>
                  </div>
                  {index < getProgressSteps().length - 1 && (
                    <div className="w-6 sm:w-8 h-px bg-gray-300 mx-2 sm:mx-3 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
            {/* Sales Proof Popup - Dynamic Social Proof */}
      <AnimatePresence>
        {showSalesProof && (currentStep === "generating" || currentStep === "result" || currentStep === "offer") && (
          <SalesProofPopup show={showSalesProof} onClose={() => setShowSalesProof(false)} />
        )}
      </AnimatePresence>

      <div className={currentStep !== "landing" ? "pt-16 sm:pt-20" : ""}>
        <AnimatePresence mode="wait">
          {/* Landing Page - Mobile Optimized */}
          {currentStep === "landing" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] relative overflow-hidden"
            >
              {/* Matrix Background - Reduced for mobile performance */}
              <div className="absolute inset-0 opacity-10 sm:opacity-20">
                {matrixCodes.slice(0, 15).map((code, index) => (
                  <motion.div
                    key={index}
                    className="absolute text-green-400 text-xs font-mono"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 2,
                    }}
                  >
                    {code}
                  </motion.div>
                ))}
              </div>

              {/* Content */}
              <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12">
                {/* Header */}
                <div className="text-center mb-12 sm:mb-16">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[#FF0066] to-[#FF3333] rounded-2xl mb-6 sm:mb-8 shadow-2xl"
                  >
                    <Search className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </motion.div>
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 px-2 leading-tight"
                  >
                    Dieses Bauchgefühl geht nicht weg...
                    <br />
                    <span className="text-[#FF3B30] text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold">
                      Und Sie haben Recht, ihm zu vertrauen
                    </span>
                  </motion.h1>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-[#CCCCCC] mb-6 text-base sm:text-lg md:text-xl px-4 max-w-3xl mx-auto font-medium"
                  >
                    Hören Sie auf, schlaflose Nächte damit zu verbringen, sich zu fragen, ob sie noch am Swipen sind. Holen Sie sich die Antworten, die Sie brauchen – völlig anonym.
                  </motion.p>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="inline-flex items-center gap-2 bg-green-600/20 text-green-300 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm mt-4 border border-green-500/30"
                  >
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-medium">Fortschrittliches Erkennungssystem - Aktualisiert Juni 2025</span>
                  </motion.div>
                </div>

                {/* Features - Mobile Optimized */}
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="max-w-2xl mx-auto space-y-3 sm:space-y-4 mb-8 sm:mb-12 px-4"
                >
                  <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <Activity className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-[#00FF99]" />
                    <span className="font-semibold text-sm sm:text-base">
                      ✅ Sehen Sie ihren letzten Login (auch wenn sie sagen, dass sie mit Apps „fertig“ sind)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-[#00FF99]" />
                    <span className="font-semibold text-sm sm:text-base">
                      ✅ Entdecken Sie, von wo aus sie wirklich swipen
                    </span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <Eye className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-[#00FF99]" />
                    <span className="font-semibold text-sm sm:text-base">
                      ✅ Greifen Sie auf die Gespräche zu, von denen sie nicht wollen, dass Sie sie sehen
                    </span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-[#00FF99]" />
                    <span className="font-semibold text-sm sm:text-base">
                      ✅ Ihre Untersuchung bleibt völlig privat
                    </span>
                  </div>
                </motion.div>

                {/* CTA - Mobile Optimized with Fixed Button Text */}
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.0 }}
                  className="text-center mb-12 sm:mb-16 px-4"
                >
                  <Button
                    onClick={() => setCurrentStep("form")}
                    className="bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white font-bold py-4 sm:py-6 px-6 sm:px-8 text-sm sm:text-base md:text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 w-full max-w-md mx-auto flex items-center justify-center text-center overflow-hidden"
                  >
                    <span className="block text-center leading-tight px-2 break-words whitespace-normal">
                      🔍 DIE WAHRHEIT ERFAHREN – ANONYME SUCHE STARTEN
                    </span>
                  </Button>

                  <p className="text-sm text-gray-300 mt-4 font-medium">
                    100 % anonyme Untersuchung. Sie werden nie erfahren, dass Sie nachgesehen haben.
                  </p>
                </motion.div>
              </div>

              {/* Bottom Section - Mobile Optimized */}
              <div className="bg-white py-12 sm:py-16">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#333333] mb-4">
                      Sie sind nicht paranoid -
                    </h2>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF0066] to-[#FF3333] mb-6">
                      Sie schützen sich selbst
                    </h3>
                    <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                      Hören Sie auf, Ihre Instinkte in Frage zu stellen. Holen Sie sich die Klarheit, die Sie benötigen, um fundierte Entscheidungen über Ihre Beziehung zu treffen.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto mb-8 sm:mb-12">
                    <div className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
                      </div>
                      <h4 className="font-bold text-[#333333] mb-2 text-sm sm:text-base">LETZTE AKTIVITÄT</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Sehen Sie, wann sie Dating-Apps zuletzt verwendet haben</p>
                    </div>
                    <div className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
                      </div>
                      <h4 className="font-bold text-[#333333] mb-2 text-sm sm:text-base">GENAUER STANDORT</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Wo sie geswipt haben</p>
                    </div>
                    <div className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
                      </div>
                      <h4 className="font-bold text-[#333333] mb-2 text-sm sm:text-base">VERSTECKTE FOTOS</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Fotos, die sie nicht sehen sollen</p>
                    </div>
                    <div className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
                      </div>
                      <h4 className="font-bold text-[#333333] mb-2 text-sm sm:text-base">PRIVATE GESPRÄCHE</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Was sie wirklich zu anderen sagen</p>
                    </div>
                  </div>

                  {/* Testimonials Section - Enhanced with validation focus */}
                  <div className="text-center mb-8 sm:mb-12">
                    <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-[#333333] mb-6 sm:mb-8 px-2">
                      Sie sind nicht allein - Sehen Sie, was andere entdeckt haben
                    </h3>

                    <div className="max-w-3xl mx-auto space-y-5 sm:space-y-6 mb-6 sm:mb-8">
                      {/* Sarah's Testimonial */}
                      <div className="testimonial-card bg-white rounded-xl shadow-lg p-4 sm:p-5 flex items-start gap-4">
                        <img
                          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fGVufDB8MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                          alt="Sarahs Foto"
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0 border-2 border-gray-200 shadow-sm"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fGVufDB8MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                          }}
                        />
                        <div className="flex-1 min-w-0 text-left">
                          <div className="mb-2">
                            <p className="font-bold text-[#333333] text-base sm:text-lg">Sarah, 32</p>
                            <p className="text-xs sm:text-sm text-green-600 font-medium">✓ Verifizierte Benutzerin</p>
                          </div>
                          <div className="mb-3">
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 float-left mr-1 mt-1"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                            </svg>
                            <p className="text-[#444444] text-base sm:text-lg leading-relaxed font-normal">
                              Ich wusste, dass etwas nicht stimmte. Der Bericht bestätigte meine schlimmsten Befürchtungen, aber zumindest konnte ich jetzt eine fundierte Entscheidung treffen, anstatt in ständiger Angst zu leben.
                            </p>
                          </div>
                          <div className="flex items-center text-[#FFD700] text-sm sm:text-base gap-1">
                            <span>⭐⭐⭐⭐⭐</span>
                          </div>
                        </div>
                      </div>
                                            {/* Jennifer's Testimonial */}
                      <div className="testimonial-card bg-white rounded-xl shadow-lg p-4 sm:p-5 flex items-start gap-4">
                        <img
                          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29tYW4lMjBwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D"
                          alt="Jennifers Foto"
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0 border-2 border-gray-200 shadow-sm"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1580489944761-15a19d654956?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29tYW4lMjBwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D"
                          }}
                        />
                        <div className="flex-1 min-w-0 text-left">
                          <div className="mb-2">
                            <p className="font-bold text-[#333333] text-base sm:text-lg">Jennifer, 28</p>
                            <p className="text-xs sm:text-sm text-blue-600 font-medium">
                              Untersuchung abgeschlossen Juni 2025
                            </p>
                          </div>
                          <div className="mb-3">
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 float-left mr-1 mt-1"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                            </svg>
                            <p className="text-[#444444] text-base sm:text-lg leading-relaxed font-normal">
                              Die besten 17 €, die ich je ausgegeben habe. Es hat mir monatelanges Grübeln erspart und mir den Abschluss gegeben, den ich brauchte. Meine Instinkte hatten die ganze Zeit recht.
                            </p>
                          </div>
                          <div className="flex items-center text-[#FFD700] text-sm sm:text-base gap-1">
                            <span>⭐⭐⭐⭐⭐</span>
                          </div>
                        </div>
                      </div>

                      {/* Michelle's Testimonial */}
                      <div className="testimonial-card bg-white rounded-xl shadow-lg p-4 sm:p-5 flex items-start gap-4">
                        <img
                          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fGVufDB8MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
                          alt="Michelles Foto"
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0 border-2 border-gray-200 shadow-sm"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
                          }}
                        />
                        <div className="flex-1 min-w-0 text-left">
                          <div className="mb-2">
                            <p className="font-bold text-[#333333] text-base sm:text-lg">Michelle, 35</p>
                            <p className="text-xs sm:text-sm text-green-600 font-medium">✓ Verifizierte Benutzerin</p>
                          </div>
                          <div className="mb-3">
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 float-left mr-1 mt-1"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                            </svg>
                            <p className="text-[#444444] text-base sm:text-lg leading-relaxed font-normal">
                              Ich fühlte mich schuldig, nachzusehen, aber meine Instinkte hatten recht. Jetzt kann ich mit Zuversicht weitermachen, anstatt im Zweifel zu leben.
                            </p>
                          </div>
                          <div className="flex items-center text-[#FFD700] text-sm sm:text-base gap-1">
                            <span>⭐⭐⭐⭐⭐</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Single CTA Button - Fixed Text Overflow */}
                    <Button
                      onClick={() => setCurrentStep("form")}
                      className="bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white font-bold py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base md:text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full max-w-sm mx-auto flex items-center justify-center text-center overflow-hidden"
                    >
                      <span className="block text-center leading-tight px-2 break-words whitespace-normal">
                        🔍 MEINE ANONYME UNTERSUCHUNG STARTEN
                      </span>
                    </Button>
                  </div>

                  {/* Bottom Privacy Notice */}
                  <div className="text-center px-4">
                    <p className="text-xs text-gray-500 flex items-center justify-center gap-2 font-medium">
                      <Shield className="w-4 h-4" />
                      100 % anonym – Ihre Untersuchung bleibt absolut privat
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Form - Mobile Optimized */}
          {currentStep === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-[#6C63FF] relative overflow-hidden"
            >
              {/* Floating dots - Reduced for mobile */}
              <div className="absolute inset-0">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full opacity-20"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 container mx-auto px-4 py-6 sm:py-8 flex items-center justify-center min-h-screen">
                <div className="w-full max-w-lg">
                  {/* Header */}
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-2xl">
                      <Wifi className="w-8 h-8 sm:w-10 sm:h-10 text-[#6C63FF]" />
                    </div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                      🔍 Helfen Sie uns zu finden, was sie verbergen
                    </h1>
                    <p className="text-gray-200 text-sm sm:text-base px-4 leading-relaxed">
                      Je mehr Details Sie angeben, desto tiefer können wir graben. Alles bleibt 100 % anonym.
                    </p>
                  </div>

                  {/* Form */}
                  <Card className="bg-white rounded-2xl shadow-lg border-0">
                    <CardContent className="p-4 sm:p-8 space-y-6 sm:space-y-8">
                      {/* Photo Upload - Moved to first position */}
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-3 sm:mb-4">
                          Laden Sie ihr Foto für die Gesichtserkennung hoch
                        </label>
                        <div className="text-center">
                          {uploadedPhoto ? (
                            <div className="relative inline-block">
                              <img
                                src={uploadedPhoto || "/placeholder.svg"}
                                alt="Hochgeladen"
                                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-blue-500 shadow-lg"
                              />
                              <button
                                onClick={() => setUploadedPhoto(null)}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                              >
                                ×
                              </button>
                            </div>
                          ) : (
                            <div className="w-24 h-24 sm:w-28 sm:h-28 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center mx-auto cursor-pointer hover:border-blue-500 transition-colors">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              />
                              <Camera className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 mt-3 font-medium">
                          Wir scannen alle Dating-Plattformen, um übereinstimmende Profile zu finden – selbst solche, von denen sie glauben, dass sie versteckt sind.
                        </p>
                      </div>

                      {/* Phone Number - Now second */}
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-2 sm:mb-3">
                          WhatsApp-Nummer, die sie verwenden
                        </label>
                        <div className="flex gap-2 sm:gap-3">
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                              className="bg-gray-100 px-3 sm:px-4 py-2 sm:py-3 rounded-xl border text-gray-600 flex-shrink-0 font-medium text-sm sm:text-base flex items-center gap-2 hover:bg-gray-200 transition-colors duration-200 min-w-[80px] sm:min-w-[90px]"
                            >
                              <span className="text-lg">{selectedCountry.flag}</span>
                              <span>{selectedCountry.code}</span>
                              <svg
                                className="w-3 h-3 sm:w-4 sm:h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>

                            {showCountryDropdown && (
                              <div className="absolute top-full left-0 mt-1 bg-white border rounded-xl shadow-lg z-50 w-80 max-h-60 overflow-y-auto">
                                <div className="p-2">
                                  <input
                                    type="text"
                                    placeholder="Land suchen..."
                                    value={countrySearch}
                                    onChange={(e) => setCountrySearch(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                  />
                                </div>
                                {filteredCountries.map((country) => (
                                  <button
                                    key={country.code}
                                    type="button"
                                    onClick={() => {
                                      setSelectedCountry(country)
                                      setShowCountryDropdown(false)
                                      setCountrySearch("")
                                      // Update phone number with new country code
                                      const currentNumber = phoneNumber.replace(/^\+\d+\s*/, "")
                                      setPhoneNumber(country.code + " " + currentNumber)
                                    }}
                                    className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-3 text-sm"
                                  >
                                    <span className="text-lg">{country.flag}</span>
                                    <span className="font-medium">{country.code}</span>
                                    <span className="text-gray-600">{country.name}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          <Input
                            type="tel"
                            placeholder={selectedCountry.placeholder}
                            value={phoneNumber}
                            onChange={(e) => handlePhoneChange(e.target.value)}
                            className="flex-1 py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 mt-2 font-medium">
                          Dies hilft uns, ihre Geräteaktivität zu verfolgen und mit den Nutzungsmustern von Dating-Apps abzugleichen.
                        </p>

                        {/* WhatsApp Photo Preview */}
                        {(profilePhoto || isLoadingPhoto) && (
                          <div className="mt-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3 sm:gap-4">
                              {isLoadingPhoto ? (
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-200 rounded-xl animate-pulse" />
                              ) : (
                                <img
                                  src={profilePhoto || "/placeholder.svg"}
                                  alt="WhatsApp Profil"
                                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border-2 border-gray-200"
                                />
                              )}
                              <div className="flex-1">
                                <p className="font-semibold text-[#333333] text-sm sm:text-base">
                                  WhatsApp-Profil gefunden
                                </p>
                                <p className="text-xs sm:text-sm text-gray-600">
                                  {isPhotoPrivate ? "Privates Foto erkannt" : "Profilfoto geladen"}
                                </p>
                              </div>
                              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Gender Selection */}
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-3 sm:mb-4">
                          Welches Geschlecht haben sie?
                        </label>
                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                          {[
                            { value: "masculino", label: "Männlich", icon: "👨" },
                            { value: "feminino", label: "Weiblich", icon: "👩" },
                            { value: "nao-binario", label: "Nicht-binär", icon: "🧑" },
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setSelectedGender(option.value)}
                              className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                                selectedGender === option.value
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="text-lg sm:text-xl mb-1 sm:mb-2">{option.icon}</div>
                              <div className="text-xs sm:text-sm font-medium">{option.label}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                                            {/* Age Range */}
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-3 sm:mb-4">
                          Wie alt sind sie?
                        </label>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          {[
                            { value: "18-24", label: "18-24 Jahre" },
                            { value: "25-34", label: "25-34 Jahre" },
                            { value: "35-44", label: "35-44 Jahre" },
                            { value: "45-54", label: "45+ Jahre" },
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setAgeRange(option.value)}
                              className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                                ageRange === option.value
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="text-xs sm:text-sm font-medium">{option.label}</div>
                            </button>
                          ))}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 mt-2 font-medium">
                          Dies hilft uns, die Suchparameter auf den Dating-Plattformen einzugrenzen.
                        </p>
                      </div>

                      {/* Timeline Questions */}
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-3 sm:mb-4">
                          Wann haben Sie angefangen, Verdacht zu schöpfen?
                        </label>
                        <div className="space-y-2 sm:space-y-3">
                          {[
                            { value: "week", label: "Innerhalb der letzten Woche", desc: "(aktuelle Verhaltensänderungen)" },
                            { value: "month", label: "Letzten Monat", desc: "(allmähliche Distanz/Verstecken des Handys)" },
                            { value: "longer", label: "Mehr als einen Monat", desc: "(anhaltendes Bauchgefühl)" },
                            { value: "sure", label: "Ich muss es nur sicher wissen", desc: "" },
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setLastTinderUse(option.value)}
                              className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                                lastTinderUse === option.value
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="font-medium text-sm sm:text-base">{option.label}</div>
                              {option.desc && (
                                <div className="text-xs sm:text-sm text-gray-500 mt-1">{option.desc}</div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Location Questions */}
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-3 sm:mb-4">
                          Haben sie „lange gearbeitet“ oder waren sie auf Reisen?
                        </label>
                        <div className="space-y-2 sm:space-y-3">
                          {[
                            { value: "yes", label: "Ja", desc: "„Neue berufliche Anforderungen“ oder ungeklärte Reisen" },
                            { value: "no", label: "Nein", desc: "Verhaltensänderungen traten zu Hause auf" },
                            { value: "unknown", label: "Ich weiß nicht", desc: "Sie sind geheimnisvoll bezüglich ihres Zeitplans" },
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setCityChange(option.value)}
                              className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                                cityChange === option.value
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="font-medium text-sm sm:text-base">{option.label}</div>
                              <div className="text-xs sm:text-sm text-gray-500 mt-1">{option.desc}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Email Field - Added here */}
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-2 sm:mb-3">
                          Ihre E-Mail-Adresse
                        </label>
                        <Input
                          type="email"
                          placeholder="Geben Sie Ihre E-Mail-Adresse ein"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          className="py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                        <p className="text-xs sm:text-sm text-gray-500 mt-2 font-medium">
                          Wir senden Ihren vollständigen Bericht an diese E-Mail-Adresse. 100 % vertraulich.
                        </p>
                      </div>

                      {/* Submit Button - Fixed Text Overflow */}
                      <Button
                        onClick={handleSubmitForm}
                        disabled={!canVerify || isSubmittingEmail}
                        className={`w-full py-3 sm:py-4 text-sm sm:text-base md:text-lg font-bold rounded-xl transition-all duration-300 overflow-hidden ${
                          canVerify && !isSubmittingEmail
                            ? "bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        <span className="block text-center leading-tight px-2">
                          {isSubmittingEmail ? "Wird verarbeitet..." : "🔍 UNTERSUCHUNG STARTEN - DIE WAHRHEIT FINDEN"}
                        </span>
                      </Button>

                      {/* Trust Signal */}
                      <div className="text-center">
                        <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                          <Lock className="w-4 h-4" />
                          Ihre Daten werden verschlüsselt und nach 24 Stunden automatisch gelöscht
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}

          {/* Verification - Mobile Optimized */}
          {currentStep === "verification" && (
            <motion.div
              key="verification"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] flex items-center justify-center px-4 py-8"
            >
              <div className="w-full max-w-md">
                <Card className="bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
                  <CardContent className="p-6 sm:p-8 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg">
                      <Search className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-pulse" />
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-[#333333] mb-4 sm:mb-6">
                      🔍 Scannen aller Dating-Plattformen...
                    </h2>

                    <div className="mb-6 sm:mb-8">
                      <Progress value={verificationProgress} className="h-3 sm:h-4 mb-4 sm:mb-6" />
                      <p className="text-sm sm:text-base text-gray-600 font-medium">{verificationMessage}</p>
                    </div>

                    <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">
                          Tinder, Bumble, Hinge werden gescannt...
                        </span>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-pulse" />
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">
                          Gesichtserkennung wird verarbeitet...
                        </span>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full animate-pulse" />
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">Standortdatenanalyse...</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                        <Lock className="w-4 h-4" />
                        Sichere und verschlüsselte Verbindung - Keine Spuren hinterlassen
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Preliminary Results - Mobile Optimized */}
          {currentStep === "preliminary" && (
            <motion.div
              key="preliminary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] flex items-center justify-center px-4 py-8"
            >
              <div className="w-full max-w-lg">
                <Card className="bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
                  <CardContent className="p-6 sm:p-8">
                    {/* Alert Header */}
                    <div className="text-center mb-6 sm:mb-8">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg animate-pulse">
                        <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#333333] mb-3 sm:mb-4">
                        Wir haben gefunden, wonach Sie gesucht haben...
                      </h2>
                    </div>

                    {/* Alert Box */}
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 flex-shrink-0" />
                        <h3 className="text-lg sm:text-xl font-bold text-red-700">AKTIVE DATING-PROFILE ENTDECKT</h3>
                      </div>
                      <p className="text-sm sm:text-base text-red-600 font-medium leading-relaxed">
                        Unser System hat mehrere aktive Profile dieser Person auf 3 verschiedenen Dating-Plattformen entdeckt.
                      </p>
                    </div>

                    {/* Key Findings */}
                    <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                      <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-[#333333] text-sm sm:text-base mb-1 sm:mb-2">
                            Zuletzt aktiv: vor 18 Stunden
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">
                            Obwohl behauptet wird, „alles gelöscht“ zu haben...
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-[#333333] text-sm sm:text-base mb-1 sm:mb-2">
                            3 Dating-Apps derzeit aktiv
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">Tinder, Bumble und eine Premium-Plattform</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-[#333333] text-sm sm:text-base mb-1 sm:mb-2">
                            Aktuelle Gespräche erkannt
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">
                            Aktive Nachrichten mit mehreren Matches in dieser Woche
                          </p>
                        </div>
                      </div>
                    </div>
                                        {/* Next Step Box */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs sm:text-sm font-bold">💡</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-blue-700">
                          Was Sie im vollständigen Bericht sehen werden:
                        </h3>
                      </div>
                      <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-blue-600">
                        <li className="flex items-center gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          Screenshots aller aktiven Profile
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          Aktuelle Gespräche und was sie sagen
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          Genaue Standorte, an denen sie geswipt haben
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          Zeitachse aller Aktivitäten (Sie werden schockiert sein)
                        </li>
                      </ul>
                    </div>

                    {/* CTA Button - Fixed Text Overflow */}
                    <Button
                      onClick={() => setCurrentStep("generating")}
                      className="w-full bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white font-bold py-3 sm:py-4 text-sm sm:text-base md:text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-4 sm:mb-6 overflow-hidden flex items-center justify-center text-center"
                    >
                      <span className="block text-center leading-tight px-2 break-words whitespace-normal">
                        🔓 VOLLSTÄNDIGE BEWEISE FREISCHALTEN – ALLES SEHEN
                      </span>
                    </Button>

                    {/* Reassurance */}
                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                        <Lock className="w-4 h-4" />
                        Vollständige Anonymität garantiert - Sie werden nie erfahren, dass Sie nachgesehen haben
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Generating Report - Mobile Optimized */}
          {currentStep === "generating" && (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] flex items-center justify-center px-4 py-8"
            >
              <div className="w-full max-w-md">
                <Card className="bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
                  <CardContent className="p-6 sm:p-8 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-[#333333] mb-4 sm:mb-6">
                      📊 Vollständiger Bericht wird erstellt...
                    </h2>

                    <div className="mb-6 sm:mb-8">
                      <Progress value={generatingProgress} className="h-3 sm:h-4 mb-4 sm:mb-6" />
                      <p className="text-sm sm:text-base text-gray-600 font-medium">{generatingMessage}</p>
                    </div>

                    <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                      <div
                        className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl ${
                          stepCompleted.profilePhotos ? "bg-green-50" : "bg-blue-50"
                        }`}
                      >
                        {stepCompleted.profilePhotos ? (
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                        ) : (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        )}
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">Profilfotos analysiert</span>
                      </div>
                      <div
                        className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl ${
                          stepCompleted.conversations
                            ? "bg-green-50"
                            : stepCompleted.profilePhotos
                              ? "bg-blue-50"
                              : "bg-gray-50"
                        }`}
                      >
                        {stepCompleted.conversations ? (
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                        ) : stepCompleted.profilePhotos ? (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-300 rounded-full" />
                        )}
                        <span
                          className={`text-xs sm:text-sm font-medium ${
                            stepCompleted.conversations || stepCompleted.profilePhotos
                              ? "text-gray-700"
                              : "text-gray-500"
                          }`}
                        >
                          Gespräche werden verarbeitet...
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl ${
                          stepCompleted.finalizing
                            ? "bg-green-50"
                            : stepCompleted.conversations
                              ? "bg-blue-50"
                              : "bg-gray-50"
                        }`}
                      >
                        {stepCompleted.finalizing ? (
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                        ) : stepCompleted.conversations ? (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-300 rounded-full" />
                        )}
                        <span
                          className={`text-xs sm:text-sm font-medium ${
                            stepCompleted.finalizing || stepCompleted.conversations ? "text-gray-700" : "text-gray-500"
                          }`}
                        >
                          Bericht wird fertiggestellt...
                        </span>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                        <Lock className="w-4 h-4" />
                        Verschlüsselung sensibler Daten für Ihre Privatsphäre
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Result - Mobile Optimized */}
          {currentStep === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] px-4 py-6 sm:py-8"
            >
              <div className="container mx-auto max-w-4xl">
                {(profilePhoto || uploadedPhoto) && (
                  <div className="flex justify-center mb-6 sm:mb-8">
                    <div className="relative">
                      <img
                        src={uploadedPhoto || profilePhoto || ""}
                        alt="Profil"
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      {isPhotoPrivate && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                          <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Alert Banners */}
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-3 sm:p-4 rounded-xl shadow-lg">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
                      <div>
                        <h3 className="font-bold text-sm sm:text-base">🚨 PROFIL GEFUNDEN - AKTIV AUF TINDER</h3>
                        <p className="text-xs sm:text-sm opacity-90">Zuletzt gesehen: Jetzt online</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 sm:p-4 rounded-xl shadow-lg">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
                      <div>
                        <h3 className="font-bold text-sm sm:text-base">⚠️ ACHTUNG: AKTIVES PROFIL GEFUNDEN!</h3>
                        <p className="text-xs sm:text-sm opacity-90">
                          Wir bestätigen, dass diese Nummer mit einem AKTIVEN Tinder-Profil verknüpft ist. Die letzten Nutzungsdaten wurden in{" "}
                          {city || "Ihrer Nähe"} festgestellt.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-red-500 mb-1">6</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">MATCHES (7 TAGE)</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-orange-500 mb-1">30</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">LIKES (7 TAGE)</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-purple-500 mb-1">4</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">AKTIVE CHATS</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-green-500 mb-1">18h</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">ZULETZT AKTIV</div>
                  </div>
                </div>

                {/* Recent Matches */}
                <Card className="bg-white rounded-2xl shadow-lg border-0 mb-6 sm:mb-8">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-[#333333] mb-4 sm:mb-6">
                      🔥 KÜRZLICHE MATCHES GEFUNDEN
                    </h3>
                       <p className="text-sm text-gray-600 text-left mb-6">
    Tippen Sie auf ein Match, um weitere Informationen anzuzeigen
  </p>
                    <div className="space-y-4">
                      {generatedProfiles.map((profile, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => openProfileModal(profile)}
                        >
                          <div className="relative">
                            {profile.image ? (
                              <img
                                src={profile.image || "/placeholder.svg"}
                                alt={profile.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center">
                                <User className="w-6 h-6 text-pink-600" />
                              </div>
                            )}
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold text-gray-900">
                                {profile.name}, {profile.age}
                              </h4>
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            </div>
                            <p className="text-sm text-gray-600">Zuletzt gesehen: {profile.lastSeen}</p>
                            <p className="text-sm text-green-600">Aktiver Chat: häufig online</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Photos Section */}
                <Card className="bg-white rounded-2xl shadow-lg border-0 mb-6 sm:mb-8">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-[#333333] mb-4 sm:mb-6">📸 ZENSIERTE FOTOS</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                      Sehen Sie alle ihre Profilfotos (einschließlich derer, die Sie noch nie gesehen haben)
                    </p>

                    {/* Carousel */}
                    <div className="relative">
                      <div className="overflow-hidden rounded-xl">
                        <div
                          className="flex transition-transform duration-300 ease-in-out"
                          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                          {blockedImages.map((image, index) => (
                            <div key={index} className="w-full flex-shrink-0 relative">
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`Chat-Unterhaltung ${index + 1}`}
                                className="w-full h-48 sm:h-64 object-cover"
                                style={{ filter: "blur(8px) brightness(0.7)" }}
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                <div className="text-center">
                                  <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-white mx-auto mb-2 opacity-80" />
                                  <p className="text-white text-xs font-bold opacity-80">GESPERRT</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                                            {/* Carousel Controls */}
                      <button
                        onClick={prevSlide}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextSlide}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      {/* Dots Indicator */}
                      <div className="flex justify-center gap-2 mt-4">
                        {blockedImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                              index === currentSlide ? "bg-blue-500" : "bg-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Unlock Section */}
                <Card className="bg-white rounded-2xl shadow-lg border-0">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="mb-4 sm:mb-6">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                        <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#333333] mb-3 sm:mb-4">
                        🔓 VOLLSTÄNDIGEN BERICHT FREISCHALTEN
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                        Erhalten Sie sofortigen Zugriff auf den vollständigen Bericht mit unzensierten Fotos und dem kompletten Gesprächsverlauf.
                      </p>
                    </div>

                    {/* Emergency Timer Card - Added before checkout button */}
                    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 sm:p-6 rounded-xl shadow-lg mb-4 sm:mb-6">
                      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3">
                        <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
                        <span className="font-bold text-lg sm:text-xl">DER BERICHT WIRD GELÖSCHT IN:</span>
                      </div>
                      <div className="text-center mb-3">
                        <div className="text-3xl sm:text-4xl font-bold mb-2">{formatTime(timeLeft)}</div>
                      </div>
                      <p className="text-sm sm:text-base text-center leading-relaxed opacity-90">
                        Nach Ablauf der Zeit wird dieser Bericht aus Datenschutzgründen dauerhaft gelöscht. Dieses Angebot kann zu einem späteren Zeitpunkt nicht wiederhergestellt werden.
                      </p>
                    </div>

                    {/* Direct Checkout Button - Usando a tag <a> (Recomendado) */}
<a
  href="https://pay.mundpay.com/0199291a-a1ae-7329-9d05-2e3de4d49b3c?ref="
  target="_blank"
  rel="noopener noreferrer"
  className="block w-full text-center bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white font-bold py-4 sm:py-6 text-sm sm:text-base md:text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-4 sm:mb-6 overflow-hidden"
>
  <span className="block text-center leading-tight px-2"> 🔓 MEINEN BERICHT FREISCHALTEN - ICH BIN BEREIT FÜR DIE WAHRHEIT </span>
</a>

                    {/* Final Reassurance */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                      <p className="text-sm sm:text-base text-blue-700 font-medium leading-relaxed">
                        Sie dringen nicht in die Privatsphäre ein – Sie schützen Ihr emotionales Wohlbefinden. Sie haben das Recht, fundierte Entscheidungen über Ihre Beziehung zu treffen.
                      </p>
                    </div>

                    {/* Testimonial */}
                    <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <img
                          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fGVufDB8MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                          alt="Sarah M."
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-200"
                        />
                        <div className="flex-1 text-left">
                          <div className="mb-2">
                            <p className="font-bold text-[#333333] text-sm sm:text-base">Sarah M.</p>
                            <p className="text-xs sm:text-sm text-green-600 font-medium">✓ Verifizierte Benutzerin</p>
                          </div>
                          <p className="text-sm sm:text-base text-gray-600 italic leading-relaxed">
                            „Ich wünschte, ich hätte das schon vor Monaten getan. Hätte mir so viel Angst und verschwendete Zeit erspart.“
                          </p>
                          <div className="flex items-center text-[#FFD700] text-sm mt-2">
                            <span>⭐⭐⭐⭐⭐</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {isProfileModalOpen && selectedProfile && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                      {/* Header with close button */}
                      <div className="relative">
                        <button
                          onClick={closeProfileModal}
                          className="absolute top-4 left-4 z-10 w-10 h-10 bg-white bg-opacity-80 rounded-full flex items-center justify-center shadow-lg"
                        >
                          <X className="w-5 h-5 text-gray-700" />
                        </button>

                        {/* Profile Image */}
                        <div className="relative h-96 bg-gray-200 rounded-t-2xl overflow-hidden">
                          <img
                            src={selectedProfile.image || "/placeholder.svg"}
                            alt={selectedProfile.name}
                            className="w-full h-full object-cover"
                          />

                          {/* Gradient overlay */}
                          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent"></div>

                          {/* Name and basic info overlay */}
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <div className="flex items-center gap-2 mb-1">
                              <h2 className="text-3xl font-bold">{selectedProfile.name}</h2>
                              {selectedProfile.verified && (
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-4 text-sm opacity-90">
                              <div className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                <span>{selectedProfile.orientation}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{selectedProfile.location}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 text-sm opacity-90 mt-1">
                              <MapPin className="w-4 h-4" />
                              <span>{selectedProfile.distance}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Profile Content */}
                      <div className="p-6 space-y-6">
                        {/* About Me Section */}
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3">Über mich</h3>
                          <p className="text-gray-700 leading-relaxed">{selectedProfile.bio}</p>
                        </div>

                        {/* Personality Tags */}
                        {selectedProfile.personality && (
                          <div>
                            <div className="flex flex-wrap gap-2">
                              {selectedProfile.personality.map((tag: string, index: number) => (
                                <span
                                  key={index}
                                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm border border-gray-300"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                                                {/* My Interests Section */}
                        {selectedProfile.interests && (
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Meine Interessen</h3>
                            <div className="flex flex-wrap gap-2">
                              {selectedProfile.interests.map((interest: string, index: number) => (
                                <span
                                  key={index}
                                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm border border-gray-300"
                                >
                                  {interest}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-4">
                          <button className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors">
                            Überspringen
                          </button>
                          <button className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 rounded-full font-semibold hover:bg-pink-600 hover:to-red-600 transition-colors">
                            Gefällt mir
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Offer Page */}
          {currentStep === "offer" && (
            <motion.div key="offer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] px-4 py-6 sm:py-8" >
              <div className="container mx-auto max-w-2xl">
                <Card className="bg-white rounded-2xl shadow-lg border-0">
                  <CardContent className="p-6 sm:p-8 text-center">
                    {/* Header */}
                    <div className="mb-6 sm:mb-8">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                        <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#333333] mb-3 sm:mb-4"> Sie verdienen es, die ganze Wahrheit zu erfahren </h1>
                      <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed"> Hören Sie auf, sich zu wundern. Hören Sie auf, den Schlaf zu verlieren. Erhalten Sie jedes Detail – absolut vertraulich. </p>
                      <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl p-4 sm:p-6">
                        <p className="text-sm sm:text-base text-red-700 font-semibold leading-relaxed"> Ihre Instinkte hatten recht. Sehen Sie jetzt genau, was sie verborgen haben, während sie Ihnen in die Augen sahen und logen. </p>
                      </div>
                    </div>

                    {/* Price Section */}
                    <div className="mb-6 sm:mb-8">
                      <div className="flex items-center justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                        <div className="text-2xl sm:text-3xl text-gray-400 line-through">47,00 €</div>
                        <div className="text-4xl sm:text-5xl font-bold text-[#FF0066]">17,00 €</div>
                      </div>
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-bold mb-4"> 🔥 62% RABATT - BEGRENZTE ZEIT </div>
                      <p className="text-sm sm:text-base text-gray-600 font-medium"> Einmalige Zahlung für lebenslangen Zugriff auf Ihren vollständigen Bericht </p>
                    </div>

                    {/* What You'll Unlock */}
                    <div className="text-left mb-6 sm:mb-8">
                      <h3 className="text-lg sm:text-xl font-bold text-[#333333] mb-4 sm:mb-6 text-center"> Was Sie freischalten werden: </h3>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                          <span className="text-sm sm:text-base text-gray-700 font-medium"> Jedes einzelne Profilfoto (einschließlich derer, von denen sie glauben, dass Sie sie nie sehen werden) </span>
                        </div>
                        <div className="flex items-start gap-3 sm:gap-4">
                          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                          <span className="text-sm sm:text-base text-gray-700 font-medium"> Vollständiger Gesprächsverlauf (sehen Sie genau, was sie anderen Leuten erzählen) </span>
                        </div>
                      </div>
                    </div>

                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
