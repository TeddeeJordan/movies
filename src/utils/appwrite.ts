import { Client, ID, Query, TablesDB } from "appwrite"
import type { TMovieResponse } from "../types/tbmdTypes"

const client = new Client().setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT).setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)

const database = new TablesDB(client)

export const updateSearchCount = async (searchTerm: string, movie: TMovieResponse) => {
    try {
        const result = await database.listRows(import.meta.env.VITE_APPWRITE_DATABASE_ID, import.meta.env.VITE_TABLE_NAME, [Query.equal(searchTerm, searchTerm)])
        
        if (result.rows.length > 0) {
            const doc = result.rows[0]
            await database.updateRow(import.meta.env.VITE_APPWRITE_DATABASE_ID, import.meta.env.VITE_TABLE_NAME, doc.$id, { count: doc.count + 1 })
        } else {
            await database.createRow(import.meta.env.VITE_APPWRITE_DATABASE_ID, import.meta.env.VITE_TABLE_NAME, ID.unique(), {
                searchTerm,
                count: 1,
                movieID: movie.id,
                poster: `${import.meta.env.VITE_IMAGE_URL}/w500${movie.poster_path}`
            })
        }
    } catch (error) {
        console.error(error)
    }
}