import {
  AuthCard,
  AuthHeader,
  AuthShell,
  LoginForm,
} from "@/components/auth";

export default function LoginPage() {
  return (
    <AuthShell>
      <AuthCard>
        <AuthHeader
          title="Welcome Back"
          description="Sign in to your Apex National Bank account."
        />

        <LoginForm />
      </AuthCard>
    </AuthShell>
  );
}