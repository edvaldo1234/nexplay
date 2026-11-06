import {neon} from "@neondatabase/serverless";
import {randomBytes,scryptSync} from "node:crypto";
const email=process.env.ADMIN_EMAIL?.toLowerCase().trim();const password=process.env.ADMIN_PASSWORD;
if(!process.env.DATABASE_URL||!email||!password||password.length<14)throw new Error("Forneça DATABASE_URL, ADMIN_EMAIL e ADMIN_PASSWORD (14+ caracteres)");
const sql=neon(process.env.DATABASE_URL);const rows=await sql`SELECT count(*)::int n FROM users WHERE role='master'`;
if(rows[0].n>0)throw new Error("Já existe administrador; abortando");
const salt=randomBytes(16).toString('hex');const hash=salt+':'+scryptSync(password,salt,64).toString('hex');
await sql`INSERT INTO users(name,email,password_hash,role) VALUES('Administrador NEXPLAY',${email},${hash},'master')`;
console.log('Administrador cadastrado. Não reutilize a senha em outros serviços.');
