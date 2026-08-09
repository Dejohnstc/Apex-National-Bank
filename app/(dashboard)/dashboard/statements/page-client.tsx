"use client";

import { useEffect, useRef, useState, useTransition } from "react";

import { getStatementsAction } from "@/actions/statements/getStatementsAction";
import { exportCsv } from "@/lib/statements/exportCsv";
import DateRangePicker from "@/components/statements/DateRangePicker";
import ExportButtons from "@/components/statements/ExportButtons";
import StatementFilters from "@/components/statements/StatementFilter";
import StatementTable from "@/components/statements/StatementTable";
import { exportExcel } from "@/lib/statements/exportExcel";
import { useDebounce } from "@/hooks/useDebounce";
import { exportPdf } from "@/lib/statements/exportPdf";
import type { Statement } from "@/types/statement";
import StatementSummary from "@/components/statements/StatementSummary";
interface Props {
  initialStatements: Statement[];
}

export default function PageClient({
  initialStatements,
}: Props) {
  const [statements, setStatements] =
    useState(initialStatements);

  const [search, setSearch] =
    useState("");

  const debouncedSearch =
    useDebounce(search, 400);

  const [type, setType] =
    useState("all");

  const [from, setFrom] =
    useState<Date>();

  const [to, setTo] =
    useState<Date>();

  const [isPending, startTransition] =
    useTransition();

  const firstRender =
    useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    startTransition(async () => {
      try {
        const data =
          await getStatementsAction({
            search:
              debouncedSearch,
            type,
            from,
            to,
          });

        setStatements(data);
      } catch (error) {
        console.error(
          "Failed to load statements:",
          error
        );
      }
    });
  }, [
    debouncedSearch,
    type,
    from,
    to,
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Statements
          </h1>

          <p className="text-muted-foreground">
            View, search and export your
            account statements.
          </p>
        </div>

    <ExportButtons
  loading={isPending}
  onExportPdf={() =>
    exportPdf(statements)
  }
  onExportCsv={() =>
    exportCsv(statements)
  }
  onExportExcel={() =>
    exportExcel(statements)
  }
  onPrint={() =>
    window.print()
  }
/>
      </div>

      <StatementFilters
        search={search}
        type={type}
        onSearchChange={
          setSearch
        }
        onTypeChange={
          setType
        }
      />

      <DateRangePicker
        from={from}
        to={to}
        onFromChange={
          setFrom
        }
        onToChange={
          setTo
        }
      />
<StatementSummary
  statements={statements}
/>
      <StatementTable
        statements={
          statements
        }
        loading={isPending}
      />
    </div>
  );
}