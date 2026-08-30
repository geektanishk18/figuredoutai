import { COMPANY } from '@/lib/constants'

/**
 * Board 1d closes on the registered entity, split into labelled fields rather
 * than a sentence. The LLPIN is the one credential a reader can independently
 * check, so it stays selectable text and is never rendered as an image.
 */
export function EntityBlock({ headingId }: { headingId: string }) {
  const fields = [
    { label: 'Entity', value: COMPANY.legalName, strong: true },
    { label: 'LLPIN', value: COMPANY.llpin, strong: true },
    { label: 'Statute', value: COMPANY.registeredUnder, strong: false },
    { label: 'Registered office', value: `${COMPANY.city}, ${COMPANY.state}, ${COMPANY.country}`, strong: false },
  ]

  return (
    <section aria-labelledby={headingId} className="mt-section">
      <h2
        id={headingId}
        className="font-sans text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-muted"
      >
        Registered entity
      </h2>
      <dl className="mt-6 flex flex-wrap items-baseline gap-x-8 gap-y-4 border-t border-sky/[0.08] pt-6">
        {fields.map((field) => (
          <div key={field.label} className="flex items-baseline gap-3">
            <dt className="sr-only">{field.label}</dt>
            <dd
              className={
                field.strong
                  ? 'font-heading text-[17px] font-semibold text-paper'
                  : 'text-[15px] text-body'
              }
            >
              {field.value}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-[14px] text-sky">Verifiable on the MCA portal.</p>
    </section>
  )
}
