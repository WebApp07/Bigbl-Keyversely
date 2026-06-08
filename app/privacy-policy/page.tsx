import Footer from "@/components/footer";
import Header from "@/components/shared/header";

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-6">
        <Header />
      <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        
        {/* Header Block */}
        <div className="mb-10 border-b border-zinc-200 pb-6 dark:border-zinc-800">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Last updated: June 8, 2026
          </p>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-7">
            This Privacy Policy describes Our policies and procedures on the collection, use, and disclosure of Your information when You use Keyversely and tells You about Your privacy rights and how the law protects You. We use Your Personal data to provide and improve our digital delivery services. By using Keyversely, You agree to the collection and use of information in accordance with this policy.
          </p>
        </div>

        {/* Section 1: Definitions */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white border-b border-zinc-100 pb-2 dark:border-zinc-800">
            1. Interpretation and Definitions
          </h2>
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Definitions</p>
          <p className="leading-7 text-zinc-600 dark:text-zinc-400">
            For the purposes of this Privacy Policy:
          </p>
          <ul className="list-disc pl-5 space-y-3 text-zinc-600 dark:text-zinc-400 text-sm">
            <li><strong>Company:</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to <strong>KEYVERSELY LLC</strong>, 63 N Burritt Ave, Rm 100 PMB 1180, Buffalo, WY 82834, United States.</li>
            <li><strong>Service:</strong> Refers to the website marketplace operated under the domain name managed by Keyversely.</li>
            <li><strong>Personal Data:</strong> Is any information that relates to an identified or identifiable individual, such as names, billing details, and emails collected during digital delivery checkouts.</li>
            <li><strong>Cookies:</strong> Small files placed on Your computer, mobile device, or any other device containing historical browsing details.</li>
            <li><strong>Device:</strong> Any asset capable of visiting our store, including cellphones, digital tablets, or computers.</li>
          </ul>
        </section>

        {/* Section 2: Data Collection */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white border-b border-zinc-100 pb-2 dark:border-zinc-800">
            2. Collecting and Using Your Personal Data
          </h2>
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Types of Data Collected</p>
          
          <div className="bg-zinc-50 dark:bg-zinc-800/40 p-5 rounded-lg space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
            <p className="font-semibold text-zinc-800 dark:text-zinc-200">Personal Data Required for Order Fulfillment:</p>
            <p>While ordering digital software licenses on Our Service, We ask You to provide specific personally identifiable information to execute secure item deliveries. This includes:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Email address (used directly for automated software key delivery)</li>
              <li>First name and last name</li>
              <li>Phone number</li>
              <li>Billing Address, State, Province, ZIP/Postal code, City</li>
            </ul>
          </div>

          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mt-4">Usage Data and Analytics</p>
          <p className="leading-7 text-zinc-600 dark:text-zinc-400 text-sm">
            Usage Data is gathered automatically when utilizing our store layout. This includes properties such as Your Device&apos;s Internet Protocol (IP address), operating system versions, individual diagnostic logs, explicit times/dates of visits, and navigation parameters.
          </p>
        </section>

        {/* Section 3: Tracking & Cookies */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white border-b border-zinc-100 pb-2 dark:border-zinc-800">
            3. Tracking Technologies and Cookies
          </h2>
          <p className="leading-7 text-zinc-600 dark:text-zinc-400 text-sm">
            We use essential security cookies, web beacons, and analytical tags to optimize transaction safety and shield against checkout fraud. 
          </p>
          <div className="grid gap-4 md:grid-cols-2 text-sm mt-2">
            <div className="border border-zinc-200 p-4 rounded-lg dark:border-zinc-800">
              <p className="font-semibold text-zinc-900 dark:text-white">Necessary / Essential Cookies</p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Administered directly by Us. These items authenticate customer profiles and prevent fraudulent or duplicate account creation during license delivery.</p>
            </div>
            <div className="border border-zinc-200 p-4 rounded-lg dark:border-zinc-800">
              <p className="font-semibold text-zinc-900 dark:text-white">Functionality Cookies</p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Persistent scripts that maintain regional currency settings (e.g., USD / EUR) and save active cart conditions across browsing sessions.</p>
            </div>
          </div>
        </section>

        {/* Section 4: Data Usage */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white border-b border-zinc-100 pb-2 dark:border-zinc-800">
            4. Use of Your Personal Data
          </h2>
          <p className="leading-7 text-zinc-600 dark:text-zinc-400 text-sm">
            The Company explicitly reserves the right to apply collected customer credentials to achieve the following performance targets:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-400 text-sm">
            <li><strong>Contract Execution:</strong> Fulfilling, verifying, and routing software license activation codes bought via our system.</li>
            <li><strong>Customer Outreach:</strong> Transmitting transactional updates, license recovery emails, or technical troubleshooting guidance via automated channels.</li>
            <li><strong>Fraud Prevention:</strong> Processing variables through high-risk secure checkouts to minimize unauthorized credit card use and chargeback claims.</li>
          </ul>
        </section>

        {/* Section 5: Legal Disclosures */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white border-b border-zinc-100 pb-2 dark:border-zinc-800">
            5. Jurisdiction and Legal Compliance
          </h2>
          <p className="leading-7 text-zinc-600 dark:text-zinc-400 text-sm">
            This Policy and all transactional information are governed exclusively under the laws of the **State of Wyoming, United States**, without regard to conflict of law principles. Any enforcement actions regarding digital asset acquisition must be filed within our local state jurisdiction.
          </p>
        </section>

        {/* Contact Block */}
        <div className="mt-12 bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-lg text-center border border-zinc-100 dark:border-zinc-800">
          <p className="font-semibold text-zinc-900 dark:text-white">Privacy Concerns or Data Requests?</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Please direct formal inquiries regarding data retention, removal, or compliance directly to our support desk:
          </p>
          <a
            href="mailto:support@keyversely.com"
            className="mt-3 inline-block font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            support@keyversely.com
          </a>
        </div>

      </div>
      <Footer />
    </main>
  );
}
