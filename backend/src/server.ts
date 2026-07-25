import app from './app';
import { ENV } from './config/env';
import { logger } from './utils/logger';

const PORT = ENV.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`🛡️ Aegis Guardian AI Engine listening on port ${PORT}`);
  logger.info(`🏥 Target Environment: Quaid-e-Azam International Hospital (Academic Demonstration)`);
});
