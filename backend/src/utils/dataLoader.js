import Sales from '../models/Sales.js';
import { parseCSV, transformCSVRecord, validateRecord } from '../utils/csvParser.js';

const loadDataFromCSV = async (csvFilePath) => {
  try {
    const existingCount = await Sales.countDocuments();
    
    if (existingCount > 0) {
      console.log(`Database already contains ${existingCount} records. Skipping import.`);
      return { success: true, count: existingCount, message: 'Data already loaded' };
    }

    console.log('Starting CSV import...');
    const rawRecords = await parseCSV(csvFilePath);
    console.log(`Parsed ${rawRecords.length} records from CSV`);

    const transformedRecords = rawRecords
      .map(transformCSVRecord)
      .filter(validateRecord);

    console.log(`Validated ${transformedRecords.length} records`);

    if (transformedRecords.length === 0) {
      throw new Error('No valid records to import');
    }

    const batchSize = 1000;
    let importedCount = 0;

    for (let i = 0; i < transformedRecords.length; i += batchSize) {
      const batch = transformedRecords.slice(i, i + batchSize);
      await Sales.insertMany(batch, { ordered: false });
      importedCount += batch.length;
      console.log(`Imported ${importedCount} / ${transformedRecords.length} records`);
    }

    console.log('CSV import completed successfully');
    return { 
      success: true, 
      count: importedCount, 
      message: 'Data imported successfully' 
    };

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
