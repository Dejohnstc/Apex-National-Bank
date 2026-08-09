import { NextRequest } from "next/server";

import { pdf } from "@react-pdf/renderer";
import WireReceiptPdf from "@/components/Pdf/WireReceiptPdf";

import { buildWireReceipt } from "@/services/receipt/buildWireReceipt";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: Props
) {
  const { id } = await params;

  try {
    const receipt =
      await buildWireReceipt(id);

    const document = (
      <WireReceiptPdf
        receipt={receipt}
      />
    );

    const stream = await pdf(document).toBuffer();

return new Response(stream as unknown as ReadableStream, {
  headers: {
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename="wire-${receipt.summary.reference}.pdf`,
    "Cache-Control": "no-store",
  },
});
  } catch (error) {
    return Response.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to generate PDF.",
      },
      {
        status: 500,
      }
    );
  }
}