import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Ejemplo de carga que podría dar 404 si 'productos' no existe
const { data, error } = await supabase.from("proyecto_textil").select("*");
