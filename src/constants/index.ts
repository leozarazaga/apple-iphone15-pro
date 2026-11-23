import {
    blackImg,
    blueImg,
    highlightFirstVideo,
    highlightFourthVideo,
    highlightSecondVideo,
    highlightThirdVideo,
    whiteImg,
    yellowImg,
} from "../utils";

export type NavMenuColumn = {
    heading: string;
    items: string[];
    secondaryItems?: string[];
};

export type NavMenuItem = {
    label: string;
    primary: NavMenuColumn;
    secondary: NavMenuColumn[];
};

export const navMenus: NavMenuItem[] = [
    {
        label: "Store",
        primary: {
            heading: "Shop",
            items: ["Shop Gifts", "Mac", "iPad", "iPhone", "Apple Watch", "Apple Vision Pro", "AirPods", "Home", "Accessories"],
        },
        secondary: [
            {
                heading: "Quick Links",
                items: [
                    "Apple Store Black Friday Event",
                    "Find a Store",
                    "Order Status",
                    "Apple Upgrade",
                    "Apple Trade In",
                    "Financing",
                    "Personal Setup",
                ],
            },
            {
                heading: "Shop Special Stores",
                items: ["Certified Refurbished", "Education", "Business", "Veterans and Military", "Government"],
            },
        ],
    },
    {
        label: "Mac",
        primary: {
            heading: "Explore Mac",
            items: ["Explore All Mac", "MacBook Neo", "MacBook Air", "MacBook Pro", "iMac", "Mac mini", "Mac Studio", "Displays"],
            secondaryItems: ["Compare Mac", "Switch from PC to Mac"],
        },
        secondary: [
            {
                heading: "Shop Mac",
                items: [
                    "Shop Mac",
                    "Apple Store Black Friday Event",
                    "Mac Accessories",
                    "Apple Upgrade",
                    "Apple Trade In",
                    "Financing",
                    "Personal Setup",
                ],
            },
            {
                heading: "More from Mac",
                items: [
                    "Mac Support",
                    "AppleCare",
                    "macOS 27",
                    "Apple Intelligence and Siri",
                    "Apps by Apple",
                    "Apple Creator Studio",
                    "Better with iPhone",
                    "iCloud+",
                    "Mac for Business",
                    "Education",
                    "Apple at Work",
                ],
            },
        ],
    },
    {
        label: "iPad",
        primary: {
            heading: "Explore iPad",
            items: ["Explore All iPad", "iPad Pro", "iPad Air", "iPad", "iPad mini", "Apple Pencil", "Keyboards"],
            secondaryItems: ["Compare iPad"],
        },
        secondary: [
            {
                heading: "Shop iPad",
                items: [
                    "Shop iPad",
                    "Apple Store Black Friday Event",
                    "iPad Accessories",
                    "Apple Upgrade",
                    "Apple Trade In",
                    "Financing",
                    "Personal Setup",
                ],
            },
            {
                heading: "More from iPad",
                items: [
                    "iPad Support",
                    "AppleCare",
                    "iPadOS 27",
                    "Apple Intelligence and Siri",
                    "Apps by Apple",
                    "Apple Creator Studio",
                    "iCloud+",
                    "Education",
                    "Apple at Work",
                ],
            },
        ],
    },
    {
        label: "iPhone",
        primary: {
            heading: "Explore iPhone",
            items: ["Explore All iPhone", "iPhone Duo", "iPhone 18 Pro", "iPhone Air", "iPhone 17", "iPhone 17e", "iPhone 16"],
            secondaryItems: ["Compare iPhone", "Switch from Android"],
        },
        secondary: [
            {
                heading: "Shop iPhone",
                items: [
                    "Shop iPhone",
                    "Apple Store Black Friday Event",
                    "iPhone Accessories",
                    "Apple Upgrade",
                    "Apple Trade In",
                    "Carrier Deals at Apple",
                    "Financing",
                    "Personal Setup",
                ],
            },
            {
                heading: "More from iPhone",
                items: [
                    "iPhone Support",
                    "AppleCare",
                    "iOS 27",
                    "Apple Intelligence and Siri",
                    "Apps by Apple",
                    "iPhone Privacy",
                    "Better with Mac",
                    "iCloud+",
                    "Wallet, Pay, Card",
                    "Apple at Work",
                ],
            },
        ],
    },
    {
        label: "Watch",
        primary: {
            heading: "Explore Watch",
            items: [
                "Explore All Apple Watch",
                "Apple Watch Series 12",
                "Apple Watch Ultra 4",
                "Apple Watch SE 3",
                "Apple Watch Nike",
                "Apple Watch Hermès",
            ],
            secondaryItems: ["Compare Watch", "Why Apple Watch"],
        },
        secondary: [
            {
                heading: "Shop Watch",
                items: [
                    "Shop Apple Watch",
                    "Apple Store Black Friday Event",
                    "Apple Watch Bands",
                    "Apple Watch Accessories",
                    "Apple Upgrade",
                    "Apple Trade In",
                    "Financing",
                    "Personal Setup",
                ],
            },
            {
                heading: "More from Watch",
                items: [
                    "Apple Watch Support",
                    "AppleCare",
                    "watchOS 27",
                    "Apple Watch For Your Kids",
                    "Apps by Apple",
                    "Apple Fitness+",
                    "Education",
                ],
            },
        ],
    },
    {
        label: "AirPods",
        primary: {
            heading: "Explore AirPods",
            items: ["Explore All AirPods", "AirPods 5", "AirPods Pro 3", "AirPods Max 2"],
            secondaryItems: ["Compare AirPods"],
        },
        secondary: [
            {
                heading: "Shop AirPods",
                items: ["Apple Store Black Friday Event", "Shop AirPods 5", "Shop AirPods Pro 3", "Shop AirPods Max 2", "AirPods Accessories"],
            },
            {
                heading: "More from AirPods",
                items: ["AirPods Support", "AppleCare", "Hearing Health", "Apple Music", "Apple Fitness+"],
            },
        ],
    },
    {
        label: "Support",
        primary: {
            heading: "Explore Support",
            items: ["iPhone", "Mac", "iPad", "Watch", "Apple Vision Pro", "AirPods", "Music", "TV"],
            secondaryItems: ["Explore Support"],
        },
        secondary: [
            {
                heading: "Get Help",
                items: ["Check Coverage", "Genius Bar", "Repair"],
            },
            {
                heading: "Helpful Topics",
                items: ["Get AppleCare", "Apple Account and Password", "Billing & Subscriptions", "Accessibility"],
            },
        ],
    },
];

