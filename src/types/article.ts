export type ArticleCategory = 'PROMOTION' | 'SYSTEM' | 'ENCYCLOPEDIA' | 'SEO' | 'TERMS'

export interface Article {
    id: string
    category: ArticleCategory
    title: string
    language: string
    cover_url?: string
    content: string // HTML content
    last_modified_at: string
    last_modified_by: string
    publish_start: string
    publish_end?: string
    status_test: boolean
    status_live: boolean
    seo: {
        meta_title?: string
        meta_description?: string
    }
}

export interface ArticleQuery {
    categories?: ArticleCategory[]
    start_time?: string
    end_time?: string
    page: number
    pageSize: number
}
