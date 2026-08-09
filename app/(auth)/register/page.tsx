import {
  AuthShell,
  AuthCard,
  AuthHeader,
  RegisterForm,
} from "@/components/auth";

export default function RegisterPage() {
  return (
    <AuthShell>
      <AuthCard>
        <AuthHeader
          title="Create your account"
          description="Open your Apex National Bank account in minutes."
        />

        <RegisterForm />
      </AuthCard>
    </AuthShell>
  );
}