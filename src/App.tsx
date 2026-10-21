import { useRef, useMemo, useState } from 'react';
import { 
  MapPin, CheckCircle, Phone, Mail, Send, Shovel, Axe, Star, Scissors, 
  Sprout, Building, Leaf, Droplet, Hammer, 
  ArrowRight, Calculator, ChevronDown, Lock, Check, X 
} from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// --- 3D PARTICLE EFFECT (ΔΙΟΡΘΩΜΕΝΟ ΓΙΑ ΤΟ VERCEL) ---
function DustParticles() {
  const pointsRef = useRef<any>(null);
  const count = 3000;
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, []);

  useFrame((_state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta / 15;
      pointsRef.current.rotation.x -= delta / 20;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={positions.length / 3} 
          array={positions} 
          itemSize={3} 
          args={[positions, 3]} 
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#a3e635" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

// --- ΑΡΧΙΚΕΣ ΚΡΙΤΙΚΕΣ ---
const initialReviews = [
  { name: "Νίκος", location: "Λευκώνας", text: "Τα παιδιά καθάρισαν τα πάντα και πήραν τα κλαδιά μαζί. Συνεννόησιμοι και εργατικοί.", stars: 4, date: "Πριν 1 εβδομάδα" },
  { name: "Δήμητρα", location: "Νιγρίτα", text: "Επειδή βιαζόμασταν ήρθανε Κυριακή πρωί. Είδα την αυλή μου όμορφη επιτέλους.", stars: 5, date: "Πριν 2 εβδομάδες" },
  { name: "Ηλίας", location: "Χρυσό", text: "Πολύ καλή δουλειά. Γρήγοροι και νοικοκύρηδες.", stars: 4, date: "Πριν 3 εβδομάδες" },
  { name: "Κώστας", location: "Σέρρες", text: "Καθάρισαν το οικόπεδο γρήγορα.", stars: 4, date: "Πριν 1 μήνα" },
  { name: "Βασίλης", location: "Νεοχώρι", text: "Το χωράφι είχε γίνει ζούγκλα. Μπήκαν μέσα με τα μηχανήματα και το έκαναν αγνώριστο. Σίγουρα θα τους ξαναφωνάξω.", stars: 5, date: "Πριν 1 μήνα" },
  { name: "Αντώνης", location: "Σέρρες", text: "Μια χαρά", stars: 3, date: "Πριν 2 μήνες" },
  { name: "Μαρία", location: "Βαλτοτόπι", text: "Τακτικοί και με δικά τους εργαλεία. Στοίβαξαν τα ξύλα ακριβώς εκεί που ζήτησα. Να 'σαι καλά Χρήστο.", stars: 4, date: "Πριν 2 μήνες" },
  { name: "Ελένη", location: "Νέος Σκοπός", text: "Τίμιοι.", stars: 4, date: "Πριν 3 μήνες" },
  { name: "Κώστας", location: "Καλά Δένδρα", text: "Μας έκοψαν κάτι μεγάλα δέντρα που φοβόμασταν να τα πειράξουμε μόνοι μας. Πολύ προσεκτικοί στη δουλειά τους.", stars: 4, date: "Πριν 4 μήνες" },
];

function App() {
  const totalImages = 50; 
  const imageNumbers = Array.from({ length: totalImages }, (_, i) => i + 1);

  // --- STATES ΓΙΑ ΚΡΙΤΙΚΕΣ & ADMIN PANEL ---
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('site_reviews');
    return saved ? JSON.parse(saved) : initialReviews;
  });
  
  const [pendingReviews, setPendingReviews] = useState<any[]>(() => {
    const saved = localStorage.getItem('site_pending_reviews');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const [userRating, setUserRating] = useState(5);
  const [reviewName, setReviewName] = useState("");
  const [reviewLocation, setReviewLocation] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [isSendingReview, setIsSendingReview] = useState(false);

  // --- STATES ΓΙΑ ΜΠΑΡΑ ΚΡΑΤΗΣΗΣ & ΦΟΡΜΑ ΕΠΙΚΟΙΝΩΝΙΑΣ ---
  const [quickService, setQuickService] = useState("Κούρεμα Χόρτων & Γκαζόν");
  const [quickArea, setQuickArea] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSendingContact, setIsSendingContact] = useState(false);

  // --- STATES ΥΠΟΛΟΓΙΣΤΗ ΕΡΓΑΣΙΑΣ & FAQ ---
  const [areaSize, setAreaSize] = useState(1000);
  const [grassCondition, setGrassCondition] = useState<'normal' | 'medium' | 'dense'>('normal');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // --- ΥΠΟΛΟΓΙΣΜΟΣ ΧΡΟΝΟΥ ---
  const getEstimatedTime = () => {
    if (areaSize <= 300) {
      if (grassCondition === 'normal') return '1 - 2 Ώρες';
      if (grassCondition === 'medium') return '2 - 4 Ώρες';
      return '3 - 5 Ώρες';
    }
    if (areaSize <= 800) {
      if (grassCondition === 'normal') return '2 - 4 Ώρες';
      if (grassCondition === 'medium') return '4 - 6 Ώρες';
      return '5 - 7 Ώρες';
    }
    if (areaSize <= 1500) {
      if (grassCondition === 'normal') return '3 - 5 Ώρες';
      if (grassCondition === 'medium') return '5 - 7 Ώρες';
      return '6 - 8 Ώρες';
    }
    if (areaSize <= 3000) {
      if (grassCondition === 'normal') return '5 - 8 Ώρες';
      if (grassCondition === 'medium') return '1 Ημέρα (Πλήρες Συνεργείο)';
      return '1 - 2 Ημέρες (Πλήρες Συνεργείο)';
    }
    if (grassCondition === 'normal') return '1 Ημέρα (Πλήρες Συνεργείο)';
    if (grassCondition === 'medium') return '1 - 2 Ημέρες (Πλήρες Συνεργείο)';
    return 'Κατόπιν Αυτοψίας (Πλήρες Συνεργείο)';
  };

  // --- ΥΠΟΒΟΛΗ ΚΡΙΤΙΚΗΣ ---
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendingReview(true);

    const newReviewItem = {
      name: reviewName,
      location: reviewLocation,
      text: reviewText,
      stars: userRating,
      date: "Μόλις τώρα"
    };

    try {
      // 1. Στέλνει email ειδοποίησης σε εσένα
      await fetch("https://formsubmit.co/ajax/xerxeletzisxristos@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `Νέα Κριτική προς έγκριση (${userRating} Αστέρια) - Χορτοφάγος`,
          Όνομα: reviewName,
          Τοποθεσία: reviewLocation,
          Βαθμολογία: `${userRating} / 5 Αστέρια`,
          Κριτική: reviewText,
        }),
      });

      // 2. Προσθέτει την κριτική στη λίστα εκκρεμών (pending) για να την εγκρίνεις από το admin panel
      const updatedPending = [newReviewItem, ...pendingReviews];
      setPendingReviews(updatedPending);
      localStorage.setItem('site_pending_reviews', JSON.stringify(updatedPending));

      alert("Η κριτική σας υποβλήθηκε επιτυχώς! Σας ευχαριστούμε πολύ.");
      setReviewName("");
      setReviewLocation("");
      setReviewText("");
      setUserRating(5);
    } catch {
      alert("Υπήρξε ένα θέμα, αλλά η κριτική καταγράφηκε.");
    } finally {
      setIsSendingReview(false);
    }
  };

  // --- ΕΓΚΡΙΣΗ ΚΡΙΤΙΚΗΣ ΑΠΟ ΤΟ ADMIN PANEL ---
  const approveReview = (index: number) => {
    const itemToApprove = pendingReviews[index];
    const updatedReviews = [itemToApprove, ...reviews];
    const updatedPending = pendingReviews.filter((_, i) => i !== index);

    setReviews(updatedReviews);
    setPendingReviews(updatedPending);

    localStorage.setItem('site_reviews', JSON.stringify(updatedReviews));
    localStorage.setItem('site_pending_reviews', JSON.stringify(updatedPending));
  };

  // --- ΑΠΟΡΡΙΨΗ ΚΡΙΤΙΚΗΣ ---
  const rejectReview = (index: number) => {
    const updatedPending = pendingReviews.filter((_, i) => i !== index);
    setPendingReviews(updatedPending);
    localStorage.setItem('site_pending_reviews', JSON.stringify(updatedPending));
  };

  // --- ΥΠΟΒΟΛΗ ΦΟΡΜΑΣ ΕΠΙΚΟΙΝΩΝΙΑΣ ---
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendingContact(true);
    try {
      const response = await fetch("https://formsubmit.co/ajax/xerxeletzisxristos@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `Νέο Μήνυμα Πελάτη (${contactName}) - Χορτοφάγος`,
          Ονοματεπώνυμο: contactName,
          Τηλέφωνο: contactPhone,
          Μήνυμα: contactMessage,
        }),
      });

      if (response.ok) {
        alert("Το μήνυμά σας στάλθηκε επιτυχώς! Θα επικοινωνήσουμε μαζί σας το συντομότερο.");
        setContactName("");
        setContactPhone("");
        setContactMessage("");
      } else {
        throw new Error("FormSubmit error");
      }
    } catch {
      window.location.href = `mailto:xerxeletzisxristos@gmail.com?subject=${encodeURIComponent(
        `Νέο Μήνυμα από ${contactName}`
      )}&body=${encodeURIComponent(
        `Ονοματεπώνυμο: ${contactName}\nΤηλέφωνο: ${contactPhone}\n\nΜήνυμα:\n${contactMessage}`
      )}`;
    } finally {
      setIsSendingContact(false);
    }
  };

  const handleQuickBook = () => {
    const areaText = quickArea.trim() ? ` στην περιοχή "${quickArea}"` : "";
    setContactMessage(`Καλησπέρα σας, ενδιαφέρομαι για ${quickService}${areaText}. Θα ήθελα να κλείσουμε ένα ραντεβού για εκτίμηση.`);
  };

  const titleStyle = {
    letterSpacing: '0.04em',
    textShadow: '1px 1px 2px rgba(45, 62, 35, 0.08)'
  };

  return (
    <div className="bg-slate-50 text-gray-800 font-sans scroll-smooth relative">
      
      {/* FLOATING QUICK PHONE CALL BUTTON */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        <a 
          href="tel:+306974187033"
          className="bg-[#2d3e23] text-white p-4 rounded-full shadow-xl flex items-center justify-center border-2 border-white hover:bg-[#7a8a47] transition-colors"
          title="Καλέστε μας τώρα"
        >
          <Phone size={26} />
        </a>
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-[#f4f1e6]/95 backdrop-blur-md text-[#2d3e23] z-50 shadow-sm border-b border-[#7a8a47]/20">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/logo-text.png" 
              alt="χορτοφάγος" 
              className="h-14 w-auto object-contain" 
              onError={(e) => e.currentTarget.style.display = 'none'} 
            />
          </div>
          <div className="hidden md:flex gap-6 font-bold text-[#2d3e23]">
            <a href="#home" className="hover:text-[#7a8a47] transition-colors">Αρχική</a>
            <a href="#about" className="hover:text-[#7a8a47] transition-colors">Σχετικά</a>
            <a href="#services" className="hover:text-[#7a8a47] transition-colors">Υπηρεσίες</a>
            <a href="#portfolio" className="hover:text-[#7a8a47] transition-colors">Έργα</a>
            <a href="#reviews" className="hover:text-[#7a8a47] transition-colors">Κριτικές</a>
            <a href="#contact" className="hover:text-[#7a8a47] transition-colors">Επικοινωνία</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="relative pt-20 pb-14 flex flex-col items-center justify-center bg-[#f4f1e6] w-full border-b border-[#7a8a47]/20">
        <div className="w-full shadow-md relative">
          <img 
            src="/hero-top.jpeg" 
            alt="Πανό Χορτοφάγος" 
            className="w-full h-auto object-cover"
            style={{ imageRendering: '-webkit-optimize-contrast' }} 
          />
        </div>
        
        {/* BOOKING BAR */}
        <div className="mt-8 z-20 w-full max-w-5xl px-4">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200/90 p-2 md:p-3">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
              <div className="md:col-span-4 flex items-center gap-3 px-4 py-2.5 border-b md:border-b-0 md:border-r border-gray-200">
                <Sprout className="text-[#7a8a47] w-5 h-5 flex-shrink-0" />
                <div className="w-full text-left">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400">Υπηρεσία</label>
                  <select 
                    value={quickService}
                    onChange={(e) => setQuickService(e.target.value)}
                    className="w-full bg-transparent font-bold text-[#2d3e23] text-sm md:text-base outline-none cursor-pointer"
                  >
                    <option value="Κούρεμα Χόρτων & Γκαζόν">Κούρεμα Χόρτων & Γκαζόν</option>
                    <option value="Καθαρισμό Οικοπέδου / Χωραφιού">Καθαρισμός Οικοπέδου / Χωραφιού</option>
                    <option value="Κλάδεμα Δέντρων & Φυτών">Κλάδεμα Δέντρων & Φυτών</option>
                    <option value="Συντήρηση Κοινοχρήστων Οικοδομής">Συντήρηση Οικοδομής</option>
                    <option value="Διαμόρφωση Εξωτερικού Χώρου">Διαμόρφωση Κήπου / Χώρου</option>
                    <option value="Αυτόματο Πότισμα / Φυτεύσεις">Αυτόματο Πότισμα / Φυτεύσεις</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-4 flex items-center gap-3 px-4 py-2.5">
                <MapPin className="text-[#7a8a47] w-5 h-5 flex-shrink-0" />
                <div className="w-full text-left">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400">Τοποθεσία</label>
                  <input 
                    type="text" 
                    value={quickArea}
                    onChange={(e) => setQuickArea(e.target.value)}
                    placeholder="π.χ. Σέρρες, Νιγρίτα..."
                    className="w-full bg-transparent font-bold text-[#2d3e23] text-sm md:text-base placeholder-gray-400 outline-none"
                  />
                </div>
              </div>

              <div className="md:col-span-4">
                <a 
                  href="#contact" 
                  onClick={handleQuickBook}
                  className="w-full py-4 px-6 bg-[#7a8a47] hover:bg-[#2d3e23] text-white rounded-xl font-black text-base tracking-wide shadow-sm transition-colors duration-200 flex items-center justify-center gap-2 uppercase"
                >
                  <span>ΚΛΕΙΣΤΕ ΡΑΝΤΕΒΟΥ</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap justify-between items-center gap-4 px-2 text-xs md:text-sm font-bold text-[#2d3e23]/80">
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-600"></span>
                Εξυπηρέτηση σε Σέρρες, περίχωρα & Θεσσαλονίκη
              </span>
              <span className="hidden sm:flex items-center gap-1.5">
                <CheckCircle size={15} className="text-[#7a8a47]" /> Δωρεάν Εκτίμηση Χώρου
              </span>
            </div>
            <a href="tel:+306974187033" className="flex items-center gap-1.5 text-[#2d3e23] hover:text-[#7a8a47] transition-colors">
              <Phone size={15} className="text-[#7a8a47]" />
              <span>Τηλεφωνικό Ραντεβού: <strong>697 418 7033</strong></span>
            </a>
          </div>
        </div>
      </section>

      {/* ΣΧΕΤΙΚΑ ΜΕ ΕΜΑΣ */}
      <section id="about" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#2d3e23] mb-4 tracking-wide" style={titleStyle}>
            ΣΧΕΤΙΚΑ ΜΕ <span className="text-[#7a8a47]">ΕΜΑΣ</span>
          </h2>
          <div className="w-20 h-1 bg-[#7a8a47] mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p className="text-2xl text-[#2d3e23] font-bold leading-snug">
              Η ομάδα μας αποτελείται από ανθρώπους που νοιάζονται για την φροντίδα και την καλύτερη εξυπηρέτηση των αναγκών σας.
            </p>
            <p>
              Με συνέπεια, σύγχρονο εξοπλισμό και απόλυτο επαγγελματισμό, μεταμορφώνουμε και καθαρίζουμε κάθε εξωτερικό χώρο, προσφέροντας λύσεις που αντέχουν στον χρόνο. Επικοινωνήστε μαζί μας για μια δωρεάν εκτίμηση του χώρου σας.
            </p>
            
            <div className="flex items-center gap-4 bg-[#2d3e23] text-white p-5 rounded-2xl w-fit shadow-md mt-4">
              <div className="bg-[#7a8a47] p-3 rounded-xl flex-shrink-0">
                <MapPin className="text-white w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-wide">Έδρα μας: Σέρρες και περίχωρα</h3>
                <p className="text-sm text-gray-300 mt-0.5">Εξυπηρετούμε άμεσα όλο το νομό Σερρών & τη Θεσσαλονίκη</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-white p-4 rounded-xl border border-gray-200 text-center shadow-sm flex flex-col items-center gap-1.5">
                <CheckCircle className="text-[#7a8a47] w-6 h-6" />
                <p className="font-bold text-[#2d3e23] text-sm">Σύγχρονος Εξοπλισμός</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 text-center shadow-sm flex flex-col items-center gap-1.5">
                <CheckCircle className="text-[#7a8a47] w-6 h-6" />
                <p className="font-bold text-[#2d3e23] text-sm">Άμεση Εξυπηρέτηση</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 text-center shadow-sm flex flex-col items-center gap-1.5">
                <CheckCircle className="text-[#7a8a47] w-6 h-6" />
                <p className="font-bold text-[#2d3e23] text-sm">Καθαρό Αποτέλεσμα</p>
              </div>
            </div>
          </div>
          
          <div className="relative flex justify-center items-center">
             <img 
               src="/logo-transparent.png" 
               alt="Λογότυπο Χορτοφάγος" 
               className="w-full max-w-md object-contain drop-shadow-xl" 
               onError={(e) => e.currentTarget.style.display = 'none'} 
             />
          </div>
        </div>
      </section>

      {/* ΥΠΗΡΕΣΙΕΣ */}
      <section id="services" className="py-20 px-4 bg-[#f4f1e6]/60 border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#2d3e23] mb-4 tracking-wide" style={titleStyle}>
              ΟΙ <span className="text-[#7a8a47]">ΥΠΗΡΕΣΙΕΣ</span> ΜΑΣ
            </h2>
            <div className="w-20 h-1 bg-[#7a8a47] mx-auto rounded-full mb-5"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[
              { title: <><span className="text-[#2d3e23]">ΚΟΥΡΕΜΑ</span> <span className="text-[#7a8a47]">ΧΟΡΤΩΝ</span></>, icon: Sprout, desc: "Επαγγελματικό κούρεμα γκαζόν και αποψίλωση χόρτων με σύγχρονα μηχανήματα για έναν πεντακάθαρο και ασφαλή χώρο." },
              { title: <><span className="text-[#2d3e23]">ΣΥΝΤΗΡΗΣΗ</span> <span className="text-[#7a8a47]">ΟΙΚΟΔΟΜΩΝ</span></>, icon: Building, desc: "Αναλαμβάνουμε τον τακτικό καθαρισμό, την κοπή χόρτων και την πλήρη περιποίηση των κοινόχρηστων εξωτερικών χώρων της οικοδομής σας." },
              { title: <><span className="text-[#2d3e23]">ΔΙΑΜΟΡΦΩΣΗ</span> <span className="text-[#7a8a47]">ΧΩΡΩΝ</span></>, icon: Shovel, desc: "Ολοκληρωμένη μελέτη και πλήρης αναμόρφωση εξωτερικών χώρων.", subItems: ["Μπαλκόνια", "Αυλές", "Κήπους", "Βεράντες", "Ιδιωτικούς Χώρους"], isFullWidth: true },
              { title: <><span className="text-[#2d3e23]">ΚΛΑΔΕΜΑ</span> <span className="text-[#7a8a47]">ΔΕΝΤΡΩΝ ΚΑΙ ΦΥΤΩΝ</span></>, icon: Scissors, desc: "Εξειδικευμένο κλάδεμα ψηλών δέντρων, θάμνων και καλλωπιστικών φυτών." },
              { title: <><span className="text-[#2d3e23]">ΦΥΤΕΥΣΕΙΣ</span> <span className="text-[#7a8a47]">& ΜΕΤΑΦΥΤΕΥΣΕΙΣ</span></>, icon: Leaf, desc: "Σωστή επιλογή, φύτευση και ασφαλής μεταφορά δέντρων και φυτών." },
              { title: <><span className="text-[#2d3e23]">ΠΟΤΙΣΜΑ</span> <span className="text-[#7a8a47]">& ΣΥΝΤΗΡΗΣΗ</span></>, icon: Droplet, desc: "Μελέτη, εγκατάσταση αυτόματου ποτίσματος και ολοκληρωμένη φροντίδα." },
              { title: <><span className="text-[#2d3e23]">ΜΠΟΡΝΤΟΥΡΕΣ</span> <span className="text-[#7a8a47]">& ΦΡΑΧΤΕΣ</span></>, icon: Axe, desc: "Κούρεμα, ομοιόμορφη διαμόρφωση σε μπορντούρες και φυσικούς φράχτες." },
              { title: <><span className="text-[#7a8a47]">ΜΕΡΕΜΕΤΙΑ</span> <span className="text-[#2d3e23]">& ΕΞΩΤΕΡΙΚΕΣ ΕΡΓΑΣΙΕΣ</span></>, icon: Hammer, desc: "Μικροεργασίες, μερεμέτια, καθαρισμοί και κάθε είδους πρακτική λύση." }
            ].map((service, index) => (
              <div key={index} className={`bg-white p-8 rounded-2xl shadow-sm border border-gray-200/80 border-b-4 border-b-[#7a8a47] flex flex-col items-center text-center ${service.isFullWidth ? 'md:col-span-2' : ''}`}>
                <div className="w-16 h-16 mb-5 rounded-2xl bg-[#f4f1e6] flex items-center justify-center border border-[#7a8a47]/30">
                   <service.icon className="w-8 h-8 text-[#2d3e23]" strokeWidth={1.75} />
                </div>
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-wide">{service.title}</h3>
                <p className="text-base text-gray-600 mt-3 leading-relaxed max-w-2xl">{service.desc}</p>
                {service.subItems && (
                  <div className="flex flex-wrap justify-center gap-2.5 mt-6 max-w-3xl">
                    {service.subItems.map((item, i) => (
                      <span key={i} className="bg-[#f4f1e6] text-[#2d3e23] px-4 py-2 rounded-lg font-bold text-sm border border-[#7a8a47]/30">{item}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black text-[#2d3e23] mb-4 tracking-wide" style={titleStyle}>ΤΑ <span className="text-[#7a8a47]">ΕΡΓΑ</span> ΜΑΣ</h2>
          <div className="w-20 h-1 bg-[#7a8a47] mx-auto rounded-full"></div>
        </div>
        <div className="max-w-6xl mx-auto">
          <Swiper modules={[Autoplay, Navigation, Pagination]} spaceBetween={24} slidesPerView={1} breakpoints={{ 768: { slidesPerView: 3 } }} autoplay={{ delay: 3000, disableOnInteraction: false }} pagination={{ clickable: true }} navigation className="h-[380px] pb-10">
            {imageNumbers.map((i) => (
              <SwiperSlide key={i}>
                <div className="h-full rounded-xl overflow-hidden shadow-md border border-gray-200">
                  <img src={`/work/work${i}.jpg`} alt={`Έργο ${i}`} className="w-full h-full object-cover" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ΚΡΙΤΙΚΕΣ */}
      <section id="reviews" className="py-20 px-4 bg-slate-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black text-[#2d3e23] mb-4 tracking-wide" style={titleStyle}>ΤΙ ΛΕΝΕ ΟΙ <span className="text-[#7a8a47]">ΠΕΛΑΤΕΣ</span> ΜΑΣ</h2>
          <div className="w-20 h-1 bg-[#7a8a47] mx-auto rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4">
          <Swiper modules={[Autoplay, Navigation, Pagination]} spaceBetween={24} slidesPerView={1} breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }} autoplay={{ delay: 4000, disableOnInteraction: false }} pagination={{ clickable: true }} className="pb-14">
            {reviews.map((review: any, index: number) => (
              <SwiperSlide key={index}>
                <div className="bg-white p-7 rounded-2xl shadow-sm border border-gray-200 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < review.stars ? "text-amber-500 fill-amber-500" : "text-gray-200 fill-gray-200"}`} />)}
                    </div>
                    <p className="text-gray-700 text-base italic mb-6">"{review.text}"</p>
                  </div>
                  <div className="border-t border-gray-100 pt-4 mt-auto">
                    <p className="font-bold text-[#2d3e23]">{review.name}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin size={13} className="text-[#7a8a47]" /> {review.location} &bull; {review.date}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-[#2d3e23] mb-6 text-center">Αφήστε τη δική σας κριτική</h3>
            <form className="space-y-4" onSubmit={handleReviewSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="Όνομα" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2d3e23] outline-none" 
                  required 
                />
                <input 
                  type="text" 
                  value={reviewLocation}
                  onChange={(e) => setReviewLocation(e.target.value)}
                  placeholder="Τοποθεσία / Χωριό" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2d3e23] outline-none" 
                  required 
                />
              </div>
              <div className="flex items-center gap-2 py-1">
                <span className="text-sm font-bold text-gray-600 mr-2">Βαθμολογία:</span>
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} onClick={() => setUserRating(star)} className={`w-6 h-6 cursor-pointer ${star <= userRating ? "text-amber-500 fill-amber-500" : "text-gray-300 fill-gray-100"}`} />
                ))}
              </div>
              <textarea 
                rows={3} 
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Μοιραστείτε την εμπειρία σας μαζί μας..." 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2d3e23] outline-none" 
                required
              ></textarea>
              <button 
                type="submit" 
                disabled={isSendingReview}
                className="w-full py-3.5 bg-[#2d3e23] text-white rounded-lg font-bold hover:bg-[#1e2a17] transition-colors disabled:opacity-60 cursor-pointer"
              >
                {isSendingReview ? "Αποστολή..." : "Υποβολή Κριτικής"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ΥΠΟΛΟΓΙΣΤΗΣ ΕΡΓΑΣΙΑΣ & ΣΥΧΝΕΣ ΕΡΩΤΗΣΕΙΣ */}
      <section className="py-20 px-4 bg-[#f4f1e6] border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-[#2d3e23] mb-3 tracking-wide" style={titleStyle}>
              ΕΚΤΙΜΗΣΗ <span className="text-[#7a8a47]">ΕΡΓΑΣΙΑΣ</span> & ΣΥΧΝΕΣ ΕΡΩΤΗΣΕΙΣ
            </h2>
            <div className="w-20 h-1 bg-[#7a8a47] mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <Calculator className="w-6 h-6 text-[#7a8a47]" />
                <div>
                  <h3 className="text-xl font-black text-[#2d3e23]">Υπολογιστής Χρόνου Εργασίας</h3>
                  <p className="text-xs text-gray-500">Επιλέξτε τα τετραγωνικά και την κατάσταση του χώρου</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-sm font-bold text-gray-700">Επιφάνεια Χώρου:</span>
                    <span className="text-2xl font-black text-[#2d3e23]">{areaSize} τ.μ.</span>
                  </div>
                  <input 
                    type="range" 
                    min={50} 
                    max={5000} 
                    step={50} 
                    value={areaSize} 
                    onChange={(e) => setAreaSize(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2d3e23]"
                  />
                  <div className="flex justify-between text-xs text-gray-400 font-medium mt-1.5">
                    <span>50 τ.μ. (Αυλή)</span>
                    <span>1.000 τ.μ. (Οικόπεδο)</span>
                    <span>5.000 τ.μ. (Αγροτεμάχιο)</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-700 mb-2.5">Κατάσταση Βλάστησης:</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'normal', label: 'Χαμηλή / Γκαζόν' },
                      { id: 'medium', label: 'Μεσαία Χόρτα' },
                      { id: 'dense', label: 'Πυκνή Βλάστηση' },
                    ].map((cond) => (
                      <button
                        key={cond.id}
                        type="button"
                        onClick={() => setGrassCondition(cond.id as any)}
                        className={`py-2.5 px-2 rounded-lg font-bold text-xs border transition-colors cursor-pointer ${
                          grassCondition === cond.id 
                            ? 'bg-[#2d3e23] text-white border-[#2d3e23]' 
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        {cond.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-[#f4f1e6] p-4 rounded-xl space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-600">Εκτιμώμενος Χρόνος:</span>
                    <span className="font-bold text-[#2d3e23]">{getEstimatedTime()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-600">Αποκομιδή Υπολειμμάτων:</span>
                    <span className="font-bold text-[#7a8a47]">Περιλαμβάνεται</span>
                  </div>
                </div>

                <a 
                  href="#contact"
                  onClick={() => setContactMessage(`Καλησπέρα σας, έχω έναν χώρο περίπου ${areaSize} τ.μ. (${grassCondition === 'dense' ? 'με πυκνή βλάστηση' : grassCondition === 'medium' ? 'με μεσαία χόρτα' : 'για κούρεμα γκαζόν'}) και θα ήθελα μια εκτίμηση κόστους.`)}
                  className="w-full py-3.5 bg-[#7a8a47] hover:bg-[#2d3e23] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                >
                  Ζητήστε Προσφορά για {areaSize} τ.μ. <ArrowRight size={16} />
                </a>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { q: "Μαζεύετε τα κομμένα χόρτα και τα κλαδιά μετά την εργασία;", a: "Ναι. Παραδίδουμε τον χώρο σας καθαρό και αναλαμβάνουμε πλήρως τη συγκέντρωση και απομάκρυνση." },
                { q: "Υπάρχει χρέωση για την επίσκεψη εκτίμησης του χώρου;", a: "Όχι, η επίσκεψη και η εκτίμηση του χώρου σας γίνονται εντελώς δωρεάν και χωρίς καμία δέσμευση." },
                { q: "Χρειάζεται να υπάρχει παροχή ρεύματος ή νερού στον χώρο;", a: "Όχι, διαθέτουμε δικό μας επαγγελματικό βενζινοκίνητο εξοπλισμό." },
                { q: "Αναλαμβάνετε καθαρισμούς οικοπέδων για πυροπροστασία;", a: "Αναλαμβάνουμε άμεσα αποψιλώσεις και καθαρισμούς οικοπέδων σύμφωνα με τις προδιαγραφές πυροπροστασίας." }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-4 text-left font-bold text-[#2d3e23] flex justify-between items-center hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <span className="text-sm md:text-base pr-4">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#7a8a47] flex-shrink-0 transition-transform duration-200 ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-[#2d3e23] text-white p-10 flex flex-col justify-center relative">
            <div className="absolute inset-0 z-0 opacity-30"><Canvas camera={{ position: [0, 0, 3] }}><DustParticles /></Canvas></div>
            <div className="relative z-10">
              <h2 className="text-xl font-bold text-gray-300 mb-1">Χερχελετζής Χρήστος</h2>
              <h3 className="text-3xl font-black mb-6 text-white">Επικοινωνήστε μαζί μας</h3>
              <p className="text-gray-300 text-sm mb-8 leading-relaxed">Καλέστε μας απευθείας ή συμπληρώστε τη φόρμα επικοινωνίας για δωρεάν εκτίμηση στο χώρο σας.</p>
              <div className="space-y-6">
                <a href="tel:+306974187033" className="flex items-center gap-4 group">
                  <div className="bg-[#7a8a47] p-3 rounded-xl text-white group-hover:bg-white group-hover:text-[#2d3e23] transition-colors"><Phone size={22} /></div>
                  <div>
                    <p className="text-xs text-gray-300 uppercase tracking-wider">Τηλέφωνο Άμεσης Επικοινωνίας</p>
                    <p className="text-xl font-bold">697 418 7033</p>
                  </div>
                </a>
                <a href="mailto:xerxeletzisxristos@gmail.com" className="flex items-center gap-4 group">
                  <div className="bg-[#7a8a47] p-3 rounded-xl text-white group-hover:bg-white group-hover:text-[#2d3e23] transition-colors"><Mail size={22} /></div>
                  <div>
                    <p className="text-xs text-gray-300 uppercase tracking-wider">Email</p>
                    <p className="text-lg font-bold">xerxeletzisxristos@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="p-10">
            <h4 className="text-xl font-black text-[#2d3e23] mb-6">Φόρμα Εκδήλωσης Ενδιαφέροντος</h4>
            <form className="space-y-4" onSubmit={handleContactSubmit}>
              <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2d3e23] outline-none" placeholder="Ονοματεπώνυμο" required />
              <input type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2d3e23] outline-none" placeholder="Τηλέφωνο Επικοινωνίας" required />
              <textarea rows={4} value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2d3e23] outline-none" placeholder="Περιγράψτε μας τι χρειάζεστε..." required></textarea>
              <button type="submit" disabled={isSendingContact} className="w-full py-4 bg-[#2d3e23] text-white rounded-lg font-bold flex justify-center items-center gap-2 hover:bg-[#7a8a47] transition-colors disabled:opacity-60 cursor-pointer">
                <Send size={18} /> {isSendingContact ? "Αποστολή..." : "Αποστολή Μηνύματος"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER & ADMIN PANEL TRIGGER */}
      <footer className="bg-[#2d3e23] text-gray-300 py-10 px-4 border-t border-[#7a8a47]/20">
        <div className="max-w-7xl mx-auto text-center flex flex-col items-center gap-4">
          <div className="flex flex-col md:flex-row gap-4 md:gap-10 items-center text-base font-medium">
            <a href="tel:+306974187033" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone size={18} className="text-[#7a8a47]" /> +30 697 418 7033
            </a>
            <a href="mailto:xerxeletzisxristos@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail size={18} className="text-[#7a8a47]" /> xerxeletzisxristos@gmail.com
            </a>
          </div>

          {/* ADMIN TOGGLE BUTTON */}
          <button 
            onClick={() => setIsAdminOpen(true)}
            className="mt-2 text-xs text-lime-300/70 hover:text-white flex items-center gap-1.5 underline cursor-pointer"
          >
            <Lock size={12} /> Διαχείριση (Admin)
          </button>

          <p className="text-sm text-gray-400 mt-2">© {new Date().getFullYear()} Χορτοφάγος - Καθαρισμοί & Διαμορφώσεις Χώρων. Με επιφύλαξη παντός δικαιώματος.</p>
        </div>
      </footer>

      {/* ADMIN MODAL / PANEL */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl relative border border-gray-200">
            <button 
              onClick={() => setIsAdminOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl font-black text-[#2d3e23] mb-2 flex items-center gap-2">
              <Lock className="text-[#7a8a47]" /> Διαχείριση
            </h3>
            <p className="text-xs text-gray-500 mb-6">Εγκρίνετε ή απορρίψτε τις νέες κριτικές που υποβάλλονται από τη σελίδα.</p>

            {!isAdminLoggedIn ? (
              <div className="space-y-4 py-4">
                <p className="text-sm font-bold text-gray-700">Εισάγετε τον κωδικό διαχειριστή:</p>
                <input 
                  type="password" 
                  placeholder="Κωδικός (π.χ. 1234)" 
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-[#2d3e23] font-bold"
                />
                <button 
                  onClick={() => {
                    if (adminPassword === import.meta.env.VITE_ADMIN_PASSWORD) {
                      setIsAdminLoggedIn(true);
                    } else {
                      alert("Λάθος κωδικός!");
                    }
                  }}
                  className="w-full py-3.5 bg-[#2d3e23] text-white rounded-xl font-bold hover:bg-[#7a8a47] transition-colors cursor-pointer"
                >
                  Σύνδεση Διαχειριστή
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {pendingReviews.length === 0 ? (
                  <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                    <p className="text-gray-500 font-medium">Δεν υπάρχουν νέες κριτικές προς έγκριση αυτή τη στιγμή.</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    {pendingReviews.map((rev, index) => (
                      <div key={index} className="bg-green-50/60 p-5 rounded-2xl border border-green-200 flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-bold text-[#2d3e23] text-lg">{rev.name}</p>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <MapPin size={12} className="text-[#7a8a47]" /> {rev.location} &bull; {rev.date}
                            </p>
                          </div>
                          <div className="flex gap-1 bg-white px-2.5 py-1 rounded-full shadow-sm">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3.5 h-3.5 ${i < rev.stars ? "text-amber-500 fill-amber-500" : "text-gray-200 fill-gray-200"}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm italic bg-white p-3 rounded-xl border border-gray-100">"{rev.text}"</p>
                        <div className="flex gap-3 pt-2">
                          <button 
                            onClick={() => approveReview(index)}
                            className="flex-1 py-2.5 bg-[#7a8a47] hover:bg-[#2d3e23] text-white rounded-xl font-bold text-xs uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                          >
                            <Check size={16} /> Έγκριση & Δημοσίευση
                          </button>
                          <button 
                            onClick={() => rejectReview(index)}
                            className="py-2.5 px-4 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl font-bold text-xs uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <X size={16} /> Απόρριψη
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <button 
                  onClick={() => setIsAdminOpen(false)}
                  className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-sm transition-colors cursor-pointer"
                >
                  Κλείσιμο Παραθύρου
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;