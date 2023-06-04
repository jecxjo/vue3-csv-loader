import fs from 'fs/promises';
import * as readline from 'readline';

async function processFile(filePath: string): Promise<string[][]> {
  let result: string[][] = [];

  const contents = await fs.readFile(filePath, 'utf8');
  const lines = contents.split('\n');

  lines.forEach((line) => {
    if (line.length > 0) {
      result.push(line.split(','));
    }
  });

  return result;
}

export default function csvLoader(options: any = {}) {
  return {
    name: 'vue3-csv-loader',
    async transform(code: string, id: string) {
      if (id.endsWith('.csv')) {
        const rows = await processFile(id);
        let results = {
          data: rows,
        };

        if (options.firstLineAsHeader) {
          const header = rows.shift();

          if (!header) {
            return null;
          }

          results.data = rows.map((row) => {
            const obj: any = {};
            row.forEach((col, i) => {
              obj[header[i]] = col;
            });
            return obj;
          });

        }

        return {
          code: `export default ${JSON.stringify(results)}`,
          map: null,
        };
      }

      return null;
    }
  };
};
