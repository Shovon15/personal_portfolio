export interface Item {
    title: string;
    value: string;
}

interface SelectConfig {
    religion: Item[];
    bloodGroup: Item[];
    class: Item[];
    group: Item[];
    section: Item[];
}

export const selectConfig: SelectConfig = {
    religion: [
        {
            title: "Muslim",
            value: "muslim",
        },
        {
            title: "Hinduism",
            value: "hinduism",
        },
        {
            title: "Christianity",
            value: "christianity",
        },
        {
            title: "Buddhism",
            value: "buddhism",
        },
        {
            title: "Other",
            value: "other",
        },
    ],
    bloodGroup: [
        {
            title: "A+",
            value: "A+",
        },
        {
            title: "A-",
            value: "A-",
        },
        {
            title: "B+",
            value: "B+",
        },
        {
            title: "B-",
            value: "B-",
        },
        {
            title: "O+",
            value: "O+",
        },
        {
            title: "O-",
            value: "O-",
        },
        {
            title: "AB+",
            value: "AB+",
        },
        {
            title: "AB-",
            value: "AB-",
        },
    ],
    class: [
        {
            title: "Eleven",
            value: "elevel",
        },
        {
            title: "Twelve",
            value: "twelve",
        },
    ],
    group: [
        {
            title: "Science",
            value: "science",
        },
        {
            title: "Business Studies",
            value: "business-studies",
        },
        {
            title: "Humanities",
            value: "humanities",
        },
    ],
    section: [
        {
            title: "section 1",
            value: "section-1",
        },
        {
            title: "Section 2",
            value: "section-2",
        },
        {
            title: "Section 2",
            value: "section-2",
        },
        {
            title: "Section 3",
            value: "section-3",
        },
        {
            title: "Section 4",
            value: "section-4",
        },
    ]

}