import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../src/models/User.js';

dotenv.config();

const uri = process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost";

async function fixEmptyPhoneNumbers() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    // Find all users with empty phone numbers
    const usersWithEmptyPhone = await User.find({ phone: "" });
    console.log(`Found ${usersWithEmptyPhone.length} users with empty phone numbers`);

    if (usersWithEmptyPhone.length > 0) {
      // Update all users with empty phone numbers to have null instead
      const result = await User.updateMany(
        { phone: "" },
        { $set: { phone: null } }
      );
      
      console.log(`Updated ${result.modifiedCount} users`);
      
      // Verify the fix
      const remainingUsersWithEmptyPhone = await User.find({ phone: "" });
      console.log(`Remaining users with empty phone numbers: ${remainingUsersWithEmptyPhone.length}`);
    }

    // Also fix empty usernames
    const usersWithEmptyUsername = await User.find({ username: "" });
    console.log(`Found ${usersWithEmptyUsername.length} users with empty usernames`);

    if (usersWithEmptyUsername.length > 0) {
      const result = await User.updateMany(
        { username: "" },
        { $set: { username: null } }
      );
      
      console.log(`Updated ${result.modifiedCount} usernames`);
      
      const remainingUsersWithEmptyUsername = await User.find({ username: "" });
      console.log(`Remaining users with empty usernames: ${remainingUsersWithEmptyUsername.length}`);
    }

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the migration
fixEmptyPhoneNumbers();
