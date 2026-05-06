export type ArticleModel = 1 | 2 | 3

export interface Article {
    id: string
    category: string // Leaf category value from the cascader
    title?: string // Optional for Model 1 & 2, Required for Model 3
    language: string
    cover_url?: string
    content: string // HTML content
    last_modified_at: string
    last_modified_by: string
    publish_start: string
    publish_end?: string
    event_start_time?: string // For Model 3
    event_end_time?: string // For Model 3
    is_published: boolean
    seo: {
        meta_title?: string
        meta_description?: string
    }
}

export interface ArticleQuery {
    categories?: string[] // Optional filter by category leaf value
    start_time?: string
    end_time?: string
    page: number
    pageSize: number
}
