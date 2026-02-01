export const quoteList = [
    "The only way to do great work is to love what you do.",
    "Believe you can and you're halfway there.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "It's not whether you get knocked down, it's whether you get up.",
    "The best way to predict the future is to create it.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Your time is limited, don't waste it living someone else's life.",
    "The only limit to our realization of tomorrow will be our doubts of today.",
    "Do not wait for a leader; do it alone, person to person.",
    "The mind is everything. What you think you become."
];

export const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export const getQuote = (data: string[]) => {
    if (data) {
        return data[getRandomInt(data.length)];
    }
    return null;
};
