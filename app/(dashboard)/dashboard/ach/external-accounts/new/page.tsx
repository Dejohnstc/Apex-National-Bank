import ExternalAccountForm from "@/components/externalAccounts/ExternalAccountForm";

export default function NewExternalAccountPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Link External Account
        </h1>

        <p className="text-muted-foreground">
          Add another bank account for ACH
          transfers.
        </p>
      </div>

      <ExternalAccountForm />
    </div>
  );
}