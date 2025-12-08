import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const UserRights = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="animate-fade-up opacity-0">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              User Rights & Responsibilities
            </h1>
            <p className="text-muted-foreground mb-12">
              Last updated: December 2024
            </p>
          </div>

          <div className="prose prose-lg max-w-none animate-fade-up opacity-0 stagger-1">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  As a user of the Ubuntu platform, you have the following rights:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Right to access your account information and transaction history at any time</li>
                  <li>Right to withdraw your earnings (minimum 10,000 RWF) via MTN Mobile Money</li>
                  <li>Right to receive accurate information about your earnings, referrals, and account balance</li>
                  <li>Right to privacy and protection of your personal information</li>
                  <li>Right to fair treatment and equal access to platform features</li>
                  <li>Right to request account closure and data deletion</li>
                  <li>Right to dispute transactions or report errors within 30 days</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. Your Responsibilities</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  As a user, you are responsible for:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Maintaining the security and confidentiality of your account credentials</li>
                  <li>Providing accurate and truthful information during registration and transactions</li>
                  <li>Complying with all applicable laws and regulations</li>
                  <li>Not engaging in fraudulent activities, including fake referrals or account manipulation</li>
                  <li>Not creating multiple accounts or attempting to circumvent platform rules</li>
                  <li>Reporting any suspicious activity or security breaches immediately</li>
                  <li>Ensuring you meet the minimum withdrawal requirement of 10,000 RWF before requesting withdrawals</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. Account Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You are responsible for maintaining the security of your account. We recommend:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                  <li>Using a strong, unique password</li>
                  <li>Not sharing your account credentials with anyone</li>
                  <li>Logging out after each session, especially on shared devices</li>
                  <li>Immediately reporting any unauthorized access to your account</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. Earnings & Withdrawals</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Regarding your earnings and withdrawals:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>You earn 40% commission for each successful referral's deposit</li>
                  <li>Task completion rewards are credited immediately upon verification</li>
                  <li>Minimum withdrawal amount is 10,000 RWF</li>
                  <li>Withdrawal requests are processed within 24 hours</li>
                  <li>All withdrawals are subject to identity verification</li>
                  <li>You are responsible for providing accurate MTN Mobile Money details</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Dispute Resolution</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have concerns or disputes regarding your account, earnings, or transactions, you have the right to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                  <li>Contact our support team at support@ubuntu.rw</li>
                  <li>Request a review of disputed transactions within 30 days</li>
                  <li>Receive a response to your inquiry within 5 business days</li>
                  <li>Appeal account restrictions or terminations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Data Protection</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                  <li>Access your personal data stored on our platform</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your account and associated data</li>
                  <li>Opt-out of marketing communications</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">7. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about your rights or to exercise any of these rights, please contact us at 
                  rights@ubuntu.rw or through our support portal.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserRights;

