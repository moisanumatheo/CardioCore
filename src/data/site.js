// src/data/site.js
export const SITE = {
  name: "CardioCore",
  slogan: "Inimile pacienților, în mâini sigure",
  ctaLines: [
    "Programează-te acum pentru un control cardiologic complet.",
    "Ai grijă de inima ta — fă primul pas azi.",
    "Descoperă echipa noastră de specialiști dedicați.",
  ],
  address: {
    complex: "Ivory Residence",
    line1: "Bulevardul Pipera, nr. 1-5A, bl. 4, sc. A, ap. 3",
    line2: "Voluntari, județ Ilfov",
    line: "Ivory Residence — Bulevardul Pipera, nr. 1-5A, bl. 4, sc. A, parter, ap. 3, Voluntari, județ Ilfov", // fallback pt alte locuri
    mapsUrl: "https://maps.app.goo.gl/uiNpZwuSuRQHQntu8",
    coords: { lat: 44.49336776155981, lng: 26.123110214120203 },
  },

  hours: [
    { days: "Luni–Vineri", time: "14:00–20:00" },
    { days: "Sâmbătă", time: "09:00–14:00" },
  ],
  phone: "+40 778 739 245",
  whatsapp: true,
  email: "programari@cardiocore.ro",
  social: {
    facebook: "#",
    instagram: "#",
    tiktok: "#",
  },

  // ——— Servicii (folosite în pagina /servicii) ———
  services: [
    {
      id: "consult",
      title: "Consult cardiologic",
      desc: "Evaluare clinică completă pentru identificarea factorilor de risc și stabilirea unui plan de monitorizare personalizat.",
      bullets: [
        "Istoric medical și evaluare clinică",
        "Măsurarea tensiunii arteriale",
        "Interpretare EKG (dacă e necesar)",
        "Recomandări de investigații suplimentare",
        "Plan de tratament și prevenție",
      ],
      duration: "30–40 min",
      contraindications: "–",
      prep: "Fără efort fizic intens înainte de consultație",
      policy: "Programările pot fi anulate cu min. 24h înainte",
    },
    {
      id: "ekg",
      title: "Electrocardiogramă (EKG)",
      desc: "Înregistrarea activității electrice a inimii pentru depistarea tulburărilor de ritm sau de conducere.",
      bullets: [
        "Măsurare EKG standard 12 derivații",
        "Interpretare de către medic cardiolog",
        "Recomandări ulterioare",
      ],
      duration: "10–15 min",
      prep: "Evitarea cafelei/efortului intens cu 1h înainte",
    },
    {
      id: "echo",
      title: "Ecocardiografie Doppler color și spectral",
      desc: "Investigație imagistică neinvazivă care oferă informații detaliate despre structura și funcția inimii.",
      bullets: [
        "Ecografie transtoracică",
        "Analiză Doppler color și spectral",
        "Interpretare medicală completă",
        "Recomandări de tratament sau urmărire",
      ],
      duration: "30 min",
      prep: "Fără mese abundente înainte de procedură",
    },
    {
      id: "stress",
      title: "Test de efort",
      desc: "Evaluarea reacției inimii la efort fizic, utilă în diagnosticul bolii coronariene / valvulopatiilor sau în monitorizarea răspunsului la tratament.",
      bullets: [
        "EKG continuu în timpul efortului",
        "Monitorizare tensiune arterială",
        "Interpretare cardiologică post-test",
      ],
      duration: "30–45 min",
      contraindications: "Afecțiuni acute, dureri toracice recente",
    },
    {
      id: "holter",
      title: "Monitorizare Holter ECG (24–48h)",
      desc: "Înregistrare continuă a activității electrice a inimii, pentru identificarea tulburărilor de ritm/conducere.",
      bullets: [
        "Montare aparat portabil",
        "Instruire pacient",
        "Analiză și interpretare date",
      ],
      duration: "24–48h",
      prep: "Fără băi/duș în perioada de monitorizare",
    },
    {
      id: "abpm",
      title: "Monitorizare ambulatorie TA / 24h",
      desc: "Monitorizarea tensiunii arteriale pe parcursul unei zile, pentru diagnosticarea corectă a hipertensiunii și urmărirea răspunsului la tratament.",
      bullets: [
        "Montare aparat automat",
        "Înregistrare periodică TA",
        "Analiză completă și recomandări",
      ],
      duration: "24h",
    },
  ],

  // ——— FAQ pentru pagina Servicii ———
  faqServices: [
    {
      q: "Este nevoie de trimitere de la medicul de familie?",
      a: "Echipa CardioCore ofera consultatii cu sau fără bilet de trimitere.",
    },
    {
      q: "Cât durează un consult cardiologic complet?",
      a: "Între 30 și 50 de minute, în funcție de complexitatea cazului.",
    },
    {
      q: "Ce pregătire este necesară pentru ecocardiografie?",
      a: "Evitați mesele copioase și efortul fizic înainte de procedură.",
    },
    {
      q: "Pot veni la control preventiv chiar dacă nu am simptome?",
      a: "Da. Prevenția este esențială, controalele periodice pot depista probleme înainte de apariția simptomelor.",
    },
    {
      q: "Cât durează analiza Holter?",
      a: "Monitorizarea se desfășoară 24-72h, iar rezultatele se interpretează pe loc.",
    },
    {
      q: "Cum pot anula o programare?",
      a: "Telefonic sau prin e-mail, cu minimum 24 de ore înainte.",
    },
  ],

  // ——— Prețuri (pagina /preturi) ———
  pricing: {
    currency: "lei",
    updatedAt: "2026-01-09",
    doctors: ["Dr. Andreea Cuculici", "Dr. Pîrîianu-Masgras Roxana-Bianca"],
    note: "Prețurile pot varia în funcție de caz. Confirmarea finală se face la programare.",
    items: [
      {
        service: "EKG de repaus cu interpretare medic cardiolog",
        a: 100,
        b: 100,
      },
      { service: "Consult cardiologie", a: 300, b: 300 },
      { service: "Consult cardiologie + EKG", a: 400, b: 400 },
      { service: "Control cardiologie", a: 200, b: 200 },
      {
        service: "Consult cardiologie + EKG + Ecocardiografie",
        a: 600,
        b: 600,
      },
      { service: "Ecocardiografie Doppler", a: 400, b: 400 },

      { service: "Holter TA / 24 ore (cu interpretare medic)", a: 250, b: 250 },
      {
        service: "Holter EKG 3 derivații / 24 ore (cu interpretare medic)",
        a: 350,
        b: 350,
      },
      {
        service: "Holter EKG 3 derivații / 48 ore (cu interpretare medic)",
        a: 600,
        b: 600,
      },
      {
        service: "Holter EKG 7 derivații / 24 ore (cu interpretare medic)",
        a: 400,
        b: 400,
      },

      // DUBLURA din document (confirmă care e corect)
      {
        service: "Holter EKG 7 derivații / 48 ore (cu interpretare medic)",
        a: 700,
        b: 700,
      },

      { service: "Test EKG de efort", a: 400, b: 400 },
      { service: "Recuperare cardiovasculară", a: 500, b: 500 },
      { service: "Telemedicină – consultații online", a: 200, b: 200 },
      {
        service:
          "Ecocardiografie contrast (injectare glucoză/ser fiziologic/gelofusine barbotată)",
        a: 450,
        b: null,
      },
      { service: "Ecografie Doppler artere carotide", a: 350, b: null },
      {
        service: "Ecografie Doppler artere sau vene – un membru",
        a: 300,
        b: null,
      },

      {
        service: "Ecografie Doppler vasculară artere sau vene – două membre",
        a: 400,
        b: null,
      },
    ],
  },
};

