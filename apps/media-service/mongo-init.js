// MongoDB initialization script
db = db.getSiblingDB('media-service');

// Create collections
db.createCollection('media');

// Create indexes for better performance
db.media.createIndex({ id: 1 }, { unique: true });
db.media.createIndex({ userId: 1 });
db.media.createIndex({ provider: 1 });
db.media.createIndex({ tags: 1 });
db.media.createIndex({ createdAt: -1 });
db.media.createIndex({ mimeType: 1 });
db.media.createIndex({ cloudinaryPublicId: 1 });

// Create text index for search functionality
db.media.createIndex({
  originalName: 'text',
  tags: 'text',
});

print('MongoDB initialization completed successfully!');
