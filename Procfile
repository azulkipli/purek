// Procfile

release: ENV_SILENT=true node ace migration:run --force && node ace seed --files="UserSeeder.js" && node ace seed --files="LinkSeeder.js" 
web: ENV_SILENT=true npm start
