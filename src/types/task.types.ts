export type Task = {
    id: number
    labels: string[]
    title: string
    description: string
    status: 'INBOX'| 'TO_DO' | 'IN_PROGRESS' | 'DONE'
    dueDate: string | null
    assignee: string | null
}