// ——— Echipa ———
export const TEAM = [
  {
    id: "cuculici",
    name: "Dr. Cuculici Andreea",
    title: "Medic primar cardiolog",
    specialty: "Cardiologie",
    tags: ["Imagistică", "Ecocardiografie", "Prevenție"],
    phone: "+40 778 739 245",
    email: "andreea.cuculici@clinica.ro",
    bio: [
      "Dr. Andreea Cuculici este medic primar cardiolog, membru al Societății Române de Cardiologie și al Societății Europene de Cardiologie, activând în cadrul Institutului de Boli Cardiovasculare „Prof. Dr. C.C. Iliescu” București, Secția de Urgențe Cardiovasculare.",
      "A absolvit Facultatea de Medicină a Universității „Ovidius” Constanța în anul 2004, devenind medic specialist cardiolog în 2012. Din 2017 deține titlul de medic primar cardiolog, iar din 2020 titlul de Doctor în Medicină. În 2016 a obținut competențe în ecocardiografie transesofagiană și tehnici speciale, precum și în ecografie vasculară Doppler, acordate de UMF „Carol Davila” București.",
      "Are o experiență clinică extinsă în cardiologia de urgență, fiind implicată direct în evaluarea și tratamentul pacienților cu sindroame coronariene acute, insuficiență cardiacă acută, tulburări de ritm cardiac și alte afecțiuni cardiovasculare severe, într-un centru de referință la nivel național.",
      "Abordarea sa medicală este integrată și personalizată, centrată pe pacient, îmbinând rigoarea profesională cu aplicarea ghidurilor europene actuale și a medicinei bazate pe dovezi, alături de empatie, comunicare clară și luarea deciziilor terapeutice adaptate fiecărui caz în parte.",
    ],
  },
  {
    id: "pirianu",
    name: "Dr. Pîrîianu-Masgras Bianca",
    title: "Medic specialist cardiolog",
    specialty: "Cardiologie",
    tags: ["Imagistică", "Consult adult", "Educație pacient"],
    phone: "+40 778 739 245",
    email: "roxana.masgras@clinica.ro",
    bio: [
      "Dr. Bianca Piriianu-Masgras este medic specialist cardiolog, membru al Societății Române de Cardiologie, al Societății Europene de Cardiologie, al Asociației Europene de Imagistică Cardiovasculară și al Asociației Europene de Insuficiență Cardiacă. ",
      "A absolvit Facultatea de Medicină Generală din cadrul UMF „Carol Davila” București în anul 2016 și a efectuat rezidențiatul la Institutul de Boli Cardiovasculare „Prof. Dr. C.C. Iliescu”. Deține competență în ecocardiografie Doppler și a participat la numeroase proiecte de sănătate publică, educație medicală și prezentări științifice.",
      "În cadrul CardioCore, oferă consultații specializate, evaluări complete și planuri de tratament personalizate pentru pacienții cu afecțiuni cardiovasculare, punând accent pe comunicare empatică, prevenție și promovarea unui stil de viață sănătos.",
    ],
  },
];

// ——— Recenzii ———
export const REVIEWS = [
  { text: "Profesionalism și calm. Fără grabă.", author: "M. D., pacient" },
  {
    text: "Servicii impecabile, explicații clare, atmosferă plăcută.",
    author: "A. R., pacientă",
  },
  { text: "Am depistat din timp datorită testului de efort.", author: "C. I." },
];