export const navLists = navMenus.map((item) => item.label);

export const searchQuickLinks = ["Find a Store", "Accessories", "AirPods", "Apple Trade In", "Apple Intelligence"];

export const hightlightsSlides = [
    {
        id: 1,
        textLists: ["Enter A17 Pro.", "Game-changing chip.", "Groundbreaking performance."],
        video: highlightFirstVideo,
        videoDuration: 4,
    },
    {
        id: 2,
        textLists: ["Titanium.", "So strong. So light. So Pro."],
        video: highlightSecondVideo,
        videoDuration: 5,
    },
    {
        id: 3,
        textLists: ["iPhone 15 Pro Max has the", "longest optical zoom in", "iPhone ever. Far out."],
        video: highlightThirdVideo,
        videoDuration: 2,
    },
    {
        id: 4,
        textLists: ["All-new Action button.", "What will yours do?."],
        video: highlightFourthVideo,
        videoDuration: 3.63,
    },
];

export const models = [
    {
        id: 1,
        title: "iPhone 15 Pro in Natural Titanium",
        color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
        img: yellowImg,
    },
    {
        id: 2,
        title: "iPhone 15 Pro in Blue Titanium",
        color: ["#53596E", "#6395ff", "#21242e"],
        img: blueImg,
    },
    {
        id: 3,
        title: "iPhone 15 Pro in White Titanium",
        color: ["#C9C8C2", "#ffffff", "#C9C8C2"],
        img: whiteImg,
    },
    {
        id: 4,
        title: "iPhone 15 Pro in Black Titanium",
        color: ["#454749", "#3b3b3b", "#181819"],
        img: blackImg,
    },
];

export const sizes = [
    { label: '6.1"', value: "small" },
    { label: '6.7"', value: "large" },
];

export const footerLinks = ["Privacy Policy", "Terms of Use", "Sales Policy", "Legal"];

export type FooterSection = {
    title: string;
    links: string[];
};

export const footerDirectory: FooterSection[] = [
    {
        title: "Shop and Learn",
        links: ["Store", "Mac", "iPad", "iPhone", "Watch", "AirPods", "Support"],
    },
    {
        title: "Account",
        links: ["Manage Your Apple Account", "Apple Store Account", "iCloud.com"],
    },
    {
        title: "Apple Store",
        links: ["Find a Store", "Genius Bar", "Apple Trade In", "Financing", "Order Status", "Shopping Help"],
    },
    {
        title: "For Business & Education",
        links: ["Apple and Business", "Shop for Business", "Apple and Education", "Shop for College"],
    },
    {
        title: "About Apple",
        links: ["Newsroom", "Apple Leadership", "Career Opportunities", "Investors", "Ethics & Compliance", "Events", "Contact Apple"],
    },
];
