export default [
  {
    intent: 'specialist_consultation',
    utterances: [
      'I require a specialist consultation',
      'book me for a specialist appointment',
      'I need to consult a specialist',
      'schedule an appointment with a specialist doctor',
      'book an appointment with a consultant',
      'I want to see a specialist for my condition',
    ],
    answers: [
      "Sure, we'll arrange a consultation with a specialist for you. Your consultation is booked for 11:00 AM on 24/04/2024.",
      'Of course! Let me schedule an appointment with a specialist for you. Your appointment is scheduled for 02:52 AM on 29/04/2024.',
      "Certainly, we'll set up a consultation with the appropriate specialist. Your consultation is booked for 01:38 PM on 25/04/2024.",
      "Absolutely! We'll book you in for a consultation with a specialist. Your appointment is booked for 08:58 PM on 25/04/2024.",
      "Sure, we'll arrange an appointment with the consultant for you. Your appointment is scheduled for 03:56 AM on 24/04/2024.",
      "Of course! We'll schedule a consultation with a specialist for your condition. Your consultation is booked for 08:25 PM on 24/04/2024.",
    ],
  },
  {
    intent: 'services_inquiry',
    utterances: [
      'need information about services',
      'learn about medical services',
      'what medical services do you offer',
      'explore medical services',
      'inquiring about medical services',
    ],
    answers: [
      'Of course! Our hospital offers a wide range of medical services. Could you please specify which service you are interested in? Emergency care, Surgical services, Maternity care, Paediatrics',
      'Certainly! We have various medical services available. What specific service would you like more information about? Emergency care, Surgical services, Maternity care, Paediatrics',
      "We provide a comprehensive range of medical services. Could you specify the service you're interested in? Emergency care, Surgical services, Maternity care, Paediatrics",
      'Absolutely! We offer various medical services. What specific service are you interested in? Emergency care, Surgical services, Maternity care, Paediatrics',
      'Sure! We have a comprehensive range of medical services available. What do you need information about? Emergency care, Surgical services, Maternity care, Paediatrics',
    ],
  },
  {
    intent: 'headache',
    utterances: [
      "I'm experiencing a severe headache.",
      'I have a pounding headache.',
      'My head is throbbing with pain.',
      "I'm suffering from a splitting headache.",
      "I have a persistent headache that won't go away.",
    ],
    answers: [
      'Headaches can be tough. Have you tried taking pain relievers?',
      'Pounding headaches can be quite discomforting. Have you tried resting in a quiet, dark room?',
      'Throbbing pain in the head can be quite intense. Have you had enough water today?',
      'Splitting headaches can really disrupt your day. Have you tried applying a cold compress to your forehead?',
      'Persistent headaches can be concerning. Have you considered seeing a doctor for further evaluation?',
    ],
  },
  {
    intent: 'fever',
    utterances: [
      'I feel feverish and hot.',
      'I have a high temperature.',
      'My body temperature is elevated.',
      "I'm experiencing chills and fever.",
      "I have a fever that's making me feel weak.",
    ],
    answers: [
      'Feeling feverish can be uncomfortable. Have you taken your temperature lately?',
      'A high temperature can indicate a fever. Have you been feeling any other symptoms along with the fever?',
      'Elevated body temperature can indicate a fever. Have you been resting and hydrating?',
      'Chills and fever often go hand in hand. Have you tried taking a fever reducer medication?',
      'Fever can indeed make you feel weak. Have you been monitoring your temperature regularly?',
    ],
  },
  {
    intent: 'cough',
    utterances: [
      'I have a persistent cough.',
      "I'm coughing frequently.",
      'I have a dry, irritating cough.',
      'My cough is accompanied by phlegm.',
      "I'm experiencing chest congestion and coughing.",
    ],
    answers: [
      'Persistent coughs can be bothersome. Have you tried using cough syrup or lozenges?',
      'Frequent coughing can be exhausting. Have you noticed if the cough worsens at certain times of the day?',
      'Dry coughs can be quite irritating. Have you tried humidifying the air in your room?',
      'Coughing up phlegm can indicate a respiratory infection. Have you been experiencing any other symptoms?',
      'Chest congestion along with coughing can indicate a respiratory issue. Have you tried using a vaporizer to ease congestion?',
    ],
  },
  {
    intent: 'sore_throat',
    utterances: [
      "I have a sore throat that's painful.",
      'My throat feels scratchy and sore.',
      "I'm experiencing discomfort when swallowing.",
      'My throat is inflamed and sore.',
      'I have a persistent sore throat with difficulty speaking.',
    ],
    answers: [
      'Sore throats can be uncomfortable. Have you tried gargling with warm salt water?',
      'Scratchy and sore throats can be annoying. Have you been drinking warm liquids to soothe your throat?',
      'Discomfort when swallowing can indicate a sore throat. Have you been avoiding foods that irritate your throat?',
      'Inflamed and sore throats can be signs of infection. Have you checked for any white patches on your throat?',
      'Persistent sore throats can be concerning. Have you been resting your voice and avoiding irritants?',
    ],
  },
  {
    intent: 'stomach_ache',
    utterances: [
      'I have a sharp pain in my stomach.',
      'My stomach feels upset and crampy.',
      "I'm experiencing abdominal discomfort.",
      'I have a gnawing pain in my stomach.',
      'My stomach hurts and feels bloated.',
    ],
    answers: [
      'Sharp stomach pains can be uncomfortable. Have you been able to keep food down?',
      'Upset and crampy stomachs can be signs of digestive issues. Have you been experiencing any nausea or vomiting?',
      'Abdominal discomfort can be caused by various factors. Have you tried eating smaller, more frequent meals?',
      'Gnawing pains in the stomach can be distressing. Have you noticed if the pain worsens after eating?',
      'Bloating and stomach pain can be signs of digestive issues. Have you tried avoiding foods that trigger bloating?',
    ],
  },
  {
    intent: 'back_pain',
    utterances: [
      "I'm suffering from intense back pain.",
      'My lower back is aching severely.',
      'I have shooting pain in my back.',
      "I'm experiencing stiffness in my back.",
      'My back pain is radiating down my legs.',
    ],
    answers: [
      'Intense back pain can be debilitating. Have you tried applying heat or cold packs to the affected area?',
      'Severe lower back pain can be quite uncomfortable. Have you noticed if certain movements worsen the pain?',
      'Shooting pains in the back can indicate nerve issues. Have you tried gentle stretching exercises for your back?',
      'Back stiffness can be a sign of muscle tension. Have you tried improving your posture and ergonomics?',
      'Back pain radiating down the legs can indicate sciatica. Have you noticed any weakness or numbness in your legs?',
    ],
  },
  {
    intent: 'shortness_of_breath',
    utterances: [
      "I'm having trouble breathing.",
      "I feel like I can't catch my breath.",
      "I'm experiencing sudden shortness of breath.",
      "I'm feeling breathless even at rest.",
      "I'm having difficulty breathing deeply.",
    ],
    answers: [
      'Difficulty breathing can be concerning. Have you tried sitting upright and taking slow, deep breaths?',
      'Feeling breathless can be distressing. Have you been experiencing any chest pain along with the shortness of breath?',
      'Sudden shortness of breath can be a sign of a medical emergency. Have you been in contact with any allergens or irritants?',
      'Feeling breathless at rest can indicate a respiratory issue. Have you noticed if the shortness of breath worsens with physical activity?',
      'Difficulty breathing deeply can indicate lung issues. Have you been in contact with anyone who has respiratory symptoms?',
    ],
  },
  {
    intent: 'fatigue',
    utterances: [
      'I feel unusually tired.',
      'I feel exhausted even after resting.',
      "I'm experiencing extreme fatigue.",
      "I'm tired all the time.",
      'I feel like I have no energy.',
    ],
    answers: [
      'Feeling unusually tired can be a sign of fatigue. Have you been getting enough sleep at night?',
      'Exhaustion despite resting can indicate fatigue. Have you been feeling any muscle weakness or soreness?',
      'Extreme fatigue can be concerning. Have you been feeling any lightheadedness or dizziness along with the fatigue?',
      'Feeling tired all the time can indicate fatigue. Have you been feeling any difficulty concentrating or remembering things?',
      'Feeling like you have no energy can be a sign of fatigue. Have you been feeling any changes in your appetite or weight?',
    ],
  },
  {
    intent: 'greetings.afternoon',
    utterances: ['good afternoon', 'afternoon'],
    answers: ['Good afternoon! Welcome to our hospital, how can I assist you?'],
  },
  {
    intent: 'greetings.evening',
    utterances: ['good evening', 'evening'],
    answers: ['Good evening! Welcome to our hospital, how can I assist you?'],
  },
  {
    intent: 'greetings.general',
    utterances: ['hello', 'hi', 'yo'],
    answers: ['Hey there! Welcome to our hospital, how can I assist you?'],
  },
  {
    intent: 'live_agent',
    utterances: [
      'speak to a live agent',
      'get in touch with a person',
      'need assistance from a human',
      'need to speak to a person',
      'speak with someone',
      'need human assistance',
    ],
    answers: [
      'Sure, I can connect you with one of our live agents. Please hold on for a moment.',
      "Absolutely, I'll transfer you to one of our live agents right away.",
      "Certainly, I'll connect you with one of our live agents immediately.",
      'Sure, we can schedule a general check-up for you. Your appointment is booked for 03:23 PM on 29/04/2024.',
      'Absolutely! Let me schedule a general check-up appointment for you. Your appointment is scheduled for 12:59 AM on 25/04/2024.',
      'Of course, we can arrange a routine check-up appointment for you. Your appointment is booked for 09:22 AM on 30/04/2024.',
    ],
  },
  {
    intent: 'visiting_hours',
    utterances: [
      'visiting hours',
      'hours of operation',
      'when is the hospital open',
      'what are the visiting hours?',
      'when is the hospital open?',
      'visiting hours?',
    ],
    answers: [
      'Sure, our visiting hours are from 9:00 AM to 9:00 PM every day. Is there anything else I can assist you with?',
      'Our hospital is open from 9:00 AM to 9:00 PM daily. How else may I assist you today?',
      'Our hospital is open every day from 9:00 AM to 9:00 PM. Do you need any other information?',
    ],
  },
  {
    intent: 'greetings.how-are-you',
    utterances: ['how are you?'],
    answers: [
      "I'm good! Thanks! Welcome to our hospital, how can I assist you?",
    ],
  },
  {
    intent: 'greetings.morning',
    utterances: ['good morning', 'morning'],
    answers: ['Good morning! Welcome to our hospital, how can I assist you?'],
  },
  {
    intent: 'appointment',
    utterances: [
      'make an appointment',
      'book an appointment for a health check',
    ],
    answers: ['updated answers'],
  },
  {
    intent: 'directions',
    utterances: [
      'directions to the hospital',
      'how do I get to the hospital',
      'hospital address',
    ],
    answers: [
      'Sure, let me help you with that. Our hospital is located at 123 Main Street, Cityville, State. Would you like more detailed directions?',
      'Certainly, I can assist you with that. The hospital is located at 123 Main Street, Cityville, State. Do you need more specific directions?',
      'Our hospital is located at 123 Main Street, Cityville, State. Do you need help with directions?',
    ],
  },
];
