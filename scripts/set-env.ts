import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';

if (!process.env.API_KEY) {
  console.error('❌ Falta API_KEY en las variables de entorno');
  process.exit(1);
}

const validEnvs = ['production', 'development'];
if (!validEnvs.includes(process.env.NODE_ENV ?? '')) {
  console.error(
    `❌ NODE_ENV inválido: "${process.env.NODE_ENV}". Se esperaba uno de: ${validEnvs.join(', ')}`
  );
  process.exit(1);
}

const isProduction = process.env.NODE_ENV === 'production';
const targetFile = isProduction
  ? path.join(__dirname, '../src/environments/environment.production.ts')
  : path.join(__dirname, '../src/environments/environment.development.ts');

const content = `export const environment = {
  production: ${isProduction},
  name: '${process.env.APP_NAME}',
  api: '${process.env.API_URL}',
  auth: '${process.env.AUTH_URL}',
  file: '${process.env.FILE_URL}',
  release: '${process.env.RELEASE}',
  version: '${process.env.VERSION}',
  apiKey: '${process.env.API_KEY}',
  apiUrl: '${process.env.API_URL2}'
};
`;

fs.writeFileSync(targetFile, content);
console.log(`✅ ${targetFile} generado`);
