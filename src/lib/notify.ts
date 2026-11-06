// Member notifications. The demo has no email provider, so every notification
// is a structured log line. Swap the body of notifyMember for Resend, Postmark,
// or whatever you pick; the call sites in the webhook stay the same.

export type MemberNotice =
  | { kind: "payment_action_required"; invoiceId: string; hostedInvoiceUrl: string | null }
  | { kind: "payment_failed"; invoiceId: string }
  | { kind: "past_due" }
  | { kind: "cancellation_scheduled"; endsAt: Date | null }
  | { kind: "cancellation_reverted" }
  | { kind: "subscription_ended" };

export async function notifyMember(customerId: string | null, notice: MemberNotice) {
  console.log("[notify]", { customer: customerId, ...notice });
}
