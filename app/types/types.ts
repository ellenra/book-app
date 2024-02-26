export type Book = {
    id: string,
    createdAt: Date;
    updatedAt: Date;
    title: string;
    author: string;
    state: string;
    end_date: string | null;
    rating: number | null;
    comment: string | null;
    userId: string;
}

export type State = 'TO_READ' | 'READING' | 'FINISHED'

export type NewBookData = {
    title: string;
    author: string;
    state: string;
    end_date: string;
    rating: number;
    comment: string;
}