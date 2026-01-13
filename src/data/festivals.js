export const festivals = [
    {
        id: 'diwali',
        name: 'Diwali',
        description: 'The Festival of Lights',
        color: '#FF9F1C',
        bgGradient: 'linear-gradient(135deg, #FFFBF0 0%, #FFE5B4 100%)',
        items: [
            { id: 'diya', name: 'Diya Lamp', icon: '🕯️', color: '#FFD700' },
            { id: 'rangoli', name: 'Rangoli', icon: '🌸', color: '#FF5470' },
            { id: 'sweet', name: 'Sweets', icon: '🍬', color: '#8FBC8F' },
            { id: 'lantern', name: 'Lantern', icon: '🏮', color: '#FF6347' },
        ],
        quiz: [
            {
                id: 1,
                question: "What do we light on Diwali?",
                options: ["Candles & Diyas", "Water Hose", "Stones"],
                answer: "Candles & Diyas",
                hint: "It gives us light!"
            },
            {
                id: 2,
                question: "Diwali is the festival of...?",
                options: ["Colors", "Lights", "Water"],
                answer: "Lights",
                hint: "Look at the Diya lamp."
            }
        ],
        completionMessage: 'Happy Diwali!'
    },
    {
        id: 'christmas',
        name: 'Christmas',
        description: 'Bells and Joy',
        color: '#2EC4B6',
        bgGradient: 'linear-gradient(135deg, #E0F7FA 0%, #B2EBF2 100%)',
        items: [
            { id: 'star', name: 'Star', icon: '⭐', color: '#FFD700' },
            { id: 'bell', name: 'Bell', icon: '🔔', color: '#FFD700' },
            { id: 'gift', name: 'Gift', icon: '🎁', color: '#FF5470' },
            { id: 'sock', name: 'Stocking', icon: '🧦', color: '#FF6347' },
        ],
        quiz: [
            {
                id: 1,
                question: "Who brings gifts on Christmas?",
                options: ["Santa Claus", "The Dentist", "A Pilot"],
                answer: "Santa Claus",
                hint: "He wears a red suit."
            },
            {
                id: 2,
                question: "Where do we put the star?",
                options: ["On the Tree", "Under the bed", "In the soup"],
                answer: "On the Tree",
                hint: "It goes on the very top!"
            }
        ],
        completionMessage: 'Merry Christmas!'
    },
    {
        id: 'halloween',
        name: 'Halloween',
        description: 'Spooky Fun',
        color: '#9B5DE5',
        bgGradient: 'linear-gradient(135deg, #E6E6FA 0%, #D8BFD8 100%)',
        items: [
            { id: 'pumpkin', name: 'Pumpkin', icon: '🎃', color: '#FF9F1C' },
            { id: 'ghost', name: 'Ghost', icon: '👻', color: '#FFFFFF' },
            { id: 'candy', name: 'Candy', icon: '🍭', color: '#FF5470' },
            { id: 'bat', name: 'Bat', icon: '🦇', color: '#4F5D75' },
        ],
        quiz: [
            {
                id: 1,
                question: "What vegetable do we carve?",
                options: ["Pumpkin", "Cucumber", "Carrot"],
                answer: "Pumpkin",
                hint: "It is orange and round."
            },
            {
                id: 2,
                question: "What do we say to get candy?",
                options: ["Trick or Treat", "Happy Birthday", "Good Morning"],
                answer: "Trick or Treat",
                hint: "You say it at the door."
            }
        ],
        completionMessage: 'Happy Halloween!'
    },
    {
        id: 'pongal',
        name: 'Pongal',
        description: 'Harvest Festival',
        color: '#FFD166',
        bgGradient: 'linear-gradient(135deg, #FFFDE7 0%, #FFF59D 100%)',
        items: [
            { id: 'pot', name: 'Pongal Pot', icon: '⚱️', color: '#8D6E63' },
            { id: 'sugarcane', name: 'Sugarcane', icon: '🎋', color: '#AED581' },
            { id: 'cow', name: 'Cow', icon: '🐄', color: '#F5F5F5' },
            { id: 'sun', name: 'Sun', icon: '☀️', color: '#FFEB3B' },
        ],
        quiz: [
            {
                id: 1,
                question: "Who do we thank during Pongal?",
                options: ["The Sun", "The Moon", "The Stars"],
                answer: "The Sun",
                hint: "It gives us heat and light."
            },
            {
                id: 2,
                question: "What is the special dish?",
                options: ["Pongal", "Sandwich", "Salad"],
                answer: "Pongal",
                hint: "It is made in a pot."
            }
        ],
        completionMessage: 'Happy Pongal!'
    },
    {
        id: 'onam',
        name: 'Onam',
        description: 'Festival of Kerala',
        color: '#EF476F',
        bgGradient: 'linear-gradient(135deg, #FBE9E7 0%, #FFCCBC 100%)',
        items: [
            { id: 'flower', name: 'Pookalam', icon: '🌺', color: '#FF4081' },
            { id: 'boat', name: 'Boat', icon: '🛶', color: '#795548' },
            { id: 'leaf', name: 'Banana Leaf', icon: '🍃', color: '#4CAF50' },
            { id: 'umbrella', name: 'Umbrella', icon: '☂️', color: '#AB47BC' },
        ],
        quiz: [
            {
                id: 1,
                question: "What do we make with flowers?",
                options: ["Pookalam", "Juice", "A House"],
                answer: "Pookalam",
                hint: "It is a beautiful floor design."
            },
            {
                id: 2,
                question: "Which race happens on Onam?",
                options: ["Boat Race", "Car Race", "Bike Race"],
                answer: "Boat Race",
                hint: "It happens on water."
            }
        ],
        completionMessage: 'Happy Onam!'
    },
    {
        id: 'holi',
        name: 'Holi',
        description: 'Festival of Colors',
        color: '#118AB2',
        bgGradient: 'linear-gradient(135deg, #E1F5FE 0%, #81D4FA 100%)',
        items: [
            { id: 'colors', name: 'Colors', icon: '🎨', color: '#FF1744' },
            { id: 'pichkari', name: 'Water Gun', icon: '🔫', color: '#00E676' },
            { id: 'sweets', name: 'Sweets', icon: '🍧', color: '#F48FB1' },
            { id: 'bonfire', name: 'Bonfire', icon: '🔥', color: '#FF6D00' },
        ],
        quiz: [
            {
                id: 1,
                question: "What do we play with on Holi?",
                options: ["Colors", "Books", "Pens"],
                answer: "Colors",
                hint: "They are red, blue, green..."
            },
            {
                id: 2,
                question: "What do we spray water with?",
                options: ["Pichkari", "Spoon", "Cup"],
                answer: "Pichkari",
                hint: "It squirts water!"
            }
        ],
        completionMessage: 'Happy Holi!'
    },
    {
        id: 'ramadan',
        name: 'Ramadan',
        description: 'Holy Month',
        color: '#073B4C',
        bgGradient: 'linear-gradient(135deg, #E0F2F1 0%, #80CBC4 100%)',
        items: [
            { id: 'moon', name: 'Crescent', icon: '🌙', color: '#FFD700' },
            { id: 'dates', name: 'Dates', icon: '🌰', color: '#8D6E63' },
            { id: 'lantern', name: 'Fanoos', icon: '🏮', color: '#FFD700' },
            { id: 'prayer', name: 'Rug', icon: '🧘', color: '#5C6BC0' }, // Using general icon for simplicity
        ],
        quiz: [
            {
                id: 1,
                question: "What do we see in the sky?",
                options: ["Moon", "Sun", "Rainbow"],
                answer: "Moon",
                hint: "It comes out at night."
            },
            {
                id: 2,
                question: "What sweet fruit do we eat?",
                options: ["Dates", "Lemon", "Onion"],
                answer: "Dates",
                hint: "They are brown and sweet."
            }
        ],
        completionMessage: 'Ramadan Kareem!'
    },
    {
        id: 'bakrid',
        name: 'Bakrid',
        description: 'Festival of Sacrifice',
        color: '#06D6A0',
        bgGradient: 'linear-gradient(135deg, #E8F5E9 0%, #A5D6A7 100%)',
        items: [
            { id: 'feast', name: 'Feast', icon: '🍲', color: '#FF7043' },
            { id: 'gift', name: 'Gift', icon: '🎁', color: '#FFCA28' },
            { id: 'moon', name: 'Moon', icon: '🌑', color: '#B0BEC5' },
            { id: 'family', name: 'Family', icon: '👨‍👩‍👧', color: '#EC407A' },
        ],
        quiz: [
            {
                id: 1,
                question: "What do we share on Bakrid?",
                options: ["Food", "Homework", "Stones"],
                answer: "Food",
                hint: "Yummy meals for everyone."
            },
            {
                id: 2,
                question: "Who do we celebrate with?",
                options: ["Family", "Computers", "Chairs"],
                answer: "Family",
                hint: "People we love."
            }
        ],
        completionMessage: 'Eid Mubarak!'
    }
];
