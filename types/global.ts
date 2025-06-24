enum SALE_STATUS {
  NEW = 'New',
  CLOSED = 'Closed',
  QUALIFIED = 'Qualified',
  CONTACTED = 'Contacted',
}

enum INTEREST_LEVEL {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

enum SOURCE {
  REFERRAL = 'Referral',
  WEBSITE = 'Website',
  COLD_CALL = 'Cold Call',
  EVENT = 'Event',
}

interface FindAll {
  limit: number;
  offset: number;
  source?: string;
  interestLevel?: string;
  status?: string;
  userId?: string;
}

export { SALE_STATUS, INTEREST_LEVEL, SOURCE, FindAll };
