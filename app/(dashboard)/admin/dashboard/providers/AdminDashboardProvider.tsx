"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { getDashboardData } from "@/services/admin/dashboard/getDashboardData";

import type {
  DashboardStats,
} from "@/types/admin/dashboard.types";

interface AdminDashboardContextValue {
  data: DashboardStats | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

const AdminDashboardContext =
  createContext<AdminDashboardContextValue | null>(null);

interface ProviderProps {
  children: ReactNode;
}

export function AdminDashboardProvider({
  children,
}: ProviderProps) {
  const [data, setData] =
    useState<DashboardStats | null>(null);

  const [loading, setLoading] =
    useState(true);

async function refresh() {
  setLoading(true);

  try {
    const result = await getDashboardData();

    setData(result.data);
  } finally {
    setLoading(false);
  }
}



  return (
    <AdminDashboardContext.Provider
      value={{
        data,
        loading,
        refresh,
      }}
    >
      {children}
    </AdminDashboardContext.Provider>
  );
}

export function useAdminDashboard() {
  const context = useContext(
    AdminDashboardContext
  );

  if (!context) {
    throw new Error(
      "useAdminDashboard must be used inside AdminDashboardProvider."
    );
  }

  return context;
}