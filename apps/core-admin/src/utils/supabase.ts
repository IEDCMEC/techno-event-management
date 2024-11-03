// supabaseClient.js

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { Database } from './supabaseTypes';
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const supabase =
  SUPABASE_URL !== undefined &&
  SUPABASE_KEY !== undefined &&
  createClient<Database>(SUPABASE_URL, SUPABASE_KEY);

// module.exports = supabase;
export default supabase;
