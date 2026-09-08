-- Records account session transitions without storing credentials.
CREATE TABLE IF NOT EXISTS auth_events (
  id TEXT PRIMARY KEY NOT NULL,
  accountId TEXT,
  connectionId TEXT,
  event TEXT NOT NULL,
  refreshBy TEXT,
  expiresOn TEXT,
  occurredOn TEXT NOT NULL
);
