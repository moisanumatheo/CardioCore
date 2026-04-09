export const SITE = {
  name: "CardioCore",
  slogan: "Pentru inima ta",
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
    mapsUrl: "https://maps.app.goo.gl/FsGfX4GeiRAdyCF68",
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d355.75969780959934!2d26.122984449073787!3d44.4930770933184!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b203c48eaf9361%3A0x8bbebe3b85ddc5e!2sCardioCore!5e0!3m2!1sro!2sus!4v1774247925346!5m2!1sro!2sus",
  },

  hours: [
    { days: "Luni–Vineri", time: "15:00–20:00" },
    { days: "Sâmbătă", time: "09:00–14:00" },
  ],
  phone: ["+40 758 640 016", "+40 778 739 245"],
  whatsapp: true,
  email: "programari@cardiocore.ro",
  social: {
    facebook:
      "https://www.facebook.com/profile.php?id=61587815283527&locale=ro_RO",
    instagram: "https://www.instagram.com/clinica.cardiocore/",
    tiktok: "#",
  },

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
      title: "Monitorizare Holter EKG (24–48h)",
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

  pricing: {
    currency: "lei",
    updatedAt: "2026-01-09",
    doctors: ["Dr. Andreea Cuculici", "Dr. Pîrîianu-Masgras Bianca"],
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

export const REVIEWS = [
  { text: "Profesionalism și calm. Fără grabă.", author: "M. D., pacient" },
  {
    text: "Servicii impecabile, explicații clare, atmosferă plăcută.",
    author: "A. R., pacientă",
  },
  { text: "Am depistat din timp datorită testului de efort.", author: "C. I." },
];

export const LEGAL = {
  privacyTitle:
    "Politica de prelucrare și protecție a datelor cu caracter personal la nivel de Companie",

  companyHeader: SITE.name,

  privacyParagraphs: [
    "Folosim cookie-uri necesare pentru funcționarea site-ului. Prin continuare, confirmi că ai citit și accepți Politica de prelucrare a datelor și Politica de cookie-uri.",
    "Principii:",
    "1. Prelucrarea datelor personale de către Companie este guvernată de acordarea consimțământului de către Persoana vizată și de necesitatea furnizării actului medical.",
    "2. Terții, care furnizează date personale în virtutea raporturilor juridice pe care le au cu Compania, poartă răspunderea integrală a prelucrării datelor personale puse la dispoziția Companiei. Orice eventuală prelucrare a datelor personale de către Companie se va face în virtutea raportului juridic în care terțul și Compania s-au înscris și se prezumă că are la bază consimțământul Persoanei vizate dat terțului furnizor, sub sancțiunea de daune interese.",

    "Părți implicate:",
    "1. Compania – Operatorul (CardioCore)",
    "2. Personalul Angajat: Persoana care utilizează sau prelucrează datele cu caracter personal care și-a asumed prezenta procedură și pe care și-a însușit-o prin semnătură (personal medical și administrativ).",
    "3. Persoana împuternicită: desemnată în condițiile legii să supravegheze prelucrarea datelor cu caracter personal din cadrul Companiei (persoană fizică) sau un terț contractat (persoană juridică).",
    "4. Beneficiari indirecți: Terți Beneficiari/Furnizori (laboratoare partenere, mentenanță software).",
    "5. Persoana vizată: Persoana fizică (Pacientul) care pune la dispoziția Companiei date cu caracter personal.",

    "Articolul 1",
    "Prezentul document stabilește politica de prelucrare/protecție a datelor cu caracter personal și modalitatea de acces a persoanelor vizate la datele personale în conformitate cu Regulamentul (UE) 2016/679 (denumit generic Regulamentul sau GDPR).",

    "Articolul 2. Declarația de prelucrare.",
    "Compania prelucrează în îndeplinirea relațiilor contractuale și a serviciilor pe care le prestează, după caz, următoarele date cu caracter personal: [Categoria 1 - date de identificare]: nume, prenume, adresă, CNP - pentru îndeplinirea obligațiilor legale în raport cu autoritățile de stat, număr de telefon, funcție, seria și numărul cărții de identitate, adresă de e-mail, date audio vizuale a persoanei vizate, adresa IP a dispozitivelor electronice [Categoria 2 - date medicale/indirecte]: istoric medical, diagnostice, rezultate EKG/ecografii, date financiare, date socio-demografice, date despre comportamentul online sau furnizate în urma unui apel telefonic (accesări, preferințe, solicitări, etc.).",

    "Articolul 3. Prelucrarea datelor.",
    "Compania prelucrează date personale doar în îndeplinirea obiectului de activitate și în scopul furnizării serviciilor medicale de cardiologie puse la dispoziția consumatorilor, solicitate și/sau prestate conform obiectului de activitate, strict în scopul îndeplinirii obiectului raporturilor juridice asumate (prestări de servicii, rapoarte de muncă, etc.) și/sau pentru campanii de marketing în vederea îmbunătățirii și dezvoltării produselor și serviciilor pe care le oferă, bazate pe interesul legitim al părților și/sau public, în funcție de situație, și doar în urma consimțământului persoanei vizate.",

    "Articolul 4. Date sensibile.",
    "Compania înregistrează date privind sănătatea pacientului necesare diagnosticului și tratamentului, dar nu colectează date privind etnia, credințele religioase sau politice, cu excepția cazurilor în care acest lucru este absolut necesar sau cerut de legea sănătății.",

    "Articolul 5. Persoana împuternicită.",
    "Compania a numit/contractat un Ofițer/Persoană împuternicită pentru Protecția Datelor cu caracter personal din cadrul Companiei este Responsabilul DPO și are în principal următoarele obligații: (1) Informarea/consilierea; (2) Monitorizarea conformității; (3) Consilierea DPIA; (4) Cooperarea cu ANSPDCP; (5) Contact pacienți; (6) Registrul prelucrărilor; (7) Instruire personal; (8) Audit securitate.",

    "Articolul 6. Stocarea și prelucrarea datelor cu caracter personal.",
    "Compania stochează datele puse la dispoziție de către Persoana vizată, după caz, pe suport de hârtie (dosar medical), pe suport electronic pe calculatoarele și serverele proprii sau prin apelarea la servicii de cloud securizat.",

    "Articolul 7. Perioada de stocare, prelucrare, utilizare a datelor cu caracter personal.",
    "Compania stochează/prelucrează/utilizează datele pe durata necesară actului medical și conform legislației în vigoare, iar perioada de stocare a datelor cu caracter personal nu este mai mică de 10 ani pentru fișele medicale.",

    "Articolul 8. Consimțământul persoanei vizate.",
    "Acordul persoanei vizate se obține prin aducerea la cunoștință a prezentei Politici și confirmarea expresă prin semnătură olografă sau digitală.",

    "Articolul 9. Înstrăinarea datelor cu caracter personal.",
    "Compania poate transmite datele personale către autorități publice (CNAS, DSP), laboratoare partenere sau furnizori de servicii IT, strict sub clauze de confidențialitate.",

    "Articolul 10. Acordul persoanei vizate.",
    "Acordul persoanei vizate pentru scopuri auxiliare medicale se obține prin aducerea la cunoștință a prezentei Politici și exprimarea voinței libere.",

    "Art. 11. Obligația de confidențialitate.",
    "Compania se angajează să respecte confidențialitatea datelor personale și a secretului profesional medical conform legii pacientului.",

    "Art. 12. Drepturile persoanei vizate.",
    "Persoana vizată are următoarele drepturi: de acces, de rectificare, de ștergere (în limitele legii), de restricționare, de portabilitate și de opoziție.",

    "Art. 13. Exercitarea drepturilor persoanei vizate.",
    "Persoana vizată își poate exercita drepturile legale prin transmiterea unei solicitări scrise către DPO la adresa dpo@cardiocore.ro.",
  ],
};
