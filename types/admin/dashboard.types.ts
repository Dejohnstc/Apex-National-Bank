export interface DashboardStats {
  users: {
    total: number;
    active: number;
    pending: number;
    suspended: number;
  };

  accounts: {
    total: number;
    active: number;
    frozen: number;

    totalCurrentBalance: number;
    totalAvailableBalance: number;
  };

  transfers: {
    ach: {
      pending: number;
      processing: number;
      completedToday: number;
    };

    wire: {
      pending: number;
      approved: number;
      processing: number;
      completedToday: number;
    };

    internal: {
      pending: number;
      completedToday: number;
    };

    zelle: {
      pending: number;
      completedToday: number;
    };
  };

  volume: {
    today: number;
    month: number;
    year: number;
  };

  revenue: {
    today: number;
    month: number;
    year: number;
  };

  risk: {
    flagged: number;
    failed: number;
    pendingReview: number;
    amlQueue: number;
  };

  health: {
    database: SystemStatus;
    api: SystemStatus;
    email: SystemStatus;
    payments: SystemStatus;
  };

  recentActivity: RecentActivity[];

  alerts: DashboardAlert[];
}

export interface DashboardResponse {
  success: boolean;
  data: DashboardStats;
}

export type SystemStatus =
  | "healthy"
  | "warning"
  | "down";

export interface RecentActivity {
  id: string;
  type:
    | "user"
    | "account"
    | "transfer"
    | "wire"
    | "ach"
    | "zelle";

  title: string;
  description: string;
  createdAt: string;
}

export interface DashboardAlert {
  id: string;
  severity:
    | "low"
    | "medium"
    | "high"
    | "critical";

  title: string;
  description: string;
}