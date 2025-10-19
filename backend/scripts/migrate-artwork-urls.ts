import { MongoClient, ObjectId } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config({ path: '/Users/michaelsabatini/Documents/harrisondeller/backend/.env' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/harrison-deller';
const API_URL = process.env.API_URL || 'http://localhost:3001';

async function migrateArtworkUrls() {
  let client: MongoClient | null = null;
  try {
    console.log('Connecting to MongoDB...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const artworksCollection = db.collection('artworks');

    // Find all artworks with relative URLs
    const relativeUrlArtworks = await artworksCollection
      .find({ imageUrl: { $regex: '^/uploads/' } })
      .toArray();

    console.log(`Found ${relativeUrlArtworks.length} artworks with relative URLs`);

    if (relativeUrlArtworks.length === 0) {
      console.log('No artworks need migration.');
      await client.close();
      return;
    }

    // Update each artwork to use absolute URL
    let updatedCount = 0;
    for (const artwork of relativeUrlArtworks) {
      const newImageUrl = `${API_URL}${artwork.imageUrl}`;
      const result = await artworksCollection.updateOne(
        { _id: artwork._id },
        { $set: { imageUrl: newImageUrl } }
      );
      if (result.modifiedCount > 0) {
        updatedCount++;
        console.log(`✓ Updated: ${artwork.title} (${artwork.imageUrl} → ${newImageUrl})`);
      }
    }

    console.log(`\nMigration complete! Updated ${updatedCount} artworks.`);
    await client.close();
  } catch (error) {
    console.error('Migration failed:', error);
    if (client) {
      await client.close();
    }
    process.exit(1);
  }
}

migrateArtworkUrls();