// Procfile

release: ENV_SILENT=true node ace migration:run --force && ENV_SILENT=true node ace seed --files="UserSeeder.js" --force && ENV_SILENT=true node ace seed --files="LinkSeeder.js" --force 
web: ENV_SILENT=true npm start
