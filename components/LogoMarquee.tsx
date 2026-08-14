import { logosPartners, trustBadges } from "@/lib/constants";
import { getT } from "@/lib/i18n/server";
import Image from "next/image";

export default async function LogoMarquee() {
  const t = await getT();

  return (
    <section className="py-16">
      {/* Eyebrow */}
      <div className="flex items-center justify-center gap-3 mb-2">
        <span className="h-px w-10 bg-border" />
        <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          {t("home.integrations")}
        </span>
        <span className="h-px w-10 bg-border" />
      </div>

      <h2 className="text-center text-lg font-medium text-foreground mb-1">
        {t("home.integrationsTitle")}
      </h2>
      <p className="text-center text-sm text-muted-foreground mb-10">
        {t("home.integrationsDescription")}
      </p>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-background to-transparent z-10" />

        <div className="flex">
          {[0, 1].map((stripIndex) => (
            <div
              key={stripIndex}
              aria-hidden={stripIndex === 1}
              className="flex flex-shrink-0 animate-marquee hover:[animation-play-state:paused]"
            >
              {[...logosPartners, ...logosPartners, ...logosPartners].map(
                (logo, index) => (
                  <div key={index} className="mx-4 flex-shrink-0">
                    <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-border bg-card hover:bg-accent transition-colors duration-200 cursor-default">
                      <Image
                        src={logo.src}
                        alt={stripIndex === 0 ? logo.name : ""}
                        width={22}
                        height={22}
                        className="object-contain"
                      />
                      <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                        {logo.name}
                      </span>
                    </div>
                  </div>
                ),
              )}
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-background to-transparent z-10" />
      </div>

      {/* Trust badges */}
      <div className="flex items-center justify-center gap-3 mt-10 flex-wrap">
        {trustBadges.map(({ icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-1.5 text-xs text-muted-foreground border border-border rounded-full px-3 py-1.5"
          >
            <i
              className={`ti ${icon} text-emerald-500 text-sm`}
              aria-hidden="true"
            />
            {label}
          </div>
        ))}
      </div>
    </section>
  );
}