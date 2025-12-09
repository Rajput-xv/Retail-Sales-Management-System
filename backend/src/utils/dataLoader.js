import Sales from '../models/Sales.js';
import { transformCSVRecord, validateRecord } from '../utils/csvParser.js';
import fs from 'fs';
import { parse } from 'csv-parse';

const loadDataFromCSV = async (csvFilePath) => {
  try {
    const existingCount = await Sales.countDocuments();
    
    if (existingCount > 0) {
      console.log(`Database already contains ${existingCount} records. Skipping import.`);
      return { success: true, count: existingCount, message: 'Data already loaded' };
    }

    console.log('Starting CSV import with streaming...');
    
    let batch = [];
    let importedCount = 0;
    const batchSize = 500;

    const parser = parse({
      columns: true,
      skip_empty_lines: true,
      trim: true,
      cast: false
    });

    const processRecord = async (record) => {
      try {
        const transformed = transformCSVRecord(record);
        if (validateRecord(transformed)) {
          batch.push(transformed);
          
          if (batch.length >= batchSize) {
            await Sales.insertMany(batch, { ordered: false });
            importedCount += batch.length;
            console.log(`Imported ${importedCount} records...`);
            batch = [];
          }
        }
      } catch (err) {
        console.error('Error processing record:', err.message);
      }
    };

    return new Promise((resolve, reject) => {
      parser.on('readable', async function() {
        let record;
        while ((record = parser.read()) !== null) {
          await processRecord(record);
        }
      });

      parser.on('error', function(err) {
        reject(err);
      });

      parser.on('end', async function() {
        try {
          if (batch.length > 0) {
            await Sales.insertMany(batch, { ordered: false });
            importedCount += batch.length;
          }
          console.log(`CSV import completed successfully. Total: ${importedCount} records`);
          resolve({ 
            success: true, 
            count: importedCount, 
            message: 'Data imported successfully' 
          });
        } catch (error) {
          reject(error);
        }
      });

      fs.createReadStream(csvFilePath).pipe(parser);
    });

  } catch (error) {
    console.error('Error loading data from CSV:', error);
    throw error;
  }
};

const getUniqueFilterValues = async () => {
  try {
    const [regions, genders, categories, tags, paymentMethods] = await Promise.all([
      Sales.distinct('customerRegion'),
      Sales.distinct('gender'),
      Sales.distinct('productCategory'),
      Sales.distinct('tags'),
      Sales.distinct('paymentMethod')
    ]);

    return {
      regions: regions.filter(v => v).sort(),
      genders: genders.filter(v => v).sort(),
      categories: categories.filter(v => v).sort(),
      tags: tags.filter(v => v).sort(),
      paymentMethods: paymentMethods.filter(v => v).sort()
    };
  } catch (error) {
    console.error('Error fetching filter values:', error);
    throw error;
  }
};

export { loadDataFromCSV, getUniqueFilterValues };
