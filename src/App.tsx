import { useRef, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle, Phone, Mail, Send, Shovel, Axe, Star, Scissors, Sprout, Building, Leaf, Droplet, Hammer, ShieldCheck } from 'lucide-react';
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
        {/* Προστέθηκε το args={[positions, 3]} για να μην χτυπάει σφάλμα στο build */}
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

// --- ΟΙ 9 ΚΡΙΤΙΚΕΣ (ΜΕ ΕΛΛΗΝΙΚΕΣ ΗΜΕΡΟΜΗΝΙΕΣ) ---
const reviews = [
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
  const [userRating, setUserRating] = useState(5);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Η κριτική σας υποβλήθηκε επιτυχώς και εκκρεμεί έγκριση από τη διαχείριση. Σας ευχαριστούμε!");
  };

  // ΔΙΑΚΡΙΤΙΚΟ ΚΑΙ ΚΟΜΨΟ ΕΦΕ ΓΙΑ ΤΟΥΣ ΤΙΤΛΟΥΣ
  const titleStyle = {
    letterSpacing: '0.04em',
    textShadow: '1px 1px 2px rgba(45, 62, 35, 0.08)'
  };

  return (
    <div className="bg-slate-50 text-gray-800 font-sans scroll-smooth relative">
      
      {/* FLOATING QUICK PHONE CALL BUTTON */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        <motion.a 
          href="tel:+306974187033"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="bg-[#7a8a47] text-white p-4 rounded-full shadow-2xl flex items-center justify-center border-2 border-white hover:bg-[#5e6b2f] transition-colors"
          title="Καλέστε μας τώρα"
        >
          <Phone size={28} className="animate-pulse" />
        </motion.a>
      </div>

      {/* ΑΝΟΙΧΤΟΧΡΩΜΟ NAVBAR ΓΙΑ ΥΨΗΛΗ ΑΝΤΙΘΕΣΗ */}
      <nav className="fixed top-0 w-full bg-[#f4f1e6]/95 backdrop-blur-md text-[#2d3e23] z-50 shadow-md border-b border-[#7a8a47]/20">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/logo-text.png" 
              alt="χορτοφάγος" 
              className="h-14 w-auto object-contain drop-shadow-sm" 
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

      {/* HERO SECTION - ΑΠΟΛΥΤΟ FULL WIDTH */}
      <section id="home" className="relative pt-20 pb-12 flex flex-col items-center justify-center text-center bg-[#f4f1e6] overflow-hidden w-full">
        <div className="w-full shadow-2xl relative">
          <img 
            src="/hero-top.png" 
            alt="Πανό Χορτοφάγος" 
            className="w-full h-auto object-cover"
            style={{ imageRendering: '-webkit-optimize-contrast' }} 
          />
        </div>
        
        {/* ΚΟΥΜΠΙ ΠΡΟΣΦΟΡΑΣ */}
        <div className="mt-8 z-20">
          <a 
            href="#contact" 
            className="inline-block px-12 py-5 bg-[#7a8a47] text-white rounded-full font-black text-xl md:text-2xl tracking-wider shadow-[0_8px_0_#545f2c] hover:translate-y-[2px] hover:shadow-[0_6px_0_#545f2c] active:translate-y-[6px] active:shadow-none transition-all uppercase"
          >
            ΔΩΡΕΑΝ ΕΚΤΙΜΗΣΗ ΣΤΟ ΧΩΡΟ ΣΑΣ!
          </a>
        </div>
      </section>

      {/* ΣΧΕΤΙΚΑ ΜΕ ΕΜΑΣ */}
      <section id="about" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#2d3e23] mb-4 tracking-wide" style={titleStyle}>
            ΣΧΕΤΙΚΑ ΜΕ <span className="text-[#7a8a47]">ΕΜΑΣ</span>
          </h2>
          <div className="w-24 h-1 bg-[#7a8a47] mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-xl text-gray-700 leading-relaxed font-medium">
            <p className="text-2xl text-gray-800 font-bold">
              Η ομάδα μας αποτελείται από ανθρώπους που νοιάζονται για την φροντίδα και την καλύτερη εξυπηρέτηση των αναγκών σας.
            </p>
            <p>
              Με συνέπεια, σύγχρονο εξοπλισμό and απόλυτο επαγγελματισμό, μεταμορφώνουμε και καθαρίζουμε κάθε εξωτερικό χώρο, προσφέροντας λύσεις που αντέχουν στον χρόνο. Επικοινωνήστε μαζί μας για μια δωρεάν εκτίμηση του χώρου σας.
            </p>
            
            {/* ΕΔΡΑ - ΣΕΡΡΕΣ ΚΑΙ ΠΕΡΙΧΩΡΑ */}
            <div className="flex items-center gap-4 bg-[#2d3e23] text-white p-5 rounded-2xl w-fit shadow-2xl mt-4 border border-[#7a8a47]/40">
              <div className="bg-white p-3 rounded-full shadow-md flex-shrink-0">
                <MapPin className="text-[#7a8a47] w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold tracking-wide">Έδρα μας: Σέρρες και περίχωρα</h3>
                <p className="text-sm font-medium mt-1 text-lime-100">
                  Εξυπηρετούμε άμεσα όλο το νομό Σερρών & τη Θεσσαλονίκη
                </p>
              </div>
            </div>

            {/* ΚΟΥΤΙΑ ΥΠΕΡΟΧΗΣ ΜΕ ΠΡΑΣΙΝΑ ΤΙΚ */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="bg-green-50 p-3 rounded-xl border border-green-200 text-center shadow-sm flex flex-col items-center gap-2">
                <CheckCircle className="text-[#7a8a47] w-6 h-6 flex-shrink-0" />
                <div>
                  <p className="font-black text-[#2d3e23] text-sm md:text-base leading-tight">Σύγχρονος</p>
                  <p className="text-xs text-gray-600 font-bold">Εξοπλισμός</p>
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded-xl border border-green-200 text-center shadow-sm flex flex-col items-center gap-2">
                <CheckCircle className="text-[#7a8a47] w-6 h-6 flex-shrink-0" />
                <div>
                  <p className="font-black text-[#2d3e23] text-sm md:text-base leading-tight">Άμεση</p>
                  <p className="text-xs text-gray-600 font-bold">Εξυπηρέτηση</p>
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded-xl border border-green-200 text-center shadow-sm flex flex-col items-center gap-2">
                <CheckCircle className="text-[#7a8a47] w-6 h-6 flex-shrink-0" />
                <div>
                  <p className="font-black text-[#2d3e23] text-sm md:text-base leading-tight">Καθαρό</p>
                  <p className="text-xs text-gray-600 font-bold">Αποτέλεσμα</p>
                </div>
              </div>
            </div>

            <ul className="space-y-3 mt-8">
              {[
                "Με επαγγελματισμό και υπευθυνότητα", 
                "Άμεση εξυπηρέτηση", 
                "Οικολογικές πρακτικές και σεβασμός στον χώρο σας", 
                "Προσιτές τιμές και συνέπεια στον χρόνο"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 font-medium">
                  <CheckCircle className="text-[#7a8a47] flex-shrink-0" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* ΚΑΡΤΑ ΕΓΓΥΗΣΗΣ */}
            <div className="bg-gradient-to-br from-[#2d3e23] to-[#1e2a17] text-white p-6 rounded-3xl shadow-xl flex items-center gap-4 mt-6 border-l-8 border-[#7a8a47]">
              <ShieldCheck className="text-[#7a8a47] w-12 h-12 flex-shrink-0" />
              <div>
                <h4 className="font-black text-lg md:text-xl text-[#7a8a47] uppercase tracking-wider">ΕΓΓΥΗΣΗ ΚΑΘΑΡΙΟΤΗΤΑΣ</h4>
                <p className="text-sm md:text-base text-gray-200 font-medium mt-1">
                  Παραδίδουμε τον χώρο σας πεντακάθαρο, μαζεύοντας όλα τα υπολείμματα εργασίας μέχρι το τελευταίο φύλλο!
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative flex justify-center items-center">
             <div className="absolute w-64 h-64 bg-lime-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse"></div>
             <img 
               src="/logo-transparent.png" 
               alt="Λογότυπο Χορτοφάγος" 
               className="relative z-10 w-full max-w-md object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.35)] filter contrast-105" 
               onError={(e) => e.currentTarget.style.display = 'none'} 
             />
          </div>
        </div>
      </section>

      {/* ΥΠΗΡΕΣΙΕΣ */}
      <section id="services" className="py-20 px-4 bg-gradient-to-b from-green-50 to-lime-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#2d3e23] mb-4 tracking-wide" style={titleStyle}>
              <span className="text-[#7a8a47]">ΥΠΗΡΕΣΙΕΣ</span> ΜΑΣ
            </h2>
            <div className="w-24 h-2 bg-[#7a8a47] mx-auto rounded-full mb-6"></div>
            <p className="text-2xl md:text-3xl text-[#2d3e23] font-extrabold max-w-3xl mx-auto italic drop-shadow-sm">
              Διαμορφώνουμε τους χώρους σας όπως επιθυμείτε
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {[
              { 
                title: <><span className="text-[#2d3e23]">ΚΟΥΡΕΜΑ</span> <span className="text-[#7a8a47]">ΧΟΡΤΩΝ</span></>, 
                icon: Sprout,
                desc: "Επαγγελματικό κούρεμα γκαζόν και χόρτων με σύγχρονα μηχανήματα για έναν πεντακάθαρο και περιποιημένο τάπητα.",
                badge: "ΔΗΜΟΦΙΛΕΣ",
                badgeColor: "bg-[#7a8a47]"
              },
              { 
                title: <><span className="text-[#2d3e23]">ΣΥΝΤΗΡΗΣΗ</span> <span className="text-[#7a8a47]">ΟΙΚΟΔΟΜΩΝ</span></>, 
                icon: Building,
                desc: "Αναλαμβάνουμε τον τακτικό καθαρισμό, την κοπή χόρτων και την πλήρη περιποίηση των κοινόχρηστων εξωτερικών χώρων της οικοδομής σας.",
                badge: "ΑΠΑΡΑΙΤΗΤΟ",
                badgeColor: "bg-[#2d3e23]"
              },
              { 
                title: <><span className="text-[#2d3e23]">ΔΙΑΜΟΡΦΩΣΗ</span> <span className="text-[#7a8a47]">ΧΩΡΩΝ</span></>, 
                icon: Shovel,
                desc: "Ολοκληρωμένη μελέτη και πλήρης αναμόρφωση εξωτερικών χώρων. Μεταμορφώνουμε με μεράκι και δημιουργικότητα:",
                subItems: ["Μπαλκόνια", "Αυλές", "Κήπους", "Βεράντες", "Ιδιωτικούς Χώρους", "Επαγγελματικούς Χώρους"],
                isFullWidth: true,
                badge: "Η ΕΞΕΙΔΙΚΕΥΣΗ ΜΑΣ",
                badgeColor: "bg-gradient-to-r from-[#2d3e23] to-[#7a8a47]"
              },
              { 
                title: <><span className="text-[#2d3e23]">ΚΛΑΔΕΜΑ</span> <span className="text-[#7a8a47]">ΔΕΝΤΡΩΝ ΚΑΙ ΦΥΤΩΝ</span></>, 
                icon: Scissors,
                desc: "Εξειδικευμένο κλάδεμα ψηλών δέντρων, θάμνων και καλλωπιστικών φυτών για την υγεία, την ασφάλεια και την τέλεια αισθητική τους.",
                badge: "ΚΟΡΥΦΑΙΑ ΕΠΙΛΟΓΗ",
                badgeColor: "bg-amber-600"
              },
              { 
                title: <><span className="text-[#2d3e23]">ΦΥΤΕΥΣΕΙΣ</span> <span className="text-[#7a8a47]">& ΜΕΤΑΦΥΤΕΥΣΕΙΣ</span></>, 
                icon: Leaf,
                desc: "Σωστή επιλογή, φύτευση και ασφαλής μεταφορά δέντρων και λουλουδιών στο κατάλληλο έδαφος για εγγυημένη ανάπτυξη."
              },
              { 
                title: <><span className="text-[#2d3e23]">ΠΟΤΙΣΜΑ</span> <span className="text-[#7a8a47]">& ΣΥΝΤΗΡΗΣΗ</span></>, 
                icon: Droplet,
                desc: "Μελέτη, εγκατάσταση αυτόματου ποτίσματος και ολοκληρωμένη φροντίδα για να μένει ο κήπος σας πάντα καταπράσινος."
              },
              { 
                title: <><span className="text-[#2d3e23]">ΜΠΟΡΝΤΟΥΡΕΣ</span> <span className="text-[#7a8a47]">& ΦΡΑΧΤΕΣ</span></>, 
                icon: Axe,
                desc: "Κούρεμα, ομοιόμορφη διαμόρφωση σε μπορντούρες και δημιουργία φυσικών πράσινων περιφράξεων με απόλυτη ακρίβεια.",
                badge: "ΝΕΑ ΥΠΗΡΕΣΙΑ",
                badgeColor: "bg-teal-700"
              },
              { 
                title: <><span className="text-[#7a8a47]">ΜΕΡΕΜΕΤΙΑ</span> <span className="text-[#2d3e23]">& ΟΤΙ ΑΛΛΟ ΖΗΤΗΣΕΤΕ</span></>, 
                icon: Hammer,
                desc: "Μικροεργασίες, μερεμέτια, καθαρισμοί και κάθε είδους πρακτική λύση που χρειάζεται ο δικός σας χώρος."
              }
            ].map((service, index) => (
              <div 
                key={index}
                className={`bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl hover:shadow-[0_22px_40px_rgba(0,0,0,0.15)] transition-all flex flex-col items-center text-center relative overflow-hidden border-b-8 border-[#7a8a47] ${service.isFullWidth ? 'md:col-span-2' : ''}`}
              >
                {service.badge && (
                  <span className={`absolute top-4 right-4 text-white text-xs font-black px-4 py-1.5 rounded-full tracking-wider shadow-sm ${service.badgeColor}`}>
                    {service.badge}
                  </span>
                )}

                <div className="w-28 h-28 mb-6 rounded-full border-4 border-[#7a8a47] flex items-center justify-center bg-gradient-to-br from-green-50 to-lime-100 shadow-inner">
                   <service.icon className="w-14 h-14 text-[#2d3e23]" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-wide leading-tight">{service.title}</h3>
                <p className="text-lg text-gray-600 mt-4 font-medium leading-relaxed max-w-2xl">{service.desc}</p>
                
                {service.subItems && (
                  <div className="flex flex-wrap justify-center gap-3 mt-8 max-w-3xl">
                    {service.subItems.map((item, i) => (
                      <motion.span 
                        key={i} 
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-r from-lime-50 to-green-100 text-green-950 px-6 py-2.5 rounded-2xl font-black text-sm md:text-base shadow-sm border border-lime-200 cursor-default"
                      >
                        {item}
                      </motion.span>
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
          <h2 className="text-4xl font-bold text-[#2d3e23] mb-4 tracking-wide" style={titleStyle}>ΤΑ <span className="text-[#7a8a47]">ΕΡΓΑ</span> ΜΑΣ</h2>
          <div className="w-24 h-1 bg-[#7a8a47] mx-auto rounded-full"></div>
        </div>
        <div className="max-w-6xl mx-auto">
          <Swiper modules={[Autoplay, Navigation, Pagination]} spaceBetween={30} slidesPerView={1} breakpoints={{ 768: { slidesPerView: 3 } }} autoplay={{ delay: 3000, disableOnInteraction: false }} pagination={{ clickable: true }} navigation className="h-[400px] pb-10">
            {imageNumbers.map((i) => (
              <SwiperSlide key={i}>
                <div className="h-full rounded-2xl overflow-hidden shadow-lg border-2 border-green-100">
                  <img src={`/work/work${i}.jpg`} alt={`Έργο ${i}`} className="w-full h-full object-cover" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ΚΡΙΤΙΚΕΣ */}
      <section id="reviews" className="py-20 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-[#2d3e23] mb-4 tracking-wide" style={titleStyle}>ΤΙ ΛΕΝΕ ΟΙ <span className="text-[#7a8a47]">ΠΕΛΑΤΕΣ</span> ΜΑΣ</h2>
          <div className="w-24 h-1 bg-[#7a8a47] mx-auto rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4">
          <Swiper modules={[Autoplay, Navigation, Pagination]} spaceBetween={30} slidesPerView={1} breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }} autoplay={{ delay: 4000, disableOnInteraction: false }} pagination={{ clickable: true }} className="pb-14">
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white p-8 rounded-3xl shadow-md border border-green-100 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => <Star key={i} className={`w-5 h-5 ${i < review.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`} />)}
                    </div>
                    <p className="text-gray-700 text-lg italic mb-6">"{review.text}"</p>
                  </div>
                  <div className="border-t border-gray-100 pt-4 mt-auto">
                    <p className="font-bold text-green-900">{review.name}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin size={14} className="text-lime-600" /> {review.location} &bull; {review.date}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="max-w-2xl mx-auto mt-16 bg-white p-8 rounded-3xl shadow-md border border-green-100">
            <h3 className="text-2xl font-bold text-green-900 mb-6 text-center">Αφήστε τη δική σας κριτική</h3>
            <form className="space-y-5" onSubmit={handleReviewSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input type="text" placeholder="Όνομα" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7a8a47] outline-none" required />
                <input type="text" placeholder="Τοποθεσία / Χωριό" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7a8a47] outline-none" required />
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} onClick={() => setUserRating(star)} className={`w-8 h-8 cursor-pointer ${star <= userRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-100"}`} />
                ))}
              </div>
              <textarea rows={3} placeholder="Μοιραστείτε την εμπειρία σας μαζί μας..." className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7a8a47] outline-none" required></textarea>
              <button type="submit" className="w-full py-4 bg-[#2d3e23] text-white rounded-lg font-bold hover:bg-[#1e2a17] transition-colors text-lg shadow-md">Υποβολή Κριτικής</button>
            </form>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-[#2d3e23] text-white p-10 flex flex-col justify-center relative">
            <div className="absolute inset-0 z-0 opacity-30"><Canvas camera={{ position: [0, 0, 3] }}><DustParticles /></Canvas></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-2 tracking-wide">Χερχελετζής Χρήστος</h2>
              <h3 className="text-3xl font-bold mb-6 text-lime-400">Επικοινωνήστε μαζί μας</h3>
              <div className="space-y-6 mt-10">
                <div className="flex items-center gap-4">
                  <div className="bg-[#7a8a47] p-3 rounded-full text-white"><Phone size={24} /></div>
                  <div>
                    <p className="text-sm text-lime-200">Τηλέφωνο Κινητό</p>
                    <p className="text-xl font-bold">697-418-7033</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-[#7a8a47] p-3 rounded-full text-white"><Mail size={24} /></div>
                  <div>
                    <p className="text-sm text-lime-200">Email</p>
                    <p className="text-xl font-bold">xerxeletzisxristos@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-10">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7a8a47]" placeholder="Ονοματεπώνυμο" />
              <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7a8a47]" placeholder="Τηλέφωνο" />
              <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7a8a47]" placeholder="Το μήνυμά σας"></textarea>
              <button className="w-full py-4 bg-[#2d3e23] text-white rounded-lg font-bold flex justify-center items-center gap-2 hover:bg-[#1e2a17] transition-colors"><Send size={20} /> Αποστολή</button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#2d3e23] text-gray-300 py-12 px-4 border-t border-[#7a8a47]/20">
        <div className="max-w-7xl mx-auto text-center flex flex-col items-center gap-6">
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center text-lg font-medium">
            <a href="tel:+306974187033" className="flex items-center gap-3 hover:text-[#7a8a47] transition-colors">
              <Phone className="text-[#7a8a47]" /> +30 697 418 7033
            </a>
            <a href="mailto:xerxeletzisxristos@gmail.com" className="flex items-center gap-3 hover:text-[#7a8a47] transition-colors">
              <Mail className="text-[#7a8a47]" /> xerxeletzisxristos@gmail.com
            </a>
          </div>
          <p className="mt-8">© {new Date().getFullYear()} χορτοφάγος. Με επιφύλαξη παντός δικαιώματος.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;