"use client";

import { useMemo, useState } from "react";
import { Pencil, Trash2, Star } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Beneficiary {
  _id: string;

  nickname: string;

  accountName: string;
  accountNumber: string;

  bankName: string;
  bankCode: string;

  isInternal: boolean;
  isFavorite: boolean;
}

interface BeneficiaryTableProps {
  beneficiaries: Beneficiary[];

  onEdit: (
    beneficiary: Beneficiary
  ) => void;

  onDelete: (
    beneficiary: Beneficiary
  ) => void;
}

export default function BeneficiaryTable({
  beneficiaries,
  onEdit,
  onDelete,
}: BeneficiaryTableProps) {
  const [search, setSearch] =
    useState("");

  const filtered =
    useMemo(() => {
      const value =
        search.toLowerCase();

      return beneficiaries.filter(
        (beneficiary) =>
          beneficiary.accountName
            .toLowerCase()
            .includes(value) ||
          beneficiary.nickname
            .toLowerCase()
            .includes(value) ||
          beneficiary.accountNumber.includes(
            value
          ) ||
          beneficiary.bankName
            .toLowerCase()
            .includes(value)
      );
    }, [beneficiaries, search]);

  return (
    <div className="space-y-6">
      <Input
        placeholder="Search beneficiaries..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                Beneficiary
              </TableHead>

              <TableHead>
                Bank
              </TableHead>

              <TableHead>
                Account
              </TableHead>

              <TableHead>
                Status
              </TableHead>

              <TableHead className="w-[140px] text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-10 text-center text-muted-foreground"
                >
                  No beneficiaries found.
                </TableCell>
              </TableRow>
            )}

            {filtered.map(
              (beneficiary) => (
                <TableRow
                  key={beneficiary._id}
                >
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {
                            beneficiary.accountName
                          }
                        </span>

                        {beneficiary.isFavorite && (
                          <Star className="h-4 w-4 fill-current text-yellow-500" />
                        )}
                      </div>

                      {beneficiary.nickname && (
                        <p className="text-sm text-muted-foreground">
                          {
                            beneficiary.nickname
                          }
                        </p>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    {beneficiary.bankName}
                  </TableCell>

                  <TableCell>
                    {
                      beneficiary.accountNumber
                    }
                  </TableCell>

                  <TableCell>
                    {beneficiary.isInternal ? (
                      <Badge>
                        Internal
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                      >
                        External
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          onEdit(
                            beneficiary
                          )
                        }
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() =>
                          onDelete(
                            beneficiary
                          )
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}