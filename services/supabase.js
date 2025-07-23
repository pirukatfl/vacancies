import { createClient } from '@supabase/supabase-js'

const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY
// console.log('HOP', SUPABASE_KEY)
// Create a single supabase client for interacting with your database
const supabase = createClient('https://yrlztqzgvhwhgxmixubh.supabase.co', SUPABASE_KEY)

export default supabase